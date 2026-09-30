import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Lines } from "@/components/ui/Lines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutHero } from "@/data/about";
import { ResponsiveImage } from "./ResponsiveImage";

/** Full-bleed studio photograph under the page title. */
export function AboutHero() {
  return (
    <section id="studio" className="section_about-hero">
      <div className="about-hero_media">
        <ResponsiveImage image={aboutHero.image} className="image-cover" />
      </div>
      <div className="about-hero_scrim" />
      <div className="about-hero_content">
        <SectionHeader center wrap={false}>
          <Label variant="light">{aboutHero.label}</Label>
          <Heading as="h1" size="h1" light center>
            <Lines lines={aboutHero.heading} />
          </Heading>
        </SectionHeader>
      </div>
    </section>
  );
}
