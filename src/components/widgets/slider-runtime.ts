/**
 * Behaviour of the slide carousel (`Slider`): a plain DOM controller that is attached after mount.
 *
 * The server renders the static markup and React never re-renders the nodes touched here, so everything
 * below is imperative on purpose (slide transforms, arrow visibility, aria state, dots, live region).
 * `initSlider()` returns a cleanup that removes listeners and restores every attribute it wrote.
 *
 * Supported configuration (data attributes of the root): `data-animation="slide"`, `data-easing`,
 * `data-duration`, `data-infinite`, `data-hide-arrows`, `data-nav-spacing`. Autoplay and swipe are off
 * on this site (`data-autoplay="false"`, `data-disable-swipe="true"`) and are not implemented.
 */

interface Anchor {
  els: HTMLElement[];
  x: number;
  width: number;
}

interface Config {
  easing: string;
  duration: number;
  infinite: boolean;
  hideArrows: boolean;
  /** Distance from the mask's right edge within which a slide starts the next page. */
  edge: number;
  navSpacing: string | null;
}

interface Wrap {
  x: number;
  from: number;
  to: number;
}

const KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32, ENTER: 13, HOME: 36, END: 35 } as const;

const FOCUSABLE =
  'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';

const isTrue = (value: string | null): boolean => value === "1" || value === "true";

/** Content-box width (fractional), like the layout engine reports it. */
function contentWidth(el: HTMLElement): number {
  const style = getComputedStyle(el);
  const width = parseFloat(style.width);
  if (Number.isNaN(width)) return el.getBoundingClientRect().width;
  if (style.boxSizing !== "border-box") return width;
  const inset = ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"] as const;
  return width - inset.reduce((sum, key) => sum + (parseFloat(style[key]) || 0), 0);
}

/** Border-box width (from the computed style, so fractional) including horizontal margins. */
function outerWidthWithMargins(el: HTMLElement): number {
  const style = getComputedStyle(el);
  const px = (value: string) => parseFloat(value) || 0;
  const width = parseFloat(style.width);
  if (Number.isNaN(width)) return el.getBoundingClientRect().width + px(style.marginLeft) + px(style.marginRight);
  const inset =
    style.boxSizing === "border-box"
      ? 0
      : px(style.paddingLeft) + px(style.paddingRight) + px(style.borderLeftWidth) + px(style.borderRightWidth);
  return width + inset + px(style.marginLeft) + px(style.marginRight);
}

const isRendered = (el: HTMLElement): boolean => Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);

/** Sets `name` on `el` (null removes it), remembering the first value so it can be restored. */
class AttributeLog {
  private readonly original = new Map<Element, Map<string, string | null>>();

  set(el: Element, name: string, value: string | null): void {
    this.remember(el, name);
    if (value === null) el.removeAttribute(name);
    else el.setAttribute(name, value);
  }

  remember(el: Element, name: string): void {
    let names = this.original.get(el);
    if (!names) this.original.set(el, (names = new Map()));
    if (!names.has(name)) names.set(name, el.getAttribute(name));
  }

  restore(): void {
    for (const [el, names] of this.original) {
      for (const [name, value] of names) {
        if (value === null) el.removeAttribute(name);
        else el.setAttribute(name, value);
      }
    }
    this.original.clear();
  }
}

export function initSlider(root: HTMLElement, instanceIndex: number): () => void {
  const parts = {
    mask: root.querySelector<HTMLElement>(":scope > .slider-mask"),
    left: root.querySelector<HTMLElement>(":scope > .slider-arrow-left"),
    right: root.querySelector<HTMLElement>(":scope > .slider-arrow-right"),
  };
  if (!parts.mask || !parts.left || !parts.right) return () => {};
  const { mask, left, right } = parts as { [K in keyof typeof parts]: HTMLElement };
  const nav = root.querySelector<HTMLElement>(":scope > .slider-nav");
  const slides = Array.from(mask.querySelectorAll<HTMLElement>(":scope > .slider-slide"));
  if (slides.length === 0) return () => {};

  const log = new AttributeLog();
  const cleanups: Array<() => void> = [];
  const config = readConfig(root, right);

  const state = {
    index: 0,
    previous: 0,
    offsetX: 0,
    maskWidth: -1,
    endX: 0,
    pages: 0,
    anchors: [] as Anchor[],
    shifted: [] as HTMLElement[],
    hasFocus: { keyboard: false, mouse: false },
  };

  // ---- static accessibility wiring (applied once)
  if (!root.hasAttribute("role")) log.set(root, "role", "region");
  if (!root.hasAttribute("aria-label")) log.set(root, "aria-label", "carousel");

  let maskId = mask.getAttribute("id");
  if (!maskId) {
    maskId = `slider-mask-${instanceIndex}`;
    log.set(mask, "id", maskId);
  }

  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "off");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.className = "slider-aria-label";
  mask.appendChild(liveRegion);
  cleanups.push(() => liveRegion.remove());

  for (const [arrow, label] of [
    [left, "previous slide"],
    [right, "next slide"],
  ] as const) {
    log.set(arrow, "role", "button");
    log.set(arrow, "tabindex", "0");
    log.set(arrow, "aria-controls", maskId);
    if (!arrow.hasAttribute("aria-label")) log.set(arrow, "aria-label", label);
    log.remember(arrow, "style");
  }
  for (const slide of slides) {
    log.remember(slide, "style");
    slide.style.transition = "all";
  }

  // ---- listeners
  const listen = <T extends EventTarget>(target: T, type: string, handler: (event: never) => void) => {
    target.addEventListener(type, handler as EventListener);
    cleanups.push(() => target.removeEventListener(type, handler as EventListener));
  };

  const goPrevious = () => move({ index: state.index - 1 });
  const goNext = () => move({ index: state.index + 1 });
  const arrowKey = (action: () => void) => (event: KeyboardEvent) => {
    if (event.keyCode === KEY.SPACE || event.keyCode === KEY.ENTER) {
      action();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  listen(left, "click", goPrevious);
  listen(right, "click", goNext);
  listen(left, "keydown", arrowKey(goPrevious));
  listen(right, "keydown", arrowKey(goNext));

  if (nav) {
    const dotIndex = (event: Event): number =>
      Array.from(nav.children).findIndex((dot) => dot.contains(event.target as Node | null));
    listen(nav, "click", (event: MouseEvent) => {
      const index = dotIndex(event);
      if (index >= 0) move({ index });
    });
    listen(nav, "keydown", (event: KeyboardEvent) => {
      const index = dotIndex(event);
      if (index < 0) return;
      switch (event.keyCode) {
        case KEY.ENTER:
        case KEY.SPACE:
          move({ index });
          break;
        case KEY.LEFT:
        case KEY.UP:
          focusDot(Math.max(index - 1, 0));
          break;
        case KEY.RIGHT:
        case KEY.DOWN:
          focusDot(Math.min(index + 1, state.pages));
          break;
        case KEY.HOME:
          focusDot(0);
          break;
        case KEY.END:
          focusDot(state.pages);
          break;
        default:
          return;
      }
      event.preventDefault();
    });
  }

  const trackFocus = (kind: "mouse" | "keyboard", active: boolean) => (event: Event) => {
    if (active) {
      state.hasFocus[kind] = true;
    } else {
      const next = (event as FocusEvent | MouseEvent).relatedTarget as Node | null;
      if (next && root.contains(next)) return;
      state.hasFocus[kind] = false;
      if ((state.hasFocus.mouse && kind === "keyboard") || (state.hasFocus.keyboard && kind === "mouse")) return;
    }
    liveRegion.setAttribute("aria-live", active ? "polite" : "off");
  };
  listen(root, "mouseenter", trackFocus("mouse", true));
  listen(root, "focusin", trackFocus("keyboard", true));
  listen(root, "mouseleave", trackFocus("mouse", false));
  listen(root, "focusout", trackFocus("keyboard", false));

  // ---- pending frame callbacks (started transitions), cancelled on cleanup
  const frames = new Set<number>();
  const nextFrame = (fn: () => void) => {
    const id = requestAnimationFrame(() => {
      frames.delete(id);
      fn();
    });
    frames.add(id);
  };
  cleanups.push(() => {
    frames.forEach((id) => cancelAnimationFrame(id));
    frames.clear();
  });

  // ---- slide styling helpers
  /** Jumps to `x` without animating (and drops any running or configured transition). */
  const snapTo = (els: Iterable<HTMLElement>, x: number, visibility?: string) => {
    for (const el of els) {
      el.style.transition = "all";
      el.style.transform = `translateX(${x}px)`;
      el.style.opacity = "1";
      if (visibility !== undefined) el.style.visibility = visibility;
    }
  };
  const startTransition = (els: HTMLElement[], x: number) => {
    const transition = `all, transform ${Math.round(config.duration)}ms${config.easing === "ease" ? "" : ` ${config.easing}`}`;
    for (const el of els) el.style.transition = transition;
    nextFrame(() => {
      for (const el of els) el.style.transform = `translateX(${x}px)`;
    });
  };
  /** Reading a layout property makes the browser apply pending style changes before the next write. */
  const flush = (els: HTMLElement[]) => void els[0]?.offsetHeight;

  function focusDot(index: number) {
    (nav?.children[index] as HTMLElement | undefined)?.focus();
  }

  // ---- movement
  function move({ index, immediate = false }: { index: number; immediate?: boolean }) {
    const { anchors } = state;
    state.previous = state.index;
    const wrap: Partial<Wrap> = {};
    if (index < 0) {
      index = anchors.length - 1;
      if (config.infinite) Object.assign(wrap, { x: -state.endX, from: 0, to: anchors[0].width });
    } else if (index >= anchors.length) {
      index = 0;
      if (config.infinite) {
        const last = anchors[anchors.length - 1];
        Object.assign(wrap, { x: last.width, from: -last.x, to: -last.x - last.width });
      }
    }
    state.index = index;

    if (nav) {
      Array.from(nav.children).forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-pressed", String(active));
        dot.setAttribute("tabindex", active ? "0" : "-1");
      });
    }
    if (config.hideArrows) {
      setDisplayNone(right, state.index === anchors.length - 1);
      setDisplayNone(left, state.index === 0);
    }

    const previousOffset = state.offsetX;
    const offset = (state.offsetX = -anchors[index].x);
    const active = anchors[index].els;
    const previousEls = anchors[state.previous]?.els ?? [];
    const inactive = slides.filter((slide) => !active.includes(slide));

    for (const slide of active) setAriaHidden(slide, false);
    for (const slide of inactive) setAriaHidden(slide, true);

    if (immediate) {
      snapTo(active, offset, "");
      snapTo(inactive, offset, "");
      return;
    }
    if (state.index === state.previous) return;

    liveRegion.textContent = `Slide ${index + 1} of ${anchors.length}.`;

    if (config.infinite && wrap.x !== undefined) {
      const others = slides.filter((slide) => !previousEls.includes(slide));
      snapTo(others, wrap.x, "");
      snapTo(previousEls, wrap.from ?? 0, "");
      flush(slides);
      startTransition(others, offset);
      startTransition(previousEls, wrap.to ?? 0);
      state.shifted = previousEls;
      return;
    }
    if (config.infinite && state.shifted.length) {
      snapTo(state.shifted, previousOffset, "");
      state.shifted = [];
      flush(slides);
    }
    for (const slide of slides) slide.style.visibility = "";
    startTransition(slides, offset);
  }

  function setAriaHidden(slide: HTMLElement, hidden: boolean) {
    const nodes = [slide, ...Array.from(slide.querySelectorAll<HTMLElement>("*"))];
    for (const node of nodes) log.set(node, "aria-hidden", hidden ? "true" : null);
    for (const node of slide.querySelectorAll<HTMLElement>(FOCUSABLE)) log.set(node, "tabindex", hidden ? "-1" : null);
  }

  function setDisplayNone(el: HTMLElement, hidden: boolean) {
    if (hidden) {
      el.style.display = "none";
    } else {
      el.style.removeProperty("display");
      if (!el.getAttribute("style")) el.removeAttribute("style");
    }
  }

  // ---- layout
  function layout() {
    const threshold = Math.max(0, state.maskWidth - config.edge);
    let pageCount = 1;
    let accumulated = 0;
    let x = 0;
    state.anchors = [{ els: [], x: 0, width: 0 }];
    slides.forEach((slide, i) => {
      if (x - accumulated > threshold) {
        pageCount++;
        accumulated += state.maskWidth;
        state.anchors[pageCount - 1] = { els: [], x, width: 0 };
      }
      const width = outerWidthWithMargins(slide);
      x += width;
      state.anchors[pageCount - 1].width += width;
      state.anchors[pageCount - 1].els.push(slide);
      log.set(slide, "aria-label", `${i + 1} of ${slides.length}`);
      log.set(slide, "role", "group");
    });
    state.endX = x;

    if (nav && state.pages !== pageCount) {
      state.pages = pageCount;
      buildDots(pageCount);
    }
    move({ index: Math.min(state.index, pageCount - 1), immediate: true });
  }

  function buildDots(count: number) {
    const spacing = config.navSpacing ? `${parseFloat(config.navSpacing)}px` : null;
    const dots: HTMLElement[] = [];
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.className = "slider-dot";
      dot.setAttribute("aria-label", `Show slide ${i + 1} of ${count}`);
      dot.setAttribute("aria-pressed", "false");
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "-1");
      if (spacing !== null) {
        dot.style.marginLeft = spacing;
        dot.style.marginRight = spacing;
      }
      dots.push(dot);
    }
    nav?.replaceChildren(...dots);
  }

  /** Re-measures when the mask width changed (window resize, breakpoint change). */
  function refresh() {
    if (!isRendered(root)) return;
    const width = contentWidth(mask);
    if (state.maskWidth === width) return;
    state.maskWidth = width;
    layout();
  }

  // Sliders inside hidden containers are measured while temporarily shown.
  {
    const hiddenEls: HTMLElement[] = [];
    for (let el: HTMLElement | null = root; el; el = el.parentElement) if (!isRendered(el)) hiddenEls.push(el);
    for (const el of hiddenEls) el.classList.add("slider-force-show");
    state.maskWidth = contentWidth(mask);
    layout();
    for (const el of hiddenEls) el.classList.remove("slider-force-show");
  }

  let resizeFrame = 0;
  const onResize = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(refresh);
  };
  listen(window, "resize", onResize);
  listen(window, "orientationchange", onResize);
  listen(window, "load", onResize);
  cleanups.push(() => cancelAnimationFrame(resizeFrame));

  return () => {
    cleanups.forEach((fn) => fn());
    nav?.replaceChildren();
    log.restore();
  };
}

function readConfig(root: HTMLElement, right: HTMLElement): Config {
  const duration = root.getAttribute("data-duration");
  const arrowWidth = parseFloat(getComputedStyle(right).width);
  return {
    easing: root.getAttribute("data-easing") || "ease",
    duration: duration !== null ? parseInt(duration, 10) : 500,
    infinite: isTrue(root.getAttribute("data-infinite")),
    hideArrows: isTrue(root.getAttribute("data-hide-arrows")),
    edge: arrowWidth ? arrowWidth + 40 : 100,
    navSpacing: root.getAttribute("data-nav-spacing"),
  };
}
