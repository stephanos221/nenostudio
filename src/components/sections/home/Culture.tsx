import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Lines } from "@/components/ui/Lines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BackgroundVideo } from "@/components/widgets/BackgroundVideo";
import { VideoControl } from "@/components/widgets/VideoControl";

const VIDEO_ID = "71178784-2a72-e2d8-ef4a-efc6100ce988-video";

/** "The studio reel": background video with a status island and play/pause control. */
export function Culture() {
  return (
    <section id="culture" data-screen-label="Culture" className="section_culture">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="section_content is-culture">
            <SectionHeader center wrap={false}>
              <Label>The studio reel</Label>
              <Heading size="h1" center>
                <Lines lines={["Nine years", "of shipped work."]} />
              </Heading>
            </SectionHeader>
            <BackgroundVideo
              id={VIDEO_ID}
              poster="/assets/images/image-5751942c.jpg"
              sources={["/assets/videos/video-93067ade.mp4", "/assets/videos/video-1cb7d423.webm"]}
              className="culture_frame"
            >
              <div className="culture_island">
                <div data-status-dot="1" className="culture_dot" />
                <div className="culture_island-items">
                  <div className="culture_island-label">Studio reel</div>
                  <div className="culture_island-time">01:24</div>
                  <div className="culture_island-sep" />
                  {/* Empty on purpose: with scripting off the browser lays a <noscript> out as a flex item, and its `gap` slot is part of the island's width. */}
                  <noscript />
                  <div aria-live="polite">
                    <VideoControl videoId={VIDEO_ID} className="culture_play" />
                  </div>
                </div>
              </div>
            </BackgroundVideo>
          </div>
        </div>
      </div>
    </section>
  );
}
