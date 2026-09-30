import { Careers } from "@/components/sections/shared/Careers";
import { ContactHeader } from "@/components/sections/shared/ContactHeader";
import { JournalIndexSection } from "@/components/sections/shared/JournalIndexSection";
import { MoreJournalSection } from "@/components/sections/shared/MoreJournalSection";
import { JournalFilter } from "@/components/ui/FilterBar";
import { Heading } from "@/components/ui/Heading";
import { journal } from "@/data/journal";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/journal");

export default function JournalPage() {
  return (
    <>
      <InitialHidden route="/journal" />
      <main className="main-wrapper">
        <ContactHeader screenLabel="Journal header" label="Journal" heading={["Notes from", "the studio."]} />
        <MoreJournalSection posts={journal.filter((post) => post.featured)} />
        <JournalIndexSection
          header={
            <div className="section_header">
              <div className="max-width_3col">
                <Heading size="h2">The index</Heading>
              </div>
              <div className="section_meta">
                <div className="section_meta-text">
                  Notes published
                  <br />
                </div>
              </div>
            </div>
          }
          posts={journal.filter((post) => !post.featured)}
          contentId="node-d329d3c4-fa88-a73f-69e7-671d614fee5a-8d7ec54e"
          footer={<JournalFilter />}
        />
      </main>
      <Careers />
    </>
  );
}
