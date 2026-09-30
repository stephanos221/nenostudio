import { Label } from "@/components/ui/Label";
import type { JournalArticle } from "@/data/journal-articles";
import { Prose } from "./Prose";

/** Author rail beside the article copy. */
export function ArticleBody({ author, body }: Pick<JournalArticle, "author" | "body">) {
  return (
    <section data-screen-label="Article body" className="section_article-body">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="article_grid">
            <div className="article_rail">
              <Label>Written by</Label>
              <div className="article_author is-rail">
                <div className="article_author-portrait">
                  <img src={author.portrait} loading="lazy" alt="" className="image-cover" />
                </div>
                <div className="article_author-lines">
                  <div className="article_author-name">{author.name}</div>
                  <div className="section_meta-text">{author.role}</div>
                </div>
              </div>
            </div>
            <div className="article_body">
              <Prose blocks={body} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
