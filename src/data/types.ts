/** Head metadata of one route (title, description and social image). */
export interface PageMeta {
  title: string;
  description: string;
  ogImage: string;
  twitterImage?: string;
  /** Extra `<meta name content>` pairs. */
  other?: Record<string, string>;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface MenuLink extends LinkItem {
  /** Generated from a collection: never marked as the current page. */
  fromCollection?: boolean;
}

export interface NavSection {
  label: string;
  meta: string;
  links: MenuLink[];
}

export interface NavLinkRow extends LinkItem {
  meta: string;
}

export type WorkSlug =
  | "aurel"
  | "fold"
  | "halcyon-films"
  | "kin"
  | "luma"
  | "meridian"
  | "northwind"
  | "sable";

export type CategorySlug =
  | "brand-identity"
  | "digital-product"
  | "content-motion"
  | "design-systems"
  | "packaging"
  | "film-campaign";

export type JournalSlug =
  | "designing-in-the-browser"
  | "inside-a-vantra-studio-week"
  | "what-a-brand-system-owes-its-engineers"
  | "why-we-price-in-outcomes";

export type JournalCategorySlug = "brand-systems" | "interface" | "practice" | "studio";

/** A work category (`/categories/[slug]`). */
export interface Category {
  slug: CategorySlug;
  label: string;
  /** Lines of the page `h1`. */
  heading: string[];
}

/** A journal category (`/journal-categories/[slug]`). */
export interface JournalCategory {
  slug: JournalCategorySlug;
  label: string;
  /** Lines of the page `h1`. */
  heading: string[];
}

/** A case study as shown on work cards. */
export interface WorkItem {
  slug: WorkSlug;
  /** Client name as displayed, symbol included (`FOLD+`, `HALCYON®`). */
  client: string;
  year: string;
  category: CategorySlug;
  cover: string;
  /** Shown in the home page selection. */
  featured: boolean;
}

/** A journal post as shown on cards and index rows. */
export interface JournalPost {
  slug: JournalSlug;
  title: string;
  /** Publication date as displayed. */
  date: string;
  category: JournalCategorySlug;
  cover: string;
  /** Shown as a large card. */
  featured: boolean;
}

export interface LiveProject {
  client: string;
  discipline: string;
  /** Week counter, e.g. `Week 7 of 11`. */
  progress: string;
  crew: string;
  /** Filled share of the progress track, in percent. */
  bar: 15 | 30 | 45 | 60 | 75 | 90;
  ships: string;
  /** The source markup ends this row's crew label with a line break. */
  crewTrailingBreak?: boolean;
}

export interface Service {
  /** Index caption, e.g. `(     001     )`. */
  tag: string;
  glyph: string;
  label: string;
  text: string;
}

export interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  quote: string;
  /** The alternate card colouring. */
  alternate?: boolean;
}

export interface TestimonialScore {
  value: string;
  max: string;
  text: string;
  faces: string[];
  facesLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
