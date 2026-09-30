import type { JournalCategorySlug, JournalPost } from "./types";

/** Newest first. */
export const journal: JournalPost[] = [
  {
    slug: "what-a-brand-system-owes-its-engineers",
    title: "What a brand system owes its engineers.",
    date: "June 12, 2026",
    category: "brand-systems",
    cover: "/assets/images/image-c1c0c139.avif",
    featured: true,
  },
  {
    slug: "designing-in-the-browser",
    title: "Designing in the browser",
    date: "May 5, 2026",
    category: "interface",
    cover: "/assets/images/image-8e4e8541.avif",
    featured: false,
  },
  {
    slug: "inside-a-vantra-studio-week",
    title: "Inside a Vantra studio week",
    date: "April 21, 2026",
    category: "studio",
    cover: "/assets/images/image-0d9f9ece.avif",
    featured: false,
  },
  {
    slug: "why-we-price-in-outcomes",
    title: "Why we price in outcomes, not hours.",
    date: "March 2, 2026",
    category: "practice",
    cover: "/assets/images/image-bda08926.avif",
    featured: true,
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journal.find((post) => post.slug === slug);
}

export function journalInCategory(category: JournalCategorySlug): JournalPost[] {
  return journal.filter((post) => post.category === category);
}
