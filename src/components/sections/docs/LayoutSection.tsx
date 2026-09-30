import { layoutSpecimens } from "@/data/style-guide";
import { SgSection } from "./SgSection";
import { Specimen, SpecimenGroup } from "./Specimen";

const emptyBox = <div className="styleguide-empty-box" />;

export function LayoutSection() {
  return (
    <SgSection title="layout classes" description="Defined and flexible core layout we can use on all or most pages.">
      <SpecimenGroup columns={1}>
        <Specimen label="page-wrapper">
          <div className="page-wrapper">{emptyBox}</div>
        </Specimen>
        <Specimen label="main-wrapper">
          <main className="main-wrapper">{emptyBox}</main>
        </Specimen>
        {layoutSpecimens.map(({ className, label = className, id, inBox }) => (
          <Specimen key={label} label={label} labelId={id} stretch>
            {inBox ? (
              <div className="styleguide-empty-box">
                <div className={className}>{emptyBox}</div>
              </div>
            ) : (
              <div className={className}>{emptyBox}</div>
            )}
          </Specimen>
        ))}
      </SpecimenGroup>
    </SgSection>
  );
}
