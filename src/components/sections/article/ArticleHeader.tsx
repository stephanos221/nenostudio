import Link from "next/link";
import { CornerUpLeftIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { journalCategoryLabel } from "@/data/journal-categories";
import type { JournalPost } from "@/data/types";

/** Back link, category and date, the title and the hero image. */
export function ArticleHeader({ post, hero }: { post: JournalPost; hero: string }) {
  return (
    <section data-screen-label="Article header" className="section_article">
      <div className="padding-global padding-top">
        <div className="container-max">
          <div className="section_content">
            <div className="article_top-meta">
              <Link href="/journal" className="article_back u-inline-block">
                <div className="article_back-icon u-embed">
                  <CornerUpLeftIcon />
                </div>
                <Label>All notes</Label>
              </Link>
              <Label>{journalCategoryLabel(post.category)}</Label>
              <Label>{post.date}</Label>
            </div>
            <div className="article_title">
              <h1 data-fade-action="heading" className="heading text-size-10xlarge is-article">
                {post.title}
              </h1>
            </div>
            <div className="article_hero">
              <img src={hero} loading="lazy" alt="" className="image-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
