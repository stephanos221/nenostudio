"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuArrowIcon, PlusIcon } from "@/components/ui/icons";
import { NavLink } from "@/components/ui/NavLink";
import { menu, menuCta, navTitleFor } from "@/data/site";
import type { MenuLink, NavLinkRow, NavSection } from "@/data/types";

/** Top bar with the logo, the page tagline and the full-screen menu. `title` replaces the tagline derived from the URL. */
export function Header({ title }: { title?: string }) {
  const pathname = usePathname();

  return (
    <header className="header">
      <div data-scrim-action="" className="header-bg hide" />
      <div className="nav_shell">
        <div className="nav_bar">
          <NavLink href="/" aria-label="Vantra home" className="nav_logo-link u-inline-block">
            <img src="/assets/images/image-6e15e8d9.svg" loading="lazy" alt="" className="logo_image" />
          </NavLink>
          <div className="nav_page-title">{title ?? navTitleFor(pathname)}</div>
          <div role="button" aria-label="Menu" className="nav_menu-button">
            <div className="nav_menu-glyph">
              <div className="nav_menu-dot is-a" />
              <div className="nav_menu-dot is-b" />
              <div className="nav_menu-dot is-c" />
              <div className="nav_menu-dot is-d" />
            </div>
          </div>
        </div>
        <div className="nav_panel">
          <div className="nav_panel-inner">
            <nav className="nav_menu-list">
              {menu.map((entry) => (
                <div key={entry.type === "link" ? entry.row.href : entry.section.label} className="nav_menu-loader">
                  {entry.type === "link" ? <MenuRow row={entry.row} /> : <MenuSection section={entry.section} />}
                </div>
              ))}
            </nav>
            <div className="nav_panel-cta-wrap">
              <NavLink href={menuCta.href} className="nav_panel-cta u-inline-block">
                <div>{menuCta.label}</div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuRow({ row }: { row: NavLinkRow }) {
  return (
    <NavLink href={row.href} className="nav_menu-row u-inline-block">
      <div className="nav_menu-label">{row.label}</div>
      <div className="nav_menu-meta">{row.meta}</div>
      <div data-link-action="" className="nav_menu-icon u-embed">
        <MenuArrowIcon />
      </div>
    </NavLink>
  );
}

function MenuSection({ section }: { section: NavSection }) {
  return (
    <div className="nav_submenu">
      <div data-submenu-action="" className="nav_menu-row">
        <div className="nav_menu-label">{section.label}</div>
        <div className="nav_menu-meta">{section.meta}</div>
        <div data-submenu-action="icon" className="nav_menu-icon u-embed">
          <PlusIcon />
        </div>
      </div>
      <div data-submenu-action="content" className="nav_submenu-wrap">
        <div className="nav_submenu-list">
          {section.links.map((link) => (
            <SubmenuLink key={link.href} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubmenuLink({ link }: { link: MenuLink }) {
  const Anchor = link.fromCollection ? Link : NavLink;

  return (
    <Anchor data-submenu-action="item" href={link.href} className="nav_submenu-link u-inline-block">
      <div className="nav_submenu-label">{link.label}</div>
      <div className="nav_submenu-icon u-embed">
        <MenuArrowIcon />
      </div>
    </Anchor>
  );
}
