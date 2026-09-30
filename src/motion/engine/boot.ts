/**
 * Resolves when the page is ready for the motion layer to measure it.
 *
 * - Hard load (`soft = false`): the window `load` event (immediately if it already fired), like a plain document.
 *   Un-hiding earlier would show a layout that jumps once images decode and scroll positions are computed.
 * - Soft navigation (`soft = true`): there is no `load` event, so wait for the fonts and for every eager image that is
 *   not complete yet (lazy images are excluded, exactly like `load`), capped by `SOFT_TIMEOUT_MS` so a stalled request
 *   can never leave the page in its pre-animation hidden state.
 *
 * Browser-only.
 */
const SOFT_TIMEOUT_MS = 3000;

export function whenLoaded(soft: boolean): Promise<void> {
  if (!soft) {
    return new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
  }
  const pending: Promise<unknown>[] = [document.fonts.ready];
  for (const img of document.images) {
    if (img.loading === "lazy" || img.complete) continue;
    pending.push(img.decode().catch(() => undefined));
  }
  const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, SOFT_TIMEOUT_MS));
  return Promise.race([Promise.all(pending).then(() => undefined), timeout]);
}
