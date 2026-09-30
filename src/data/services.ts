import { bracket } from "@/lib/text";
import type { Service } from "./types";

export const services: Service[] = [
  {
    tag: bracket("001", 5),
    glyph: "/assets/images/image-a6a4dd94.svg",
    label: "Brand systems",
    text: "Naming, identity, and the rules that keep it holding together.",
  },
  {
    tag: bracket("002", 5),
    glyph: "/assets/images/image-7163a142.svg",
    label: "Positioning",
    text: "Research and strategy that settle what the brand is for.",
  },
  {
    tag: bracket("003", 5, 4),
    glyph: "/assets/images/image-b6627b5f.svg",
    label: "Digital product",
    text: "Interfaces designed and built with the team who ships them.",
  },
  {
    tag: bracket("003", 5, 4),
    glyph: "/assets/images/image-7163a142.svg",
    label: "Digital product",
    text: "Interfaces designed and built with the team who ships them.",
  },
];
