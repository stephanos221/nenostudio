import { NotFoundMain } from "@/components/sections/error/NotFoundMain";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/404");

export default function NotFoundPage() {
  return (
    <>
      <InitialHidden route="/404" />
      <NotFoundMain />
    </>
  );
}
