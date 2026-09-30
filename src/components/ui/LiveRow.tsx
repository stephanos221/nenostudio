import type { LiveProject } from "@/data/types";

const BAR_VARIANT: Record<LiveProject["bar"], string> = {
  15: "v-259041a3",
  30: "v-c93fda29",
  45: "v-92983c1a",
  60: "v-5cc88c9b",
  75: "v-2ca7ed1c",
  90: "v-ce12b520",
};

/** One in-progress project: client, discipline, progress bar and ship date. */
export function LiveRow({ project }: { project: LiveProject }) {
  return (
    <div className="live_row">
      <div id="node-_47de7245-676f-0f7e-d2ff-16e03d6be6b7-3d6be6b6" className="live_col is-left">
        <h3 className="live_client">{project.client}</h3>
      </div>
      <div id="node-_47de7245-676f-0f7e-d2ff-16e03d6be6ba-3d6be6b6" className="live_col is-right">
        <div id="node-_47de7245-676f-0f7e-d2ff-16e03d6be6bb-3d6be6b6" className="live_discipline">
          {project.discipline}
        </div>
        <div id="node-_61e55290-b777-d7c7-a543-fc0df3adf323-3d6be6b6" className="live_progress-wrap">
          <div id="node-a3e5623f-72f5-249d-71ea-5b12bd1a359c-bd1a359c" className="live_progress">
            <div className="live_progress-meta-wrap">
              <div className="live_progress-meta">{project.progress}</div>
              <div className="live_progress-meta">
                {project.crew}
                {project.crewTrailingBreak && <br />}
              </div>
            </div>
            <div className="live_track">
              <div data-live-bar="1" className={`live_bar ${BAR_VARIANT[project.bar]}`} />
            </div>
          </div>
        </div>
        <div id="node-_47de7245-676f-0f7e-d2ff-16e03d6be6c6-3d6be6b6" className="live_ships">
          {project.ships}
        </div>
      </div>
    </div>
  );
}
