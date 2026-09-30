import { BodyTooLargeError, hasContentType, readBodyText, rejectOtherMethods } from "@/lib/http";
import { parseEnquiry } from "./enquiry";

/** Room for the four capped fields (the message alone is up to 5000 characters) plus JSON escaping. */
const MAX_BODY_BYTES = 32 * 1024;
const WEBHOOK_TIMEOUT_MS = 10_000;

const fail = (error: string, status: number) => Response.json({ ok: false, error }, { status });

/**
 * Receives the enquiry form as JSON: `{ name, email, phone, message }`.
 *
 * Environment:
 * - `CONTACT_WEBHOOK_URL` (optional): every valid submission is forwarded there as a JSON POST. Without it the
 *   submission is acknowledged but discarded; only a redacted note (no name, email or message text) reaches the log.
 *
 * Responses: `200 { ok: true }`; `400` for an invalid payload; `413` for a body over 32 KB; `415` when the body is not
 * `application/json` (which also keeps other sites from posting to it with a plain cross-site form); `502` when the
 * webhook could not be reached or rejected the submission. Every error answers `{ ok: false, error }`.
 */
export async function POST(request: Request) {
  if (!hasContentType(request, "application/json")) return fail("Send the enquiry as application/json.", 415);

  let payload: unknown = null;
  try {
    payload = JSON.parse(await readBodyText(request, MAX_BODY_BYTES));
  } catch (error) {
    if (error instanceof BodyTooLargeError) return fail("The enquiry is too large.", 413);
  }

  const result = parseEnquiry(payload);
  if (!result.ok) return fail(result.error, 400);
  const { enquiry } = result;

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.info(
      `[contact] CONTACT_WEBHOOK_URL is not set, enquiry not delivered (message: ${enquiry.message.length} characters, phone: ${enquiry.phone ? "given" : "none"})`,
    );
    return Response.json({ ok: true });
  }

  try {
    const forwarded = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!forwarded.ok) throw new Error(`webhook answered ${forwarded.status}`);
  } catch (error) {
    // Only the message: the webhook URL usually carries a secret and the enquiry is personal data.
    console.error(`[contact] could not forward the enquiry: ${error instanceof Error ? error.message : "unknown error"}`);
    return fail("The enquiry could not be delivered.", 502);
  }
  return Response.json({ ok: true });
}

/** The route accepts `POST` only. */
export const { GET, HEAD, PUT, PATCH, DELETE, OPTIONS } = rejectOtherMethods("POST");
