"use client";

import { useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import { flushSync } from "react-dom";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { enquiryFields, enquiryMessages, type EnquiryField } from "@/data/contact";
import { cx } from "@/lib/cx";
import { useHydrated } from "@/lib/use-hydrated";

/** What the form is currently showing: `idle` the form alone, otherwise the answer to the last attempt. */
type Outcome = "idle" | "done" | "fail";

function Field({ field: { id, name, label, control, type, required, maxLength, full } }: { field: EnquiryField }) {
  const Control = control;
  return (
    <div className={cx("form_field", full && "is-full")}>
      <label htmlFor={id} className="form_label">
        {label}
      </label>
      <Control
        className={cx("form_input", control === "textarea" && "form_textarea", "form-control")}
        maxLength={maxLength}
        name={name}
        placeholder=""
        type={control === "input" ? type : undefined}
        id={id}
        required={required}
      />
    </div>
  );
}

interface NoteProps {
  className: string;
  label: string;
  shown: boolean;
  ref: Ref<HTMLDivElement>;
  children: ReactNode;
}

/** Result message of the form. Once hydrated it is a focusable, labelled region so the answer can be announced. */
function Note({ className, label, shown, ref, children }: NoteProps) {
  const hydrated = useHydrated();
  const region = hydrated ? ({ tabIndex: -1, role: "region", "aria-label": label } as const) : undefined;

  return (
    <div ref={ref} className={className} style={shown ? { display: "block" } : undefined} {...region}>
      <div>{children}</div>
    </div>
  );
}

/** Reads the fields into the JSON payload `/api/contact` expects. */
function readEnquiry(form: HTMLFormElement): Record<string, FormDataEntryValue | null> {
  const data = new FormData(form);
  return Object.fromEntries(enquiryFields.map(({ key, name }) => [key, data.get(name)]));
}

/**
 * The enquiry form. Native validation runs first; a valid submission is posted to `/api/contact`. Success hides the
 * form and shows the thank-you note, failure shows the error note above a form that stays usable (an earlier note stays
 * up until the next answer replaces it). The note that appears takes focus.
 */
export function EnquiryForm() {
  const [outcome, setOutcome] = useState<Outcome>("idle");
  const sending = useRef(false);
  const doneRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  function settle(next: Exclude<Outcome, "idle">) {
    flushSync(() => setOutcome(next));
    (next === "done" ? doneRef : failRef).current?.focus();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readEnquiry(event.currentTarget)),
      });
      settle(response.ok ? "done" : "fail");
    } catch {
      settle("fail");
    } finally {
      sending.current = false;
    }
  }

  return (
    <div className="form-block form-shell">
      <form
        id="email-form"
        name="email-form"
        method="get"
        aria-label={hydrated ? "Email Form" : undefined}
        className="form_grid"
        style={outcome === "done" ? { display: "none" } : undefined}
        onSubmit={submit}
      >
        {enquiryFields.map((field) => (
          <Field key={field.id} field={field} />
        ))}
        <SubmitButton>{"Let's talk"}</SubmitButton>
      </form>
      <Note ref={doneRef} className="form-done" label="Email Form success" shown={outcome === "done"}>
        {enquiryMessages.done}
      </Note>
      <Note ref={failRef} className="form-fail" label="Email Form failure" shown={outcome === "fail"}>
        {enquiryMessages.fail}
      </Note>
    </div>
  );
}
