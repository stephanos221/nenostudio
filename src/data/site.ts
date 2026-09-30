import { categories } from "./categories";
import type { LinkItem, NavLinkRow, NavSection } from "./types";

/** Menu rows in order: plain links and expandable sections. */
type MenuEntry = { type: "link"; row: NavLinkRow } | { type: "section"; section: NavSection };

export const menu: MenuEntry[] = [
  { type: "link", row: { label: "Home", meta: "One team", href: "/" } },
  {
    type: "section",
    section: {
      label: "About",
      meta: "Since 2017",
      links: [
        { label: "The Studio", href: "/about-us" },
        { label: "Our philosophy", href: "/about-us#philosophy" },
        { label: "Core values", href: "/about-us#values" },
        { label: "Studio profile", href: "/about-us#profile" },
        { label: "The team", href: "/about-us#team" },
        { label: "By the numbers", href: "/about-us#numbers" },
        { label: "Recognition", href: "/about-us#awards" },
      ],
    },
  },
  {
    type: "section",
    section: {
      label: "Works",
      meta: "Selected projects",
      links: [
        { label: "All Work", href: "/work" },
        ...categories.map(({ slug, label }) => ({ label, href: `/categories/${slug}`, fromCollection: true })),
      ],
    },
  },
  { type: "link", row: { label: "Journal", meta: "Notes from the studio", href: "/journal" } },
  { type: "link", row: { label: "Contact", meta: "Amsterdam — Lisbon", href: "/contact-us" } },
];

export const menuCta: LinkItem = { label: "Start a project", href: "/contact-us" };

export const footerNav: LinkItem[] = [
  { label: "home", href: "/" },
  { label: "about", href: "/about-us" },
  { label: "works", href: "/work" },
  { label: "Journal", href: "/journal" },
  { label: "contact", href: "/contact-us" },
];

export const footerLinks: LinkItem[] = [
  { label: "Style Guide", href: "/style-guide" },
  { label: "Custom 404", href: "/404" },
  { label: "Licenses", href: "/licenses" },
  { label: "Custom 401", href: "/401" },
  { label: "Change Log", href: "/changelog" },
];

export const footerDescription =
  "Vantra is an independent studio working across brand, product, and content. We partner with founders and in-house teams on positioning, identity systems, and the digital products that carry them.";

export const footerLocation = "Amsterdam — Lisbon";

const DEFAULT_NAV_TITLE = "One team, no handoffs";
/** The line for the not-found page (unknown URLs and `/404`), which passes it to the header (see `navTitleFor`). */
export const NOT_FOUND_NAV_TITLE = "Lost your way?";

const navTitles: Record<string, string> = {
  "/about-us": "Who is behind this?",
  "/work": "Selected work, 2017–2026",
  "/journal": "Notes from the studio",
  "/contact-us": "What are you building?",
};

const navTitlesBySection: Record<string, string> = {
  work: "Measured a year on",
  journal: "Still reading?",
  categories: "Work by discipline",
};

/**
 * The line shown in the middle of the header bar. It does not know which paths exist (that would pull every page's
 * metadata into the client bundle), so the not-found page overrides it with `NOT_FOUND_NAV_TITLE`.
 */
export function navTitleFor(pathname: string): string {
  const [, section, child] = pathname.split("/");
  return navTitles[pathname] ?? (child ? navTitlesBySection[section] : undefined) ?? DEFAULT_NAV_TITLE;
}
