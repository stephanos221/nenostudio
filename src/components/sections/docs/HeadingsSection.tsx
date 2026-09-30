import { Fragment } from "react";
import { displayHeadingSpecimen, headingSpecimens } from "@/data/style-guide";
import { SgSection } from "./SgSection";
import { Specimen, SpecimenGroup } from "./Specimen";

export function HeadingsSection() {
  return (
    <SgSection title="Headings" description="The different heading styles used throughout the site.">
      <SpecimenGroup columns={1}>
        <Specimen label="heading-style-h0" id={displayHeadingSpecimen.id}>
          <h1 className="heading-style-h0">{displayHeadingSpecimen.text}</h1>
        </Specimen>
        {headingSpecimens.map(({ level, text }) => {
          const Tag = `h${level}` as const;
          const styleClass = `heading-style-${Tag}`;

          return (
            <Fragment key={level}>
              <Specimen label={Tag.toUpperCase()} labelKind="tag">
                <Tag>{text}</Tag>
              </Specimen>
              <Specimen label={styleClass}>
                <Tag className={styleClass}>{text}</Tag>
              </Specimen>
            </Fragment>
          );
        })}
      </SpecimenGroup>
    </SgSection>
  );
}
