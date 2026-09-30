import { Heading } from "@/components/ui/Heading";
import { Lines } from "@/components/ui/Lines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { awards } from "@/data/about";
import { cx } from "@/lib/cx";

/** "Awards for the work": a ruled table of recognitions. */
export function Awards() {
  return (
    <section id="awards" className="section_awards">
      <div className="padding-global">
        <div className="container-max">
          <div className="section_content">
            <SectionHeader meta={[awards.caption, awards.note]}>
              <Heading size="h2">
                <Lines lines={awards.heading} />
              </Heading>
            </SectionHeader>
            <div className="awards_list">
              <div className="awards_list-head">
                {awards.columns.map((column, index) => (
                  <div key={column} className={cx("awards_list-head-title", index === awards.columns.length - 1 && "is-last")}>
                    {column}
                  </div>
                ))}
              </div>
              {awards.items.map(({ title, organisation, year }) => (
                <div key={title} className="awards_item">
                  <div className="awards_item-title">{title}</div>
                  <div className="awards_item-org">{organisation}</div>
                  <div className="awards_item-year">{year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
