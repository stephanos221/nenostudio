import localFont from "next/font/local";

/*
 * Self-hosted: the two woff2 files in ./font-files are the exact builds the design was made with (OFL, see
 * font-files/LICENSE.txt), so the build needs no network and glyph rasterisation is identical to the original.
 * Both are variable fonts holding the `latin` subset; every character of the site's copy lies inside it. Anything
 * outside (for example Greek typed into the enquiry form) falls back to the size-adjusted system sans-serif.
 */

/** Body font (`--font-text`): Instrument Sans, weight axis 400-700. */
const instrumentSans = localFont({
  src: "./font-files/instrument-sans-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-text",
});

/** Display font (`--font-display`): Inter, weight axis 100-900. */
const inter = localFont({
  src: "./font-files/inter-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-display",
});

/** Class names that define the font variables; put them on `<html>`. */
export const fontVariables = `${instrumentSans.variable} ${inter.variable}`;
