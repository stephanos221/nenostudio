import { PageShell } from "@/components/layout/PageShell";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <PageShell>{children}</PageShell>;
}
