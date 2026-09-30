import type { ReactNode } from "react";
import { Heading } from "@/components/ui/Heading";

/** Section title on the left, its lead-in text (`children`) on the right. */
export function CaseIntro({ children }: { children: ReactNode }) {
  return (
    <div className="section_header is-grid">
      <div className="heading-container">
        <Heading size="h2">The brief.</Heading>
      </div>
      <div className="section_header-text-wrap">{children}</div>
    </div>
  );
}
