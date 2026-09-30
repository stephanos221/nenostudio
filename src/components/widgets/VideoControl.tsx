import { cx } from "@/lib/cx";

/**
 * Play/pause toggle for a `BackgroundVideo`. Both icon spans are rendered; which one is visible is decided at runtime by
 * `initBackgroundVideo` (the server markup shows the first span, like the export before its scripts run).
 */
export function VideoControl({ videoId, className }: { videoId: string; className?: string }) {
  return (
    <button
      type="button"
      data-bg-video-control="true"
      aria-controls={videoId}
      className={cx("bg-video-playpause", className, "bg-video-control")}
    >
      <span>
        <img loading="lazy" alt="Play video" src="/assets/images/image-d2a56d38.svg" />
      </span>
      <span hidden>
        <img src="/assets/images/image-ad8afa9a.svg" loading="lazy" alt="Pause video" />
      </span>
    </button>
  );
}
