import type { ReactNode } from "react";
import { JournalIndexRow } from "@/components/ui/JournalIndexRow";
import type { JournalPost } from "@/data/types";

interface JournalIndexSectionProps {
  /** Rendered above the list, e.g. a `SectionHeader`. */
  header?: ReactNode;
  posts: JournalPost[];
  /** Element id of each row's content column (grid placement hook, differs per page). */
  contentId: string;
  /** Rendered below the list, e.g. a `FilterBar`. */
  footer?: ReactNode;
}

/** Full-width journal index: one row per post. */
export function JournalIndexSection({ header, posts, contentId, footer }: JournalIndexSectionProps) {
  return (
    <section id="live" data-screen-label="Journal index" className="section_index">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="section_content">
            {header}
            <div className="cms-list">
              <div role="list" className="journal-index_list cms-items">
                {posts.map((post) => (
                  <JournalIndexRow key={post.slug} post={post} contentId={contentId} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {footer}
    </section>
  );
}
