import { ContactIntro } from "@/components/sections/contact/ContactIntro";
import { EnquirySection } from "@/components/sections/contact/EnquirySection";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/contact-us");

export default function ContactPage() {
  return (
    <>
      <InitialHidden route="/contact-us" />
      <main className="main-wrapper">
        <ContactIntro />
        <EnquirySection />
      </main>
    </>
  );
}
