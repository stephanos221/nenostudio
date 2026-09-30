import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Lines } from "@/components/ui/Lines";
import { bracket } from "@/lib/text";

/** Content of the 404 page, served both at `/404` and for unknown URLs. */
export function NotFoundMain() {
  return (
    <div className="main-wrapper">
      <section data-screen-label="404" className="section_error">
        <div className="hero_image">
          <img
            src="/assets/images/image-dba0d124.avif"
            loading="lazy"
            sizes="(max-width: 2048px) 100vw, 2048px"
            srcSet="/assets/images/image-d836b337.avif 500w, /assets/images/image-c4da68b1.avif 800w, /assets/images/image-c2eef53d.avif 1080w, /assets/images/image-6836cef0.avif 1600w, /assets/images/image-7e32c904.avif 2000w, /assets/images/image-dba0d124.avif 2048w"
            alt=""
            className="image-cover"
          />
          <div className="hero_scrim is-home" />
        </div>
        <div className="padding-global is-fill">
          <div className="container-max">
            <div className="error_inner">
              <Label variant="light">{bracket("Error / 404", 5)}</Label>
              <div className="error_heading">
                <Heading as="h1" size="h1" light inverse>
                  <Lines lines={["This one ", "got away."]} />
                </Heading>
              </div>
              <div className="error_description">
                <p className="error_text">
                  The page you asked for is gone, renamed, or never existed. The work, however, is all still here.
                </p>
              </div>
              <div className="error_actions">
                <Button href="/" variant="base">
                  Back to home
                </Button>
                <Button href="/work" variant="ghost">
                  See the work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
