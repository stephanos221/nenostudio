import { Button } from "@/components/ui/Button";

/** Closing call-to-action banner shown above the footer on most pages. */
export function Careers() {
  return (
    <section id="careers" className="section_careers">
      <div className="careers_media">
        <img
          sizes="(max-width: 2048px) 100vw, 2048px"
          srcSet="/assets/images/image-07016f58.avif 500w, /assets/images/image-10e662c1.avif 800w, /assets/images/image-0c12ef7d.avif 1080w, /assets/images/image-d017b4ad.avif 1600w, /assets/images/image-f1c56e13.avif 2000w, /assets/images/image-54497acc.avif 2048w"
          alt=""
          src="/assets/images/image-54497acc.avif"
          loading="lazy"
          className="image-cover"
        />
      </div>
      <div className="padding-global">
        <div className="container-max">
          <div className="careers_content">
            <div className="careers_title-wrap">
              <h2 data-fade-action="heading" className="careers_title">
                Build <br />
                what’s next with us
              </h2>
            </div>
            <p className="careers_text">
              Wherever you sit at Vantra, there is room to shape real work and leave a lasting mark.
            </p>
            <div className="buttons_row">
              <Button href="/contact-us" variant="base">
                Start a project
              </Button>
              <Button href="/about-us">Meet the studio</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
