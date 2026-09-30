"use client";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { useHydrated } from "@/lib/use-hydrated";

/**
 * Password form of the protected-page screen. A native post to `/api/unlock`, which sends a wrong password back to
 * `/401?e=1`; `failed` then reveals the error message. Once hydrated the form carries the accessible name "Email Form"
 * (the export's scripts add it at runtime; the server markup has no `aria-label`).
 */
export function PasswordForm({ failed }: { failed: boolean }) {
  const hydrated = useHydrated();

  return (
    <form
      action="/api/unlock"
      method="post"
      id="email-form"
      name="email-form"
      aria-label={hydrated ? "Email Form" : undefined}
      className="error_inner is-form password-page"
    >
      <label htmlFor="pass" className="field-label password-page" />
      <input
        className="form_input is-inverse password-page form-control"
        autoFocus
        maxLength={256}
        name="pass"
        placeholder="Enter your password"
        type="password"
        id="pass"
      />
      <button className="button light-3">
        {/* "Unlcok" (sic): the label's spelling in the design this site reproduces, kept as is. */}
        <div className="button_text light-4">Unlcok</div>
        <div className="button_chip light-5">
          <div className="button_icon light-6 u-embed">
            <ArrowUpRightIcon />
          </div>
        </div>
      </button>
      <input type="submit" className="submit-button password-page btn-base" value="Submit" />
      <div className="password-message is-error password-page form-fail" style={failed ? { display: "block" } : undefined}>
        <div>Incorrect password. Please try again.</div>
      </div>
    </form>
  );
}
