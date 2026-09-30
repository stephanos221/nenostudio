"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { initBackgroundVideo } from "./video-runtime";

interface BackgroundVideoProps {
  /** Element id of the `video`, referenced by the play/pause control. */
  id: string;
  poster: string;
  /** Sources in order of preference. */
  sources: string[];
  className?: string;
  /** Overlay content, e.g. the `VideoControl`. */
  children?: ReactNode;
}

/**
 * Muted looping video that fills its frame, with the poster as fallback background.
 * After mount the play/pause control is wired to the video (see `video-runtime.ts`).
 */
export function BackgroundVideo({ id, poster, sources, className, children }: BackgroundVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    return root ? initBackgroundVideo(root) : undefined;
  }, []);

  return (
    <div
      ref={rootRef}
      data-poster-url={poster}
      data-video-urls={sources.join(",")}
      data-autoplay="false"
      data-loop="true"
      className={cx(className, "bg-video bg-video-atom")}
    >
      <video
        id={id}
        loop
        style={{ backgroundImage: `url("${poster}")` }}
        muted
        playsInline
        data-object-fit="cover"
      >
        {sources.map((src) => (
          <source key={src} src={src} />
        ))}
      </video>
      {children}
    </div>
  );
}
