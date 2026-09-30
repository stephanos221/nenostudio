import { journalCategoryLabel } from "@/data/journal-categories";
import type { JournalPost } from "@/data/types";
import { Label } from "./Label";
import { NavLink } from "./NavLink";

/** Large journal card: cover image, category, date and title over a scrim. */
export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <NavLink data-hover-animation="image-scale-trigger" href={`/journal/${post.slug}`} className="journal_card u-inline-block">
      <img src={post.cover} loading="lazy" data-hover-animation="image-scale-target" alt="" className="journal_card-img" />
      <div className="journal_card-scrim" />
      <div className="journal_card-body">
        <div className="journal_card-meta">
          <Label variant="small">{journalCategoryLabel(post.category)}</Label>
          <Label variant="small">{post.date}</Label>
        </div>
        <div className="journal_card-title-wrap">
          <h3 className="journal_card-title">{post.title}</h3>
        </div>
      </div>
    </NavLink>
  );
}
