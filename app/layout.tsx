import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "AuditorIA by Saikiu — Detecta oportunidades de IA y automatización";
const description =
  "AuditorIA ayuda a empresas a identificar procesos, oportunidades y riesgos relacionados con IA y automatización, antes de invertir tiempo y dinero. Con revisión humana en cada informe.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "AuditorIA",
  authors: [{ name: "Saikiu" }],
  keywords: [
    "AuditorIA",
    "Saikiu",
    "auditoría de IA",
    "automatización",
    "pymes",
    "inteligencia artificial",
    "riesgos IA",
  ],
  openGraph: {
    title,
    description,
    siteName: "Saikiu",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
