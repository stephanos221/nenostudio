/**
 * Link behaviour handled once at the document level (capture phase, so it runs before any framework link handler):
 *
 * 1. `a[href="#"]` - placeholder links: the click is cancelled (no jump to the top, no `#` added to the URL).
 * 2. Same-page hash links (`a[href*="#"]` resolving to the current page, hash matching /^#[a-zA-Z0-9][\w:.-]*$/, target
 *    element present): the click is cancelled, the hash is pushed to the history (once) and the page is scrolled with a
 *    custom eased animation to the target minus the height of the fixed header; the target then receives focus.
 *    Hash links to other pages are left to the browser / router.
 * 3. Links to the page being viewed (same path and query, no hash): a full document load, like the original site, where
 *    such a click reloads the page (back to the top, every animation replays). The router would treat it as a no-op.
 *
 * Scroll animation (identical to the site's original behaviour):
 *   duration  = (472.143 * ln(|end - start| + 125) - 2000) * k   ms   (0 when the user prefers reduced motion)
 *               k = 1, or the last numeric `data-scroll-time` found on <body> / the target
 *   position  = start + (end - start) * easeInOutCubic(elapsed / duration), written with `window.scroll` every frame
 *   end       = target document offset - fixed header height (`header, body > .header`, only when position: fixed)
 *               (`data-scroll="mid"` on the target centres it in the remaining viewport)
 *
 * Browser-only. `installAnchors()` returns the uninstall function.
 */
const HASH = /^#[a-zA-Z0-9][\w:.-]*$/;
const FOCUS_CLASS = "anchor-focus";
const HEADER_SELECTOR = "header, body > .header";

const easeInOutCubic = (c: number) => (c < 0.5 ? 4 * c * c * c : (c - 1) * (2 * c - 2) * (2 * c - 2) + 1);

/** fractional border-box height (the header is 54.5 px tall; `offsetHeight` would round it to 55) */
const boxHeight = (el: HTMLElement): number => el.getBoundingClientRect().height;

function headerOffset(): number {
  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
  return header && getComputedStyle(header).position === "fixed" ? boxHeight(header) : 0;
}

function targetTop(target: HTMLElement): number {
  let top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
  if (target.dataset.scroll === "mid") {
    const room = document.documentElement.clientHeight - headerOffset();
    const h = boxHeight(target);
    if (h < room) top -= Math.round((room - h) / 2);
  }
  return top;
}

function scrollDuration(target: HTMLElement, from: number, to: number): number {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  let k = 1;
  for (const el of [document.body, target]) {
    const n = parseFloat(el.getAttribute("data-scroll-time") ?? "");
    if (!isNaN(n) && n >= 0) k = n;
  }
  return (472.143 * Math.log(Math.abs(from - to) + 125) - 2000) * k;
}

/** focus the target without scrolling; it is made focusable only for the duration of the call */
function focusTarget(target: HTMLElement) {
  const prev = target.getAttribute("tabindex");
  const swap = "data-tabindex-swap";
  if (prev) target.setAttribute(swap, prev);
  else target.setAttribute("tabindex", "-1");
  target.classList.add(FOCUS_CLASS);
  target.focus({ preventScroll: true });
  const saved = target.getAttribute(swap);
  if (saved) {
    target.setAttribute("tabindex", saved);
    target.removeAttribute(swap);
  } else target.removeAttribute("tabindex");
  target.classList.remove(FOCUS_CLASS);
}

/** bumped by `cancelAnchorScroll`: an animation started under an older value stops at its next frame */
let scrollEpoch = 0;

/**
 * Stops a running anchor scroll. A full document load ends it by discarding the page; with client-side navigation the old
 * page is swapped out under it, and the animation would go on scrolling the new page towards the old target's offset.
 */
export function cancelAnchorScroll() {
  scrollEpoch++;
}

function scrollToTarget(target: HTMLElement) {
  const start = window.scrollY;
  const end = targetTop(target);
  if (start === end) return;
  const duration = scrollDuration(target, start, end);
  const epoch = scrollEpoch;
  const t0 = Date.now();
  const frame = () => {
    if (epoch !== scrollEpoch || !target.isConnected) return;
    const elapsed = Date.now() - t0;
    const done = elapsed >= duration; // (>= also covers duration 0 without dividing by zero)
    window.scroll(0, done ? end : start + (end - start) * easeInOutCubic(elapsed / duration));
    if (!done) requestAnimationFrame(frame);
    else focusTarget(target);
  };
  requestAnimationFrame(frame);
}

function reloadIfCurrentPage(e: MouseEvent, a: HTMLAnchorElement | null): boolean {
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if ((a.target && a.target !== "_self") || a.hasAttribute("download") || a.getAttribute("href")?.includes("#")) return false;
  if (a.origin !== location.origin || a.pathname !== location.pathname || a.search !== location.search) return false;
  e.preventDefault();
  e.stopPropagation();
  location.assign(a.href);
  return true;
}

function onClick(e: MouseEvent) {
  if (!(e.target instanceof Element)) return;
  if (reloadIfCurrentPage(e, e.target.closest<HTMLAnchorElement>("a[href]"))) return;
  const a = e.target.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!a) return;

  if (a.getAttribute("href") === "#") {
    e.preventDefault();
    return;
  }
  const hash = HASH.test(a.hash) && a.host + a.pathname === location.host + location.pathname ? a.hash : "";
  if (!hash) return;
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  e.preventDefault();
  e.stopPropagation();
  if (location.hash !== hash && (history.state?.hash ?? undefined) !== hash) history.pushState({ hash }, "", hash);
  window.setTimeout(() => scrollToTarget(target), 0);
}

export function installAnchors(): () => void {
  const style = document.createElement("style");
  style.textContent = `.${FOCUS_CLASS}[tabindex="-1"]:focus{outline:none;}`;
  document.head.insertBefore(style, document.head.firstChild);
  document.addEventListener("click", onClick, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    style.remove();
  };
}
