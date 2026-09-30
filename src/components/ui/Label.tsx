import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface LabelProps {
  /** `small`: tertiary colour, extra-small size. `light`: secondary colour. */
  variant?: "small" | "light";
  children: ReactNode;
}

/** Uppercase mono caption. */
export function Label({ variant, children }: LabelProps) {
  return (
    <div className={cx("label-mono", variant === "small" && "v-e74df528", variant === "light" && "v-daa7ce05")}>
      {children}
    </div>
  );
}
