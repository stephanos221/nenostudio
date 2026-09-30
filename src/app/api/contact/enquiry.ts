import { enquiryFields, type EnquiryKey } from "@/data/contact";

export type Enquiry = Record<EnquiryKey, string>;

type ParseResult = { ok: true; enquiry: Enquiry } | { ok: false; error: string };

/** The rule the form's `type="email"` inputs are held to: something, an `@`, something, no whitespace. */
const EMAIL_PATTERN = /^\S+@\S+$/;

/** Validates an untrusted payload against the same field rules the form markup declares. */
export function parseEnquiry(payload: unknown): ParseResult {
  if (typeof payload !== "object" || payload === null) return { ok: false, error: "Expected a JSON object." };
  const source = payload as Record<string, unknown>;
  const enquiry = {} as Enquiry;

  for (const { key, label, type, required, maxLength } of enquiryFields) {
    const raw = source[key] ?? "";
    if (typeof raw !== "string") return { ok: false, error: `${label} must be text.` };
    const value = raw.trim();

    if (required && !value) return { ok: false, error: `${label} is required.` };
    if (value.length > maxLength) return { ok: false, error: `${label} is too long.` };
    if (type === "email" && !EMAIL_PATTERN.test(value)) return { ok: false, error: `${label} must be a valid email address.` };
    enquiry[key] = value;
  }

  return { ok: true, enquiry };
}
