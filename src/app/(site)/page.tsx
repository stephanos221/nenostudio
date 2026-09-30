import { Culture } from "@/components/sections/home/Culture";
import { Faq } from "@/components/sections/home/Faq";
import { Hero } from "@/components/sections/home/Hero";
import { Services } from "@/components/sections/home/Services";
import { Statement } from "@/components/sections/home/Statement";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Careers } from "@/components/sections/shared/Careers";
import { LiveSection } from "@/components/sections/shared/LiveSection";
import { MoreJournalSection } from "@/components/sections/shared/MoreJournalSection";
import { WorkSection } from "@/components/sections/shared/WorkSection";
import { Heading } from "@/components/ui/Heading";
import { Lines } from "@/components/ui/Lines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { journal } from "@/data/journal";
import { work } from "@/data/work";
import { pageMetadata } from "@/lib/metadata";
import { bracket } from "@/lib/text";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/");

export default function HomePage() {
  return (
    <>
      <InitialHidden route="/" />
      <main className="main-wrapper">
        <Hero />
        <Statement />
        <WorkSection
          featured
          items={work.filter((item) => item.featured)}
          cellId="node-a39d3a74-2c53-c385-9101-d1a208cb6e96-4b18a35c"
          header={
            <SectionHeader
              meta={[
                <>
                  {bracket("Featured")}
                  <br />
                </>,
                <>
                  Brand, product, campaign
                  <br />
                </>,
              ]}
            >
              <Heading size="h2">
                <Lines lines={["Work", "that lasts."]} />
              </Heading>
            </SectionHeader>
          }
        />
        <LiveSection />
        <Services />
        <Culture />
        <Testimonials />
        <Faq />
        <MoreJournalSection
          header={
            <SectionHeader>
              <Heading size="h2">Notes from the studio.</Heading>
            </SectionHeader>
          }
          posts={journal.filter((post) => post.featured)}
          index={{ posts: journal, contentId: "node-_1f45aa6b-be37-27cd-7759-2e731c13c1bc-4b18a35c" }}
        />
      </main>
      <Careers />
    </>
  );
}
