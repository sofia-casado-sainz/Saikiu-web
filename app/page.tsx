import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SaikiuMark } from "./components/saikiu-mark";
import { WaitlistForm } from "./components/waitlist-form";

const CTA_NOTA = "Gratis · Sin compromiso";

const FUNDADOR = {
  nombre: "Sofía Casado Sainz",
  rol: "Founder · Saikiu",
  iniciales: "SC",
  cita: "Creé AuditorIA para que cualquier persona o negocio, grande o pequeño, sepa dónde tiene sentido usar IA antes de gastar tiempo y dinero.",
  // Ruta a una foto en /public (p. ej. "/brand/fundador.jpg"). Vacío: se muestran las iniciales.
  foto: "",
  // URL del perfil de LinkedIn. Vacío: no se muestra el botón.
  linkedin: "",
  email: "casado.sainz1809@gmail.com",
};

const NAV = [
  { href: "#auditoria", label: "AuditorIA" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#para-quien", label: "Para quién" },
  { href: "#faq", label: "FAQ" },
];

const ANALISIS = [
  {
    title: "Herramientas IA",
    text: "Qué herramientas de IA usas tú o tu equipo, dónde se solapan y qué alternativas encajan mejor.",
    icon: "M4 6h16M4 12h16M4 18h10",
  },
  {
    title: "Procesos",
    text: "Los flujos de trabajo clave y las tareas repetitivas que más horas consumen.",
    icon: "M5 5h5v5H5zM14 14h5v5h-5zM10 7.5h4.5V14",
  },
  {
    title: "Automatizaciones",
    text: "Qué está automatizado, qué falla y qué automatizaciones tendrían más retorno.",
    icon: "M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4",
  },
  {
    title: "Riesgos",
    text: "Exposición de datos, dependencia de proveedores y cumplimiento normativo.",
    icon: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z",
  },
  {
    title: "Costes",
    text: "Gasto actual en licencias y horas, y ahorro estimado de cada mejora.",
    icon: "M12 3v18M16.5 7.5c0-1.7-2-3-4.5-3s-4.5 1.3-4.5 3 2 2.6 4.5 3 4.5 1.3 4.5 3-2 3-4.5 3-4.5-1.3-4.5-3",
  },
  {
    title: "Oportunidades de mejora",
    text: "Recomendaciones priorizadas por impacto y esfuerzo, listas para ejecutar.",
    icon: "M4 19l5-6 4 3 7-9M15 7h5v5",
  },
];

const PASOS = [
  { title: "Lead", text: "Nos cuentas cómo trabajas y lo que quieres mejorar." },
  { title: "Clasificación", text: "Identificamos tu perfil, tu sector y el tipo de necesidad." },
  { title: "IA especializada", text: "Cada caso se asigna al modelo más adecuado." },
  { title: "Análisis", text: "Evaluamos procesos, herramientas, riesgos y costes." },
  { title: "Presupuesto preliminar", text: "Estimamos alcance e inversión de las mejoras." },
  { title: "Revisión humana", text: "Un especialista valida cada conclusión.", human: true },
  { title: "Entrega", text: "Recibes un informe claro con prioridades." },
];

const PERFILES = [
  {
    title: "Trabajas por tu cuenta",
    ejemplos: "Autónomos, freelances y profesionales independientes",
    text: "Recupera las horas que se van en emails, presupuestos, facturas y tareas repetitivas, sin necesidad de tener una empresa.",
  },
  {
    title: "Tienes un pequeño negocio",
    ejemplos: "Pymes, comercios, despachos y estudios",
    text: "Descubre qué automatizar primero para ganar eficiencia sin montar un equipo técnico ni contratar una gran consultora.",
  },
  {
    title: "Lideras un equipo",
    ejemplos: "Dirección, operaciones, marketing o ventas",
    text: "Decide dónde invertir en IA con criterio, con datos sobre herramientas, costes y riesgos, no por moda.",
  },
];

const ESTADO = [
  { when: "Hoy", title: "En desarrollo", text: "Construyendo la metodología y el motor de análisis.", current: true },
  { when: "2027", title: "Beta", text: "Acceso anticipado para la lista de espera." },
  { when: "2027", title: "Lanzamiento", text: "AuditorIA disponible para todo el mundo." },
];

const FAQ = [
  {
    q: "¿Qué recibo exactamente?",
    a: "Un informe con el estado actual de tus herramientas y procesos, los riesgos detectados, una estimación de costes y una lista de oportunidades priorizadas por impacto y esfuerzo, junto a un presupuesto preliminar.",
  },
  {
    q: "¿Necesito tener una empresa?",
    a: "No. AuditorIA sirve tanto si tienes una empresa como si trabajas por tu cuenta como autónomo, freelance o profesional independiente. Analizamos tu forma de trabajar, sea cual sea el tamaño de tu actividad.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No. AuditorIA está pensado para cualquier persona, no solo perfiles técnicos. El informe explica cada recomendación en lenguaje claro.",
  },
  {
    q: "¿Lo hace todo una IA?",
    a: "No. La IA acelera la clasificación y el análisis, pero cada informe pasa por una revisión humana antes de llegar a ti.",
  },
  {
    q: "¿Cuándo estará disponible?",
    a: "Tanto la beta como el lanzamiento están previstos para 2027. Las personas de la lista de espera tendrán acceso prioritario.",
  },
  {
    q: "¿Cuánto costará?",
    a: "El precio aún no está definido. Las respuestas de la lista de espera nos ayudan a fijarlo; te lo comunicaremos antes de la beta.",
  },
  {
    q: "¿Qué hacéis con mis datos?",
    a: "Los datos de la lista de espera solo se usan para contactarte sobre AuditorIA. No los vendemos ni los cedemos a terceros. Tienes todos los detalles en nuestra política de privacidad.",
  },
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
function CtaBlock({ label, center }: { label: string; center?: boolean }) {
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
      <span className="text-center text-sm text-muted sm:text-left">{CTA_NOTA}</span>
    </div>
  );
}

function ReportPreview() {
  const rows = [
    { area: "Emails y atención al cliente", saving: "≈ 22 h/mes", w: "88%", high: true },
    { area: "Presupuestos y facturación", saving: "≈ 14 h/mes", w: "72%", high: true },
    { area: "Publicación de contenido", saving: "≈ 9 h/mes", w: "54%" },
    { area: "Agenda y reuniones", saving: "≈ 6 h/mes", w: "40%" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface p-1.5 shadow-2xl shadow-slate-900/10 dark:shadow-black/50">
      <div className="rounded-xl border border-border bg-background/70">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
          <span className="flex items-center gap-2 text-sm font-medium">
            <SaikiuMark className="h-4 w-4 text-brand" />
            Informe AuditorIA
            <span className="font-normal text-muted">· Ejemplo</span>
          </span>
          <span className="hidden rounded-full border border-border px-2.5 py-0.5 text-xs text-muted sm:inline">
            Revisado por especialista
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
          {[
            { k: "Oportunidades", v: "12" },
            { k: "Ahorro estimado", v: "51 h/mes" },
            { k: "Riesgos", v: "3" },
          ].map((m) => (
            <div key={m.k} className="px-4 py-4 sm:px-5">
              <p className="text-xs text-muted">{m.k}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">{m.v}</p>
            </div>
          ))}
        </div>

        <div className="px-4 py-4 sm:px-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Prioridades de automatización
          </p>
          <ul className="space-y-3.5">
            {rows.map((r) => (
              <li key={r.area}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span>{r.area}</span>
                  <span className="font-mono text-xs text-muted">{r.saving}</span>
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navegación */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#lista-de-espera"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover"
          >
            Acceso anticipado
          </a>
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
                Acceso anticipado · Plazas limitadas para la beta
              </a>
              <h1 className="mt-6 text-[2.2rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.3rem]">
                Descubre qué parte de tu trabajo puedes automatizar con IA,{" "}
                <span className="text-muted">y cuál no merece la pena.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Tengas una empresa o trabajes por tu cuenta, AuditorIA analiza tus herramientas,
                procesos y costes y te entrega un informe priorizado, revisado por un especialista.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#lista-de-espera"
                  className="rounded-lg bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-fg transition hover:bg-accent-hover"
                >
                  Solicitar acceso anticipado
                </a>
              </div>
              <p className="mt-4 text-sm text-muted">{CTA_NOTA} · Solo te escribimos para la beta</p>
            </div>
            <ReportPreview />
          </div>
        </section>

        {/* 2. Qué es AuditorIA */}
        <section id="auditoria" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
            <SectionHeader
              eyebrow="Qué es AuditorIA"
              title={
                <>
                  Una auditoría de IA para decidir <span className="text-muted">con datos.</span>
                </>
              }
            />
            <div className="space-y-5 text-lg leading-relaxed text-muted lg:pt-12">
              <p>
                Casi todo el mundo usa ya alguna herramienta de IA, pero pocos saben si la
                aprovechan bien, cuánto les cuesta o qué riesgos asumen. Pasa igual en una empresa
                que trabajando por tu cuenta.
              </p>
              <p>
                AuditorIA combina análisis con IA y revisión de especialistas para darte una
                respuesta clara:{" "}
                <span className="text-foreground">qué mejorar, en qué orden y con qué impacto.</span>
              </p>
              <dl className="grid grid-cols-1 gap-5 border-t border-border pt-6 sm:grid-cols-3">
                {[
                  { k: "Para", v: "Empresas y profesionales" },
                  { k: "Resultado", v: "Informe accionable" },
                  { k: "Garantía", v: "Revisión humana" },
                ].map((i) => (
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
            <SectionHeader
              eyebrow="Qué analiza"
              title="Una visión completa de cómo trabajas."
              text="Seis áreas que, juntas, explican dónde está el valor y dónde está el riesgo."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {ANALISIS.map((a) => (
                <div
                  key={a.title}
                  className="group rounded-xl border border-border bg-background p-6 transition hover:border-accent/50 sm:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent transition group-hover:border-accent/50">
                    <Icon d={a.icon} />
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
            <SectionHeader
              eyebrow="Cómo funciona"
              title="Siete pasos. Una persona siempre al final."
              text="La IA hace el trabajo pesado; la validación final es siempre humana."
            />

            <ol className="relative mt-12 grid lg:mt-16 lg:grid-cols-7">
              {/* Pista de circuito que une los pasos */}
              <span
                aria-hidden
                className="absolute bottom-6 left-[11px] top-6 w-px bg-accent/50 lg:bottom-auto lg:left-[7%] lg:right-[7%] lg:top-[11px] lg:h-px lg:w-auto"
              />
              {PASOS.map((p, i) => (
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
                Impulsado por <span className="font-medium text-foreground">Saikiu Router</span>,
                nuestra tecnología propia que elige el modelo de IA más adecuado para cada caso.
              </p>
            </div>

            <CtaBlock label="Quiero mi auditoría" />
          </div>
        </section>

        {/* 5. Para quién */}
        <section id="para-quien" className="scroll-mt-16 border-t border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
            <SectionHeader
              eyebrow="Para quién"
              title="Para cualquiera que quiera trabajar mejor con IA, tenga o no una empresa."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
              {PERFILES.map((p, i) => (
                <div key={p.title} className="flex flex-col rounded-xl border border-border bg-background p-6 sm:p-7">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-soft">{p.ejemplos}</p>
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
              <SectionHeader
                eyebrow="Quién está detrás"
                title="Una persona real detrás de cada informe."
              />
              <figure className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <blockquote className="text-xl leading-relaxed tracking-tight sm:text-2xl">
                  “{FUNDADOR.cita}”
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
                      <p className="text-sm text-muted">{FUNDADOR.rol}</p>
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
                      Escríbeme
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
            <SectionHeader
              eyebrow="Estado actual"
              title="Estamos construyendo AuditorIA."
              text="Las personas de la lista de espera tendrán acceso prioritario a la beta."
            />
            <ol className="relative mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
              <span
                aria-hidden
                className="absolute bottom-2 left-[7px] top-2 w-px bg-border md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto"
              />
              {ESTADO.map((r) => (
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
              <SectionHeader
                eyebrow="Lista de espera"
                title="Sé de los primeros en probar AuditorIA."
                text="Cuéntanos un poco sobre ti y tu forma de trabajar. Te avisaremos cuando abramos la beta."
              />
              <ul className="mt-10 space-y-4">
                {["Acceso prioritario a la beta", "Novedades del desarrollo", "Sin compromiso"].map((b) => (
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
            <WaitlistForm />
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:py-28">
            <SectionHeader center eyebrow="FAQ" title="Preguntas frecuentes" />
            <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-surface">
              {FAQ.map((f) => (
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

            <CtaBlock label="Reservar mi plaza en la beta" center />
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Agentes y aplicaciones de IA para la productividad del futuro.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm">
            <div>
              <p className="font-medium text-soft">Producto</p>
              <ul className="mt-3 space-y-2 text-muted">
                <li><a href="#auditoria" className="transition hover:text-foreground">AuditorIA</a></li>
                <li><a href="#como-funciona" className="transition hover:text-foreground">Cómo funciona</a></li>
                <li><a href="#estado" className="transition hover:text-foreground">Estado actual</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-soft">Saikiu</p>
              <ul className="mt-3 space-y-2 text-muted">
                <li><a href="#lista-de-espera" className="transition hover:text-foreground">Lista de espera</a></li>
                <li><a href="#faq" className="transition hover:text-foreground">FAQ</a></li>
                <li><Link href="/politica-privacidad" className="transition hover:text-foreground">Política de privacidad</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
            <span>© 2026 Saikiu. Todos los derechos reservados.</span>
            <span>AuditorIA es un producto de Saikiu.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
