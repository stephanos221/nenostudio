import { cx } from "@/lib/cx";
import { ArrowUpRightIcon } from "./icons";
import { NavLink } from "./NavLink";

interface ButtonProps {
  href: string;
  /** `brand` (default), `base` (light fill) or `ghost` (blurred translucent fill). */
  variant?: "brand" | "base" | "ghost";
  children: string;
}

/** Link button with a rolling label and arrow chip. */
export function Button({ href, variant = "brand", children }: ButtonProps) {
  const base = variant === "base" && "v-34dc6f24";

  return (
    <NavLink data-link-action="link" href={href} className={cx("button", base, variant === "ghost" && "v-d10c3deb", "u-inline-block")}>
      <div className="button_text-col">
        <div data-link-action="text-row-01" className="button_text-row">
          <div className="button_text">{children}</div>
        </div>
        <div data-link-action="text-row-02" className="button_text-row">
          <div className="button_text">{children}</div>
        </div>
      </div>
      <div className={cx("button_chip", base)}>
        <div data-link-action="chip-row-01" className="button_chip-row">
          <div className={cx("button_icon", base, "u-embed")}>
            <ArrowUpRightIcon />
          </div>
        </div>
        <div data-link-action="chip-row-02" className="button_chip-row is-second">
          <div className={cx("button_icon", base, "u-embed")}>
            <ArrowUpRightIcon />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
