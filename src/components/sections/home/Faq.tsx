import { Heading } from "@/components/ui/Heading";
import { Lines } from "@/components/ui/Lines";
import { faq } from "@/data/faq";

/** "Before you brief us": question and answer rows. */
export function Faq() {
  return (
    <section id="faq" data-screen-label="FAQ" className="section_faq">
      <div className="padding-global padding-section">
        <div className="container-max">
          <div className="faq_layout">
            <div id="node-c1a4c094-e8c5-19de-38f6-b5f5460b4c6d-4b18a35c" className="faq_head">
              <div className="heading-container">
                <Heading size="h2">
                  <Lines lines={["Before", "you brief us."]} />
                </Heading>
              </div>
            </div>
            <div id="node-c1a4c094-e8c5-19de-38f6-b5f5460b4ca0-4b18a35c" className="faq_list">
              {faq.map((item) => (
                <div key={item.question} className="faq_row">
                  <div className="faq_row-head">
                    <div className="faq_question">{item.question}</div>
                    <div className="faq_icon">
                      <div className="faq_icon-h" />
                      <div className="faq_icon-v" />
                    </div>
                  </div>
                  <div className="faq_answer">
                    <p className="faq_answer-text">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
