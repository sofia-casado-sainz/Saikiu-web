import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LanguageSwitch } from "../components/language-switch";
import { SaikiuMark } from "../components/saikiu-mark";
import { WaitlistForm } from "../components/waitlist-form";
import { hasLocale } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";

const FUNDADOR = {
  nombre: "Sofía Casado Sainz",
  iniciales: "SC",
  // Ruta a una foto en /public (p. ej. "/brand/fundador.jpg"). Vacío: se muestran las iniciales.
  foto: "",
  // URL del perfil de LinkedIn. Vacío: no se muestra el botón.
  linkedin: "",
  email: "casado.sainz1809@gmail.com",
};

// Iconos de "Qué analiza", en el mismo orden que los textos del diccionario.
const ANALISIS_ICONOS = [
  "M4 6h16M4 12h16M4 18h10",
  "M5 5h5v5H5zM14 14h5v5h-5zM10 7.5h4.5V14",
  "M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4",
  "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z",
  "M12 3v18M16.5 7.5c0-1.7-2-3-4.5-3s-4.5 1.3-4.5 3 2 2.6 4.5 3 4.5 1.3 4.5 3-2 3-4.5 3-4.5-1.3-4.5-3",
  "M4 19l5-6 4 3 7-9M15 7h5v5",
];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
      <SaikiuMark className="h-6 w-6 text-brand" />
      Saikiu
    </a>
  );
}

/* Trazos decorativos inspirados en las portadas de marca. */
function CircuitLines({ className = "" }: { className?: string }) {
  const traces = [
    "M120 0 V30 Q120 40 130 40 H410 Q420 40 420 50 V70",
    "M0 60 H270 Q280 60 280 70 V130 Q280 140 290 140 H510",
    "M0 110 H190 Q200 110 200 120 V200 Q200 210 210 210 H350",
  ];
  const nodes = [
    [420, 80],
    [520, 140],
    [360, 210],
  ];
  return (
    <svg viewBox="0 0 540 240" fill="none" className={className} aria-hidden>
      {traces.map((d, i) => (
        <path
          key={d}
          d={d}
          stroke="var(--line)"
          strokeOpacity={0.45}
          strokeWidth={2.5}
          className="circuit-trace"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
      {nodes.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={8} stroke="var(--line)" strokeOpacity={0.55} strokeWidth={2.5} />
      ))}
    </svg>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`flex items-center gap-3 text-sm font-medium text-muted ${center ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

/* CTA secundario a mitad de página: lleva a la lista de espera. */
function CtaBlock({ label, note, center }: { label: string; note: string; center?: boolean }) {
  return (
    <div className={`mt-12 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-14 ${center ? "sm:justify-center" : ""}`}>
      <a
        href="#lista-de-espera"
        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover"
      >
        {label}
        <span aria-hidden className="transition group-hover:translate-x-0.5">
          →
        </span>
      </a>
      <span className="text-center text-sm text-muted sm:text-left">{note}</span>
    </div>
  );
}

function ReportPreview({ t }: { t: ReturnType<typeof getDictionary>["report"] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-1.5 shadow-2xl shadow-slate-900/10 dark:shadow-black/50">
      <div className="rounded-xl border border-border bg-background/70">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
          <span className="flex items-center gap-2 text-sm font-medium">
            <SaikiuMark className="h-4 w-4 text-brand" />
            {t.title}
            <span className="font-normal text-muted">· {t.example}</span>
          </span>
          <span className="hidden rounded-full border border-border px-2.5 py-0.5 text-xs text-muted sm:inline">
            {t.reviewed}
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
          {t.metrics.map((m) => (
            <div key={m.k} className="px-4 py-4 sm:px-5">
              <p className="text-xs text-muted">{m.k}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">{m.v}</p>
            </div>
          ))}
        </div>

        <div className="px-4 py-4 sm:px-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">{t.prioritiesTitle}</p>
          <ul className="space-y-3.5">
            {t.rows.map((r) => (
              <li key={r.area}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <span>{r.area}</span>
                  <span className="shrink-0 font-mono text-xs text-muted">{r.saving}</span>
                </div>
                <div className="h-1.5 rounded-full bg-border">
                  <div
                    className={`h-1.5 rounded-full ${r.high ? "bg-accent" : "bg-muted/50"}`}
                    style={{ width: r.w }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navegación */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            {t.nav.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitch lang={lang} href={lang === "es" ? "/en" : "/es"} />
            <a
              href="#lista-de-espera"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover"
            >
              {t.headerCta}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative overflow-hidden">
          <CircuitLines className="pointer-events-none absolute -left-10 top-0 w-[520px] max-w-[90vw] opacity-70" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-28 lg:pt-32">
            <div>
              <a
                href="#lista-de-espera"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs text-muted transition hover:text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t.hero.badge}
              </a>
              <h1 className="mt-6 text-[2.2rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.3rem]">
                {t.hero.title} <span className="text-muted">{t.hero.titleMuted}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.hero.text}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#lista-de-espera"
                  className="rounded-lg bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-fg transition hover:bg-accent-hover"
                >
                  {t.hero.cta}
                </a>
              </div>
              <p className="mt-4 text-sm text-muted">
                {t.ctaNote} · {t.hero.note}
              </p>
            </div>
            <ReportPreview t={t.report} />
          </div>
        </section>

        {/* 2. Qué es Auditor */}
        <section id="auditoria" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
            <SectionHeader
              eyebrow={t.about.eyebrow}
              title={
                <>
                  {t.about.title} <span className="text-muted">{t.about.titleMuted}</span>
                </>
              }
            />
            <div className="space-y-5 text-lg leading-relaxed text-muted lg:pt-12">
              <p>{t.about.p1}</p>
              <p>
                {t.about.p2} <span className="text-foreground">{t.about.p2Strong}</span>
              </p>
              <dl className="grid grid-cols-1 gap-5 border-t border-border pt-6 sm:grid-cols-3">
                {t.about.facts.map((i) => (
                  <div key={i.k}>
                    <dt className="text-sm text-muted">{i.k}</dt>
                    <dd className="mt-1 text-base font-medium text-foreground">{i.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 3. Qué analiza */}
        <section className="border-t border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
            <SectionHeader eyebrow={t.analysis.eyebrow} title={t.analysis.title} text={t.analysis.text} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {t.analysis.items.map((a, i) => (
                <div
                  key={a.title}
                  className="group rounded-xl border border-border bg-background p-6 transition hover:border-accent/50 sm:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent transition group-hover:border-accent/50">
                    <Icon d={ANALISIS_ICONOS[i]} />
                  </div>
                  <h3 className="mt-5 font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Cómo funciona */}
        <section id="como-funciona" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
            <SectionHeader eyebrow={t.how.eyebrow} title={t.how.title} text={t.how.text} />

            <ol className="relative mt-12 grid lg:mt-16 lg:grid-cols-7">
              {/* Pista de circuito que une los pasos */}
              <span
                aria-hidden
                className="absolute bottom-6 left-[11px] top-6 w-px bg-accent/50 lg:bottom-auto lg:left-[7%] lg:right-[7%] lg:top-[11px] lg:h-px lg:w-auto"
              />
              {t.how.steps.map((p, i) => (
                <li key={p.title} className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:gap-0 lg:px-2 lg:pb-0 lg:text-center">
                  <span
                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-accent lg:mx-auto ${
                      p.human ? "bg-accent" : "bg-background"
                    }`}
                  >
                    {p.human && <span className="h-1.5 w-1.5 rounded-full bg-accent-fg" />}
                  </span>
                  <div className="lg:mt-5">
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={`mt-1 font-semibold ${p.human ? "text-accent" : ""}`}>{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-5 sm:p-6 lg:mt-14">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                <SaikiuMark className="h-5 w-5 text-brand" />
              </span>
              <p className="text-sm leading-relaxed text-muted">
                {t.how.routerBefore} <span className="font-medium text-foreground">Saikiu Router</span>
                {t.how.routerAfter}
              </p>
            </div>

            <CtaBlock label={t.how.cta} note={t.ctaNote} />
          </div>
        </section>

        {/* 5. Para quién */}
        <section id="para-quien" className="scroll-mt-16 border-t border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
            <SectionHeader eyebrow={t.audience.eyebrow} title={t.audience.title} />
            <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
              {t.audience.profiles.map((p, i) => (
                <div key={p.title} className="flex flex-col rounded-xl border border-border bg-background p-6 sm:p-7">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-soft">{p.examples}</p>
                  <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quién está detrás */}
        <section id="fundador" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <SectionHeader eyebrow={t.founder.eyebrow} title={t.founder.title} />
              <figure className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <blockquote className="text-xl leading-relaxed tracking-tight sm:text-2xl">
                  “{t.founder.quote}”
                </blockquote>
                <figcaption className="mt-8 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    {FUNDADOR.foto ? (
                      <Image
                        src={FUNDADOR.foto}
                        alt={FUNDADOR.nombre}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full border border-border object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background font-semibold"
                      >
                        {FUNDADOR.iniciales}
                      </span>
                    )}
                    <div>
                      <p className="font-semibold">{FUNDADOR.nombre}</p>
                      <p className="text-sm text-muted">{t.founder.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {FUNDADOR.linkedin && (
                      <a
                        href={FUNDADOR.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-border px-4 py-2 font-medium transition hover:border-muted/40 hover:bg-background"
                      >
                        LinkedIn
                      </a>
                    )}
                    <a
                      href={`mailto:${FUNDADOR.email}`}
                      className="rounded-lg border border-border px-4 py-2 font-medium transition hover:border-muted/40 hover:bg-background"
                    >
                      {t.founder.contact}
                    </a>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 6. Estado actual */}
        <section id="estado" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
            <SectionHeader eyebrow={t.status.eyebrow} title={t.status.title} text={t.status.text} />
            <ol className="relative mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
              <span
                aria-hidden
                className="absolute bottom-2 left-[7px] top-2 w-px bg-border md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto"
              />
              {t.status.items.map((r) => (
                <li key={r.title} className="relative pl-10 md:pl-0 md:pt-12">
                  <span
                    className={`absolute left-0 top-0.5 h-[15px] w-[15px] rounded-full border-2 md:top-0 ${
                      r.current ? "border-accent bg-accent ring-4 ring-accent/20" : "border-muted/50 bg-background"
                    }`}
                  />
                  <p className={`font-mono text-sm ${r.current ? "text-accent" : "text-muted"}`}>{r.when}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{r.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7. Lista de espera */}
        <section
          id="lista-de-espera"
          className="relative scroll-mt-16 overflow-hidden border-t border-border bg-surface/40"
        >
          <CircuitLines className="pointer-events-none absolute -right-16 bottom-0 w-[480px] max-w-[80vw] rotate-180 opacity-40" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-28">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader eyebrow={t.waitlist.eyebrow} title={t.waitlist.title} text={t.waitlist.text} />
              <ul className="mt-10 space-y-4">
                {t.waitlist.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-soft">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3" aria-hidden>
                        <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <WaitlistForm lang={lang} t={t.form} />
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:py-28">
            <SectionHeader center eyebrow={t.faq.eyebrow} title={t.faq.title} />
            <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-surface">
              {t.faq.items.map((f) => (
                <details key={f.q} className="group px-5 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted transition group-open:rotate-45 group-open:border-accent group-open:text-accent"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>

            <CtaBlock label={t.faq.cta} note={t.ctaNote} center />
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm">
            <div>
              <p className="font-medium text-soft">{t.footer.product}</p>
              <ul className="mt-3 space-y-2 text-muted">
                {t.footer.productLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-soft">{t.footer.company}</p>
              <ul className="mt-3 space-y-2 text-muted">
                {t.footer.companyLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href={`/${lang}/politica-privacidad`} className="transition hover:text-foreground">
                    {t.footer.privacy}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
            <span>{t.footer.rights}</span>
            <span>{t.footer.productOf}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
