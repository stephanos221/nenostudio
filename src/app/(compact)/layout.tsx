import { PageShell } from "@/components/layout/PageShell";
import { NOT_FOUND_NAV_TITLE } from "@/data/site";

/** Header only, no footer (the 404 page). */
export default function CompactLayout({ children }: LayoutProps<"/">) {
  return (
    <PageShell footer={false} navTitle={NOT_FOUND_NAV_TITLE}>
      {children}
    </PageShell>
  );
}
