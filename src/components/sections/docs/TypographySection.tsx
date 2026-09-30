import { textSizeSpecimens, textStyleSpecimens, textWeights } from "@/data/style-guide";
import { RichTextSample } from "./RichTextSample";
import { SgSection } from "./SgSection";
import { Specimen, SpecimenGroup } from "./Specimen";

export function TypographySection() {
  return (
    <SgSection title="Typography Classes" description="The different typography classes used throughout the site.">
      <SpecimenGroup columns={3} title="Text Sizes">
        {textSizeSpecimens.map(({ size, text, id }) => (
          <Specimen key={size} label={`text-size-${size}`} id={id}>
            <p className={`text-size-${size}`}>{text}</p>
          </Specimen>
        ))}
      </SpecimenGroup>
      <SpecimenGroup columns={3} title="Text Styles">
        {textStyleSpecimens.map(({ style, text }) => {
          const className = `text-style-${style}`;

          return (
            <Specimen key={style} label={className}>
              <p className={className}>
                {text ?? className}
                <br />
              </p>
            </Specimen>
          );
        })}
      </SpecimenGroup>
      <SpecimenGroup columns={3} title="Text Weights">
        {textWeights.map((weight) => {
          const className = `text-weight-${weight}`;

          return (
            <Specimen key={weight} label={className}>
              <div className={className}>{className}</div>
            </Specimen>
          );
        })}
      </SpecimenGroup>
      <SpecimenGroup columns={3} title="Text Alignments">
        <Specimen label="text-align-left">
          <div id="node-_65879455-9778-fe26-9134-53f06ad94003-8255bc03" className="text-align-left">
            text-align-left
          </div>
        </Specimen>
        <Specimen label="text-align-center" stretch>
          <div className="text-align-center">text-align-center</div>
        </Specimen>
        <Specimen label="text-align-right" labelId="node-_65879455-9778-fe26-9134-53f06ad9400b-8255bc03" stretch>
          <div className="text-align-right">text-align-right</div>
        </Specimen>
      </SpecimenGroup>
      <SpecimenGroup columns={3} title="Rich Texts">
        <Specimen label="text-rich-text" id="node-_65879455-9778-fe26-9134-53f06ad94014-8255bc03">
          <RichTextSample />
        </Specimen>
      </SpecimenGroup>
    </SgSection>
  );
}
