import type { JournalSlug } from "./types";

/** Bold or italic run inside a paragraph, heading, list item or quote. */
type Inline = string | { strong: string } | { em: string };

/** Text without formatting is a plain string. */
export type RichText = string | Inline[];

export type ArticleBlock =
  | { type: "paragraph"; text: RichText }
  | { type: "heading"; level: 2 | 3; text: RichText }
  | { type: "quote"; text: RichText }
  | { type: "list"; ordered: boolean; items: RichText[] };

export interface Author {
  name: string;
  role: string;
  portrait: string;
}

/** Long-form content of a journal post; the card-level fields (title, date, category) live in `journal.ts`. */
export interface JournalArticle {
  hero: string;
  author: Author;
  body: ArticleBlock[];
}

const authors = {
  ines: { name: "Inês Carvalho", role: "Design director", portrait: "/assets/images/image-9b2a1cf1.avif" },
  priya: { name: "Priya Raman", role: "Interface lead", portrait: "/assets/images/image-febd0a22.avif" },
  mattis: { name: "Mattis Højgaard", role: "Founder", portrait: "/assets/images/image-e7b1666d.avif" },
} satisfies Record<string, Author>;

/** The rich-text editor's spacer: an "empty" paragraph that actually holds this invisible character. */
const ZERO_WIDTH_JOINER = "‍";

export const journalArticles: Record<JournalSlug, JournalArticle> = {
  "what-a-brand-system-owes-its-engineers": {
    hero: "/assets/meta/meta-0e2e2129.avif",
    author: authors.ines,
    body: [
      { type: "heading", level: 2, text: [{ strong: "A brand system is not a PDF. It is the set of decisions an engineer can act on without asking a designer." }] },
      { type: "paragraph", text: "Most identity work arrives as a document: a wordmark, a palette, a grid, and forty pages explaining them. Then the build starts, and every page raises a question the document never answered. What is the hover state? What happens at 390px? Which grey is the disabled grey? The team guesses, and a year later the product and the brand no longer look related." },
      { type: "paragraph", text: "We treat the system as production work from the second week. Colour, type, spacing and radius are written as tokens with the names the engineers will use in their own panel, not as swatches in a deck. Components are drawn against real content — the longest client name, the shortest headline — and reviewed in the browser rather than in a mockup." },
      { type: "quote", text: "If a rule cannot be written as a token or a component, it is not a rule yet — it is a preference." },
      { type: "paragraph", text: "What ends up documented is narrow on purpose: the decisions that repeat. Everything else stays in the components, where it cannot drift. The handover is a library and a short README, not a manual, and the studio stays on the file for the first weeks in market so the first exceptions get answered by the people who set the rules." },
      { type: "paragraph", text: "A year after launch, the test is simple: can their team ship a new page without calling us, and does it still read as the same brand? On Halcyon, three markets went live in one week and nothing was redrawn after handover. That is the only measure of a system we trust." },
      { type: "paragraph", text: ZERO_WIDTH_JOINER },
    ],
  },
  "designing-in-the-browser": {
    hero: "/assets/meta/meta-1bf72ab9.avif",
    author: authors.priya,
    body: [
      { type: "paragraph", text: "A mockup is a picture of a product. It has no scroll, no keyboard, no slow network, no content that ran long. Every one of those arrives later, and by then the person who drew the picture has usually moved on." },
      { type: "heading", level: 2, text: "The mockup lies in four specific ways" },
      {
        type: "list",
        ordered: false,
        items: [
          [{ strong: "Length" }, " — the client name is eight characters in the mockup and thirty-two in the database"],
          [{ strong: "Motion" }, " — a static frame cannot show you that a transition is 200ms too slow"],
          [{ strong: "Between sizes" }, " — three artboards say nothing about the 400px of width where the layout actually breaks"],
          [{ strong: "State" }, " — empty, loading, error and disabled almost never get drawn, and they are most of the product"],
        ],
      },
      { type: "paragraph", text: "None of these are drafting mistakes. They are things the medium cannot represent, which is why more careful mockups do not fix them." },
      { type: "heading", level: 2, text: "What we do instead" },
      { type: "paragraph", text: "We still draw. Direction, type, colour and layout are settled in a design file, because that is the fastest place to be wrong cheaply. But the moment a route is chosen, it moves into the browser and the design file stops being the source of truth." },
      { type: "paragraph", text: ["From the second week of a build, every review is a URL. The client sees the real thing on their own laptop, at their own window size, with their own content in it. Feedback arrives as ", { em: "this feels slow" }, " and ", { em: "this wraps badly on my screen" }, ", which are the notes worth having."] },
      { type: "quote", text: "If the engineers only see the work after it is approved, you have not designed a product — you have specified one and hoped." },
      { type: "heading", level: 2, text: "What it asks of the team" },
      { type: "paragraph", text: "Designers need to read the markup even if they never write it. Engineers need to be in the review, not downstream of it. And the studio has to accept that the file which looked perfect on Tuesday is not the deliverable — the build is." },
      { type: "heading", level: 3, text: "The measurable part" },
      { type: "paragraph", text: "On our last four product engagements the change was consistent: the number of visual defects raised after handover fell to a handful, because the state where a defect would have appeared had already been looked at in a browser by the two people who would otherwise argue about it." },
      { type: "paragraph", text: "The mockup is still useful. It is just not the deliverable, and treating it as one is what puts a year of drift between the design and the product." },
    ],
  },
  "inside-a-vantra-studio-week": {
    hero: "/assets/meta/meta-3f898a41.avif",
    author: authors.mattis,
    body: [
      { type: "paragraph", text: "People ask what a twenty-four person studio does all week, and the honest answer is that most of it is protected from interruption on purpose. Here is the shape of it." },
      { type: "heading", level: 2, text: "Monday: one meeting" },
      { type: "paragraph", text: "Everything that needs the whole studio happens on Monday morning and nowhere else. Ninety minutes: what shipped, what is blocked, what changes this week. Every project has a single lead who speaks for it. Nobody presents slides." },
      { type: "paragraph", text: "The point of the constraint is the other four days. If a decision can wait until Monday, it waits. If it cannot, it belongs to the project lead and not to a meeting." },
      { type: "heading", level: 2, text: "Tuesday to Thursday: craft time" },
      { type: "paragraph", text: "Three days with no studio-wide calendar. Client reviews are booked inside them, never across them, and always in the afternoon. The morning belongs to the work." },
      {
        type: "list",
        ordered: true,
        items: [
          "No internal meetings before 13:00, for anyone, including the founders",
          "Reviews happen in the browser, on the real build, never on a static board",
          "A project is walked through by the person who made it, not by an account lead",
        ],
      },
      { type: "paragraph", text: "This is the part most studios say they want and most studios lose first, because a calendar fills from the outside in unless someone defends it. Ours is defended by refusing the meeting, not by scheduling around it." },
      { type: "quote", text: "Craft time is not a perk. It is the only interval long enough for the second idea to arrive." },
      { type: "heading", level: 2, text: "Friday: shipping and the cut" },
      { type: "paragraph", text: "Friday is for the unglamorous half — production files, handover notes, the components nobody demos. It is also when we cut. Every project ends the week with something removed: a screen that was hedging, a variant nobody chose, a section that existed because the page felt short." },
      { type: "heading", level: 3, text: "What does not happen" },
      { type: "paragraph", text: "We do not do all-nighters, we do not do weekend pushes, and we have never moved a launch by working longer instead of deciding sooner. Nine years of evidence says the deadline problem is almost always a decision problem two weeks upstream." },
      { type: "paragraph", text: "None of this is a productivity system. It is a set of refusals, and the refusals are what the clients are actually buying." },
    ],
  },
  "why-we-price-in-outcomes": {
    hero: "/assets/meta/meta-f4c9450a.avif",
    author: authors.ines,
    body: [
      { type: "paragraph", text: "Every studio that bills by the hour is quietly betting against itself. The faster you get, the less you earn. The more experience you bring to a problem, the smaller the invoice. Nine years in, we were solving in two days what used to take two weeks, and being paid less for it." },
      { type: "heading", level: 2, text: "What the hour actually measures" },
      { type: "paragraph", text: "An hour measures attendance, not outcome. It tells a client how long someone sat with their problem, which is the one thing about the engagement they have no reason to care about. It also puts the two parties on opposite sides of the same number: they want fewer hours, we want more, and every conversation about scope becomes a negotiation about time rather than about the work." },
      { type: "paragraph", text: "Worse, it makes the good version of a project the expensive one. A client who asks for a second round of exploration is asking for a bigger bill, so they stop asking. The work gets narrower exactly where it should get wider." },
      { type: "heading", level: 2, text: "How a Vantra Studio phase is priced" },
      { type: "paragraph", text: "We agree a fixed fee per phase before the phase starts. Four numbers, four dates, signed once. What sits inside each fee is written plainly:" },
      {
        type: "list",
        ordered: false,
        items: [
          [{ strong: "Discovery" }, " — interviews, audit, positioning, and the written brief everything else is measured against"],
          [{ strong: "Direction" }, " — two or three routes, taken far enough to judge, presented in context rather than on a board"],
          [{ strong: "Build" }, " — the chosen route drawn out in full, with the components and tokens the team will actually use"],
          [{ strong: "Launch" }, " — production files, handover, and the first weeks in market with us still on the file"],
        ],
      },
      { type: "paragraph", text: "If a phase takes us longer than planned, that is our problem, not an invoice. If it takes less, the client keeps the difference in scope, not in change." },
      { type: "quote", text: "The only honest way to charge more is to be worth more to the business, not to be slower at the desk." },
      { type: "heading", level: 2, text: "What changes in the room" },
      { type: "paragraph", text: ["Fixed fees change the conversation on day one. Nobody counts revisions. Nobody asks whether a call is billable. The question stops being ", { em: "how much will this cost" }, " and becomes ", { em: "is this the right thing to make" }, " — which is the question we are actually useful for."] },
      { type: "paragraph", text: "It also forces us to be honest about scope before the work starts. A fixed fee is only safe if the brief is sharp, so the brief gets sharp. Discovery earns its place not because clients enjoy paying for it, but because it is what makes the other three numbers believable." },
      { type: "heading", level: 3, text: "The part that is harder" },
      { type: "paragraph", text: "We turn down more work than we used to. A project with an undefined shape cannot be priced fixed, and pretending otherwise just moves the risk somewhere it will surface later. When a brief is genuinely unknown, we sell the discovery phase alone and price the rest after — which sometimes means the rest never happens, and that is a fair outcome." },
    ],
  },
};
