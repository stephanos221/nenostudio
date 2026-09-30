import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { SgSection } from "./SgSection";
import { SpecimenGrid } from "./Specimen";

interface ComponentSpecimenProps {
  component: string;
  variant?: string;
  children: ReactNode;
}

/** Captioned component example: component name, then the variant shown. */
function ComponentSpecimen({ component, variant, children }: ComponentSpecimenProps) {
  return (
    <div className="sg_grid-item">
      <div className="sg_label-row">
        <div className="sg_label is-component">{component}</div>
        {variant && <div className="sg_label">{variant}</div>}
      </div>
      {children}
    </div>
  );
}

export function ButtonsSection() {
  return (
    <SgSection title="Button Components" description="The different types of buttons used throughout the website.">
      <SpecimenGrid columns={3}>
        <ComponentSpecimen component="Button" variant="Dark">
          <Button href="#">View open roles</Button>
        </ComponentSpecimen>
        <ComponentSpecimen component="Button" variant="Light">
          <Button href="#" variant="base">
            View open roles
          </Button>
        </ComponentSpecimen>
        <ComponentSpecimen component="Button" variant="Ghost">
          <Button href="#" variant="ghost">
            View open roles
          </Button>
        </ComponentSpecimen>
        <ComponentSpecimen component="Submit Button" variant="Dark">
          <SubmitButton>{"Let's talk"}</SubmitButton>
        </ComponentSpecimen>
        <ComponentSpecimen component="Submit Button" variant="Light">
          <SubmitButton variant="base">{"Let's talk"}</SubmitButton>
        </ComponentSpecimen>
        <ComponentSpecimen component="Footer Link">
          <a href="#" className="footer_link">
            Brand Identity
          </a>
        </ComponentSpecimen>
      </SpecimenGrid>
    </SgSection>
  );
}
