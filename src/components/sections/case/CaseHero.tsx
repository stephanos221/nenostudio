import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { CoverImage } from "./CoverImage";

interface CaseHeroProps {
  image: string;
  /** Caption above the title. */
  caption: string;
  title: string;
}

/** Full-bleed opening of a case study. */
export function CaseHero({ image, caption, title }: CaseHeroProps) {
  return (
    <section data-surface="dark" data-screen-label="Hero" className="section_hero">
      <div className="hero_image">
        <CoverImage src={image} />
        <div className="hero_scrim" />
      </div>
      <div className="hero_content is-center">
        <div className="padding-global">
          <div className="container-max">
            <div className="section_content">
              <div className="section_header is-center">
                <div className="work_metas">
                  <Label variant="light">{caption}</Label>
                </div>
                <div className="work_title">
                  <Heading as="h1" size="h0" light center semibold>
                    {title}
                  </Heading>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
