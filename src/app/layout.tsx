import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { icons, siteUrl } from "@/lib/metadata";
import MotionRoot from "@/motion/MotionRoot";
import "./globals.css";
import "./fonts.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons,
};

/** Runs before first paint: flags scripting support and touch devices for the stylesheet. */
const platformScript = `!function(d,w){var c=d.documentElement.classList;c.add("js");"ontouchstart"in w&&c.add("is-touch")}(document,window)`;

// The `js`, `is-touch` and motion state classes on <html> are set by scripts, hence suppressHydrationWarning.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: platformScript }} />
      </head>
      <body>
        <MotionRoot />
        {children}
      </body>
    </html>
  );
}
