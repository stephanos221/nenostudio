import { bracket } from "@/lib/text";

/** An image with its width descriptors; `src` is the largest candidate. */
export interface ResponsiveImage {
  src: string;
  srcSet: readonly { url: string; width: number }[];
}

export interface Principle {
  /** Caption above the title, e.g. `(      Core value 01      )`. */
  label: string;
  title: string;
  text: string;
  /** Modifier class that positions the row in the sticky stack. */
  modifier?: "is-second" | "is-third" | "is-last";
}

interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

interface SnapshotStat {
  label: string;
  value: string;
}

interface Award {
  title: string;
  organisation: string;
  year: string;
}

export const aboutHero = {
  image: {
    src: "/assets/images/image-ac2641e1.avif",
    srcSet: [
      { url: "/assets/images/image-4295981b.avif", width: 500 },
      { url: "/assets/images/image-84f29b5e.avif", width: 800 },
      { url: "/assets/images/image-26847edc.avif", width: 1080 },
      { url: "/assets/images/image-ac2641e1.avif", width: 1500 },
    ],
  },
  label: bracket("The studio", 6),
  heading: ["Built to hold", "together."],
} as const;

export const philosophy = {
  heading: "Our philosophy.",
  text: "Vantra takes on the whole system, not a piece of it. The same senior team stays on the work from the first meeting to launch.",
  strip: [
    {
      src: "/assets/images/image-8834b751.avif",
      srcSet: [
        { url: "/assets/images/image-e93c1776.avif", width: 500 },
        { url: "/assets/images/image-894c3a08.avif", width: 800 },
        { url: "/assets/images/image-8834b751.avif", width: 1000 },
      ],
    },
    {
      src: "/assets/images/image-552a081c.avif",
      srcSet: [
        { url: "/assets/images/image-7ddbe834.avif", width: 500 },
        { url: "/assets/images/image-70766611.avif", width: 800 },
        { url: "/assets/images/image-552a081c.avif", width: 1000 },
      ],
    },
    {
      src: "/assets/images/image-45768e54.avif",
      srcSet: [
        { url: "/assets/images/image-15b2f448.avif", width: 500 },
        { url: "/assets/images/image-c2eedeba.avif", width: 800 },
        { url: "/assets/images/image-45768e54.avif", width: 1000 },
      ],
    },
  ],
} as const;

export const principles: Principle[] = [
  {
    label: bracket("Core value 01", 5, 6),
    title: "Fewer people, further in.",
    text: "A project runs with three or four seniors, not a rotating cast. The people in the first meeting are the people who ship it, and nothing is handed down mid-flight. Fewer hands means fewer translations, and every decision keeps the context that produced it.",
  },
  {
    label: bracket("Core value 02", 6),
    title: "Decide slowly, once.",
    text: "Positioning takes the time it takes. Everything downstream moves faster when the argument underneath it is settled, so we hold the first decision until it holds. Once it does, identity and interface stop being opinions and start being consequences.",
    modifier: "is-second",
  },
  {
    label: bracket("Core value 03", 6),
    title: "Draw what ships.",
    text: "We work in the browser with your engineers from the second week, so what gets approved in review is what goes live. No redraw between sign-off and launch, no handover document standing in for the thing itself, and no surprises in the last fortnight.",
    modifier: "is-third",
  },
  {
    label: bracket("Core value 04", 6),
    title: "Own the whole system.",
    text: "Identity, interface, and content are one problem. We take all three, or we say no and recommend someone else. A system that only half exists does not hold: the parts drift, the rules get reinterpreted, and a year later nothing reads as one brand.",
    modifier: "is-last",
  },
];

export const profile = {
  image: {
    src: "/assets/images/image-4fdca60e.avif",
    srcSet: [
      { url: "/assets/images/image-f68cd1ee.avif", width: 500 },
      { url: "/assets/images/image-cb5e8bd0.avif", width: 800 },
      { url: "/assets/images/image-4fdca60e.avif", width: 1000 },
    ],
  },
  heading: ["2026", "Studio profile."],
  text: "The 2026 Studio Profile sets out how an engagement runs, what each phase costs, and the five practices we take on — everything a first call would cover.",
  cardKind: ". PDF",
  cardTitle: "Studio profile 2026",
} as const;

export const team = {
  heading: ["The people", "on the file."],
  caption: bracket("Six leads, one room"),
  note: "No one you meet leaves the project",
  members: [
    { name: "Mara Ostergaard", role: "Founder, principal designer", photo: "/assets/images/image-c5add160.avif" },
    { name: "Joost Rijkaard", role: "Partner, strategy", photo: "/assets/images/image-f20f4ae6.avif" },
    { name: "Ada Nkemdirim", role: "Design director, product", photo: "/assets/images/image-9e6d6e19.avif" },
    { name: "Kenji Mori", role: "Director, content & motion", photo: "/assets/images/image-33267e90.avif" },
    { name: "Priya Raghunathan", role: "Lead, design systems", photo: "/assets/images/image-d9f82bbb.avif" },
    { name: "Ruben Vale", role: "Studio director", photo: "/assets/images/image-d984fb96.avif" },
  ] satisfies TeamMember[],
};

export const snapshot = {
  heading: "Studio snapshot.",
  action: "Download the profile",
  location: "Independent practice, Amsterdam — Lisbon",
  founded: "Since 2017",
  years: { number: "09", unit: "Years" },
  stats: [
    { label: "Projects shipped", value: "24" },
    { label: "Craft awards", value: "34" },
    { label: "Studio people", value: "24" },
    { label: "Repeat clients", value: "68%" },
  ] satisfies SnapshotStat[],
};

export const awards = {
  heading: ["Awards for", "the work."],
  caption: "( 34 )",
  note: "Judged after launch",
  columns: ["Award", "Organisation", "Year"],
  items: [
    { title: "Site of the Year — Northwind", organisation: "Awwwards", year: "2026" },
    { title: "Brand identity — Sable", organisation: "D&AD Wood Pencil", year: "2025" },
    { title: "Design team of the year", organisation: "Dutch Design Awards", year: "2025" },
    { title: "Film & motion — Halcyon", organisation: "FWA", year: "2024" },
    { title: "Independent studio of the year", organisation: "European Design", year: "2023" },
    { title: "Interface — Fold", organisation: "CSS Design Awards", year: "2023" },
  ] satisfies Award[],
};
