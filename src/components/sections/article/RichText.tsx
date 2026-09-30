import { Fragment } from "react";
import type { RichText as RichTextContent } from "@/data/journal-articles";

/** Renders plain text or a run of plain, bold and italic segments. */
export function RichText({ text }: { text: RichTextContent }) {
  if (typeof text === "string") return text;

  return text.map((part, index) => {
    if (typeof part === "string") return <Fragment key={index}>{part}</Fragment>;
    if ("strong" in part) return <strong key={index}>{part.strong}</strong>;
    return <em key={index}>{part.em}</em>;
  });
}
