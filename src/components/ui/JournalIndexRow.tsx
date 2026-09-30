import { journalCategoryLabel } from "@/data/journal-categories";
import type { JournalPost } from "@/data/types";
import { ExternalLinkIcon } from "./icons";
import { NavLink } from "./NavLink";

interface JournalIndexRowProps {
  post: JournalPost;
  /** Element id of the content column (grid placement hook). */
  contentId: string;
}

/** One line of the journal index: category and title, with thumbnail and date. */
export function JournalIndexRow({ post, contentId }: JournalIndexRowProps) {
  return (
    <div role="listitem" className="cms-item">
      <NavLink href={`/journal/${post.slug}`} className="journal-index_row u-inline-block">
        <div id={contentId} className="journal-index_content">
          <div className="journal-index_label">
            <div className="label-mono">{journalCategoryLabel(post.category)}</div>
          </div>
          <div className="journal-index_title-wrap">
            <div className="journal-index_title">{post.title}</div>
          </div>
        </div>
        <div className="journal-index_meta">
          <div className="journal-index_image">
            <img src={post.cover} loading="lazy" alt="" className="image-cover" />
          </div>
          <div className="journal-index_meta-inner">
            <div className="journal-index_date">{post.date}</div>
            <div className="journal-index_arrow u-embed">
              <ExternalLinkIcon />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
