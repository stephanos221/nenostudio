import type { ArticleBlock } from "@/data/journal-articles";
import { RichText } from "./RichText";

function ProseBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case "heading": {
      const Tag = block.level === 2 ? "h2" : "h3";
      return (
        <Tag>
          <RichText text={block.text} />
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote>
          <RichText text={block.text} />
        </blockquote>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag>
          {block.items.map((item, index) => (
            <li key={index}>
              <RichText text={item} />
            </li>
          ))}
        </Tag>
      );
    }
  }
}

/** Article body copy, styled by the `prose` rules. */
export function Prose({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="richtext prose">
      {blocks.map((block, index) => (
        <ProseBlock key={index} block={block} />
      ))}
    </div>
  );
}
