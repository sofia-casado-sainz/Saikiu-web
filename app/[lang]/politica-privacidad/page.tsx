import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitch } from "../../components/language-switch";
import { SaikiuMark } from "../../components/saikiu-mark";
import { hasLocale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";

const RESPONSABLE = "Sofía Casado Sainz";
const NIF = "51179526H";
const EMAIL_CONTACTO = "casado.sainz1809@gmail.com";

const linkClass = "text-foreground underline underline-offset-4 hover:no-underline";

export async function generateMetadata({ params }: PageProps<"/[lang]/politica-privacidad">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { privacy } = getDictionary(lang);
  return {
    title: privacy.metaTitle,
    description: privacy.metaDescription,
    alternates: {
      canonical: `/${lang}/politica-privacidad`,
      languages: { es: "/es/politica-privacidad", en: "/en/politica-privacidad" },
    },
  };
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function ContenidoEs() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Política de privacidad</h1>
      <p className="mt-4 text-sm text-muted">Última actualización: 27 de octubre de 2026</p>
      <p className="mt-8 text-lg leading-relaxed text-muted">
        Esta política explica cómo tratamos los datos que nos facilitas al apuntarte a la lista de
        espera de Auditor, el primer producto de Saikiu, actualmente en fase de desarrollo.
      </p>

      <div className="mt-12 space-y-10">
        <Section title="1. Quién recoge tus datos">
          <p>El responsable del tratamiento de tus datos es:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Responsable: {RESPONSABLE}, que opera bajo la marca Saikiu</li>
            <li>NIF: {NIF}</li>
            <li>País: España</li>
            <li>Email de contacto: {EMAIL_CONTACTO}</li>
          </ul>
        </Section>

        <Section title="2. Qué datos recogemos">
          <p>A través del formulario de lista de espera recogemos:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Datos de contacto: nombre, apellidos y email.</li>
            <li>Datos sobre tu actividad: ocupación o cargo, empresa o proyecto (opcional), número de personas y sector.</li>
            <li>
              Tus respuestas sobre el problema que quieres resolver, tu uso actual de IA y
              automatizaciones, y tu interés en una solución como Auditor.
            </li>
          </ul>
          <p>No te pedimos datos especialmente protegidos. Por favor, no los incluyas en el campo de texto libre.</p>
        </Section>

        <Section title="3. Para qué los usamos">
          <ul className="list-disc space-y-1 pl-5">
            <li>Gestionar tu inscripción en la lista de espera.</li>
            <li>Avisarte cuando Auditor comience las pruebas o se lance, y contactarte en relación con ello.</li>
            <li>Entender mejor las necesidades de las personas y empresas interesadas para orientar el desarrollo del producto.</li>
          </ul>
          <p>No vendemos tus datos ni los usamos para enviarte publicidad de terceros.</p>
        </Section>

        <Section title="4. Base legal">
          <p>
            Tratamos tus datos porque nos das tu consentimiento al marcar la casilla del formulario
            (artículo 6.1.a del Reglamento General de Protección de Datos, RGPD). Puedes retirarlo
            en cualquier momento escribiéndonos, sin que ello afecte a los tratamientos anteriores.
          </p>
        </Section>

        <Section title="5. Quién más tiene acceso">
          <p>
            Para recibir las inscripciones usamos <strong className="font-medium text-foreground">Formspree</strong>,
            un servicio de formularios que actúa como encargado del tratamiento. Formspree es una
            empresa con sede en Estados Unidos, por lo que tus datos pueden tratarse fuera del
            Espacio Económico Europeo. Puedes consultar cómo los protege en su{" "}
            <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkClass}>
              política de privacidad
            </a>
            .
          </p>
          <p>
            La web está alojada en <strong className="font-medium text-foreground">Vercel</strong>,
            que también nos proporciona estadísticas de visitas agregadas y anónimas, sin cookies.
          </p>
          <p>No cedemos tus datos a ningún otro tercero, salvo obligación legal.</p>
        </Section>

        <Section title="6. Cuánto tiempo los conservamos">
          <p>
            Conservamos tus datos mientras la lista de espera de Auditor esté activa o hasta que
            nos pidas que los eliminemos. Cuando la lista deje de tener utilidad, los
            suprimiremos.
          </p>
        </Section>

        <Section title="7. Tus derechos">
          <p>En cualquier momento puedes ejercer tus derechos de:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Acceso a tus datos.</li>
            <li>Rectificación de datos inexactos.</li>
            <li>Supresión de tus datos.</li>
            <li>Oposición y limitación del tratamiento.</li>
            <li>Portabilidad de tus datos.</li>
            <li>Retirada del consentimiento.</li>
          </ul>
          <p>
            Para ejercerlos, escríbenos a {EMAIL_CONTACTO} indicando qué derecho quieres ejercer.
            Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una
            reclamación ante la Agencia Española de Protección de Datos (
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className={linkClass}>
              www.aepd.es
            </a>
            ).
          </p>
        </Section>

        <Section title="8. Contacto">
          <p>Para cualquier duda sobre esta política o sobre tus datos, escríbenos a {EMAIL_CONTACTO}.</p>
        </Section>
      </div>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: 27 October 2026</p>
      <p className="mt-8 text-lg leading-relaxed text-muted">
        This policy explains how we handle the data you give us when you join the waitlist for
        Auditor, Saikiu&apos;s first product, which is currently in development. This is a
        translation for your convenience; if there is any discrepancy, the Spanish version prevails.
      </p>

      <div className="mt-12 space-y-10">
        <Section title="1. Who collects your data">
          <p>The data controller is:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Controller: {RESPONSABLE}, operating under the Saikiu brand</li>
            <li>Tax ID (NIF): {NIF}</li>
            <li>Country: Spain</li>
            <li>Contact email: {EMAIL_CONTACTO}</li>
          </ul>
        </Section>

        <Section title="2. What data we collect">
          <p>Through the waitlist form we collect:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Contact details: first name, last name and email.</li>
            <li>Information about your work: occupation or role, company or project (optional), number of people and sector.</li>
            <li>
              Your answers about the problem you want to solve, your current use of AI and
              automations, and your interest in a solution like Auditor.
            </li>
          </ul>
          <p>We don&apos;t ask for any special category data. Please don&apos;t include it in the free-text field.</p>
        </Section>

        <Section title="3. What we use it for">
          <ul className="list-disc space-y-1 pl-5">
            <li>Managing your place on the waitlist.</li>
            <li>Letting you know when Auditor starts testing or launches, and contacting you about it.</li>
            <li>Better understanding the needs of interested people and companies to guide product development.</li>
          </ul>
          <p>We don&apos;t sell your data or use it to send you third-party advertising.</p>
        </Section>

        <Section title="4. Legal basis">
          <p>
            We process your data based on the consent you give by ticking the box on the form
            (Article 6(1)(a) of the General Data Protection Regulation, GDPR). You can withdraw it at
            any time by emailing us, without affecting any processing carried out before.
          </p>
        </Section>

        <Section title="5. Who else has access">
          <p>
            We use <strong className="font-medium text-foreground">Formspree</strong>, a form service
            acting as a data processor, to receive sign-ups. Formspree is based in the United States,
            so your data may be processed outside the European Economic Area. You can read how it
            protects your data in its{" "}
            <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkClass}>
              privacy policy
            </a>
            .
          </p>
          <p>
            The website is hosted on <strong className="font-medium text-foreground">Vercel</strong>,
            which also provides us with aggregated, anonymous visitor statistics without cookies.
          </p>
          <p>We don&apos;t share your data with any other third party unless required by law.</p>
        </Section>

        <Section title="6. How long we keep it">
          <p>
            We keep your data while the Auditor waitlist is active or until you ask us to delete
            it. Once the waitlist is no longer needed, we will delete it.
          </p>
        </Section>

        <Section title="7. Your rights">
          <p>At any time you can exercise your rights of:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Access to your data.</li>
            <li>Rectification of inaccurate data.</li>
            <li>Erasure of your data.</li>
            <li>Objection and restriction of processing.</li>
            <li>Data portability.</li>
            <li>Withdrawal of consent.</li>
          </ul>
          <p>
            To exercise them, email us at {EMAIL_CONTACTO} stating which right you want to exercise.
            If you believe we haven&apos;t handled your request properly, you can lodge a complaint
            with the Spanish Data Protection Agency (
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className={linkClass}>
              www.aepd.es
            </a>
            ).
          </p>
        </Section>

        <Section title="8. Contact">
          <p>For any questions about this policy or your data, email us at {EMAIL_CONTACTO}.</p>
        </Section>
      </div>
    </>
  );
}

export default async function PoliticaPrivacidad({ params }: PageProps<"/[lang]/politica-privacidad">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-5 sm:px-6">
          <Link href={`/${lang}`} className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <SaikiuMark className="h-6 w-6 text-brand" />
            Saikiu
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitch lang={lang} href={`/${lang === "es" ? "en" : "es"}/politica-privacidad`} />
            <Link href={`/${lang}`} className="text-sm text-muted transition hover:text-foreground">
              {t.privacy.back}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-6 lg:py-20">
        {lang === "es" ? <ContenidoEs /> : <ContentEn />}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
          <span>{t.footer.rights}</span>
          <span>{t.footer.productOf}</span>
        </div>
      </footer>
    </div>
  );
}
