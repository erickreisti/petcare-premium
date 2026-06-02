"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Bathtub() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      // Animação das gotas d'água caindo
      const drops = gsap.utils.toArray<HTMLElement>(".water-drop");
      drops.forEach((drop, index) => {
        gsap.to(drop, {
          y: 70,
          opacity: 0,
          duration: 1.2,
          repeat: -1,
          delay: index * 0.4,
          ease: "power1.in",
        });
      });

      // Animação das bolhas flutuando a partir da banheira
      const tubBubbles = gsap.utils.toArray<HTMLElement>(".tub-bubble");
      tubBubbles.forEach((bubble) => {
        gsap.to(bubble, {
          y: -150,
          x: "+=random(-30, 30)",
          scale: "random(0.5, 1.5)",
          opacity: 0,
          duration: "random(2.5, 4.5)",
          repeat: -1,
          delay: "random(0, 3)",
          ease: "power1.out",
        });
      });

      // Pato de borracha flutuando na água
      gsap.to(".rubber-duck", {
        y: "-=4",
        rotation: 3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative w-full max-w-125 mx-auto h-87.5 drop-shadow-2xl"
    >
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Efeito de Ondulação Mágica inspirado no SVG que você mandou */}
          <filter id="waterRipple">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015;0.025;0.015"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          
          <linearGradient id="tubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          
          <linearGradient id="tubShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00b3c1" />
            <stop offset="100%" stopColor="#95d0d8" />
          </linearGradient>
        </defs>

        {/* Pés da Banheira */}
        <path d="M 80 230 C 50 250, 40 270, 40 280 L 60 280 C 80 270, 100 250, 100 230 Z" fill="#94a3b8" />
        <path d="M 320 230 C 350 250, 360 270, 360 280 L 340 280 C 320 270, 300 250, 300 230 Z" fill="#94a3b8" />

        {/* Fundo da Banheira (Parte Interna) */}
        <path
          d="M 30 100 C 30 250, 100 250, 200 250 C 300 250, 370 250, 370 100 Z"
          fill="url(#tubShadow)"
        />

        {/* Superfície da Água com o efeito Ripple (Ondulação) */}
        <ellipse
          cx="200"
          cy="130"
          rx="150"
          ry="25"
          fill="url(#waterGrad)"
          filter="url(#waterRipple)"
          opacity="0.9"
        />

        {/* Pato de Borracha (Fofo!) */}
        <g transform="translate(140, 105) scale(0.9)" className="rubber-duck">
          <path d="M 10 25 C 0 25, 0 15, 10 15 C 15 15, 20 10, 25 10 C 35 10, 35 25, 25 25 Z" fill="#fcd34d" />
          <circle cx="25" cy="8" r="8" fill="#fcd34d" />
          <circle cx="27" cy="6" r="1.5" fill="#1e293b" />
          <path d="M 31 8 L 38 6 L 34 11 Z" fill="#f59e0b" />
        </g>

        {/* Frente da Banheira */}
        <path
          d="M 30 100 C 30 260, 100 260, 200 260 C 300 260, 370 260, 370 100 C 370 115, 300 130, 200 130 C 100 130, 30 115, 30 100 Z"
          fill="url(#tubGrad)"
        />

        {/* Borda (Rim) da Banheira */}
        <ellipse
          cx="200"
          cy="100"
          rx="170"
          ry="30"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
        />
        <ellipse
          cx="200"
          cy="100"
          rx="170"
          ry="30"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />

        {/* Torneira (Chuveirinho) */}
        <path
          d="M 330 80 L 330 20 C 330 -10, 280 -10, 280 20 L 280 40"
          fill="none"
          stroke="#64748b"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 310 30 L 350 30"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="280" cy="40" r="4.5" fill="#334155" />

        {/* Gotas d'água */}
        <circle cx="280" cy="45" r="3.5" fill="#00b3c1" className="water-drop" />
        <circle cx="280" cy="45" r="3.5" fill="#00b3c1" className="water-drop" />
        <circle cx="280" cy="45" r="3.5" fill="#00b3c1" className="water-drop" />

        {/* Bolhas subindo da água */}
        <circle cx="120" cy="130" r="6" fill="#ffffff" opacity="0.8" className="tub-bubble" />
        <circle cx="160" cy="135" r="4" fill="#ffffff" opacity="0.6" className="tub-bubble" />
        <circle cx="240" cy="125" r="8" fill="#ffffff" opacity="0.7" className="tub-bubble" />
        <circle cx="260" cy="140" r="5" fill="#ffffff" opacity="0.9" className="tub-bubble" />
        
        {/* Sabão/Espuma pendurada na borda */}
        <g fill="#ffffff" opacity="0.95" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
          <circle cx="70" cy="115" r="18" />
          <circle cx="90" cy="105" r="22" />
          <circle cx="115" cy="120" r="14" />
          <circle cx="55" cy="125" r="10" />
        </g>
      </svg>
    </div>
  );
}
