/** A direct line to the studio, shown as a cell under the contact heading. */
interface DirectContact {
  label: string;
  value: string;
  href: string;
  /** Draws the divider between neighbouring cells. */
  ruled?: boolean;
}

export const directContacts: DirectContact[] = [
  // The phone href (`tel:835:` prefix) is not a dialable URI; it is kept as the design has it. Correct it to
  // `tel:+31202440187` when this becomes a real number.
  { label: "Phone", value: "+31 20 244 0187", href: "tel:835:+31202440187" },
  { label: "Email", value: "hello@vantra.studio", href: "mailto:hello@vantra.studio", ruled: true },
];

/** Keys of the JSON payload the enquiry form sends to `/api/contact`. */
export type EnquiryKey = "name" | "email" | "phone" | "message";

export interface EnquiryField {
  key: EnquiryKey;
  /** Form control name. */
  name: string;
  id: string;
  label: string;
  control: "input" | "textarea";
  type?: "text" | "email" | "tel";
  required: boolean;
  maxLength: number;
  /** Spans the whole form row. */
  full?: boolean;
}

export const enquiryFields: EnquiryField[] = [
  { key: "name", name: "field", id: "name", label: "Your name", control: "input", type: "text", required: true, maxLength: 256, full: true },
  { key: "email", name: "field-2", id: "email", label: "Your email", control: "input", type: "email", required: true, maxLength: 256 },
  { key: "phone", name: "field-3", id: "phone", label: "Your phone", control: "input", type: "tel", required: false, maxLength: 256 },
  { key: "message", name: "field-4", id: "message", label: "Your message", control: "textarea", required: true, maxLength: 5000, full: true },
];

/** Feedback shown in place of the form once a submission has been handled. */
export const enquiryMessages = {
  done: "Thank you! Your submission has been received!",
  fail: "Oops! Something went wrong while submitting the form.",
} as const;
