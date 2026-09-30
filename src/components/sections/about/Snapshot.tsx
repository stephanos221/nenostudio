import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { snapshot } from "@/data/about";

/** "By the numbers": profile download and the studio figures panel. */
export function Snapshot() {
  return (
    <section id="numbers" className="section_snapshot">
      <div className="padding-global">
        <div className="container-max">
          <div className="snapshot_frame">
            <div className="snapshot_grid">
              <div id="node-f1351013-93c2-ce4a-18cd-20a3f71179f5-35d30490" className="snapshot_left">
                <div className="heading-container">
                  <Heading size="h2">{snapshot.heading}</Heading>
                </div>
                <div className="team_action">
                  <Button href="#">{snapshot.action}</Button>
                </div>
              </div>
              <div id="node-f1351013-93c2-ce4a-18cd-20a3f7117a15-35d30490" className="snapshot_panel">
                <div className="snapshot_top">
                  <div>{snapshot.location}</div>
                  <div>{snapshot.founded}</div>
                </div>
                <div className="snapshot_figure">
                  <div className="snapshot_number">{snapshot.years.number}</div>
                  <div className="snapshot_unit">{snapshot.years.unit}</div>
                </div>
                <div className="snapshot_stats">
                  {snapshot.stats.map(({ label, value }) => (
                    <div key={label} className="snapshot_stat">
                      <div className="snapshot_stat-label">{label}</div>
                      <div className="snapshot_stat-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
