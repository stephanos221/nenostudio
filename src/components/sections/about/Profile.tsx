import { Heading } from "@/components/ui/Heading";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { Lines } from "@/components/ui/Lines";
import { profile } from "@/data/about";
import { ResponsiveImage } from "./ResponsiveImage";

/** "Studio profile": photograph overlaid with the profile download card. */
export function Profile() {
  return (
    <section id="profile" className="section_profile">
      <div className="padding-global">
        <div className="container-max">
          <div className="profile_panel">
            <ResponsiveImage image={profile.image} className="profile_image" />
            <div id="node-_7e1477df-7c83-4c66-9b83-6bdf438750f1-35d30490" className="profile_body">
              <div>
                <Heading size="h2" light>
                  <Lines lines={profile.heading} />
                </Heading>
              </div>
              <div className="profile_row">
                <p className="profile_text">{profile.text}</p>
                <a href="#" className="profile_card u-inline-block">
                  <div className="profile_card-kind">{profile.cardKind}</div>
                  <div className="profile_card-t">
                    <div className="heading-style-h5">{profile.cardTitle}</div>
                    <div className="profile_card-icon u-embed">
                      <ExternalLinkIcon />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
