"use client";

/*
 * Enquiry form. Server-rendered, so it is visible with JavaScript off; then the native form posts
 * to mailto: (text/plain) and a <noscript> note gives the address. With JavaScript it validates
 * per field, posts JSON to /api/contact and reports success or failure in a live region.
 */
import { useState } from "react";
import { useTranslations } from "next-intl";

type Field = "name" | "email" | "phone" | "company" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ email }: { email: string }) {
  const t = useTranslations("contactPage.form");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(data: Record<string, string>): Errors {
    const e: Errors = {};
    if (!data.name?.trim()) e.name = t("errRequired");
    if (!data.email?.trim()) e.email = t("errRequired");
    else if (!EMAIL_RE.test(data.email.trim())) e.email = t("errEmail");
    if (!data.message?.trim()) e.message = t("errRequired");
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const found = validate(data);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      form.querySelector<HTMLElement>(`#f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function clear(field: Field) {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  const label = (field: Field, required: boolean) => (
    <label htmlFor={`f-${field}`}>
      {t(field)}
      <small>({required ? t("required") : t("optional")})</small>
    </label>
  );
  const invalid = (field: Field) => (errors[field] ? true : undefined);
  const described = (field: Field, hint?: string) =>
    [hint, errors[field] ? `f-${field}-err` : undefined].filter(Boolean).join(" ") || undefined;
  const err = (field: Field) =>
    errors[field] ? (
      <span className="err" id={`f-${field}-err`}>
        {errors[field]}
      </span>
    ) : null;

  return (
    <form
      className="form"
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="form-title"
    >
      <noscript>
        <p className="noscript">
          {t("noscript")} <a href={`mailto:${email}`}>{email}</a>
        </p>
      </noscript>
      <div className="form-row">
        <div className="fld">
          {label("name", true)}
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={invalid("name")}
            aria-describedby={described("name")}
            onInput={() => clear("name")}
          />
          {err("name")}
        </div>
        <div className="fld">
          {label("company", false)}
          <input id="f-company" name="company" type="text" autoComplete="organization" maxLength={150} />
        </div>
      </div>
      <div className="form-row">
        <div className="fld">
          {label("email", true)}
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={150}
            aria-invalid={invalid("email")}
            aria-describedby={described("email")}
            onInput={() => clear("email")}
          />
          {err("email")}
        </div>
        <div className="fld">
          {label("phone", false)}
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={50} />
        </div>
      </div>
      <div className="fld">
        {label("message", true)}
        <span className="hint" id="f-message-hint">
          {t("messageHint")}
        </span>
        <textarea
          id="f-message"
          name="message"
          rows={6}
          required
          maxLength={4000}
          aria-invalid={invalid("message")}
          aria-describedby={described("message", "f-message-hint")}
          onInput={() => clear("message")}
        />
        {err("message")}
      </div>
      <div className="form-foot">
        <button type="submit" className="btn btn-navy" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
      <div aria-live="polite" role="status">
        {status === "success" && <p className="form-msg ok">{t("success")}</p>}
        {status === "error" && (
          <p className="form-msg bad">
            {t("errorServer")} <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}
      </div>
    </form>
  );
}
