"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { initSlider } from "./slider-runtime";

interface SliderProps {
  /** Class prefix of the slider parts (`services_slider-mask`, `testimonial_slider-mask`, ...). */
  prefix: "services" | "testimonial";
  /** The `slider-slide` elements. */
  children: ReactNode;
}

const ARROW_LEFT = "/assets/images/image-7f6af13e.svg";
const ARROW_RIGHT = "/assets/images/image-a514e8fb.svg";

/**
 * Slide carousel: mask with slides, two arrows and a dot navigation.
 *
 * The server markup is the plain shell. After mount `initSlider` wires the behaviour (layout, arrows, dots, aria state)
 * imperatively; none of the nodes it touches carries React-controlled `style`/`aria-*` props, so re-renders leave the
 * runtime state alone.
 */
export function Slider({ prefix, children }: SliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const instance = Array.from(document.querySelectorAll(".slider")).indexOf(root);
    return initSlider(root, Math.max(instance, 0));
  }, []);

  return (
    <div
      ref={rootRef}
      data-delay="4000"
      data-animation="slide"
      className={`${prefix}_slider slider`}
      data-autoplay="false"
      data-easing="ease"
      data-hide-arrows="true"
      data-disable-swipe="true"
      data-autoplay-limit="0"
      data-nav-spacing="3"
      data-duration="500"
      data-infinite="true"
    >
      <div className={`${prefix}_slider-mask slider-mask`}>{children}</div>
      <SliderArrow prefix={prefix} side="left" src={ARROW_LEFT} />
      <SliderArrow prefix={prefix} side="right" src={ARROW_RIGHT} />
      {/* The services slider carries the testimonial class as well: the stylesheet only defines this one. */}
      <div className="testimonial_slider-nav slider-nav is-round" />
    </div>
  );
}

function SliderArrow({ prefix, side, src }: { prefix: string; side: "left" | "right"; src: string }) {
  return (
    <div className={`${prefix}_slider-arrow_${side} slider-arrow-${side}`}>
      <div className={`${prefix}_slider-arrow_icon`}>
        <img src={src} loading="lazy" alt="" className={`${prefix}_slider-arrow_image`} />
      </div>
    </div>
  );
}
