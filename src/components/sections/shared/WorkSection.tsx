import type { ReactNode } from "react";
import { WorkCard } from "@/components/ui/WorkCard";
import type { WorkItem } from "@/data/types";
import { cx } from "@/lib/cx";

interface WorkSectionProps {
  items: WorkItem[];
  /** Element id repeated on every grid cell (grid placement hook, differs per page). */
  cellId: string;
  headingLevel?: 2 | 3;
  /** Home-page treatment: section spacing and scroll-reveal hooks on the cards. */
  featured?: boolean;
  /** Rendered above the grid, e.g. a `SectionHeader`. */
  header?: ReactNode;
  /** Rendered below the grid, e.g. a `FilterBar`. */
  footer?: ReactNode;
}

/** Grid of case study cards. */
export function WorkSection({ items, cellId, headingLevel, featured, header, footer }: WorkSectionProps) {
  return (
    <section id="work" data-screen-label="Selected work" className="section_work">
      <div className={cx("padding-global", featured && "padding-section is-work")}>
        <div className="container-max">
          <div className="section_content">
            {header}
            <div className="work_list cms-list">
              <div role="list" className="work_grid cms-items">
                {items.map((item) => (
                  <div key={item.slug} id={cellId} role="listitem" className="work_cell cms-item">
                    <WorkCard item={item} headingLevel={headingLevel} reveal={featured} />
                  </div>
                ))}
              </div>
            </div>
            {footer}
          </div>
        </div>
      </div>
    </section>
  );
}
