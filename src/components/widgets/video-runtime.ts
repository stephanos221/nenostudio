/**
 * Behaviour of the background video (`BackgroundVideo` + `VideoControl`), attached after mount.
 *
 * The control shows one of two icon spans. "State A" hides the first span and shows the second, "state B" the
 * opposite. Rules, as on the original site:
 * - after mount the video is paused (autoplay is off), so the control is put into state A;
 * - a click on the control starts playback (state B) or pauses (state A); if the browser refuses to play the control
 *   falls back to state A;
 * - `prefers-reduced-motion: reduce` pauses the video and selects state A; when it stops matching, the controls
 *   go to state B and the video only resumes if it has the `autoplay` attribute.
 */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function showState(control: HTMLElement, state: "A" | "B"): void {
  Array.from(control.children).forEach((child, index) => {
    if (child instanceof HTMLElement && child.tagName === "SPAN") child.hidden = state === "A" ? index === 0 : index === 1;
  });
}

export function initBackgroundVideo(root: HTMLElement): () => void {
  const video = root.querySelector<HTMLVideoElement>("video");
  const controls = Array.from(root.querySelectorAll<HTMLElement>(".bg-video-control"));
  if (!video) return () => {};

  const cleanups: Array<() => void> = [];
  const initialHidden = controls.map((control) => Array.from(control.children).map((child) => (child as HTMLElement).hidden));

  const apply = (allowMotion: boolean) => {
    if (allowMotion && video.autoplay) void video.play().catch(() => undefined);
    else video.pause();
    for (const control of controls) showState(control, allowMotion ? "B" : "A");
  };

  const motionQuery = window.matchMedia(REDUCED_MOTION);
  const onMotionChange = (event: MediaQueryListEvent) => apply(!event.matches);
  motionQuery.addEventListener("change", onMotionChange);
  cleanups.push(() => motionQuery.removeEventListener("change", onMotionChange));
  if (motionQuery.matches) apply(false);

  if (!video.autoplay) for (const control of controls) showState(control, "A");

  for (const control of controls) {
    const onClick = () => {
      const target = control.getAttribute("aria-controls");
      const controlled = target ? root.querySelector<HTMLVideoElement>(`video[id="${CSS.escape(target)}"]`) : null;
      if (!controlled) return;
      if (controlled.paused) {
        const started = controlled.play();
        showState(control, "B");
        started.catch(() => showState(control, "A"));
      } else {
        controlled.pause();
        showState(control, "A");
      }
    };
    control.addEventListener("click", onClick);
    cleanups.push(() => control.removeEventListener("click", onClick));
  }

  return () => {
    cleanups.forEach((fn) => fn());
    video.pause();
    controls.forEach((control, i) =>
      Array.from(control.children).forEach((child, j) => {
        (child as HTMLElement).hidden = initialHidden[i][j];
      }),
    );
  };
}
