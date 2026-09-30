import { DocPage } from "@/components/sections/docs/DocPage";
import { licenses } from "@/data/docs";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/licenses");

export default function LicensesPage() {
  return (
    <>
      <InitialHidden route="/licenses" />
      <DocPage content={licenses} />
    </>
  );
}
