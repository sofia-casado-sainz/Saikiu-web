import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, hasLocale, localeFromAcceptLanguage } from "./app/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1] ?? "";

  // Ruta con idioma: se recuerda la elección para las próximas visitas a "/".
  if (hasLocale(segment)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== segment) {
      response.cookies.set(LOCALE_COOKIE, segment, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    }
    return response;
  }

  // Ruta sin idioma: idioma elegido antes o, si no, el del navegador.
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = saved && hasLocale(saved) ? saved : localeFromAcceptLanguage(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Excluye recursos internos y ficheros estáticos (los que tienen extensión).
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
