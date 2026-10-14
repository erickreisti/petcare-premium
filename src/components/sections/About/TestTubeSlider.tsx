"use client";

import { useRef, useEffect, type KeyboardEvent } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const SVG_NS = "http://www.w3.org/2000/svg";
const TEAL = "#399D9D";
// Início da trilha (onde fica o bico do borrifador no passo 1) e sua altura
const TRACK_START = 150;
const TRACK_Y = 300;
// Distância (em unidades do viewBox) que o borrifador percorre entre o primeiro e o último passo
const MAX_DRAG = 500;
const NOZZLE_Y = 252;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const random = (min: number, max: number) => gsap.utils.random(min, max);

interface TestTubeSliderProps {
  steps: number;
  activeStep: number;
  onStepChange: (step: number) => void;
  /** Nomes das etapas, lidos por leitores de tela */
  labels?: string[];
}

export default function TestTubeSlider({
  steps = 4,
  activeStep,
  onStepChange,
  labels = [],
}: TestTubeSliderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragIdRef = useRef(activeStep);
  const prevStepRef = useRef(activeStep);
  const sprayRef = useRef<() => void>(() => {});
  const stepDistance = MAX_DRAG / (steps - 1);

  // Monta o Draggable e os efeitos contínuos uma única vez
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const q = <T extends Element>(selector: string) => svg.querySelector(selector) as T;

    const dragger = q<SVGGElement>(".dragger");
    const gun = q<SVGGElement>(".sprayGun");
    const hint = q<SVGGElement>(".dragHint");
    const hoseLines = svg.querySelectorAll<SVGLineElement>(".hoseLine");
    const trackFill = q<SVGLineElement>(".trackFill");
    const bubbleContainer = q<SVGGElement>(".bubbleContainer");
    const singleBubble = q<SVGCircleElement>(".singleBubble");
    const valueBubble = q<SVGGElement>(".valueBubble");
    const popGroup = q<SVGGElement>(".popGroup");
    const reduced = prefersReducedMotion();

    const snapPoints = Array.from({ length: steps }, (_, i) => i * stepDistance);
    let dragCount = 0;
    let lastX = snapPoints[dragIdRef.current];
    let tilt = 0;

    gsap.set(svg, { visibility: "visible" });
    gsap.set(dragger, { x: lastX });
    gsap.set(gun, { transformOrigin: "45% 70%" });

    const followGun = (x: number) => {
      hoseLines.forEach(line => line.setAttribute("x2", String(100 + x)));
      trackFill.setAttribute("x2", String(TRACK_START + x));
    };
    followGun(lastX);

    // A cada quadro: mangueira e trilha acompanham a pistola, que inclina conforme a velocidade.
    // Parado não escreve nada: cada atributo alterado repinta o card de vidro (com blur) em volta.
    const update = () => {
      const x = gsap.getProperty(dragger, "x") as number;
      if (x === lastX && tilt === 0) return;
      if (x !== lastX) followGun(x);
      if (!reduced) {
        const target = gsap.utils.clamp(-14, 14, -(x - lastX) * 1.5);
        tilt += (target - tilt) * 0.2;
        if (target === 0 && Math.abs(tilt) < 0.05) tilt = 0;
        gsap.set(gun, { rotation: tilt });
      }
      lastX = x;
    };
    gsap.ticker.add(update);

    // Névoa que sai do bico quando o borrifador chega numa etapa
    sprayRef.current = () => {
      if (reduced) return;
      const x = TRACK_START + (gsap.getProperty(dragger, "x") as number);
      for (let i = 0; i < 8; i++) {
        const drop = document.createElementNS(SVG_NS, "circle");
        drop.setAttribute("cx", String(x));
        drop.setAttribute("cy", String(NOZZLE_Y));
        drop.setAttribute("r", String(random(2, 4)));
        drop.setAttribute("fill", "#9bdcdc");
        bubbleContainer.appendChild(drop);
        gsap.to(drop, {
          x: random(25, 75),
          y: random(-24, 18),
          opacity: 0,
          attr: { r: random(6, 10) },
          duration: random(0.5, 0.9),
          ease: "power2.out",
          onComplete: () => drop.remove(),
        });
      }
    };

    function popAt(x: number, y: number) {
      const pop = popGroup.cloneNode(true) as SVGGElement;
      bubbleContainer.appendChild(pop);
      gsap.set(pop, { x: x + TRACK_START - 37, y: y + NOZZLE_Y - 37 });
      gsap.fromTo(
        pop.querySelectorAll("line"),
        { scale: 0, opacity: 1, transformOrigin: "50% 50%" },
        { scale: 1.5, opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => pop.remove() },
      );
    }

    // Bolhas que sobem enquanto o borrifador é arrastado
    function createBubbleCloud() {
      const x = gsap.getProperty(dragger, "x") as number;

      const nearest = Math.round(x / stepDistance);
      if (nearest !== dragIdRef.current) {
        dragIdRef.current = nearest;
        onStepChange(nearest);
      }

      if (reduced) return;
      dragCount++;

      const bubble = singleBubble.cloneNode(true) as SVGCircleElement;
      bubbleContainer.appendChild(bubble);
      const duration = random(0.5, 3);
      gsap
        .timeline({ onComplete: () => bubble.remove() })
        .fromTo(
          bubble,
          { attr: { r: duration * 2.7 }, x: x + 6, y: random(-45, 10), opacity: random(0.1, 1) },
          { x: random(x - 25, x + 25), y: random(-150, -60), duration, ease: "expo.out" },
        )
        .to(bubble, { opacity: 0, attr: { r: 0 }, duration: duration / 3, ease: "expo.in" }, 0);

      // De vez em quando sobe uma bolha grande que estoura
      if (dragCount % 15 !== 0) return;
      const big = valueBubble.cloneNode(true) as SVGGElement;
      bubbleContainer.appendChild(big);
      gsap.set(big, { transformOrigin: "50% 50%" });
      gsap
        .timeline({
          onComplete: () => {
            popAt(gsap.getProperty(big, "x") as number, gsap.getProperty(big, "y") as number);
            big.remove();
          },
        })
        .from(big, { scaleY: 0, duration: 2, ease: "elastic.out(0.9, 0.3)" })
        .from(big, { scaleX: 0, duration: 2, ease: "elastic.out(0.7, 0.3)" }, 0)
        .fromTo(
          big,
          { x: random(x - 6, x + 6), y: random(-60, -30) },
          { x, y: random(-120, -30), duration: 2.2, ease: "none" },
          0,
        );
    }

    const [draggable] = Draggable.create(dragger, {
      type: "x",
      bounds: { minX: 0, maxX: MAX_DRAG },
      onPress: () => gsap.to(hint, { autoAlpha: 0, duration: 0.3 }),
      onDrag: createBubbleCloud,
      // Ao soltar, encaixa na etapa mais próxima
      onRelease: () => {
        gsap.to(dragger, {
          x: snapPoints[dragIdRef.current],
          duration: reduced ? 0 : 0.45,
          ease: "back.out(2)",
        });
      },
    });

    return () => {
      gsap.ticker.remove(update);
      draggable.kill();
      gsap.killTweensOf([dragger, gun]);
      sprayRef.current = () => {};
    };
  }, [steps, stepDistance, onStepChange]);

  // Mudança de etapa vinda de fora (lista, miniaturas, autoplay): o borrifador desliza até lá
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || prevStepRef.current === activeStep) return;
    prevStepRef.current = activeStep;

    if (activeStep === dragIdRef.current) {
      sprayRef.current();
      return;
    }
    dragIdRef.current = activeStep;
    gsap.to(svg.querySelector(".dragger"), {
      x: activeStep * stepDistance,
      duration: prefersReducedMotion() ? 0 : 0.7,
      ease: "power2.inOut",
      onComplete: () => sprayRef.current(),
    });
  }, [activeStep, stepDistance]);

  // Acessibilidade: setas/Home/End mudam o passo pelo teclado
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keySteps: Record<string, number> = {
      ArrowRight: activeStep + 1,
      ArrowUp: activeStep + 1,
      ArrowLeft: activeStep - 1,
      ArrowDown: activeStep - 1,
      Home: 0,
      End: steps - 1,
    };
    if (!(e.key in keySteps)) return;
    e.preventDefault();
    const next = Math.min(steps - 1, Math.max(0, keySteps[e.key]));
    if (next !== activeStep) onStepChange(next);
  };

  const label = labels[activeStep];

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="Etapas do atendimento"
      aria-valuemin={1}
      aria-valuemax={steps}
      aria-valuenow={activeStep + 1}
      aria-valuetext={`Etapa ${activeStep + 1} de ${steps}${label ? `: ${label}` : ""}`}
      onKeyDown={handleKeyDown}
      className="w-full select-none rounded-3xl focus-visible:outline-2 focus-visible:outline-pet-orange focus-visible:outline-offset-4"
    >
      <svg
        ref={svgRef}
        viewBox="0 195 690 165"
        className="w-full h-auto overflow-visible"
        style={{ visibility: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="sprayShadow" x="-100%" y="-100%" width="250%" height="250%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feOffset dx="0" dy="18" result="offsetblur" />
            <feFlood floodColor="#0a3641" floodOpacity="0.15" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <g className="popGroup" stroke={TEAL} strokeWidth="2" strokeLinecap="round">
            {/* 8 raios do estouro, de 45 em 45 graus */}
            {Array.from({ length: 8 }, (_, i) => (
              <line key={i} x1="37" y1="37" x2={37 + 37 * Math.sin((i * Math.PI) / 4)} y2={37 - 37 * Math.cos((i * Math.PI) / 4)} />
            ))}
          </g>
          <circle className="singleBubble" cx={TRACK_START} cy={NOZZLE_Y} r="10" fill={TEAL} />
          <g className="valueBubble">
            <circle cx={TRACK_START} cy={NOZZLE_Y} r="20" fill={TEAL} fillOpacity="0.8" />
            <circle
              cx={TRACK_START}
              cy={NOZZLE_Y}
              r="15"
              fill="none"
              stroke="#FFFCF9"
              strokeWidth="2"
              strokeDasharray="10 89"
              strokeDashoffset="45"
              opacity="0.5"
              strokeLinecap="round"
            />
          </g>
        </defs>

        <g filter="url(#sprayShadow)">
          {/* Trilha: tracejada no fundo e preenchida até onde o borrifador já passou */}
          <line
            x1={TRACK_START}
            x2={TRACK_START + MAX_DRAG}
            y1={TRACK_Y}
            y2={TRACK_Y}
            stroke="#e2e8f0"
            strokeLinecap="round"
            strokeWidth="8"
            strokeDasharray="4 10"
          />
          <line
            className="trackFill"
            x1={TRACK_START}
            x2={TRACK_START}
            y1={TRACK_Y}
            y2={TRACK_Y}
            stroke={TEAL}
            strokeLinecap="round"
            strokeWidth="8"
          />

          {/* Reservatório de onde sai a mangueira */}
          <rect x="6" y="282" width="42" height="54" rx="12" fill="#2c7a7a" />
          <rect x="14" y="292" width="26" height="8" rx="4" fill="#ffffff" opacity="0.35" />
          <circle cx="20" cy="318" r="4" fill="#ffffff" opacity="0.5" />
          <circle cx="32" cy="324" r="2.5" fill="#ffffff" opacity="0.4" />

          <line className="hoseLine" x1="44" x2="100" y1="324" y2="324" stroke={TEAL} strokeWidth="16" strokeLinecap="round" />
          <line className="hoseLine" x1="44" x2="100" y1="320" y2="320" stroke="#2c7a7a" strokeWidth="4" opacity="0.3" />

          {/* Marcadores das etapas: clicáveis com o mouse (o teclado usa as setas) */}
          {Array.from({ length: steps }, (_, i) => {
            const cx = TRACK_START + i * stepDistance;
            const isActive = i === activeStep;
            const reached = i <= activeStep;
            return (
              <g key={i} className="cursor-pointer" onClick={() => onStepChange(i)}>
                <circle cx={cx} cy={TRACK_Y} r="24" fill="transparent" />
                <circle
                  cx={cx}
                  cy={TRACK_Y}
                  r={isActive ? 14 : 10}
                  fill={reached ? TEAL : "#ffffff"}
                  stroke={reached ? "#ffffff" : "#cbd5e1"}
                  strokeWidth="5"
                  className="transition-all duration-300"
                />
                <text
                  x={cx}
                  y={TRACK_Y + 50}
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="700"
                  fill={isActive ? "#FF9F43" : "#94a3b8"}
                  className="font-ubuntu transition-colors duration-300"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}

          <g className="bubbleContainer pointer-events-none" />

          <g className="dragger cursor-grab active:cursor-grabbing">
            {/* Área de toque maior que o desenho */}
            <rect x="80" y="225" width="85" height="115" fill="transparent" />
            <g className="dragHint">
              {/* Pulsa só 4 vezes: em loop repintaria o card de vidro (com blur) a cada quadro */}
              <text x="118" y="222" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FF9F43" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_4]">
                ‹ arraste ›
              </text>
            </g>
            <g className="sprayGun" fill={TEAL}>
              {/* Desenho ampliado 1,6x mantendo o bico sobre a trilha */}
              <g transform="translate(150 300) scale(1.6) translate(-150 -300)">
              {/* Cabo */}
              <rect x="115" y="275" width="10" height="30" />
              {/* Conexão da mangueira */}
              <rect x="115" y="307" width="10" height="15" />
              <rect x="112" y="303" width="16" height="4" rx="2" />
              {/* Corpo */}
              <rect x="110" y="265" width="30" height="10" rx="2" />
              {/* Bico */}
              <path d="M 140 263 L 150 260 V 280 L 140 277 Z" />
              {/* Tampa traseira */}
              <path d="M 110 266 H 107 A 2 2 0 0 0 105 268 V 272 A 2 2 0 0 0 107 274 H 110 Z" />
              {/* Gatilho */}
              <path d="M 110 273 Q 95 273 100 290 Q 105 285 110 280 Z" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
