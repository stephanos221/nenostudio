import type { Metadata } from "next";
import { pages } from "@/data/pages";

/**
 * Public origin that turns the relative image paths of the metadata into absolute URLs: `NEXT_PUBLIC_SITE_URL`, else the
 * production domain Vercel provides at build time, else localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

/** Icons shared by every page; the light and dark 32px variants follow the colour scheme. */
export const icons: Metadata["icons"] = {
  icon: [
    { url: "/assets/images/image-656a7ff7.png", type: "image/png", sizes: "32x32", media: "(prefers-color-scheme: light)" },
    { url: "/assets/images/image-034d9b6e.png", type: "image/png", sizes: "32x32", media: "(prefers-color-scheme: dark)" },
    { url: "/assets/images/image-cd016cc3.png", type: "image/png", sizes: "48x48" },
    { url: "/assets/images/image-5a45645f.png", type: "image/png", sizes: "192x192" },
    { url: "/assets/images/image-2a5fb6a3.png", type: "image/png", sizes: "512x512" },
  ],
  apple: [{ url: "/assets/images/image-75e6fc21.png", sizes: "180x180" }],
};

/** Title, description, Open Graph and Twitter card for a route (`/`, `/work/fold`, ...). */
export function pageMetadata(route: string): Metadata {
  const page = pages[route];
  if (!page) throw new Error(`No metadata for route ${route}`);

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      images: [page.ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      // An empty list stops Next from copying the Open Graph image into twitter:image.
      images: page.twitterImage ? [page.twitterImage] : [],
    },
    other: page.other,
  };
}
