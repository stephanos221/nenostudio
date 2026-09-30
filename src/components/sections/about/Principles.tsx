import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { principles } from "@/data/about";
import { cx } from "@/lib/cx";

/** Grid cell id shared by the text column of every row. */
const TEXT_COL_ID = "node-_099d4508-55da-f07c-5bf0-002a9d56295b-9d562953";

/** "Core values": numbered principles stacked as sticky rows. */
export function Principles() {
  return (
    <section id="values" className="section_principles">
      <div className="padding-global">
        <div className="container-max">
          <div className="principles_list">
            {principles.map(({ label, title, text, modifier }) => (
              <div key={label} className={cx("principle_item", modifier)}>
                <div className="principle_row">
                  <div className="principle_label">
                    <Label>{label}</Label>
                  </div>
                  <div className="principle_content">
                    <div className="principle_header">
                      <Heading>{title}</Heading>
                    </div>
                    <div id={TEXT_COL_ID} className="principle_text-col">
                      <div className="principle_text-col-wrap">
                        <p className="principle_text">{text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
