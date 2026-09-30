/**
 * GSAP kit (core + ScrollTrigger + SplitText). The three modules are imported statically on purpose: they then ship in
 * the same chunk wave as the page's other client code and are already downloaded and evaluated when hydration finishes,
 * so the motion layer can start the moment the page is hydrated instead of first fetching three more chunks (an extra
 * request round trip on the critical path of every page's first animation). They are plain library modules that only
 * touch `window` when a plugin is registered, which happens once, in the browser, in `loadGsap()`.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export interface GsapKit {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  SplitText: typeof SplitText;
}

let kit: GsapKit | null = null;

/** Registers the plugins (once) and returns the kit. Browser-only. */
export function loadGsap(): Promise<GsapKit> {
  if (typeof window === "undefined") return Promise.reject(new Error("loadGsap() is browser-only"));
  if (!kit) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    kit = { gsap, ScrollTrigger, SplitText };
  }
  return Promise.resolve(kit);
}
