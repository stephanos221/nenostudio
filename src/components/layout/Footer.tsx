import Link from "next/link";
import { NavLink } from "@/components/ui/NavLink";
import { footerDescription, footerLinks, footerLocation, footerNav } from "@/data/site";

/** Site footer: brand blurb, navigation, utility pages and credit line. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="padding-global">
        <div className="container-max">
          <div className="footer_wrapper">
            <div className="footer_top">
              <div id="node-e4aa54f1-4304-95a9-5a7f-58214c2b51da-4c2b51d7" className="footer_brand">
                <div className="footer_logo">
                  <img loading="lazy" src="/assets/images/image-6e15e8d9.svg" alt="" />
                </div>
                <div className="footer_brand-content">
                  <p className="footer_paragraph">
                    {footerDescription}
                    <br />
                  </p>
                </div>
              </div>
              <div id="node-e4aa54f1-4304-95a9-5a7f-58214c2b51e0-4c2b51d7" className="footer_nav">
                <div className="footer_nav-list">
                  {footerNav.map((link) => (
                    <NavLink key={link.href} href={link.href} className="footer_nav-link u-inline-block">
                      <div className="footer_nav-text">{link.label}</div>
                    </NavLink>
                  ))}
                </div>
                <div className="footer_links-grid">
                  {footerLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} className="footer_link">
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer_bottom">
              <div>
                {"© 2026 "}
                <Link href="/" className="link is-light">
                  Vantra Studio
                </Link>
                {", powered by "}
                <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="link is-light">
                  Next.js
                </a>
              </div>
              <div className="text-block">{footerLocation}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
