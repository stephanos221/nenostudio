const NBSP = "\u00a0";

/** Wraps a label in the site's parenthesised style, padded with non-breaking spaces. */
export function bracket(text: string, pad = 4, padEnd = pad): string {
  return `(${NBSP.repeat(pad)}${text}${NBSP.repeat(padEnd)})`;
}
