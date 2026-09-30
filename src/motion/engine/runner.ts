/**
 * Data-driven interaction runner.
 *
 * Reads the interaction definitions in `../data/interactions.generated.ts` and builds, for each interaction, the GSAP
 * timelines (one per trigger element when the interaction is component-scoped or uses trigger-relative targets), binds
 * the hover / click / scroll / load triggers, gates interactions by breakpoint through `gsap.matchMedia`, splits text
 * with SplitText (and rebuilds the affected timelines in place when a split re-runs) and finally marks the document
 * ready (`motion-ready` class) so the pre-animation hidden state stops applying.
 *
 * The three GSAP entry points are injected, so the module never touches the DOM or `window` at import time and can be
 * bundled on its own for verification. Semantics are intentionally identical to the reference implementation: do not
 * "simplify" the quirks noted below (they are what make the motion match).
 */
import type { gsap as GsapStatic } from "gsap";
import type { ScrollTrigger as ScrollTriggerStatic } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextCtor } from "gsap/SplitText";

type Gsap = typeof GsapStatic;
type Timeline = gsap.core.Timeline;
type ScrollTriggerInstance = InstanceType<typeof ScrollTriggerStatic>;
type SplitTextInstance = InstanceType<typeof SplitTextCtor>;
type SplitTextVars = NonNullable<ConstructorParameters<typeof SplitTextCtor>[1]>;
type ScrollTriggerVars = ScrollTrigger.StaticVars;

// ---------------------------------------------------------------------------------------------------- data model

export interface TargetDesc {
  kind: "class" | "attribute" | "selector" | "id" | "trigger-only" | "trigger-only-parent" | "body" | "viewport" | string;
  selector?: string;
  relationship?: string;
  firstMatchOnly?: boolean;
  filterBy?: TargetDesc;
}
export interface TweenGroup {
  handler: "transform" | "style";
  from: Record<string, unknown>;
  to: Record<string, unknown>;
  /** keys of `to` whose value is a `var(--x)` reference to resolve against the first target when the timeline is built */
  resolveVar?: string[];
}
export interface Action {
  id: string;
  targets: TargetDesc[];
  /** tween type: 0 to, 1 from, 2 fromTo, 3 set */
  tt: number;
  position: number;
  duration: number;
  ease: string | null;
  tweens: TweenGroup[];
  stagger?: Record<string, unknown>;
  repeat?: number;
  yoyo?: boolean;
  splitText?: { type: string } | string;
  classOp?: { operation: string; selectors: string[] };
}
export interface Trigger {
  kind: "hover" | "click" | "scroll" | "load" | string;
  controlType: string;
  control?: string;
  pluginConfig?: Record<string, unknown>;
  scrollTrigger?: {
    start: string;
    end: string;
    scrub: number | boolean;
    toggleActions: string;
    horizontal: boolean;
    markers: boolean;
  };
  target?: TargetDesc;
}
export interface Interaction {
  id: string;
  order: number;
  name: string;
  scope: {
    type: "site" | "pages" | "component";
    componentId?: string;
    component?: { name: string; root: string };
    value?: string[];
  };
  conditionalPlayback?: { type: string; behavior: string; breakpoints: string[]; queries: string[] }[];
  triggers: Trigger[];
  timeline: { id: string; actions: Action[]; canvasDuration?: number };
}
export interface RunnerData {
  breakpoints: Record<string, string>;
  interactions: Interaction[];
}

export interface RunnerOptions {
  gsap: Gsap;
  ScrollTrigger: typeof ScrollTriggerStatic;
  SplitText?: typeof SplitTextCtor | null;
  data: RunnerData;
  /** interactions to register, in registration order (see ROUTE_INTERACTIONS) */
  ids: readonly string[];
  /** component id -> css selector of the instance root (default: `scope.component.root` of the interaction) */
  componentRoots?: Record<string, string>;
  /** class added to <html> once everything is registered (default 'motion-ready'); pass '' to skip */
  readyClass?: string;
  doc?: Document;
  win?: Window;
}
export interface Runner {
  destroy(): void;
  timelines: () => Timeline[];
}

// ---------------------------------------------------------------------------------------------------- internals

type SubState = "init" | "idle" | "building" | "rebuild_pending";
interface Sub {
  tl: Timeline;
  def: Interaction;
  itId: string;
  trig: Element | null;
  rebuildState: SubState;
  controlTypes: Set<string>;
  stIds: Set<string>;
  stConfigs: Map<string, ScrollTriggerVars>;
  cleanups: Set<() => void>;
  splitLines?: boolean;
}

const splitKind = (a: Action): string =>
  a.splitText ? (typeof a.splitText === "string" ? a.splitText : a.splitText.type) : "none";
const DYNAMIC_KINDS = new Set(["trigger-only", "trigger-only-parent", "inst"]);
const stateOf = (s: Sub): SubState => s.rebuildState;

export function initMotion(opts: RunnerOptions): Runner {
  const { gsap, ScrollTrigger, SplitText, data } = opts;
  const doc = opts.doc ?? document;
  const win = opts.win ?? window;
  const ac = new AbortController();
  const byId = new Map(data.interactions.map((i) => [i.id, i]));
  const subs: Sub[] = [];
  const splitRegistry = new Map<Element, { inst: SplitTextInstance; type: string }>();
  const scrollTriggers = new Map<string, ScrollTriggerInstance>();
  const loadQueue: Array<() => void> = [];
  const perInteractionCleanup = new Map<string, Array<() => void>>();
  const matchMedias: gsap.MatchMedia[] = [];
  let ro: ResizeObserver | null = null;

  const rootFor = (it: Interaction): string | null => {
    if (it.scope.type !== "component") return null;
    return opts.componentRoots?.[it.scope.componentId!] ?? it.scope.component?.root ?? null;
  };

  // ------------------------------------------------------------------ target resolution
  const qsa = (sel: string): Element[] => {
    try {
      return [...doc.querySelectorAll(sel)];
    } catch {
      return [];
    }
  };
  function resolveDesc(t: TargetDesc, trig: Element | null, it: Interaction, root: string | null): Element[] {
    let base: Element[];
    switch (t.kind) {
      case "class":
      case "attribute":
      case "selector":
      case "id":
        base = qsa(t.selector!);
        break;
      case "trigger-only":
        base = trig ? [trig] : [];
        break;
      case "trigger-only-parent":
        base = trig && trig.parentElement instanceof HTMLElement ? [trig.parentElement] : [];
        break;
      case "body":
        base = [doc.body];
        break;
      case "viewport":
        base = [doc.documentElement];
        break;
      default:
        base = [];
    }
    const scoped = root ? base.filter((e) => e.closest(root)) : base; // restrict to the component scope
    if (scoped.length && t.relationship && t.relationship !== "none" && t.filterBy) {
      return applyRelationship(scoped, t.relationship, resolveDesc(t.filterBy, trig, it, root), !!t.firstMatchOnly);
    }
    return scoped;
  }
  function resolve(t: TargetDesc, trig: Element | null, it: Interaction): Element[] {
    const root = rootFor(it);
    const s = resolveDesc(t, trig, it, root);
    if (root && trig) {
      // restrict to the component instance that contains the trigger
      const inst = trig.closest(root);
      if (inst) return s.filter((e) => e.closest(root) === inst);
    }
    return s;
  }
  function applyRelationship(cands: Element[], rel: string, filter: Element[], first: boolean): Element[] {
    if (!cands.length || !filter.length) return [];
    const out: Element[] = [];
    const seen = new Set<Element>();
    const push = (e: Element) => {
      seen.add(e);
      out.push(e);
      return first;
    };
    switch (rel) {
      case "within": {
        const f = new Set(filter);
        for (const c of cands) {
          if (seen.has(c)) continue;
          for (let a = c.parentElement; a; a = a.parentElement) {
            if (f.has(a)) {
              if (push(c)) return out;
              break;
            }
          }
        }
        return out;
      }
      case "next-to": {
        const f = new Set(filter);
        const parents = new Map<Element, number>();
        for (const e of filter) if (e.parentElement) parents.set(e.parentElement, (parents.get(e.parentElement) ?? 0) + 1);
        for (const c of cands) {
          if (seen.has(c) || !c.parentElement) continue;
          const n = parents.get(c.parentElement);
          if (n && (!f.has(c) || !(n <= 1)) && push(c)) break;
        }
        return out;
      }
      case "direct-child-of": {
        const f = new Set(filter);
        for (const c of cands) if (!seen.has(c) && c.parentElement && f.has(c.parentElement) && push(c)) break;
        return out;
      }
      case "direct-parent-of": {
        const ps = new Set(filter.map((e) => e.parentElement).filter(Boolean) as Element[]);
        for (const c of cands) if (!seen.has(c) && ps.has(c) && push(c)) break;
        return out;
      }
      case "next-sibling-of": {
        const f = new Set(filter);
        for (const c of cands) {
          if (seen.has(c)) continue;
          const p = c.previousElementSibling;
          if (p && f.has(p) && push(c)) break;
        }
        return out;
      }
      case "prev-sibling-of": {
        const f = new Set(filter);
        for (const c of cands) {
          if (seen.has(c)) continue;
          const n = c.nextElementSibling;
          if (n && f.has(n) && push(c)) break;
        }
        return out;
      }
      case "contains": {
        const anc = new Set<Element>();
        for (const e of filter) for (let p = e.parentElement; p && !anc.has(p); p = p.parentElement) anc.add(p);
        for (const c of cands) if (!seen.has(c) && anc.has(c) && push(c)) break;
        return out;
      }
      default:
        return [];
    }
  }
  const collectTargets = (a: Action, trig: Element | null, it: Interaction) => a.targets.flatMap((t) => resolve(t, trig, it));

  // ------------------------------------------------------------------ does the interaction need one timeline per trigger element?
  const isDynamic = (it: Interaction) => {
    const nonLoad = it.triggers.some((t) => t.controlType !== "load");
    if (it.scope.type === "component" && nonLoad) return true;
    for (const a of it.timeline.actions) {
      for (const t of a.targets) {
        if (DYNAMIC_KINDS.has(t.kind)) return true;
        if (t.filterBy && t.relationship !== "none" && DYNAMIC_KINDS.has(t.filterBy.kind)) return true;
      }
    }
    return false;
  };

  // ------------------------------------------------------------------ SplitText
  const splitClass = (k: string) => `gsap_split_${k}++`;
  function applySplitStyles(inst: SplitTextInstance) {
    const groups: Array<[Element[] | undefined, string]> = [
      [inst.lines, "block"],
      [inst.words, "inline-block"],
      [inst.chars, "inline-block"],
    ];
    for (const [list, display] of groups) {
      for (const el of list ?? []) {
        (el as HTMLElement).style.position = "relative";
        (el as HTMLElement).style.display = display;
      }
    }
  }
  function analyzeSplit(it: Interaction, trig: Element | null) {
    const m = new Map<Element, Set<string>>();
    for (const a of it.timeline.actions) {
      const s = splitKind(a);
      if (s === "none") continue;
      for (const el of collectTargets(a, trig, it)) {
        if (el === doc.body) continue;
        (m.get(el) ?? m.set(el, new Set()).get(el)!).add(s);
      }
    }
    return m;
  }
  const typeString = (types: Set<string>) => {
    const t = new Set(types);
    if (t.has("chars") && !t.has("words")) t.add("words");
    return ["lines", "words", "chars"].filter((x) => t.has(x)).join(", ");
  };
  function doSplit(el: Element, requested: string, sub: Sub) {
    if (!SplitText) return;
    let type = requested;
    const need = type.split(", ");
    const prev = splitRegistry.get(el);
    if (prev) {
      const have = new Set(prev.type.split(", "));
      if (need.every((x) => have.has(x))) return;
      prev.inst.revert();
      splitRegistry.delete(el);
      type = [...new Set([...have, ...need])].join(", ");
    }
    const cfg: SplitTextVars = { type, tag: "span" };
    const parts = type.split(", ");
    if (parts.includes("lines")) {
      sub.splitLines = true;
      cfg.linesClass = splitClass("line");
      cfg.autoSplit = true;
      cfg.onSplit = (self) => {
        applySplitStyles(self);
        if (sub.rebuildState !== "init") scheduleRebuildForElement(el);
        else sub.rebuildState = "idle";
      };
    }
    if (parts.includes("words")) cfg.wordsClass = splitClass("word");
    if (parts.includes("chars")) cfg.charsClass = splitClass("letter");
    const inst = new SplitText([el], cfg);
    applySplitStyles(inst);
    splitRegistry.set(el, { inst, type });
    if (prev) scheduleRebuildForElement(el);
  }
  const getSplitElements = (targets: Element[], kind: string) => {
    const out: Element[] = [];
    for (const t of targets) {
      const e = splitRegistry.get(t);
      if (e && e.type.split(", ").includes(kind)) {
        const list = e.inst[kind as "lines" | "words" | "chars"];
        if (list?.length) out.push(...list);
      }
    }
    return out.length ? out : targets;
  };

  // ------------------------------------------------------------------ timeline building
  function buildActions(sub: Sub) {
    const it = sub.def;
    const tl = sub.tl;
    for (const a of it.timeline.actions) {
      let targets = collectTargets(a, sub.trig, it);
      if (!targets.length && !a.classOp) continue;
      const split = splitKind(a);
      if (split !== "none" && targets.length && SplitText) targets = getSplitElements(targets, split);
      // Note: an `immediateRender:false` guard (same target+property already tweened earlier in the timeline by a non-"to" action)
      // is never needed by this data set.
      for (const g of a.tweens) {
        const pos = a.position ?? 0;
        let duration = a.duration ?? 0.5;
        const stagger = a.stagger ? { ...a.stagger } : undefined;
        if (stagger && duration === 0) duration = 0.001;
        const vars: gsap.TweenVars = { force3D: true, data: { id: a.id } };
        if (a.tt !== 3) vars.duration = duration;
        if (a.repeat != null) vars.repeat = a.repeat;
        if (a.yoyo != null) vars.yoyo = a.yoyo;
        if (stagger) vars.stagger = stagger as gsap.TweenVars["stagger"];
        if (a.ease != null) vars.ease = a.ease;
        const to: Record<string, unknown> = { ...g.to };
        const from: Record<string, unknown> = { ...g.from };
        if (g.resolveVar) {
          for (const k of g.resolveVar) {
            const name = String(to[k]).slice(4, -1).split(",")[0].trim();
            to[k] = getComputedStyle(targets[0]).getPropertyValue(name).trim() || undefined;
            if (to[k] === undefined) delete to[k];
          }
        }
        const hasFrom = Object.keys(from).length > 0;
        const hasTo = Object.keys(to).length > 0;
        if (a.tt === 0 && !hasTo) continue;
        if (a.tt === 1 && !hasFrom) continue;
        if (a.tt === 2 && !hasFrom && !hasTo) continue;
        if (a.tt === 3 && !hasTo) continue;
        if (a.tt === 1) tl.from(targets, { ...vars, ...from }, pos);
        else if (a.tt === 2) tl.fromTo(targets, { ...from }, { ...vars, ...to }, pos);
        else if (a.tt === 3) tl.set(targets, { ...vars, ...to }, pos);
        else tl.to(targets, { ...vars, ...to }, pos);
      }
      if (a.classOp) {
        const { operation, selectors } = a.classOp;
        const before = targets.map((el) => ({ el, list: [...el.classList] }));
        const op = () => {
          for (const el of targets) {
            for (const c of selectors) {
              if (operation === "addClass") el.classList.add(c);
              else if (operation === "removeClass") el.classList.remove(c);
              else if (operation === "toggleClass") el.classList.toggle(c);
            }
          }
        };
        tl.to(
          {},
          { duration: 0.001, onComplete: op, onReverseComplete: op },
          a.position && a.position !== 0 ? a.position : 0.001,
        );
        sub.cleanups.add(() => {
          for (const { el, list } of before) {
            for (const c of selectors) {
              if (list.includes(c)) el.classList.add(c);
              else el.classList.remove(c);
            }
          }
        });
      }
    }
    const canvas = it.timeline.canvasDuration;
    if (canvas != null && tl.duration() < canvas) tl.to({}, { duration: 0 }, canvas); // pad the timeline to its canvas length
  }
  function buildSub(it: Interaction, trig: Element | null): Sub {
    const controlTypes = new Set(it.triggers.map((t) => t.controlType));
    const sub: Sub = {
      tl: gsap.timeline({ paused: true, data: { id: it.timeline.id, triggerEl: trig || undefined } }),
      def: it,
      itId: it.id,
      trig,
      rebuildState: "init",
      controlTypes,
      stIds: new Set(),
      stConfigs: new Map(),
      cleanups: new Set(),
    };
    subs.push(sub);
    if (SplitText) for (const [el, types] of analyzeSplit(it, trig)) doSplit(el, typeString(types), sub);
    buildActions(sub);
    return sub;
  }
  function scheduleRebuildForElement(el: Element) {
    for (const sub of subs) {
      const has = sub.def.timeline.actions.some((a) => collectTargets(a, sub.trig, sub.def).includes(el));
      if (has) scheduleRebuild(sub);
    }
  }
  function scheduleRebuild(sub: Sub) {
    if (sub.rebuildState === "building" || sub.rebuildState === "rebuild_pending") {
      sub.rebuildState = "rebuild_pending";
      return;
    }
    sub.rebuildState = "building";
    const tl = sub.tl;
    const p = tl.progress();
    const active = tl.isActive() || (sub.controlTypes.has("load") && p !== 1);
    tl.pause();
    tl.revert();
    tl.clear();
    for (const c of sub.cleanups) c();
    sub.cleanups.clear();
    buildActions(sub);
    tl.progress(p);
    if (sub.stIds.size) {
      for (const id of sub.stIds) {
        const old = scrollTriggers.get(id);
        const cfg = sub.stConfigs.get(id);
        if (old && cfg) {
          old.kill();
          scrollTriggers.set(id, ScrollTrigger.create({ ...cfg, animation: tl }));
        }
      }
    } else if (active) tl.play();
    // a rebuild requested while this one was running is executed right after it
    if (stateOf(sub) === "rebuild_pending") {
      sub.rebuildState = "idle";
      scheduleRebuild(sub);
    } else sub.rebuildState = "idle";
  }

  // ------------------------------------------------------------------ playback control
  function run(tl: Timeline, control: string | undefined) {
    tl.timeScale(1);
    switch (control) {
      case "play":
        tl.play();
        break;
      case "pause":
      case "stop":
        tl.pause();
        break;
      case "resume":
        tl.resume();
        break;
      case "reverse":
      case "reverseFlipEase":
        tl.reverse();
        break;
      case "togglePlayReverse":
      case "togglePlayReverseFlipEase": {
        const p = tl.progress();
        // after timeScale(1) `reversed()` is always false: a click while the timeline is mid-flight always reverses
        if (p === 0) tl.play();
        else if (p === 1) tl.reverse();
        else if (tl.reversed()) tl.play();
        else tl.reverse();
        break;
      }
      case "none":
        break;
      default:
        tl.restart(); // no control given => restart
    }
  }

  // ------------------------------------------------------------------ triggers
  function bindTrigger(
    trg: Trigger,
    it: Interaction,
    getSub: (el: Element | null) => Sub | undefined,
    cleanups: Array<() => void>,
  ) {
    const listen = (el: Element, type: string, fn: (e: Event) => void) => {
      el.addEventListener(type, fn, { signal: ac.signal });
      cleanups.push(() => el.removeEventListener(type, fn));
    };
    if (trg.kind === "load") {
      const sub = getSub(null);
      if (!sub) return;
      loadQueue.push(() => {
        const go = () => run(sub.tl, trg.control);
        if (sub.splitLines) void doc.fonts.ready.then(go);
        else go();
      });
      return;
    }
    const elements = trg.target ? resolve(trg.target, null, it) : [];
    for (const el of elements) {
      const sub = getSub(el) ?? getSub(null);
      if (!sub) continue;
      if (trg.kind === "hover") {
        const type = (trg.pluginConfig?.type as string | undefined) ?? "mouseenter";
        if (type === "mouseenter" || type === "mouseleave") listen(el, type, () => run(sub.tl, trg.control));
      } else if (trg.kind === "click") {
        // one listener per element; togglePlayReverse is idempotent per click so this is equivalent to a delegated handler
        listen(el, "click", () => run(sub.tl, trg.control));
      } else if (trg.kind === "scroll" && trg.scrollTrigger) {
        const s = trg.scrollTrigger;
        const id = `st_${it.timeline.id}_${it.id}_${(el as HTMLElement).id || Math.random().toString(16).slice(2, 10)}`;
        const [enter, leave, enterBack, leaveBack] = s.toggleActions.split(" ");
        const act = (a: string) => () => {
          switch (a) {
            case "play":
              sub.tl.play();
              break;
            case "pause":
              sub.tl.pause();
              break;
            case "resume":
              sub.tl.resume();
              break;
            case "reverse":
              sub.tl.reverse();
              break;
            case "restart":
              sub.tl.restart();
              break;
            case "reset":
              sub.tl.pause(0);
              break;
            case "complete":
              sub.tl.progress(1);
              break;
          }
        };
        const cfg: ScrollTriggerVars = {
          trigger: el,
          markers: s.markers ?? false,
          start: s.start,
          end: s.end,
          scrub: s.scrub ?? false,
          horizontal: s.horizontal || false,
          toggleActions: s.toggleActions,
          id,
        };
        if (s.scrub !== false && s.scrub != null) cfg.animation = sub.tl;
        else {
          if (enter !== "none") cfg.onEnter = act(enter);
          if (leave !== "none") cfg.onLeave = act(leave);
          if (enterBack !== "none") cfg.onEnterBack = act(enterBack);
          if (leaveBack !== "none") cfg.onLeaveBack = act(leaveBack);
        }
        const st = ScrollTrigger.create(cfg);
        scrollTriggers.set(id, st);
        sub.stIds.add(id);
        sub.stConfigs.set(id, cfg);
        cleanups.push(() => {
          st.kill();
          scrollTriggers.delete(id);
        });
      }
    }
  }

  // ------------------------------------------------------------------ one interaction
  function setupInteraction(it: Interaction) {
    const cleanups: Array<() => void> = [];
    perInteractionCleanup.set(it.id, cleanups);
    const map = new Map<Element | null, Sub>(); // trigger element (null: shared) -> timeline
    const trigEls = new Set<Element>();
    for (const t of it.triggers) if (t.target) for (const e of resolve(t.target, null, it)) trigEls.add(e);
    const dynamic = isDynamic(it);
    if (!trigEls.size || !dynamic) map.set(null, buildSub(it, null));
    if (trigEls.size && dynamic) for (const el of trigEls) map.set(el, buildSub(it, el));
    else if (trigEls.size) for (const el of trigEls) map.set(el, map.get(null)!);
    const getSub = (el: Element | null) => map.get(el) ?? (dynamic ? undefined : map.get(null));
    for (const t of it.triggers) bindTrigger(t, it, getSub, cleanups);
    cleanups.push(() => {
      for (const sub of map.values()) {
        sub.tl.revert();
        sub.tl.kill();
        for (const c of sub.cleanups) c();
        sub.cleanups.clear();
        const i = subs.indexOf(sub);
        if (i >= 0) subs.splice(i, 1);
      }
      map.clear();
    });
  }
  const revertSplits = () => {
    for (const { inst } of splitRegistry.values()) inst.revert();
    splitRegistry.clear();
  };
  const teardownInteraction = (id: string) => {
    for (const c of (perInteractionCleanup.get(id) ?? []).reverse()) {
      try {
        c();
      } catch {
        /* a failing cleanup must not stop the others */
      }
    }
    perInteractionCleanup.delete(id);
  };

  // ------------------------------------------------------------------ breakpoint-gated interactions (gsap.matchMedia)
  // gsap.matchMedia() attaches a change listener to a MediaQueryList per query and never detaches it (not even on
  // revert()), so every page visit of a long-lived document (soft navigation) would leak a few listeners plus their
  // MediaQueryLists. Record them while a context registers its queries and detach them in destroy().
  const mediaListenerRemovers: Array<() => void> = [];
  function trackMediaListeners(run: () => void) {
    const original = win.matchMedia;
    win.matchMedia = (query: string) => {
      const mql = original.call(win, query);
      if (typeof mql.addListener === "function") {
        const add = mql.addListener.bind(mql);
        mql.addListener = (cb) => {
          mediaListenerRemovers.push(() => mql.removeListener(cb));
          add(cb);
        };
      } else {
        type Listen = (type: string, cb: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
        const add = (mql.addEventListener as Listen).bind(mql);
        const remove = (mql.removeEventListener as Listen).bind(mql);
        mql.addEventListener = ((type, cb, options) => {
          if (type === "change") mediaListenerRemovers.push(() => remove(type, cb, options));
          add(type, cb, options);
        }) as Listen as MediaQueryList["addEventListener"];
      }
      return mql;
    };
    try {
      run();
    } finally {
      win.matchMedia = original;
    }
  }
  function register(it: Interaction) {
    if (!it.conditionalPlayback?.length) {
      setupInteraction(it);
      return;
    }
    const mm = gsap.matchMedia();
    matchMedias.push(mm);
    const conds: Record<string, string> = {};
    for (const c of it.conditionalPlayback) {
      if (c.type === "breakpoint")
        for (const b of c.breakpoints) if (data.breakpoints[b]) conds[`breakpoint_${b}`] = data.breakpoints[b];
    }
    conds.fallback = "(min-width: 0px)";
    const hasLoad = it.triggers.some((t) => t.controlType === "load");
    let first = true;
    trackMediaListeners(() =>
      mm.add(conds, (ctx) => {
        if (hasLoad && !first) return false;
        first = false;
        const conditions = ctx.conditions ?? {};
        const matched = it.conditionalPlayback!.some(
          (c) => c.type === "breakpoint" && c.breakpoints.some((b) => conditions[`breakpoint_${b}`]),
        );
        if (!matched) setupInteraction(it); // when a listed breakpoint matches nothing is built or bound ("don't animate")
        return () => {
          // Same as the export's engine: destroying a timeline that was built (the interaction was active) also reverts every
          // split-text instance, because its split registry is global. Crossing a breakpoint therefore un-splits the headings
          // for good (they are not split again), and this port keeps that behaviour.
          const built = perInteractionCleanup.has(it.id);
          teardownInteraction(it.id);
          if (built) revertSplits();
        };
      }),
    );
  }

  // ------------------------------------------------------------------ register everything, then run load timelines
  for (const id of opts.ids) {
    const it = byId.get(id);
    if (it) register(it);
  }
  for (const f of loadQueue) f();
  loadQueue.length = 0;
  if (scrollTriggers.size > 0) {
    // body size changes refresh the scroll triggers once the viewport itself has been stable (resize handling)
    let w = win.innerWidth;
    let h = win.innerHeight;
    let pw = w;
    let ph = h;
    const debounce = (fn: () => void, ms: number, leading: boolean) => {
      let t: ReturnType<typeof setTimeout> | undefined;
      let called = false;
      return () => {
        if (leading && !called) {
          called = true;
          fn();
        }
        clearTimeout(t);
        t = setTimeout(() => {
          called = false;
          if (!leading) fn();
        }, ms);
      };
    };
    let rt: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        h = win.innerHeight;
        w = win.innerWidth;
      }, 200);
    };
    win.addEventListener("resize", onResize, { signal: ac.signal });
    const setPrev = debounce(
      () => {
        ph = h;
        pw = w;
      },
      210,
      true,
    );
    const check = debounce(
      () => {
        if (w === pw && h === ph) for (const st of scrollTriggers.values()) st.refresh();
      },
      210,
      false,
    );
    ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        if (e.target === doc.body) {
          setPrev();
          check();
        }
      }
    });
    if (doc.body) ro.observe(doc.body);
  }
  const readyClass = opts.readyClass ?? "motion-ready";
  if (readyClass) doc.documentElement.classList.add(readyClass); // last: from here on the pre-animation hidden state no longer applies

  return {
    timelines: () => subs.map((s) => s.tl),
    destroy() {
      ac.abort();
      ro?.disconnect();
      // order matters: timelines/triggers first, then breakpoint contexts, then split text, so nothing animates a reverted node
      for (const id of [...perInteractionCleanup.keys()]) teardownInteraction(id);
      for (const mm of matchMedias) mm.revert();
      for (const off of mediaListenerRemovers) off();
      mediaListenerRemovers.length = 0;
      for (const st of scrollTriggers.values()) st.kill();
      scrollTriggers.clear();
      revertSplits();
      if (readyClass) doc.documentElement.classList.remove(readyClass);
    },
  };
}
