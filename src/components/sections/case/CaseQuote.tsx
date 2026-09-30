import type { CaseStudy } from "@/data/work-cases";
import { CoverImage } from "./CoverImage";

/** Client testimonial with a portrait, closing the case study. */
export function CaseQuote({ quote }: { quote: CaseStudy["quote"] }) {
  return (
    <section data-screen-label="Quote" className="section_quote">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="section_content">
            <div className="case-quote_grid">
              <div className="case-quote_media">
                <CoverImage src={quote.image} />
              </div>
              <div className="case-quote_body">
                <div className="case-quote_head">
                  <div className="section_meta-text">In their words</div>
                  <div className="section_meta-text is-right">{quote.when}</div>
                </div>
                <blockquote>{quote.text}</blockquote>
                <div className="case-quote_foot">
                  <div className="case-quote_person">
                    <div className="case-quote_avatar">
                      <CoverImage src={quote.avatar} />
                    </div>
                    <div className="case-quote_identity">
                      <div className="case-quote_name">{quote.name}</div>
                      <div className="section_meta-text">{quote.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
