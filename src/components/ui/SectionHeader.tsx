import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface SectionHeaderProps {
  center?: boolean;
  /** Wraps the children in the heading container (default). Turn off for label + heading stacks. */
  wrap?: boolean;
  /** Caption lines shown on the right. */
  meta?: ReactNode[];
  children: ReactNode;
}

/** Section title row: heading on the left, optional caption lines on the right. */
export function SectionHeader({ center, wrap = true, meta, children }: SectionHeaderProps) {
  return (
    <div className={cx("section_header", center && "is-center")}>
      {wrap ? <div className="heading-container">{children}</div> : children}
      {meta && (
        <div className="section_meta">
          {meta.map((line, index) => (
            <div key={index} className="section_meta-text">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
