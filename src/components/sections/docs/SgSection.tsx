import type { ReactNode } from "react";

interface SgSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

/** Titled block of the style guide. */
export function SgSection({ title, description, children }: SgSectionProps) {
  return (
    <section className="section_sg">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="sg_content">
            <div className="sg_header">
              <div className="section-header_component">
                <div className="section_heading-box">
                  <h2>{title}</h2>
                </div>
                <div className="max-width-semi-large">
                  <div className="section_desc-box">
                    <p>
                      {description}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
