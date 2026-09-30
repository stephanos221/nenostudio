import type { CategorySlug, WorkItem } from "./types";

/** In the order of the work index. */
export const work: WorkItem[] = [
  {
    slug: "fold",
    client: "FOLD+",
    year: "2026",
    category: "digital-product",
    cover: "/assets/images/image-6e195158.avif",
    featured: true,
  },
  {
    slug: "halcyon-films",
    client: "HALCYON®",
    year: "2026",
    category: "brand-identity",
    cover: "/assets/images/image-96f7c9f7.avif",
    featured: true,
  },
  {
    slug: "kin",
    client: "KIN®",
    year: "2025",
    category: "design-systems",
    cover: "/assets/images/image-0acd1842.avif",
    featured: false,
  },
  {
    slug: "meridian",
    client: "MERIDIAN+",
    year: "2025",
    category: "film-campaign",
    cover: "/assets/images/image-a280ffb7.avif",
    featured: true,
  },
  {
    slug: "sable",
    client: "SABLE®",
    year: "2025",
    category: "packaging",
    cover: "/assets/images/image-5b28e3aa.avif",
    featured: true,
  },
  {
    slug: "aurel",
    client: "AUREL+",
    year: "2024",
    category: "digital-product",
    cover: "/assets/images/image-a63c2050.avif",
    featured: false,
  },
  {
    slug: "northwind",
    client: "NORTHWIND",
    year: "2024",
    category: "brand-identity",
    cover: "/assets/images/image-0896dcbf.avif",
    featured: false,
  },
  {
    slug: "luma",
    client: "LUMA®",
    year: "2023",
    category: "content-motion",
    cover: "/assets/images/image-4f55317f.avif",
    featured: false,
  },
];

export function getWorkItem(slug: string): WorkItem | undefined {
  return work.find((item) => item.slug === slug);
}

export function workInCategory(category: CategorySlug): WorkItem[] {
  return work.filter((item) => item.category === category);
}
