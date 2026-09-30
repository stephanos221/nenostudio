import { Careers } from "@/components/sections/shared/Careers";
import { ContactHeader } from "@/components/sections/shared/ContactHeader";
import { LiveSection } from "@/components/sections/shared/LiveSection";
import { WorkSection } from "@/components/sections/shared/WorkSection";
import { WorkFilter } from "@/components/ui/FilterBar";
import { work } from "@/data/work";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/work");

export default function WorkPage() {
  return (
    <>
      <InitialHidden route="/work" />
      <main className="main-wrapper">
        <ContactHeader screenLabel="Contact header" label="Selected work" heading={["Work that", "still holds up."]} />
        <WorkSection
          items={work}
          cellId="node-_89c78751-9a84-31e7-bf4c-27217a9f8bfb-ef3e036e"
          headingLevel={2}
          footer={<WorkFilter />}
        />
        <LiveSection />
      </main>
      <Careers />
    </>
  );
}
