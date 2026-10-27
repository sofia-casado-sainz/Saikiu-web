import { ImageResponse } from "next/og";

export const alt = "AuditorIA by Saikiu — Detecta oportunidades de IA y automatización antes de invertir tiempo y dinero";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0B1020",
          color: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="65" viewBox="24 18 72 84">
            <path
              d="M84 30 H52 Q36 30 36 46 Q36 60 52 60 H68 Q84 60 84 76 Q84 90 68 90 H36"
              fill="none"
              stroke="#D90429"
              strokeWidth={11}
              strokeLinejoin="round"
            />
            <circle cx="84" cy="30" r="9" fill="none" stroke="#D90429" strokeWidth={6} />
            <circle cx="36" cy="90" r="9" fill="none" stroke="#D90429" strokeWidth={6} />
          </svg>
          <span style={{ fontSize: 52, fontWeight: 700 }}>Saikiu</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            Detecta oportunidades de IA y automatización antes de invertir tiempo y dinero.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#94A3B8" }}>
            <span
              style={{
                background: "#F8FAFC",
                color: "#0B1020",
                borderRadius: 999,
                padding: "6px 18px",
                fontSize: 24,
              }}
            >
              Primer producto
            </span>
            AuditorIA
          </div>
        </div>
      </div>
    ),
    size,
  );
}
