import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SaikiuMark } from "../components/saikiu-mark";

// TODO: completar con los datos reales del responsable antes de publicar.
const RESPONSABLE = "Sofía Casado Sainz";
const NIF = "51179526H";
const EMAIL_CONTACTO = "casado.sainz1809@gmail.com";
const ULTIMA_ACTUALIZACION = "27 de octubre de 2026";

export const metadata: Metadata = {
  title: "Política de privacidad — Saikiu",
  description: "Cómo trata Saikiu los datos personales de la lista de espera de AuditorIA.",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PoliticaPrivacidad() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <SaikiuMark className="h-6 w-6 text-brand" />
            Saikiu
          </Link>
          <Link href="/" className="text-sm text-muted transition hover:text-foreground">
            ← Volver
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-6 lg:py-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Política de privacidad</h1>
        <p className="mt-4 text-sm text-muted">Última actualización: {ULTIMA_ACTUALIZACION}</p>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          Esta política explica cómo tratamos los datos que nos facilitas al apuntarte a la lista de
          espera de AuditorIA, el primer producto de Saikiu, actualmente en fase de desarrollo.
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
              <li>Datos profesionales: empresa, cargo, número de empleados y sector.</li>
              <li>
                Tus respuestas sobre el problema que quieres resolver, tu uso actual de IA y
                automatizaciones, y tu interés en una solución como AuditorIA.
              </li>
            </ul>
            <p>No te pedimos datos especialmente protegidos. Por favor, no los incluyas en el campo de texto libre.</p>
          </Section>

          <Section title="3. Para qué los usamos">
            <ul className="list-disc space-y-1 pl-5">
              <li>Gestionar tu inscripción en la lista de espera.</li>
              <li>Avisarte cuando AuditorIA comience las pruebas o se lance, y contactarte en relación con ello.</li>
              <li>Entender mejor las necesidades de las empresas interesadas para orientar el desarrollo del producto.</li>
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
              <a
                href="https://formspree.io/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:no-underline"
              >
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
              Conservamos tus datos mientras la lista de espera de AuditorIA esté activa o hasta que
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
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:no-underline"
              >
                www.aepd.es
              </a>
              ).
            </p>
          </Section>

          <Section title="8. Contacto">
            <p>
              Para cualquier duda sobre esta política o sobre tus datos, escríbenos a {EMAIL_CONTACTO}.
            </p>
          </Section>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
          <span>© 2026 Saikiu. Todos los derechos reservados.</span>
          <span>AuditorIA es un producto de Saikiu.</span>
        </div>
      </footer>
    </div>
  );
}
