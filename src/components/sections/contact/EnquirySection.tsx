import { Heading } from "@/components/ui/Heading";
import { EnquiryForm } from "@/components/widgets/EnquiryForm";

/** Photo beside the enquiry form. */
export function EnquirySection() {
  return (
    <section id="contact-form" data-screen-label="Enquiry" className="section_enquiry">
      <div className="padding-global">
        <div className="container-max">
          <div className="section_content">
            <div className="enquiry_wrapper">
              <img
                src="/assets/images/image-dc0cf3ec.avif"
                loading="lazy"
                sizes="100vw"
                srcSet="/assets/images/image-5a3b6e7a.avif 500w, /assets/images/image-28abfb66.avif 800w, /assets/images/image-53bced54.avif 1080w, /assets/images/image-dc0cf3ec.avif 1200w"
                alt=""
                className="enquiry_media"
              />
              <div className="enquiry_col">
                <div className="heading-container">
                  <Heading size="h2">Let&apos;s build something.</Heading>
                </div>
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
