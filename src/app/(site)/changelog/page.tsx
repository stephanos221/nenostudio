import { DocPage } from "@/components/sections/docs/DocPage";
import { changelog } from "@/data/docs";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/changelog");

export default function ChangelogPage() {
  return (
    <>
      <InitialHidden route="/changelog" />
      <DocPage content={changelog} nested />
    </>
  );
}
