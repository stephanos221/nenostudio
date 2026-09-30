import { sampleSentence } from "@/data/style-guide";

/** One of each element the article body style covers. */
export function RichTextSample() {
  return (
    <div className="richtext prose">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>
        Sample text with a <a href="http://finsweet.com">link</a> is being used as a placeholder for real text that is
        normally present. Sample text helps you understand how real text may look on your website. Sample text is being
        used as a placeholder for real text. Sample text is being used as a placeholder for real text. Sample text is
        being used as a placeholder for real text.
      </p>
      <ul role="list">
        <li>{sampleSentence}</li>
        <li>{sampleSentence}</li>
        <li>{sampleSentence}</li>
      </ul>
      {/* The original list carries an empty `start` attribute (typed as a number here), kept for an identical DOM. */}
      <ol start={"" as unknown as number} role="list">
        <li>{sampleSentence}</li>
        <li>{sampleSentence}</li>
        <li>{sampleSentence}</li>
      </ol>
      <blockquote>
        Sample text is being used as a placeholder for real text that is normally present. Sample text helps you
        understand how real text may look on your website. Sample text is being used as a placeholder for real text that
        is normally present.
      </blockquote>
      <figure className="prose-align-normal prose-figure-type-image">
        <div>
          <img src="/assets/images/image-d0bb2096.svg" loading="lazy" alt="image placeholder" />
        </div>
      </figure>
    </div>
  );
}
