"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Bubbles() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const bubbles = gsap.utils.toArray<HTMLElement>(".bubble");
    
    bubbles.forEach((bubble) => {
      // Posição e estilo inicial aleatórios
      gsap.set(bubble, {
        x: `random(0, ${window.innerWidth})`,
        y: window.innerHeight + 100,
        scale: "random(0.3, 1.2)",
        opacity: "random(0.6, 1)",
      });

      // Animação de subida infinita
      gsap.to(bubble, {
        y: -200,
        x: "+=random(-80, 80)",
        duration: "random(10, 20)",
        ease: "none",
        repeat: -1,
        delay: "random(0, 10)",
        modifiers: {
          // Adiciona um leve movimento senoidal (zig-zag natural)
          x: gsap.utils.unitize(x => parseFloat(x) + Math.sin(parseFloat(x) * 0.05) * 1.5)
        }
      });
    });

    // Interatividade: Repulsão ao passar o mouse perto
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      bubbles.forEach((bubble) => {
        const rect = bubble.getBoundingClientRect();
        const bubbleX = rect.left + rect.width / 2;
        const bubbleY = rect.top + rect.height / 2;

        const distX = bubbleX - mouseX;
        const distY = bubbleY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Se o mouse estiver a menos de 150px da bolha
        if (distance < 150) {
          gsap.to(bubble, {
            x: `+=${distX * 0.5}`,
            y: `+=${distY * 0.5}`,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto" // Permite sobrescrever a animação original temporariamente
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: container });

  // Criamos 35 bolhas virtuais para maior volume
  const bubbleArray = Array.from({ length: 35 });

  return (
    <div ref={container} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {bubbleArray.map((_, i) => (
        <div
          key={i}
          className="bubble absolute rounded-full border border-white/80 shadow-[inset_0_0_20px_rgba(255,255,255,0.9),0_5px_15px_rgba(53,126,151,0.2)] backdrop-blur-md pointer-events-auto cursor-crosshair"
          style={{
            width: "60px",
            height: "60px",
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(53, 126, 151, 0.3) 60%, rgba(255, 255, 255, 0.6) 100%)",
          }}
          onClick={(e) => {
             // Interação extra: estourar bolha ao clicar
             gsap.to(e.currentTarget, { scale: 1.5, opacity: 0, duration: 0.2, ease: "power1.out" });
          }}
        />
      ))}
    </div>
  );
}
