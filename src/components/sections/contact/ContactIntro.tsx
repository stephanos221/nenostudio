import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Lines } from "@/components/ui/Lines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { directContacts } from "@/data/contact";
import { cx } from "@/lib/cx";

/** Page title block with the studio's direct phone and email lines. */
export function ContactIntro() {
  return (
    <section id="contact-top" data-screen-label="Contact header" className="section_contact">
      <div className="padding-global padding-top">
        <div className="container-max">
          <div className="section_content">
            <SectionHeader center wrap={false}>
              <Label>The studio reel</Label>
              <Heading as="h1" size="h1" center>
                <Lines lines={["Tell us what", "you are building."]} />
              </Heading>
            </SectionHeader>
            <div className="direct_grid">
              {directContacts.map(({ label, value, href, ruled }) => (
                <a key={label} href={href} className={cx("direct_cell", ruled && "is-ruled", "u-inline-block")}>
                  <Label>{label}</Label>
                  <div className="direct_value">{value}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
