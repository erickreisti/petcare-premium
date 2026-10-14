"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splashDroplets } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Bolhas em telas pequenas usam só as primeiras MOBILE_BUBBLES para poupar GPU
const TOTAL_BUBBLES = 20;
const MOBILE_BUBBLES = 8;
const REPEL_RADIUS = 150;
const BUBBLE_SIZE = 70;
// Folga (px) no raio de acerto para estourar a bolha com o clique
const POP_SLACK = 12;
// Fora do Hero ficam só algumas bolhas, mais apagadas, para não disputar atenção com o conteúdo
const DIMMED_OPACITY = 0.35;
const DIMMED_BUBBLES = 5;

export default function Bubbles() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      const layer = container.current;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { motion, desktop, finePointer } = context.conditions as Record<string, boolean>;
          if (!motion) return;

          const wrappers = gsap.utils
            .toArray<HTMLElement>(".bubble-wrapper")
            .slice(0, desktop ? TOTAL_BUBBLES : MOBILE_BUBBLES);

          const bubbles = wrappers.map((wrapper) => {
            // Posição e estilo inicial aleatórios no wrapper (que lida com a subida)
            gsap.set(wrapper, {
              x: `random(0, ${window.innerWidth})`,
              y: window.innerHeight + 100,
              scale: "random(0.3, 1.0)",
              opacity: "random(0.30, 0.65)",
            });

            // Animação de subida infinita no wrapper
            const rise = gsap.to(wrapper, {
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

            const inner = wrapper.querySelector<HTMLElement>(".bubble-inner")!;
            return { wrapper, inner, rise, popped: false, hidden: false };
          });

          // Bolhas que somem fora do Hero (as excedentes a DIMMED_BUBBLES). Depois de apagadas
          // param e saem do layout: invisíveis, só custariam trabalho ao navegador a cada quadro.
          const extras = bubbles.slice(DIMMED_BUBBLES);
          const setDimmed = (dimmed: boolean) => {
            gsap.to(layer, { opacity: dimmed ? DIMMED_OPACITY : 1, duration: 0.6 });
            extras.forEach((b) => {
              b.hidden = dimmed;
              if (dimmed) {
                gsap.to(b.inner, {
                  opacity: 0,
                  duration: 0.6,
                  onComplete: () => {
                    if (!b.hidden) return;
                    b.rise.pause();
                    gsap.set(b.wrapper, { display: "none" });
                  },
                });
                return;
              }
              gsap.set(b.wrapper, { display: "" });
              if (b.popped) return; // o renascimento agendado no pop retoma a subida
              b.rise.resume();
              gsap.to(b.inner, { opacity: 1, duration: 0.6 });
            });
          };

          // Fora do Hero as bolhas ficam mais discretas para não atrapalhar a leitura
          const hero = document.getElementById("home");
          if (hero) {
            ScrollTrigger.create({
              trigger: hero,
              start: "bottom 60%",
              onEnter: () => setDimmed(true),
              onLeaveBack: () => setDimmed(false),
            });
          }

          const centerOf = (b: (typeof bubbles)[number]) => ({
            x: (gsap.getProperty(b.wrapper, "x") as number) + (gsap.getProperty(b.inner, "x") as number) + BUBBLE_SIZE / 2,
            y: (gsap.getProperty(b.wrapper, "y") as number) + (gsap.getProperty(b.inner, "y") as number) + BUBBLE_SIZE / 2,
          });

          // Estourar: a camada não recebe cliques (pointer-events-none), então testamos a distância
          // do clique a cada bolha. Cliques em links/botões continuam só com o comportamento deles.
          const pop = (b: (typeof bubbles)[number], x: number, y: number) => {
            b.popped = true;
            b.rise.pause();
            splashDroplets(layer, x, y);
            gsap.to(b.inner, {
              scale: 1.5,
              opacity: 0,
              duration: 0.18,
              ease: "power2.out",
              onComplete: () => {
                // Renasce lá embaixo depois de um tempinho
                gsap.delayedCall(gsap.utils.random(1, 4), () => {
                  gsap.set(b.inner, { scale: 1, opacity: b.hidden ? 0 : 1 });
                  b.rise.restart();
                  b.popped = false;
                  if (b.hidden) {
                    b.rise.pause();
                    gsap.set(b.wrapper, { display: "none" });
                  }
                });
              },
            });
          };

          const handleClick = (e: MouseEvent) => {
            if ((e.target as Element).closest("a, button, input, textarea, select, label")) return;
            for (const b of bubbles) {
              if (b.popped || b.hidden) continue;
              const scale = gsap.getProperty(b.wrapper, "scale") as number;
              const { x, y } = centerOf(b);
              if (Math.hypot(x - e.clientX, y - e.clientY) < (BUBBLE_SIZE / 2) * scale + POP_SLACK) {
                pop(b, x, y);
                break;
              }
            }
          };
          window.addEventListener("click", handleClick);

          // Repulsão pelo mouse só faz sentido com ponteiro fino (não em toque)
          if (!finePointer) return () => window.removeEventListener("click", handleClick);

          const movers = bubbles.map((b) => ({
            ...b,
            moveX: gsap.quickTo(b.inner, "x", { duration: 0.6, ease: "power2.out" }),
            moveY: gsap.quickTo(b.inner, "y", { duration: 0.6, ease: "power2.out" }),
          }));

          // Interatividade: Repulsão no inner div (para não matar a subida), no máximo 1x por frame
          let frame = 0;
          let mouseX = 0;
          let mouseY = 0;

          const updateRepulsion = () => {
            frame = 0;
            movers.forEach(({ wrapper, moveX, moveY }) => {
              const bubbleX = (gsap.getProperty(wrapper, "x") as number) + BUBBLE_SIZE / 2;
              const bubbleY = (gsap.getProperty(wrapper, "y") as number) + BUBBLE_SIZE / 2;
              const distX = bubbleX - mouseX;
              const distY = bubbleY - mouseY;
              const distance = Math.hypot(distX, distY) || 1;

              if (distance < REPEL_RADIUS) {
                moveX((distX / distance) * 60);
                moveY((distY / distance) * 60);
              } else {
                moveX(0);
                moveY(0);
              }
            });
          };

          const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!frame) frame = requestAnimationFrame(updateRepulsion);
          };

          window.addEventListener("mousemove", handleMouseMove, { passive: true });
          return () => {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(frame);
          };
        },
      );
    },
    { scope: container },
  );

  return (
    // pointer-events-none: as bolhas nunca bloqueiam cliques (o estouro é testado pela distância)
    <div ref={container} aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {Array.from({ length: TOTAL_BUBBLES }, (_, i) => (
        <div
          key={i}
          className={`bubble-wrapper absolute ${i >= MOBILE_BUBBLES ? "hidden md:block" : ""}`}
          style={{ width: BUBBLE_SIZE, height: BUBBLE_SIZE, opacity: 0 }}
        >
          <div
            className="bubble-inner w-full h-full rounded-full border border-white/70 shadow-[inset_0_0_20px_rgba(255,255,255,0.7),0_5px_15px_rgba(53,126,151,0.15)]"
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
