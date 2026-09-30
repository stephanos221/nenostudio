import { Heading } from "@/components/ui/Heading";
import type { CaseStudy } from "@/data/work-cases";
import { CaseIntro } from "./CaseIntro";
import { CoverImage } from "./CoverImage";

/** Results of the engagement: image banner, then one row per measured outcome. */
export function CaseOutcome({ outcome }: { outcome: CaseStudy["outcome"] }) {
  return (
    <section data-screen-label="Outcome" className="section_outcome">
      <div className="case-outcome_media">
        <CoverImage src={outcome.image} />
        <div className="media_scrim" />
        <div className="case-outcome_content">
          <div className="case-outcome_title">
            <Heading size="h1" light center>
              {outcome.title}
            </Heading>
          </div>
        </div>
      </div>
      <div className="padding-global">
        <div className="container-max">
          <div className="section_content">
            <CaseIntro>
              <p className="section_header-text">{outcome.intro}</p>
            </CaseIntro>
            <div className="case-outcome_body">
              <div className="case-outcome_list">
                {outcome.rows.map(({ label, text, metric }) => (
                  <div key={label} className="case-outcome_row">
                    <h3 className="heading-style-h5 is-inverse">{label}</h3>
                    <div className="case-outcome_col">
                      <p className="case-outcome_text">{text}</p>
                      <div className="case-outcome_metric">{metric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
