import type { Locale } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";

/*
 * Enlace al otro idioma. Es un <a> normal (no <Link>) porque cada idioma tiene su propio
 * layout raíz y el cambio requiere una navegación completa. El proxy guarda la elección.
 */
export function LanguageSwitch({ lang, href }: { lang: Locale; href: string }) {
  const target: Locale = lang === "es" ? "en" : "es";
  const { langSwitch } = getDictionary(lang);
  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={langSwitch.label}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition hover:border-muted/40 hover:text-foreground"
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4" aria-hidden>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M2.5 10h15M10 2.5c2 2.2 3 4.7 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.7-3-7.5s1-5.3 3-7.5z" />
      </svg>
      <span aria-hidden>{langSwitch.short}</span>
    </a>
  );
}
