// Versão centralizada, igual ao favicon (src/app/icon.svg): cabe em espaços quadrados, como o menu lateral
export function LogoBadge() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="#DFF2F2" stroke="#399d9d" strokeWidth="8" />
      <g fill="#1A3B47">
        <ellipse cx="37" cy="56" rx="8" ry="10.5" transform="rotate(-25 37 56)" />
        <ellipse cx="51" cy="40" rx="8.5" ry="11" transform="rotate(-8 51 40)" />
        <ellipse cx="69" cy="40" rx="8.5" ry="11" transform="rotate(8 69 40)" />
        <ellipse cx="83" cy="56" rx="8" ry="10.5" transform="rotate(25 83 56)" />
        <path d="M60 61c-12 0-25 14-25 26 0 8 6 12 13 12 5 0 8-3 12-3s7 3 12 3c7 0 13-4 13-12 0-12-13-26-25-26Z" />
      </g>
    </svg>
  );
}

// Logo: patinha dentro de uma bolha de sabão. Usado no Header e no Footer.
// O favicon (src/app/icon.svg) é uma versão simplificada, sem as bolhas menores
export default function LogoIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      {/* Bolha principal */}
      <circle cx="54" cy="66" r="47" fill="#DFF2F2" stroke="#399d9d" strokeWidth="5" />
      {/* Reflexo */}
      <path d="M24 56a32 32 0 0 1 20-24" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="22" cy="68" r="3.5" fill="#fff" />
      {/* Bolhas menores */}
      <circle cx="103" cy="18" r="9" fill="#DFF2F2" stroke="#399d9d" strokeWidth="3.5" />
      <circle cx="113" cy="40" r="4.5" fill="#DFF2F2" stroke="#399d9d" strokeWidth="2.5" />
      {/* Patinha */}
      <g fill="#1A3B47">
        <ellipse cx="36" cy="62" rx="6" ry="8" transform="rotate(-25 36 62)" />
        <ellipse cx="47" cy="50" rx="6.5" ry="8.5" transform="rotate(-8 47 50)" />
        <ellipse cx="61" cy="50" rx="6.5" ry="8.5" transform="rotate(8 61 50)" />
        <ellipse cx="72" cy="62" rx="6" ry="8" transform="rotate(25 72 62)" />
        <path d="M54 66c-9 0-19 11-19 20 0 6 5 9 10 9 4 0 6-2 9-2s5 2 9 2c5 0 10-3 10-9 0-9-10-20-19-20Z" />
      </g>
    </svg>
  );
}
