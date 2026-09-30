import { Heading } from "@/components/ui/Heading";
import { Lines } from "@/components/ui/Lines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Slider } from "@/components/widgets/Slider";
import { testimonials, testimonialScore } from "@/data/testimonials";
import type { Testimonial } from "@/data/types";
import { cx } from "@/lib/cx";
import { bracket } from "@/lib/text";

/** "What clients say back": rating card followed by client quotes. */
export function Testimonials() {
  return (
    <section id="testimonials" data-screen-label="Testimonials" className="section_testimonials">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="section_content">
            <SectionHeader meta={[bracket("4.9 / 5"), "Across every project since 2017"]}>
              <Heading size="h2">
                <Lines lines={["What clients", "say back."]} />
              </Heading>
            </SectionHeader>
            <Slider prefix="testimonial">
              <ScoreSlide />
              {testimonials.map((testimonial) => (
                <QuoteSlide key={testimonial.name} testimonial={testimonial} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

/** First slide: the overall rating with a stack of client faces. */
function ScoreSlide() {
  const [firstFace, ...stackedFaces] = testimonialScore.faces;

  return (
    <div className="testimonial_slide slider-slide">
      <div className="testimonial_card is-score">
        <div className="testimonial_score-row">
          <div className="testimonial_score">
            <div>{testimonialScore.value}</div>
            <div className="testimonial_score-max">{testimonialScore.max}</div>
          </div>
          <div className="testimonial_score-text">{testimonialScore.text}</div>
        </div>
        <div className="testimonial_faces">
          <div className="testimonial_stack">
            <img loading="lazy" src={firstFace} alt="" className="testimonial_face" />
            {stackedFaces.map((face) => (
              <img key={face} loading="lazy" src={face} alt="" className="testimonial_face is-stacked" />
            ))}
          </div>
          <div className="testimonial_faces-label">{testimonialScore.facesLabel}</div>
        </div>
      </div>
    </div>
  );
}

/** One client quote with the person's avatar, name and role. */
function QuoteSlide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="testimonial_slide slider-slide">
      <div className={cx("testimonial_card", testimonial.alternate && "v-36aad506")}>
        <div className="testimonial_person">
          <img loading="lazy" src={testimonial.avatar} alt="" className="testimonial_avatar" />
          <div className="testimonial_person-meta">
            <div className="testimonial_name">{testimonial.name}</div>
            <div className="testimonial_role">{testimonial.role}</div>
          </div>
        </div>
        <div className="testimonial_quote">
          {testimonial.quote}
          <br />
        </div>
      </div>
    </div>
  );
}
