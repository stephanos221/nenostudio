import type { CaseStudy } from "@/data/work-cases";
import { CaseIntro } from "./CaseIntro";
import { CoverImage } from "./CoverImage";

/** The brief text followed by the image gallery. */
export function CaseBrief({ brief }: { brief: CaseStudy["brief"] }) {
  const [narrow, wide] = brief.gallery.pair;

  return (
    <section data-screen-label="Philosophy" className="section_brief">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="section_content is-brief">
            <CaseIntro>
              <div className="section_header-text is-small prose">
                <p>{brief.text}</p>
              </div>
            </CaseIntro>
            <div className="case-gallery">
              <div className="case-gallery_frame is-wide">
                <CoverImage src={brief.gallery.wide} />
              </div>
              <div className="case-gallery_row">
                <div className="case-gallery_frame">
                  <CoverImage src={narrow} />
                </div>
                <div className="case-gallery_frame is-wide">
                  <CoverImage src={wide} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
