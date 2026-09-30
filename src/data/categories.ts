import type { Category, CategorySlug } from "./types";

/** In filter-bar order. */
export const categories: Category[] = [
  { slug: "brand-identity", label: "Brand identity", heading: ["Work that holds its shape."] },
  { slug: "digital-product", label: "Digital product", heading: ["Work that people use every day."] },
  { slug: "content-motion", label: "Content & motion", heading: ["Work that moves before it speaks."] },
  { slug: "design-systems", label: "Design systems", heading: ["Work that ships without us."] },
  { slug: "packaging", label: "Packaging", heading: ["Work that reaches the shelf."] },
  { slug: "film-campaign", label: "Film & campaign", heading: ["Work that runs at full length."] },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function categoryLabel(slug: CategorySlug): string {
  const category = getCategory(slug);
  if (!category) throw new Error(`Unknown category: ${slug}`);
  return category.label;
}
