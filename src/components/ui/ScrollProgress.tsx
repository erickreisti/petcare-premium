"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Linha fina no topo que vai "enchendo" de água conforme a página é lida */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Segue a rolagem diretamente (não é uma animação automática), então vale também com reduced-motion
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      },
    );
  });

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 w-full h-1 z-60 pointer-events-none">
      <div
        ref={bar}
        style={{ transform: "scaleX(0)" }}
        className="h-full origin-left rounded-r-full bg-linear-to-r from-pet-teal via-pet-teal-dark to-pet-orange shadow-[0_0_10px_rgba(57,157,157,0.6)]"
      />
    </div>
  );
}
