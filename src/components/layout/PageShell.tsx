import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface PageShellProps {
  /** Renders the footer (default). The not-found page has none. */
  footer?: boolean;
  /** Header tagline; by default it follows the URL. */
  navTitle?: string;
  children: ReactNode;
}

/** Outer page structure: header, page content, footer. */
export function PageShell({ footer = true, navTitle, children }: PageShellProps) {
  return (
    <div className="page-wrapper">
      <Header title={navTitle} />
      {children}
      {footer && <Footer />}
    </div>
  );
}
