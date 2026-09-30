import type { WorkSlug } from "./types";

/** One row of the outcome list. */
interface CaseOutcomeRow {
  label: string;
  text: string;
  /** Headline figure shown beside the text. */
  metric: string;
}

/** Long-form content of a case study page; the card-level fields (client, year, category) live in `work.ts`. */
export interface CaseStudy {
  /** Middle part of the hero caption (`Category · discipline · year`). */
  discipline: string;
  /** Project name shown in the hero. */
  title: string;
  hero: string;
  brief: {
    text: string;
    /** One wide frame on its own row, then a narrow and a wide frame side by side. */
    gallery: { wide: string; pair: [narrow: string, wide: string] };
  };
  outcome: {
    image: string;
    title: string;
    intro: string;
    rows: CaseOutcomeRow[];
  };
  quote: {
    image: string;
    /** Time frame shown at the top right of the quote. */
    when: string;
    text: string;
    name: string;
    role: string;
    avatar: string;
  };
}

export const caseStudies: Record<WorkSlug, CaseStudy> = {
  aurel: {
    discipline: "Interface",
    title: "Aurel Audio",
    hero: "/assets/meta/meta-61412eec.avif",
    brief: {
      text: "AUREL+ makes hardware people keep for a decade, paired with an app they replaced every eighteen months. We designed the interface next to their engineers and stayed through build, so the thing that launched was the thing that was drawn.",
      gallery: {
        wide: "/assets/images/image-cf5f2291.avif",
        pair: ["/assets/images/image-045c83a7.avif", "/assets/images/image-2292ee63.avif"],
      },
    },
    outcome: {
      image: "/assets/images/image-1d99e0c3.avif",
      title: "What it did in market.",
      intro: "Measured eighteen months after launch, across two major releases.",
      rows: [
        { label: "Rating", text: "App store rating up from 3.1 to 4.7 across the first six months in market.", metric: "4.7" },
        { label: "Support", text: "Support tickets about setup down 41%, after the pairing flow was cut from nine steps to three.", metric: "−41%" },
        { label: "Build", text: "Every screen reviewed in the browser with the engineers, so nothing shipped as an approximation.", metric: "0 gaps" },
        { label: "Longevity", text: "Eighteen months of releases built on the same foundation, with no rewrite scheduled.", metric: "18 mo" },
      ],
    },
    quote: {
      image: "/assets/images/image-5a4766b2.avif",
      when: "Eighteen months after launch",
      text: "Designers usually leave at the handover. They stayed through build, which is why we shipped what we agreed on.",
      name: "Daniel Okonkwo",
      role: "VP product, Aurel",
      avatar: "/assets/images/image-85758aec.avif",
    },
  },
  fold: {
    discipline: "Design system",
    title: "Fold Apparel",
    hero: "/assets/meta/meta-e965d4f8.avif",
    brief: {
      text: "FOLD+ had three storefronts, two checkout flows and a design file no one trusted. We rebuilt the product surface as one system — tokens, components and templates their engineers own — then shipped the new shop alongside them over eleven weeks.",
      gallery: {
        wide: "/assets/images/image-1017fe04.avif",
        pair: ["/assets/images/image-47b2678e.avif", "/assets/images/image-eda5ec5b.avif"],
      },
    },
    outcome: {
      image: "/assets/images/image-5135ba69.avif",
      title: "What it did in market.",
      intro: "Measured nine months after launch, with their team running the system alone.",
      rows: [
        { label: "Checkout", text: "Checkout completion up 21% on the same traffic, with the three storefronts collapsed into one flow.", metric: "+21%" },
        { label: "Speed", text: "Brief to launch in eleven weeks, designed and built in parallel rather than handed over at the end.", metric: "11 wks" },
        { label: "System", text: "One token set and 64 components now running every surface, named the way their engineers name things.", metric: "180 tokens" },
        { label: "Handover", text: "Two seasonal campaigns shipped by their own team since handover, with nothing redrawn by the studio.", metric: "0 redraws" },
      ],
    },
    quote: {
      image: "/assets/images/image-c1ca6057.avif",
      when: "Nine months after launch",
      text: "The old file was a museum. What we have now is a library our engineers actually pull from, and the shop has not drifted since.",
      name: "Noor Haddad",
      role: "Head of digital, Fold",
      avatar: "/assets/images/image-e70fd08d.avif",
    },
  },
  "halcyon-films": {
    discipline: "Interface",
    title: "Halcyon Films",
    hero: "/assets/meta/meta-f0b5e3d2.avif",
    brief: {
      text: "Four sub-brands, three booking systems, and no line anyone could repeat. Halcyon arrived six months before a three-market launch, and the engagement ran as one piece of work: settle the positioning, draw the identity around it, and ship the interface with their own engineers.",
      gallery: {
        wide: "/assets/images/image-d93486cd.avif",
        pair: ["/assets/images/image-a4b5cdb6.avif", "/assets/images/image-bb927105.avif"],
      },
    },
    outcome: {
      image: "/assets/images/image-bad88490.avif",
      title: "What it did in market.",
      intro: "Measured twelve months after launch, with their own team shipping without us.",
      rows: [
        { label: "Bookings", text: "Completed bookings up 38% in twelve months on the same media spend, with drop-off at the payment step cut by half.", metric: "+38%" },
        { label: "Speed", text: "Brief to launch in nine weeks, with weekly review instead of milestone sign-off, and no phase reopened after approval.", metric: "9 wks" },
        { label: "Reach", text: "Three markets live inside one week, nothing redrawn for local teams, and one set of templates running all of them.", metric: "3 markets" },
        { label: "Handover", text: "A token library and 214 files their team has shipped from ever since, without a single request back to the studio.", metric: "214 files" },
      ],
    },
    quote: {
      image: "/assets/images/image-deb8c821.avif",
      when: "Twelve months after launch",
      // Reproduced verbatim from the source: its line breaks were dropped without leaving spaces.
      text: "“They rebuilt the identity in nine weeks,and we launched in three marketswithout redrawing an asset. A year on,our team still ships from the same library.”",
      name: "Tom Lindqvist",
      role: "Managing director, Halcyon Films",
      avatar: "/assets/images/image-cd09cf05.avif",
    },
  },
  kin: {
    discipline: "Product",
    title: "Kin Ceramics",
    hero: "/assets/meta/meta-538f3946.avif",
    brief: {
      text: "KIN® was launching four product lines a year with a two-person design team. We built the system they needed to keep that pace: tokens, components, documentation, and six weeks of paired work so the handover was a habit rather than an event.",
      gallery: {
        wide: "/assets/images/image-24bde830.avif",
        pair: ["/assets/images/image-f9484a5b.avif", "/assets/images/image-4970a0aa.avif"],
      },
    },
    outcome: {
      image: "/assets/images/image-b4256e67.avif",
      title: "What it did for the team.",
      intro: "Measured fourteen months after handover, with no studio involvement since.",
      rows: [
        { label: "Library", text: "Ninety-six components covering every surface the team ships, documented in one place.", metric: "96" },
        { label: "Pace", text: "Time from brief to live page down 63%, measured across their last eight launches.", metric: "−63%" },
        { label: "Handover", text: "Six weeks of paired work before handover, so the team learned the system by building in it.", metric: "6 wks" },
        { label: "Independence", text: "Fourteen months of launches with no support request back to the studio.", metric: "0 calls" },
      ],
    },
    quote: {
      image: "/assets/images/image-b70b83dd.avif",
      when: "Fourteen months after handover",
      text: "We launch four lines a year with two designers. That is only possible because the system answers most of the questions before they reach us.",
      name: "Sofia Meijer",
      role: "Design lead, Kin",
      avatar: "/assets/images/image-1175007c.avif",
    },
  },
  luma: {
    discipline: "Campaign",
    title: "Luma Collective",
    hero: "/assets/meta/meta-478022c9.avif",
    brief: {
      text: "LUMA® had a launch date and no through-line. We built the campaign around one idea and one shoot, then produced every format — film, stills, social, out of home — from that single body of material rather than adapting it afterwards.",
      gallery: {
        wide: "/assets/images/image-9c475a9a.avif",
        pair: ["/assets/images/image-13576357.avif", "/assets/images/image-997a641b.avif"],
      },
    },
    outcome: {
      image: "/assets/images/image-b233fa7b.avif",
      title: "What it did in market.",
      intro: "Measured three years after the campaign launched.",
      rows: [
        { label: "Through-line", text: "One campaign idea carried across film, print, social and out of home without translation.", metric: "1 idea" },
        { label: "Output", text: "Sixty-two finished assets produced from a single three-day shoot and one grade.", metric: "62 assets" },
        { label: "Cost", text: "Production cost per asset down 29% against their previous campaign, at a higher finish.", metric: "−29%" },
        { label: "Shelf life", text: "Three years of seasonal work still cut from the same library, with no reshoot commissioned.", metric: "3 yrs" },
      ],
    },
    quote: {
      image: "/assets/images/image-aff4003f.avif",
      when: "Three years after launch",
      text: "Everything came from one shoot and one idea. Three years on we are still cutting from that library.",
      name: "Yuki Tanaka",
      role: "Marketing director, Luma",
      avatar: "/assets/images/image-9b2a1cf1.avif",
    },
  },
  meridian: {
    discipline: "Motion",
    title: "Meridian Arts",
    hero: "/assets/meta/meta-e9415c72.avif",
    brief: {
      text: "MERIDIAN+ wanted one film, not a campaign built from fragments. We wrote the treatment, directed the shoot over four days, and cut the long form and every derivative from the same material so nothing looked borrowed.",
      gallery: {
        wide: "/assets/images/image-e9395297.avif",
        pair: ["/assets/images/image-d1d9a2b8.avif", "/assets/images/image-71d7d03a.avif"],
      },
    },
    outcome: {
      image: "/assets/images/image-067c04a4.avif",
      title: "What it did in market.",
      intro: "Measured eight months after the film went live.",
      rows: [
        { label: "Film", text: "A three-minute-forty film that held a 68% completion rate across owned channels.", metric: "3:40" },
        { label: "Derivatives", text: "Twenty-four derivative cuts pulled from the same shoot, with no additional production day.", metric: "24 cuts" },
        { label: "Production", text: "Four shoot days covering the film, the stills library and every social format at once.", metric: "4 days" },
        { label: "Reach", text: "Brand search up 52% in the eight weeks after release, against a flat media spend.", metric: "+52%" },
      ],
    },
    quote: {
      image: "/assets/images/image-1c5b6f4e.avif",
      when: "Eight months after release",
      text: "One team wrote it, shot it and cut it. That is why the thirty-second version still feels like the film and not a trailer for it.",
      name: "Ivan Petrov",
      role: "Brand director, Meridian",
      avatar: "/assets/images/image-febd0a22.avif",
    },
  },
  northwind: {
    discipline: "Naming",
    title: "Northwind Outdoor",
    hero: "/assets/meta/meta-50be8749.avif",
    brief: {
      text: "NORTHWIND had a good product and a name nobody could place. We ran naming and identity as one piece of work — positioning first, then the name, then the marks and rules drawn around it — and wrote the guidelines so their own team could apply it without us.",
      gallery: {
        wide: "/assets/images/image-95847180.avif",
        pair: ["/assets/images/image-53064a0d.avif", "/assets/images/image-fe10fced.avif"],
      },
    },
    outcome: {
      image: "/assets/images/image-61966fab.avif",
      title: "What it did in market.",
      intro: "Measured two years after launch, with the identity unrevised.",
      rows: [
        { label: "Naming", text: "One name cleared in seven markets, chosen from a shortlist of four in the second week.", metric: "1 name" },
        { label: "Recall", text: "Unprompted brand recall up 34% among their core audience, measured a year after launch.", metric: "+34%" },
        { label: "Guidelines", text: "A twenty-eight page guideline their team has applied to two seasons without a studio review.", metric: "28 pp" },
        { label: "Durability", text: "Two years on, the identity has not been revised — only extended, using the rules as written.", metric: "2 yrs" },
      ],
    },
    quote: {
      image: "/assets/images/image-59c5eef2.avif",
      when: "Two years after launch",
      text: "We came in expecting a logo. What we got was a reason for the logo, which is what actually settled the internal arguments.",
      name: "Marta Lindgren",
      role: "Managing director, Northwind",
      avatar: "/assets/images/image-4de5518f.avif",
    },
  },
  sable: {
    discipline: "Art direction",
    title: "Sable Skincare",
    hero: "/assets/meta/meta-19291b79.avif",
    brief: {
      text: "SABLE® was moving from pharmacy shelves to its own stores and needed packaging that read as one range rather than eleven products. We reset the structure, the material and the print in a single pass, and stayed on press for the first run.",
      gallery: {
        wide: "/assets/images/image-49fd5803.avif",
        pair: ["/assets/images/image-e1a83948.avif", "/assets/images/image-5eb076c5.avif"],
      },
    },
    outcome: {
      image: "/assets/images/image-da635575.avif",
      title: "What it did on shelf.",
      intro: "Measured six months after the range reached shelf.",
      rows: [
        { label: "Range", text: "Eleven products redrawn onto one structural system, so a new line adds a size rather than a design.", metric: "11 SKUs" },
        { label: "Cost", text: "Material cost down 18% per unit by moving to a single board weight across the whole range.", metric: "−18%" },
        { label: "Press", text: "Approved on the first press run, with the studio on site to sign off colour and varnish.", metric: "1 run" },
        { label: "Reach", text: "Four markets supplied from one set of dielines, with only the language layer changing.", metric: "4 markets" },
      ],
    },
    quote: {
      image: "/assets/images/image-0882e5b8.avif",
      when: "Six months after launch",
      text: "They specified everything down to the varnish. The first run came off the press looking like the drawings, which had never happened to us before.",
      name: "Elif Demir",
      role: "Founder, Sable",
      avatar: "/assets/images/image-e7b1666d.avif",
    },
  },
};
