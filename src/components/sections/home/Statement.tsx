import { Lines } from "@/components/ui/Lines";

const CLIENT_LOGOS = [
  "/assets/images/image-92f2f5f3.svg",
  "/assets/images/image-e3a7da57.svg",
  "/assets/images/image-619fd469.svg",
  "/assets/images/image-f0243f0f.svg",
  "/assets/images/image-ebd51d1d.svg",
];

/** Two identical sets, so the track can loop seamlessly. */
const LOGO_SETS = [0, 1];

/** Positioning statement above the client logo marquee. */
export function Statement() {
  return (
    <section className="section_statement">
      <div className="padding-global">
        <div className="container-max">
          <div className="statement_wrap">
            <p className="statement_text">
              <Lines lines={["Vantra builds brand systems, digital", "products, and campaigns. All of it", "made to hold together."]} />
            </p>
            <div className="statement_marquee">
              <div className="statement_track">
                {LOGO_SETS.map((set) => (
                  <div key={set} className="statement_set">
                    {CLIENT_LOGOS.map((logo) => (
                      <a key={logo} href="#" className="statement_client u-inline-block">
                        <img loading="lazy" src={logo} alt="" className="statement_client-logo" />
                      </a>
                    ))}
                  </div>
                ))}
              </div>
              <div className="statement_cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
