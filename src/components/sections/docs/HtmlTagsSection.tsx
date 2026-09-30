import { sampleSentence } from "@/data/style-guide";
import { SgSection } from "./SgSection";
import { Specimen, SpecimenGroup } from "./Specimen";

const listItems = [0, 1, 2].map((index) => <li key={index}>{sampleSentence}</li>);

export function HtmlTagsSection() {
  return (
    <SgSection title="Other HTML Tags" description="HTML tags define default text styles.">
      <SpecimenGroup columns={2}>
        <Specimen label="All paragraphs" labelKind="tag">
          <div className="max-width-medium">
            <p>
              Sample text is being used as a placeholder for real text that is normally present. Sample text helps you
              understand how real text may look on your website. Sample text is being used as a placeholder for real
              text.
              <br />
            </p>
          </div>
        </Specimen>
        <Specimen label="All links" labelKind="tag">
          <a href="#">All Links</a>
        </Specimen>
        <Specimen label="All quotes" labelKind="tag">
          <div className="max-width-medium">
            <blockquote>
              Sample text is being used as a placeholder for real text that is normally present. Sample text helps you
              understand how real text may look on your website.
            </blockquote>
          </div>
        </Specimen>
        <Specimen label={"All\u00a0Ordered Lists"} labelKind="tag">
          <div className="max-width-medium">
            <ol role="list">{listItems}</ol>
          </div>
        </Specimen>
        <Specimen label="All Unordered Lists" labelKind="tag">
          <ul role="list" className="max-width-medium">
            {listItems}
          </ul>
        </Specimen>
      </SpecimenGroup>
    </SgSection>
  );
}
