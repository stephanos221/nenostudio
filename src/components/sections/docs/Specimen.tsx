import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Columns = 1 | 2 | 3;

/** Grid of specimens. */
export function SpecimenGrid({ columns, children }: { columns: Columns; children: ReactNode }) {
  return <div className={`sg_grid-${columns}col`}>{children}</div>;
}

interface SpecimenGroupProps {
  columns: Columns;
  /** Sub-heading above the grid. */
  title?: string;
  children: ReactNode;
}

/** Grid of specimens with an optional sub-heading. */
export function SpecimenGroup({ columns, title, children }: SpecimenGroupProps) {
  return (
    <div className="sg_item-wrapper">
      {title && (
        <div className="sg_item-header">
          <h3>{title}</h3>
        </div>
      )}
      <SpecimenGrid columns={columns}>{children}</SpecimenGrid>
    </div>
  );
}

interface SpecimenProps {
  label: string;
  /** Caption style: `tag` names an HTML element, `component` a component. */
  labelKind?: "tag" | "component";
  /** Id of the grid item. */
  id?: string;
  /** Id of the caption. */
  labelId?: string;
  stretch?: boolean;
  children: ReactNode;
}

/** Captioned example. */
export function Specimen({ label, labelKind, id, labelId, stretch, children }: SpecimenProps) {
  return (
    <div id={id} className={cx("sg_grid-item", stretch && "is-stretch")}>
      <div id={labelId} className={cx("sg_label", labelKind && `is-${labelKind}`)}>
        {label}
      </div>
      {children}
    </div>
  );
}
