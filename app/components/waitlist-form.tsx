"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type WaitlistEntry = {
  nombre: string;
  apellidos: string;
  email: string;
  empresa: string;
  cargo: string;
  empleados: string;
  sector: string;
  problema: string;
  usaIA: string;
  usaAutomatizaciones: string;
  pagaria: string;
  valor: string;
  privacidad: boolean;
  fecha: string;
};

const EMPLEADOS = ["1–10", "11–50", "51–200", "201–500", "Más de 500"];

const SECTORES = [
  "E-commerce / Retail",
  "SaaS / Software",
  "Agencia / Marketing",
  "Consultoría / Servicios profesionales",
  "Educación",
  "Salud",
  "Finanzas / Seguros",
  "Inmobiliaria",
  "Industria",
  "Otro",
];

const inputClass =
  "w-full rounded-lg border border-control bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-soft">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({ id, options }: { id: string; options: string[] }) {
  return (
    <div className="relative">
      <select id={id} name={id} required defaultValue="" className={`${inputClass} appearance-none pr-10`}>
        <option value="" disabled>
          Selecciona una opción
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
function Segmented({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-soft">{legend}</legend>
      <div className="grid auto-cols-fr grid-flow-col gap-2">
        {options.map((o, i) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} required={i === 0} className="peer sr-only" />
            <span className="block rounded-lg border border-control bg-background px-3 py-2.5 text-center text-sm text-muted transition hover:text-foreground peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40">
              {o}
            </span>
          </label>
        ))}
      </div>
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

export function WaitlistForm() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const entry: WaitlistEntry = {
      nombre: get("nombre"),
      apellidos: get("apellidos"),
      email: get("email"),
      empresa: get("empresa"),
      cargo: get("cargo"),
      empleados: get("empleados"),
      sector: get("sector"),
      problema: get("problema"),
      usaIA: get("usaIA"),
      usaAutomatizaciones: get("usaAutomatizaciones"),
      pagaria: get("pagaria"),
      valor: get("valor"),
      privacidad: data.get("privacidad") === "on",
      fecha: new Date().toISOString(),
    };

    // Sin backend por ahora: la inscripción se guarda solo en el estado local.
    setEntries((prev) => [...prev, entry]);
    setSubmitted(true);
  }

  if (submitted) {
    const last = entries[entries.length - 1];
    return (
      <div
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center sm:p-10"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">
          Gracias por apuntarte a la lista de espera
        </h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted">
          Te escribiremos a <span className="text-foreground">{last?.email}</span> cuando abramos
          la beta de AuditorIA.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm text-muted underline-offset-4 transition hover:text-foreground hover:underline"
        >
          Inscribir a otra persona
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-surface p-5 sm:p-8">
      <Group title="Sobre ti">
        <Field label="Nombre" htmlFor="nombre">
          <input id="nombre" name="nombre" required autoComplete="given-name" className={inputClass} />
        </Field>
        <Field label="Apellidos" htmlFor="apellidos">
          <input id="apellidos" name="apellidos" required autoComplete="family-name" className={inputClass} />
        </Field>
        <Field label="Email" htmlFor="email" className="sm:col-span-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="nombre@empresa.com"
            className={inputClass}
          />
        </Field>
      </Group>

      <Group title="Tu empresa">
        <Field label="Empresa" htmlFor="empresa">
          <input id="empresa" name="empresa" required autoComplete="organization" className={inputClass} />
        </Field>
        <Field label="Cargo" htmlFor="cargo">
          <input
            id="cargo"
            name="cargo"
            required
            autoComplete="organization-title"
            placeholder="CEO, Operaciones, Marketing…"
            className={inputClass}
          />
        </Field>
        <Field label="Número de empleados" htmlFor="empleados">
          <Select id="empleados" options={EMPLEADOS} />
        </Field>
        <Field label="Sector" htmlFor="sector">
          <Select id="sector" options={SECTORES} />
        </Field>
      </Group>

      <Group title="Tu situación">
        <Field label="¿Qué problema te gustaría resolver?" htmlFor="problema" className="sm:col-span-2">
          <textarea
            id="problema"
            name="problema"
            required
            rows={4}
            placeholder="Ej.: dedicamos muchas horas a tareas manuales y no sabemos qué herramientas de IA nos convienen."
            className={`${inputClass} resize-y`}
          />
        </Field>
        <Segmented name="usaIA" legend="¿Utilizas IA actualmente?" options={["Sí", "No"]} />
        <Segmented
          name="usaAutomatizaciones"
          legend="¿Utilizas automatizaciones actualmente?"
          options={["Sí", "No"]}
        />
        <Segmented name="pagaria" legend="¿Pagarías por una solución así?" options={["Sí", "No", "Depende"]} />
        <Segmented
          name="valor"
          legend="¿Cuánto valor tendría para tu empresa?"
          options={["Bajo", "Medio", "Alto"]}
        />
      </Group>

      <label className="flex items-start gap-3 border-t border-border pt-6 text-sm text-muted">
        <input type="checkbox" name="privacidad" required className="mt-0.5 h-4 w-4 shrink-0 accent-accent" />
        <span>Acepto la política de privacidad.</span>
      </label>

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Unirme a la lista de espera
        <span aria-hidden className="transition group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </form>
  );
}
