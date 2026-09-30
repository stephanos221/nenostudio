import { cx } from "@/lib/cx";
import { ArrowUpRightIcon } from "./icons";

interface SubmitButtonProps {
  /** `brand` (default) or `base` (light fill). */
  variant?: "brand" | "base";
  children: string;
}

/** Form submit button with the arrow chip (the static twin of `Button`). */
export function SubmitButton({ variant = "brand", children }: SubmitButtonProps) {
  const base = variant === "base" && "v-ba2f8215";

  return (
    <button className={cx("button", base)}>
      <div className="button_text">{children}</div>
      <div className={cx("button_chip", base)}>
        <div className={cx("button_icon", base, "u-embed")}>
          <ArrowUpRightIcon />
        </div>
      </div>
    </button>
  );
}
