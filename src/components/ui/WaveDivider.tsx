// Divisória de onda entre seções. A cor vem de `text-*` (fill = currentColor),
// e deve ser a cor de fundo da seção seguinte.
export default function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full h-10 md:h-16 overflow-hidden leading-none ${className}`}
    >
      {/* Dois períodos idênticos da onda: deslizar -50% fecha o loop sem emenda */}
      <svg className="wave-divider-svg block" viewBox="0 0 2880 80" preserveAspectRatio="none">
        <path
          d="M0,40 C360,80 1080,0 1440,40 C1800,80 2520,0 2880,40 L2880,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
