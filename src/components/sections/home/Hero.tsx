import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Lines } from "@/components/ui/Lines";
import { NavLink } from "@/components/ui/NavLink";

/** Full-bleed opening: statement heading and the studio availability card. */
export function Hero() {
  return (
    <section data-surface="dark" data-screen-label="Hero" className="section_hero">
      <div className="hero_image">
        <img
          src="/assets/images/image-ebd78e7f.avif"
          loading="lazy"
          sizes="(max-width: 2048px) 100vw, 2048px"
          srcSet="/assets/images/image-2988c3d4.avif 500w, /assets/images/image-07b8bd0d.avif 800w, /assets/images/image-32f54937.avif 1080w, /assets/images/image-f2656cfb.avif 1600w, /assets/images/image-ebd78e7f.avif 2048w"
          alt=""
          className="image-cover"
        />
      </div>
      <div className="hero_content">
        <div className="padding-global">
          <div className="container-max">
            <div className="hero_layout">
              <div>
                <Heading as="h1" size="h0" light>
                  <Lines lines={["Make. ", "Every Idea. ", "Matter."]} />
                </Heading>
              </div>
              <NavLink data-hover-animation="image-scale-trigger" href="/contact-us" className="hero_status-card u-inline-block">
                <div className="hero_status-body">
                  <Label variant="small">Studio status</Label>
                  <div className="hero_status-value">Open for Q1 2027 projects.</div>
                </div>
                <div className="hero_thumb">
                  <img
                    data-hover-animation="image-scale-target"
                    loading="lazy"
                    alt=""
                    src="/assets/images/image-ddd4e436.avif"
                    className="hero_thumb-image"
                  />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
