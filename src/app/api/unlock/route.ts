import { createHash, timingSafeEqual } from "node:crypto";
import { readBodyText, rejectOtherMethods } from "@/lib/http";

/** The form posts one field of at most 256 characters. */
const MAX_BODY_BYTES = 4 * 1024;

/** Hashing first gives both sides the same length, which `timingSafeEqual` requires. */
function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function redirectTo(location: string): Response {
  return new Response(null, { status: 303, headers: { Location: location } });
}

/** The `pass` field of a native form post, or `null` when the body is not a form, too large or unreadable. */
async function readSubmittedPassword(request: Request): Promise<string | null> {
  try {
    const body = await readBodyText(request, MAX_BODY_BYTES);
    // Response.formData() parses by the content type: a browser's form post, or nothing usable for any other type.
    const form = await new Response(body, { headers: { "content-type": request.headers.get("content-type") ?? "" } }).formData();
    const value = form.get("pass");
    return typeof value === "string" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Receives the password form of `/401` (a native form post).
 *
 * Environment:
 * - `SITE_PASSWORD`: the password to accept. While it is unset every attempt is rejected.
 *
 * Answers `303 -> /` for the right password and `303 -> /401?e=1` (which shows the error message) for anything else,
 * including a malformed or oversized body. The answer is a plain redirect: nothing is remembered about the visitor, so
 * this page only gates the way in, not the pages behind it. Attempts are not rate limited here; put the route behind
 * the host's rate limiting when the password matters.
 */
export async function POST(request: Request) {
  const expected = process.env.SITE_PASSWORD;
  const submitted = await readSubmittedPassword(request);

  const accepted = !!expected && submitted !== null && timingSafeEqual(digest(submitted), digest(expected));
  return redirectTo(accepted ? "/" : "/401?e=1");
}

/** The route accepts `POST` only. */
export const { GET, HEAD, PUT, PATCH, DELETE, OPTIONS } = rejectOtherMethods("POST");
