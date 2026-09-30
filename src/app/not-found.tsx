import { PageShell } from "@/components/layout/PageShell";
import { NotFoundMain } from "@/components/sections/error/NotFoundMain";
import { NOT_FOUND_NAV_TITLE } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/404");

/** Unknown URLs and `notFound()` calls: the 404 page inside the header-only shell. */
export default function NotFound() {
  return (
    <PageShell footer={false} navTitle={NOT_FOUND_NAV_TITLE}>
      <InitialHidden route="/404" />
      <NotFoundMain />
    </PageShell>
  );
}
