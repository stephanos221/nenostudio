/** Helpers shared by the route handlers under `src/app/api`. */

/** Marker for a request body that is larger than the handler accepts. */
export class BodyTooLargeError extends Error {
  constructor(readonly limit: number) {
    super(`Request body exceeds ${limit} bytes`);
  }
}

/**
 * Reads the request body as text, refusing anything longer than `limit` bytes.
 * The `Content-Length` header is checked first, then the stream is counted so a missing or false header cannot get
 * around the limit. Throws `BodyTooLargeError`.
 */
export async function readBodyText(request: Request, limit: number): Promise<string> {
  const declared = Number(request.headers.get("content-length"));
  if (declared > limit) throw new BodyTooLargeError(limit);
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > limit) {
      await reader.cancel();
      throw new BodyTooLargeError(limit);
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

/** `true` when the request's `Content-Type` is the given media type, whatever its parameters (`; charset=utf-8`). */
export function hasContentType(request: Request, mediaType: string): boolean {
  const header = request.headers.get("content-type") ?? "";
  return header.split(";")[0].trim().toLowerCase() === mediaType;
}

/**
 * Handlers for every method a route does not implement: `405` with an `Allow` header naming `method`, and an `OPTIONS`
 * answer that names the same (Next.js would otherwise list the 405 handlers' methods as allowed).
 * Usage: `export const { GET, HEAD, PUT, PATCH, DELETE, OPTIONS } = rejectOtherMethods("POST");`
 */
export function rejectOtherMethods(method: string) {
  const allow = `${method}, OPTIONS`;
  const notAllowed = () => new Response(null, { status: 405, headers: { Allow: allow } });
  return {
    GET: notAllowed,
    HEAD: notAllowed,
    PUT: notAllowed,
    PATCH: notAllowed,
    DELETE: notAllowed,
    OPTIONS: () => new Response(null, { status: 204, headers: { Allow: allow } }),
  };
}
