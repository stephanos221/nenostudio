import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Lines } from "@/components/ui/Lines";

interface ContactHeaderProps {
  /** Value of `data-screen-label`. */
  screenLabel: string;
  label: string;
  /** Lines of the page `h1`. */
  heading: readonly string[];
}

/** Centred page title block: caption above an `h1`. */
export function ContactHeader({ screenLabel, label, heading }: ContactHeaderProps) {
  return (
    <section id="contact-top" data-screen-label={screenLabel} className="section_contact">
      <div className="padding-global padding-section padding-top">
        <div className="container-max">
          <div className="section_content">
            <div className="section_header is-center">
              <Label>{label}</Label>
              <div className="max-width_6col">
                <Heading as="h1" size="h1" center>
                  <Lines lines={heading} />
                </Heading>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
