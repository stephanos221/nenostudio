import { Fragment } from "react";
import { Heading } from "@/components/ui/Heading";
import type { DocContent, DocEntry } from "@/data/docs";

interface DocPageProps {
  content: DocContent;
  /** Puts the content in one extra wrapper `div`, as the changelog markup does. */
  nested?: boolean;
}

function DocParagraph({ entry }: { entry: DocEntry }) {
  return (
    <p>
      {entry.text.map((run, index) => (
        <Fragment key={index}>
          {typeof run === "string" ? (
            run
          ) : (
            <a href={run.href} target="_blank">
              {run.text}
            </a>
          )}
        </Fragment>
      ))}
    </p>
  );
}

function DocItem({ entry, columns }: { entry: DocEntry; columns: DocContent["columns"] }) {
  return (
    <div className="sg_item-wrapper">
      <div className="sg_item-header">
        <Heading as={`h${entry.level}`} size={entry.size}>
          {entry.title}
        </Heading>
      </div>
      <div className={`max-width_${columns}col`}>
        <DocParagraph entry={entry} />
      </div>
      {entry.images && (
        <div className="sg_grid-3col">
          {entry.images.map(({ src, srcSet, sizes }) => (
            <div key={src} className="sg_grid-item">
              <img src={src} loading="lazy" sizes={sizes} srcSet={srcSet} alt="" className="sg_grid-item-image" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Plain documentation page (changelog, licenses): a titled list of short text blocks. */
export function DocPage({ content, nested }: DocPageProps) {
  const items = (
    <div className="sg_content">
      {content.entries.map((entry) => (
        <DocItem key={entry.title} entry={entry} columns={content.columns} />
      ))}
    </div>
  );

  return (
    <main className="main-wrapper">
      <section id="contact-top" data-screen-label="Contact header" className="section_sg">
        <div className="padding-global padding-section padding-top">
          <div className="container-max">
            <div className="section_content">{nested ? <div>{items}</div> : items}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
