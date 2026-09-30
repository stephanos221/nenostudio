"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

/**
 * Internal link that marks itself as the current page (`is-current` + `aria-current`)
 * when its href is exactly the pathname; hash links never match.
 */
export function NavLink({ href, className, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const current = href === pathname;

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cx(className, current && "is-current")}
      {...props}
    />
  );
}
