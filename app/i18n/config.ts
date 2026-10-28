export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const SITE_URL = "https://saikiu-siteweb.vercel.app";

export const hasLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

// Idiomas que se sirven en español; el resto de idiomas reconocidos recibe la versión en inglés.
const SPANISH_LANGUAGES = ["es", "ca", "gl", "eu"];

/*
 * Elige el idioma a partir de la cabecera Accept-Language, respetando el orden de preferencia (q).
 * Sin cabecera (bots, buscadores) se usa el idioma por defecto.
 */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((p) => p.lang && p.lang !== "*")
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if (SPANISH_LANGUAGES.includes(lang)) return "es";
    if (lang === "en") return "en";
  }
  return preferred.length > 0 ? "en" : DEFAULT_LOCALE;
}
