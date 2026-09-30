import { Heading } from "@/components/ui/Heading";
import { philosophy } from "@/data/about";
import { ResponsiveImage } from "./ResponsiveImage";

/** "Our philosophy": intro text and a strip of three photographs. */
export function Philosophy() {
  return (
    <section id="philosophy" className="section_philosophy">
      <div className="padding-global">
        <div className="container-max">
          <div className="section_content">
            <div className="section_header is-grid">
              <div className="heading-container">
                <Heading size="h2">{philosophy.heading}</Heading>
              </div>
              <div className="section_header-text-wrap">
                <p className="section_header-text">{philosophy.text}</p>
              </div>
            </div>
            <div className="philosophy_strip">
              {philosophy.strip.map((image) => (
                <ResponsiveImage key={image.src} image={image} className="philosophy_image" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
