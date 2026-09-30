import { categories } from "@/data/categories";
import { journalCategories } from "@/data/journal-categories";
import type { LinkItem } from "@/data/types";
import { NavLink } from "./NavLink";

interface FilterBarProps {
  all: LinkItem;
  links: LinkItem[];
  /** `work` (default) uses the class hooks on the labels and track; `journal` renders bare labels. */
  variant?: "work" | "journal";
}

/** Category filter: an "all" pill followed by one pill per category. */
function FilterBar({ all, links, variant = "work" }: FilterBarProps) {
  const work = variant === "work";

  return (
    <div data-work-filter="1" className="filter_wrap">
      <div className="filter_bar">
        <FilterButton link={all} work={work} />
        <div className={work ? "filter_track cms-list" : "cms-list"}>
          <div role="list" className="filter_list cms-items">
            {links.map((link) => (
              <div key={link.href} role="listitem" className="cms-item">
                <FilterButton link={link} work={work} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Filter of the work pages: all work, then one pill per work category. */
export function WorkFilter() {
  return (
    <FilterBar
      all={{ label: "All work", href: "/work" }}
      links={categories.map(({ slug, label }) => ({ label, href: `/categories/${slug}` }))}
    />
  );
}

/** Filter of the journal pages. As designed, its first pill reads "All work" although it links to the whole journal. */
export function JournalFilter() {
  return (
    <FilterBar
      variant="journal"
      all={{ label: "All work", href: "/journal" }}
      links={journalCategories.map(({ slug, label }) => ({ label, href: `/journal-categories/${slug}` }))}
    />
  );
}

function FilterButton({ link, work }: { link: LinkItem; work: boolean }) {
  return (
    <NavLink href={link.href} className="filter_btn u-inline-block">
      <div className={work ? "filter_btn-text" : undefined}>{link.label}</div>
    </NavLink>
  );
}
