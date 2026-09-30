import { ButtonsSection } from "@/components/sections/docs/ButtonsSection";
import { HeadingsSection } from "@/components/sections/docs/HeadingsSection";
import { HtmlTagsSection } from "@/components/sections/docs/HtmlTagsSection";
import { LayoutSection } from "@/components/sections/docs/LayoutSection";
import { StyleGuideHero } from "@/components/sections/docs/StyleGuideHero";
import { TypographySection } from "@/components/sections/docs/TypographySection";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/style-guide");

export default function StyleGuidePage() {
  return (
    <>
      <InitialHidden route="/style-guide" />
      <main id="main" className="main-wrapper">
        <StyleGuideHero />
        <LayoutSection />
        <HeadingsSection />
        <HtmlTagsSection />
        <TypographySection />
        <ButtonsSection />
      </main>
    </>
  );
}
