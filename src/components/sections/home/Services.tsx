import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Lines } from "@/components/ui/Lines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Slider } from "@/components/widgets/Slider";
import { services } from "@/data/services";
import type { Service } from "@/data/types";
import { bracket } from "@/lib/text";

/** "What we actually do": the services carousel. */
export function Services() {
  return (
    <section id="services" data-screen-label="Services" className="section_services">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="section_content">
            <SectionHeader meta={[bracket("Five practices"), "One senior team"]}>
              <Heading size="h2">
                <Lines lines={["What we", "actually do."]} />
              </Heading>
            </SectionHeader>
            <Slider prefix="services">
              {services.map((service) => (
                <ServiceSlide key={`${service.tag}${service.glyph}`} service={service} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceSlide({ service }: { service: Service }) {
  return (
    <div className="services_slide slider-slide">
      <div className="services_card">
        <Label>{service.tag}</Label>
        <div className="services_glyph-wrap">
          <img loading="lazy" src={service.glyph} alt="" className="services_glyph" />
        </div>
        <div className="services_card-body">
          <div className="services_card-label">{service.label}</div>
          <div className="services_card-text">{service.text}</div>
        </div>
      </div>
    </div>
  );
}
