/* Símbolo de Saikiu: pista de circuito en forma de "S" con dos nodos. */
export function SaikiuMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="24 18 72 84" className={className} aria-hidden>
      <path
        d="M84 30 H52 Q36 30 36 46 Q36 60 52 60 H68 Q84 60 84 76 Q84 90 68 90 H36"
        fill="none"
        stroke="currentColor"
        strokeWidth={11}
        strokeLinejoin="round"
      />
      <circle cx="84" cy="30" r="9" fill="none" stroke="currentColor" strokeWidth={6} />
      <circle cx="36" cy="90" r="9" fill="none" stroke="currentColor" strokeWidth={6} />
    </svg>
  );
}
