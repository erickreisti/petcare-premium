"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Bubbles() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const wrappers = gsap.utils.toArray<HTMLElement>(".bubble-wrapper");

      wrappers.forEach((wrapper) => {
        // Posição e estilo inicial aleatórios no wrapper (que lida com a subida)
        gsap.set(wrapper, {
          x: `random(0, ${window.innerWidth})`,
          y: window.innerHeight + 100,
          scale: "random(0.3, 1.0)",
          opacity: "random(0.30, 0.65)",
        });

        // Animação de subida infinita no wrapper
        gsap.to(wrapper, {
          y: -200,
          x: "+=random(-80, 80)",
          duration: "random(10, 20)",
          ease: "none",
          repeat: -1,
          delay: "random(0, 10)",
          modifiers: {
            // Adiciona um leve movimento senoidal (zig-zag natural)
            x: gsap.utils.unitize(
              (x) => parseFloat(x) + Math.sin(parseFloat(x) * 0.05) * 1.5,
            ),
          },
        });
      });

      // Interatividade: Repulsão no inner div (para não matar a subida)
      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        wrappers.forEach((wrapper) => {
          const inner = wrapper.querySelector(".bubble-inner");
          if (!inner) return;

          const rect = wrapper.getBoundingClientRect();
          const bubbleX = rect.left + rect.width / 2;
          const bubbleY = rect.top + rect.height / 2;

          const distX = bubbleX - mouseX;
          const distY = bubbleY - mouseY;
          const distance = Math.sqrt(distX * distX + distY * distY);

          // Se o mouse estiver a menos de 150px da bolha
          if (distance < 150) {
            // Empurra o inner div para longe
            gsap.to(inner, {
              x: (distX / distance) * 60,
              y: (distY / distance) * 60,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            // Retorna ao centro quando o mouse se afasta
            gsap.to(inner, {
              x: 0,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container },
  );

  // Criamos 35 bolhas virtuais para maior volume
  const bubbleArray = Array.from({ length: 35 });

  return (
    <div
      ref={container}
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      {bubbleArray.map((_, i) => (
        <div
          key={i}
          className="bubble-wrapper absolute pointer-events-none"
          style={{ width: "70px", height: "70px" }}
        >
          <div
            className="bubble-inner w-full h-full rounded-full border border-white/70 shadow-[inset_0_0_20px_rgba(255,255,255,0.7),0_5px_15px_rgba(53,126,151,0.15)] backdrop-blur-sm pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(53, 126, 151, 0.2) 60%, rgba(255, 255, 255, 0.4) 100%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
