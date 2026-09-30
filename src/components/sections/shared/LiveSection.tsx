import { Heading } from "@/components/ui/Heading";
import { Lines } from "@/components/ui/Lines";
import { LiveRow } from "@/components/ui/LiveRow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { liveProjects } from "@/data/live";

/** "In the studio right now": projects currently in progress. */
export function LiveSection() {
  return (
    <section id="live" data-screen-label="In the studio" className="section_live">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="section_content">
            <SectionHeader meta={["Live now — 03 / 05", "Updated this week"]}>
              <Heading size="h2">
                <Lines lines={["In the studio", "right now."]} />
              </Heading>
            </SectionHeader>
            <div className="live_list">
              {liveProjects.map((project) => (
                <LiveRow key={project.client} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
