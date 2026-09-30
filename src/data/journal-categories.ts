import type { JournalCategory, JournalCategorySlug } from "./types";

/** In filter-bar order. */
export const journalCategories: JournalCategory[] = [
  { slug: "brand-systems", label: "Brand systems", heading: ["Notes on what holds."] },
  { slug: "practice", label: "Practice", heading: ["Notes on how we work."] },
  { slug: "interface", label: "Interface", heading: ["Notes from the browser."] },
  { slug: "studio", label: "Studio", heading: ["Notes from inside."] },
];

export function getJournalCategory(slug: string): JournalCategory | undefined {
  return journalCategories.find((category) => category.slug === slug);
}

export function journalCategoryLabel(slug: JournalCategorySlug): string {
  const category = getJournalCategory(slug);
  if (!category) throw new Error(`Unknown journal category: ${slug}`);
  return category.label;
}
