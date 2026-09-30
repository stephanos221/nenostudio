/** Text run of a documentation paragraph: plain text, or a link that opens in a new tab. */
type DocRun = string | { href: string; text: string };

interface DocImage {
  src: string;
  srcSet: string;
  sizes: string;
}

/** One block of a documentation page: a heading, its paragraph and optional pictures. */
export interface DocEntry {
  title: string;
  level: 1 | 2;
  /** Heading style class (`heading-style-<size>`). */
  size: "h1" | "h2" | "h3";
  text: readonly DocRun[];
  images?: readonly DocImage[];
}

export interface DocContent {
  /** Column span of the paragraph width class (`max-width_<n>col`). */
  columns: 4 | 5;
  entries: readonly DocEntry[];
}

export const changelog: DocContent = {
  columns: 4,
  entries: [
    {
      title: "Change log",
      level: 1,
      size: "h1",
      text: ["If there is any update or change to the template, you will find it here."],
    },
    { title: "Version 1.0", level: 2, size: "h3", text: ["The template has been released."] },
  ],
};

export const licenses: DocContent = {
  columns: 5,
  entries: [
    {
      title: "Licenses",
      level: 1,
      size: "h1",
      text: [
        "\"All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below.\"",
      ],
    },
    {
      title: "Images",
      level: 2,
      size: "h3",
      text: [
        "All images used across the website are from  ",
        { href: "https://www.magnific.com/", text: "Magnific" },
        " - ",
        { href: "https://www.magnific.com/ai/docs", text: "Magnific license " },
        "and Some photos are original and provided by our team.",
      ],
      images: [
        {
          src: "/assets/images/image-552a081c.avif",
          srcSet:
            "/assets/images/image-7ddbe834.avif 500w, /assets/images/image-70766611.avif 800w, /assets/images/image-552a081c.avif 1000w",
          sizes: "(max-width: 1000px) 100vw, 1000px",
        },
        {
          src: "/assets/images/image-45768e54.avif",
          srcSet:
            "/assets/images/image-15b2f448.avif 500w, /assets/images/image-c2eedeba.avif 800w, /assets/images/image-45768e54.avif 1000w",
          sizes: "(max-width: 479px) 100vw, 480px",
        },
        {
          src: "/assets/images/image-8834b751.avif",
          srcSet:
            "/assets/images/image-e93c1776.avif 500w, /assets/images/image-894c3a08.avif 800w, /assets/images/image-8834b751.avif 1000w",
          sizes: "(max-width: 479px) 100vw, 480px",
        },
      ],
    },
    {
      title: "Fonts",
      level: 2,
      size: "h2",
      text: [
        "Archivo and IBM Plex Mono are licensed under the SIL Open Font License, free for personal and commercial use.This template uses fonts from ",
        { href: "https://fonts.google.com/", text: "Google Fonts" },
        " - ",
        { href: "https://fonts.google.com/knowledge/glossary/licensing", text: "license info" },
      ],
    },
    {
      title: "Icons",
      level: 2,
      size: "h2",
      text: [
        "The icon set is drawn for this template on a 24px grid at 2px stroke. Free to use and modify in your own projects. some icons used across the website are from ",
        { href: "https://icons8.com/", text: "icons8" },
        " - ",
        { href: "https://icons8.com/license", text: "license info " },
        "and some icons featured on this site are sourced from ",
        { href: "https://feathericons.com/", text: "feathericons.com" },
        " , ",
        { href: "https://www.flaticon.com/", text: "flaticon.com" },
        " offering open-source and freely available icons for personal and commercial use.",
      ],
    },
    {
      title: "Template license",
      level: 2,
      size: "h2",
      text: ["One licence covers one end product. Contact us if you need an extended licence for multiple projects."],
    },
  ],
};
