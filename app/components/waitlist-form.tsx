"use client";

import Link from "next/link";
import { useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from "react";
import type { Locale } from "../i18n/config";
import type { Dictionary } from "../i18n/dictionaries";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xljjjqyr";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Record<string, string>;
type FormText = Dictionary["form"];

const RADIO_FIELDS = ["usaIA", "usaAutomatizaciones", "pagaria", "valor"];

/*
 * Campos obligatorios en orden de aparición, con el texto del resumen de errores
 * y el mensaje que se muestra si están vacíos.
 */
function requiredFields(t: FormText) {
  return [
    { name: "nombre", label: t.labels.nombre, message: t.errors.nombre },
    { name: "apellidos", label: t.labels.apellidos, message: t.errors.apellidos },
    { name: "email", label: t.labels.email, message: t.errors.email },
    { name: "cargo", label: t.labels.cargo, message: t.errors.cargo },
    { name: "personas", label: t.labels.personas, message: t.errors.personas },
    { name: "sector", label: t.labels.sector, message: t.errors.sector },
    { name: "problema", label: t.summaryLabels.problema, message: t.errors.problema },
    { name: "usaIA", label: t.labels.usaIA, message: t.errors.option },
    { name: "usaAutomatizaciones", label: t.labels.usaAutomatizaciones, message: t.errors.option },
    { name: "pagaria", label: t.labels.pagaria, message: t.errors.option },
    { name: "valor", label: t.summaryLabels.valor, message: t.errors.option },
    { name: "privacidad", label: t.labels.privacidad, message: t.errors.privacidad },
  ];
}

/* Id del elemento al que enfocar o enlazar desde el resumen de errores. */
const focusId = (name: string) => (RADIO_FIELDS.includes(name) ? `${name}-0` : name);

function validateField(form: HTMLFormElement, name: string, t: FormText): string {
  const field = requiredFields(t).find((f) => f.name === name);
  if (!field) return "";
  const item = form.elements.namedItem(name);
  const el = item instanceof RadioNodeList ? (item[0] as HTMLInputElement) : (item as HTMLInputElement | null);
  if (!el) return "";
  if (el.validity.valueMissing) return field.message;
  if (el.validity.typeMismatch && name === "email") return t.errors.emailInvalid;
  return "";
}

const inputBase =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition focus:ring-2";
const inputOk = "border-control focus:border-accent focus:ring-accent/25";
const inputInvalid = "border-danger focus:border-danger focus:ring-danger/25";
const inputClass = (invalid: boolean) => `${inputBase} ${invalid ? inputInvalid : inputOk}`;

/* Atributos de accesibilidad comunes a todos los controles. */
const a11y = (name: string, errors: Errors) => ({
  "aria-invalid": errors[name] ? true : undefined,
  "aria-describedby": errors[name] ? `${name}-error` : undefined,
});

function RequiredMark({ optional }: { optional?: string }) {
  return optional ? (
    <span className="ml-1 font-normal text-muted">{optional}</span>
  ) : (
    <span aria-hidden className="ml-0.5 text-foreground">
      *
    </span>
  );
}

function ErrorMessage({ name, error }: { name: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
      <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden>
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.75-11.5a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4zM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          clipRule="evenodd"
        />
      </svg>
      {error}
    </p>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-soft">
        {label}
        <RequiredMark optional={optional} />
      </label>
      {hint && (
        <p id={`${htmlFor}-hint`} className="-mt-0.5 mb-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {children}
      <ErrorMessage name={htmlFor} error={error} />
    </div>
  );
}

function Select({
  id,
  options,
  placeholder,
  errors,
}: {
  id: string;
  options: string[];
  placeholder: string;
  errors: Errors;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required
        defaultValue=""
        className={`${inputClass(!!errors[id])} appearance-none pr-10`}
        {...a11y(id, errors)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      >
        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* Opciones excluyentes como botones segmentados. */
function Segmented({
  name,
  legend,
  options,
  errors,
}: {
  name: string;
  legend: string;
  options: string[];
  errors: Errors;
}) {
  const invalid = !!errors[name];
  return (
    <fieldset>
      <legend id={`${name}-legend`} className="mb-2 text-sm font-medium text-soft">
        {legend}
        <RequiredMark />
      </legend>
      <div
        role="radiogroup"
        aria-labelledby={`${name}-legend`}
        aria-required
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${name}-error` : undefined}
        className="grid auto-cols-fr grid-flow-col gap-2"
      >
        {options.map((o, i) => (
          <label key={o} className="cursor-pointer">
            <input id={`${name}-${i}`} type="radio" name={name} value={o} required className="peer sr-only" />
            <span
              className={`block rounded-lg border bg-background px-3 py-2.5 text-center text-sm text-muted transition hover:text-foreground peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 ${
                invalid ? "border-danger" : "border-control"
              }`}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
      <ErrorMessage name={name} error={errors[name]} />
    </fieldset>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-5 border-t border-border pt-6 first:border-t-0 first:pt-0 sm:grid-cols-2">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted sm:col-span-2">{title}</p>
      {children}
    </div>
  );
}

export function WaitlistForm({ lang, t }: { lang: Locale; t: FormText }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  // Campos que la persona ya ha tocado: solo se validan al salir de ellos a partir de entonces.
  const touched = useRef(new Set<string>());
  const sending = status === "sending";
  const fields = requiredFields(t);

  function updateError(form: HTMLFormElement, name: string) {
    const message = validateField(form, name, t);
    setErrors((prev) => {
      if ((prev[name] ?? "") === message) return prev;
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  }

  function handleChange(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    if (!target.name) return;
    touched.current.add(target.name);
    // Si el campo tenía error, se revalida al momento para quitarlo en cuanto se corrige.
    if (errors[target.name]) updateError(e.currentTarget, target.name);
  }

  function handleBlur(e: FocusEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement as HTMLInputElement;
    if (!target.name || target.type === "radio") return;
    if (attempted || touched.current.has(target.name)) updateError(e.currentTarget, target.name);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const found: Errors = {};
    for (const { name } of fields) {
      const message = validateField(form, name, t);
      if (message) found[name] = message;
    }
    setAttempted(true);
    setErrors(found);

    const first = fields.find((f) => found[f.name]);
    if (first) {
      document.getElementById(focusId(first.name))?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree respondió ${res.status}`);
      form.reset();
      touched.current.clear();
      setAttempted(false);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center sm:p-10"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-2xl">
          <span aria-hidden>✅</span>
        </div>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">{t.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted">{t.successText}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm text-muted underline-offset-4 transition hover:text-foreground hover:underline"
        >
          {t.again}
        </button>
      </div>
    );
  }

  const errorList = fields.filter((f) => errors[f.name]);

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      onBlur={handleBlur}
      action={FORMSPREE_ENDPOINT}
      method="POST"
      noValidate
      aria-busy={sending}
      aria-describedby="form-nota"
      className="space-y-6 rounded-2xl border border-border bg-surface p-5 sm:p-8"
    >
      <input type="hidden" name="source" value="saikiu-web" />
      <input type="hidden" name="idioma" value={lang} />
      <input type="hidden" name="_subject" value={t.subject} />
      {/* Honeypot anti-spam de Formspree: los usuarios reales no lo ven ni lo rellenan. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <p id="form-nota" className="text-sm text-muted">
        {t.requiredNote} <span className="font-semibold text-foreground">*</span> {t.requiredNoteEnd}
      </p>

      {attempted && errorList.length > 0 && (
        <div role="alert" className="rounded-lg border border-danger bg-background px-4 py-3 text-sm">
          <p className="font-medium text-danger">
            {errorList.length === 1 ? t.summaryOne : t.summaryMany.replace("{n}", String(errorList.length))}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
            {errorList.map((f) => (
              <li key={f.name}>
                <a
                  href={`#${focusId(f.name)}`}
                  onClick={(e) => {
                    const el = document.getElementById(focusId(f.name));
                    if (!el) return;
                    e.preventDefault();
                    el.scrollIntoView({ block: "center" });
                    el.focus({ preventScroll: true });
                  }}
                  className="underline underline-offset-4 hover:no-underline"
                >
                  {f.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Group title={t.groups.about}>
        <Field label={t.labels.nombre} htmlFor="nombre" error={errors.nombre}>
          <input
            id="nombre"
            name="nombre"
            required
            autoComplete="given-name"
            className={inputClass(!!errors.nombre)}
            {...a11y("nombre", errors)}
          />
        </Field>
        <Field label={t.labels.apellidos} htmlFor="apellidos" error={errors.apellidos}>
          <input
            id="apellidos"
            name="apellidos"
            required
            autoComplete="family-name"
            className={inputClass(!!errors.apellidos)}
            {...a11y("apellidos", errors)}
          />
        </Field>
        <Field label={t.labels.email} htmlFor="email" error={errors.email} className="sm:col-span-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.placeholders.email}
            className={inputClass(!!errors.email)}
            {...a11y("email", errors)}
          />
        </Field>
      </Group>

      <Group title={t.groups.activity}>
        <Field label={t.labels.cargo} htmlFor="cargo" error={errors.cargo}>
          <input
            id="cargo"
            name="cargo"
            required
            autoComplete="organization-title"
            placeholder={t.placeholders.cargo}
            className={inputClass(!!errors.cargo)}
            {...a11y("cargo", errors)}
          />
        </Field>
        <Field label={t.labels.empresa} htmlFor="empresa" optional={t.optional} hint={t.empresaHint}>
          <input
            id="empresa"
            name="empresa"
            autoComplete="organization"
            aria-describedby="empresa-hint"
            className={inputClass(false)}
          />
        </Field>
        <Field label={t.labels.personas} htmlFor="personas" error={errors.personas}>
          <Select id="personas" options={t.options.personas} placeholder={t.selectPlaceholder} errors={errors} />
        </Field>
        <Field label={t.labels.sector} htmlFor="sector" error={errors.sector}>
          <Select id="sector" options={t.options.sector} placeholder={t.selectPlaceholder} errors={errors} />
        </Field>
      </Group>

      <Group title={t.groups.situation}>
        <Field label={t.labels.problema} htmlFor="problema" error={errors.problema} className="sm:col-span-2">
          <textarea
            id="problema"
            name="problema"
            required
            rows={4}
            placeholder={t.placeholders.problema}
            className={`${inputClass(!!errors.problema)} resize-y`}
            {...a11y("problema", errors)}
          />
        </Field>
        <Segmented name="usaIA" legend={t.labels.usaIA} options={t.options.yesNo} errors={errors} />
        <Segmented
          name="usaAutomatizaciones"
          legend={t.labels.usaAutomatizaciones}
          options={t.options.yesNo}
          errors={errors}
        />
        <Segmented name="pagaria" legend={t.labels.pagaria} options={t.options.pagaria} errors={errors} />
        <Segmented name="valor" legend={t.labels.valor} options={t.options.valor} errors={errors} />
      </Group>

      <div className="border-t border-border pt-6">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            id="privacidad"
            type="checkbox"
            name="privacidad"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
            {...a11y("privacidad", errors)}
          />
          <span>
            {t.privacyBefore}{" "}
            <Link
              href={`/${lang}/politica-privacidad`}
              target="_blank"
              className="text-foreground underline underline-offset-4 hover:no-underline"
            >
              {t.privacyLink}
            </Link>
            .<RequiredMark />
          </span>
        </label>
        <ErrorMessage name="privacidad" error={errors.privacidad} />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-control bg-background px-4 py-3 text-sm text-foreground">
          {t.sendError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? (
          t.sending
        ) : (
          <>
            {t.submit}
            <span aria-hidden className="transition group-hover:translate-x-0.5">
              →
            </span>
          </>
        )}
      </button>
    </form>
  );
}
