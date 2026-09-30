import type { ReactNode } from "react";
import { JournalCard } from "@/components/ui/JournalCard";
import { JournalIndexRow } from "@/components/ui/JournalIndexRow";
import type { JournalPost } from "@/data/types";

interface MoreJournalSectionProps {
  /** Rendered above the cards, e.g. a `SectionHeader`. */
  header?: ReactNode;
  /** Large cards. */
  posts: JournalPost[];
  /** Adds the index list beside the cards; `contentId` is the element id of each row's content column. */
  index?: { posts: JournalPost[]; contentId: string };
}

/** Featured journal cards, optionally with the compact index next to them. */
export function MoreJournalSection({ header, posts, index }: MoreJournalSectionProps) {
  return (
    <section id="journal" data-screen-label="Journal" className="section_more-journal">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="section_content">
            {header}
            <div className="journal_wrapper">
              <div className="cms-list">
                <div role="list" className="journal_grid cms-items">
                  {posts.map((post) => (
                    <div key={post.slug} role="listitem" className="journal_cell cms-item">
                      <JournalCard post={post} />
                    </div>
                  ))}
                </div>
              </div>
              {index && (
                <div className="journal_split">
                  <div className="cms-list">
                    <div role="list" className="journal-index_list cms-items">
                      {index.posts.map((post) => (
                        <JournalIndexRow key={post.slug} post={post} contentId={index.contentId} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
