import { Heading } from "@/components/ui/Heading";
import { Lines } from "@/components/ui/Lines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { team } from "@/data/about";

/** "The people on the file": portrait grid of the six leads. */
export function Team() {
  return (
    <section id="team" className="section_team">
      <div className="padding-global">
        <div className="container-max">
          <div className="section_content">
            <SectionHeader
              meta={[
                <>
                  {team.caption}
                  <br />
                </>,
                team.note,
              ]}
            >
              <Heading size="h2">
                <Lines lines={team.heading} />
              </Heading>
            </SectionHeader>
            <div className="team_grid">
              {team.members.map(({ name, role, photo }) => (
                <div key={name} className="team_card">
                  <img loading="lazy" src={photo} alt="" className="team_image" />
                  <div className="team_content">
                    <h3 className="team_name">{name}</h3>
                    <div className="team_role">{role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
