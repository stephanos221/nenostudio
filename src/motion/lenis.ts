/**
 * Smooth scrolling. One Lenis instance drives the real window scroll (its own animation-frame loop, no ScrollTrigger
 * sync): scroll triggers just see native scroll events.
 * Browser-only (the instance is only ever constructed from an effect).
 */
import Lenis from "lenis";

let instance: Lenis | null = null;

/**
 * Constructs the instance. Synchronous on purpose: the effect that calls it owns the instance from the moment it exists,
 * so that effect's cleanup (which strict mode runs straight after the effect, before any promise callback could) always
 * has something to destroy. Constructed after a delay, an instance whose effect had already been cleaned up would never be
 * destroyed and would go on driving the scroll next to its replacement.
 */
export function createLenis(): Lenis {
  return new Lenis({ autoRaf: true });
}

/** the live instance (set by MotionRoot), if any */
export const getLenis = (): Lenis | null => instance;
export const setLenis = (l: Lenis | null): void => {
  instance = l;
};
