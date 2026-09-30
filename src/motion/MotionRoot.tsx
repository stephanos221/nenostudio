"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { cancelAnchorScroll, installAnchors } from "./anchors";
import { componentRoots, runnerData } from "./data/interactions.generated";
import { whenLoaded } from "./engine/boot";
import { interactionIdsFor } from "./engine/route-key";
import { initMotion, type Runner } from "./engine/runner";
import { loadGsap } from "./gsap";
import { createLenis, getLenis, setLenis } from "./lenis";

/**
 * A full page load starts with nothing focused and the next Tab going to the first focusable element of the page. On a soft
 * navigation the header and footer persist, so the link that was just clicked (or activated with the keyboard) would stay
 * focused, and even without focus the browser keeps the sequential focus navigation starting point at the clicked (or removed)
 * node: the next Tab would continue from the middle of the previous page. Drop the focus and move the starting point back to the
 * top of the document. Focus that moved into the new page (an autofocus field) stays.
 */
function resetFocusAfterNavigation() {
  const active = document.activeElement;
  if (active instanceof HTMLElement && active !== document.body) {
    if (!active.closest(".header, .footer")) return;
    active.blur();
  }
  const { body } = document;
  body.setAttribute("tabindex", "-1");
  body.focus({ preventScroll: true });
  body.removeAttribute("tabindex");
}

/**
 * Ends a smooth-scroll animation that is still running (wheel inertia, an eased jump) and forgets the old page's offsets. Left
 * alone it keeps writing its old position into the window scroll after the router has put the new page at the top, and the
 * new page would show up for a frame at the previous page's offset. (`stop()` followed by `start()` is Lenis's public way to
 * reset it.)
 */
function resetLenis() {
  const lenis = getLenis();
  if (!lenis) return;
  lenis.stop();
  lenis.start();
}

/**
 * ScrollTrigger's refresh scrolls to the top and back. Done at a non-zero offset (a hash link, back/forward with a restored
 * position) the browser delivers a scroll event without net movement right after one with movement, and Lenis treats that
 * as "the native scroll is still going on": `lenis-scrolling` then stays on <html> until the next scroll. A full page load
 * never gets there (its refresh runs before the position is restored). Once those events have been delivered, put Lenis
 * back to rest.
 */
function resetLenisAfterRefresh() {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis && lenis.isScrolling === "native" && lenis.velocity === 0) resetLenis();
    }),
  );
}

/** true once the motion layer has started in this document: every later start is a soft (client-side) navigation */
let booted = false;
/** pathname the motion layer was last started for (scroll reset only when the page really changed) */
let lastStartedPath: string | null = null;

/**
 * Mounted once in the root layout, as a sibling of the header/page tree, and renders nothing.
 *
 * - once: smooth scrolling (Lenis) and link handling (placeholder links, same-page hash scroll);
 * - per pathname: emulate a fresh page load. The previous page's motion is torn down (timelines, scroll triggers, text
 *   splits reverted; `motion-ready` removed so the pre-animation hidden state applies again), then, once the page has
 *   loaded, the route's interactions are registered and `motion-ready` is set.
 *
 * Idempotent under React strict mode (double-invoked effects) and Fast Refresh: every start is cancelled by its cleanup
 * and `destroy()` is safe to call on anything that was started.
 */
export default function MotionRoot() {
  const pathname = usePathname();
  const runnerRef = useRef<Runner | null>(null);

  // smooth scroll + anchors: one instance for the lifetime of the layout
  useEffect(() => {
    const uninstallAnchors = installAnchors();
    const lenis = createLenis();
    setLenis(lenis);
    return () => {
      uninstallAnchors();
      if (getLenis() === lenis) setLenis(null);
      lenis.destroy();
    };
  }, []);

  // teardown of the outgoing page: a layout-effect cleanup runs during the commit that swaps the page, before React
  // touches the old nodes, so split text is reverted first and React never reconciles a mutated subtree
  useLayoutEffect(
    () => () => {
      cancelAnchorScroll();
      resetLenis();
      runnerRef.current?.destroy();
      runnerRef.current = null;
    },
    [pathname],
  );

  // start of the incoming page
  useEffect(() => {
    let cancelled = false;
    const soft = booted;
    if (soft && lastStartedPath !== pathname) resetFocusAfterNavigation();
    void (async () => {
      try {
        const [kit] = await Promise.all([loadGsap(), whenLoaded(soft)]);
        if (cancelled) return;
        if (soft && lastStartedPath !== pathname && !location.hash) {
          // the router has already reset the scroll position; make smooth scrolling agree before positions are measured
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true });
            lenis.resize();
          }
        }
        const scrollBefore = window.scrollY;
        runnerRef.current = initMotion({
          gsap: kit.gsap,
          ScrollTrigger: kit.ScrollTrigger,
          SplitText: kit.SplitText,
          data: runnerData,
          ids: interactionIdsFor(pathname),
          componentRoots,
        });
        booted = true;
        lastStartedPath = pathname;
        if (soft) {
          kit.ScrollTrigger.refresh();
          // Tearing down the previous page's triggers made ScrollTrigger record the scroll position it restores after a
          // refresh(); a page without triggers of its own lets that stale value win and the page would jump back to the
          // old offset. Whatever the refresh did, the page stays where the router left it.
          if (Math.abs(window.scrollY - scrollBefore) > 1) {
            const lenis = getLenis();
            if (lenis) {
              lenis.resize(); // smooth scrolling has not seen the jump yet: sync it, or it would ignore a request for where it thinks it is
              lenis.scrollTo(scrollBefore, { immediate: true, force: true });
            } else window.scrollTo({ top: scrollBefore, left: 0, behavior: "instant" });
          }
          if (window.scrollY !== 0) resetLenisAfterRefresh();
        }
      } catch (err) {
        // never leave the page in its pre-animation hidden state
        console.error("motion failed to start", err);
        document.documentElement.classList.add("motion-ready");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
