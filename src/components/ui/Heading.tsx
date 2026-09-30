import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface HeadingProps {
  as?: "h1" | "h2" | "h3";
  /** Type scale step; omit to inherit the size of the surrounding context. */
  size?: "h0" | "h1" | "h2" | "h3";
  /** Secondary text colour, for headings on dark surfaces. */
  light?: boolean;
  center?: boolean;
  inverse?: boolean;
  semibold?: boolean;
  children: ReactNode;
}

/** Display heading; carries the fade-in hook the motion layer targets. */
export function Heading({ as: Tag = "h2", size, light, center, inverse, semibold, children }: HeadingProps) {
  return (
    <Tag
      data-fade-action="heading"
      className={cx(
        "heading",
        light && "v-45f8c2ad",
        size && `heading-style-${size}`,
        center && "is-center",
        inverse && "is-inverse",
        semibold && "text-weight-semibold",
      )}
    >
      {children}
    </Tag>
  );
}
