import { categoryLabel } from "@/data/categories";
import type { WorkItem } from "@/data/types";
import { ArrowUpRightIcon } from "./icons";
import { NavLink } from "./NavLink";

interface WorkCardProps {
  item: WorkItem;
  /** Heading level of the client name. */
  headingLevel?: 2 | 3;
  /** Adds the scroll-reveal hook (home page selection). */
  reveal?: boolean;
}

/** Case study card: cover image with a hover panel. */
export function WorkCard({ item, headingLevel = 3, reveal }: WorkCardProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <NavLink
      data-fade-action={reveal ? "work-card" : undefined}
      data-hover-animation="image-scale-trigger"
      href={`/work/${item.slug}`}
      className="work_card u-inline-block"
    >
      <img src={item.cover} loading="lazy" data-hover-animation="image-scale-target" alt="" className="work_card-img" />
      <div data-work-panel="1" className="work_panel">
        <div data-work-row="1" className="work_panel-row">
          <Heading className="work_client">{item.client}</Heading>
          <div className="work_meta-stack">
            <div>{item.year}</div>
            <div data-work-tag="1">{categoryLabel(item.category)}</div>
          </div>
        </div>
        <div data-work-cta="1" className="work_cta-wrap">
          <div className="work_link">
            <div className="work_link-text">Discover case</div>
            <div className="work_link-icon u-embed">
              <ArrowUpRightIcon />
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
