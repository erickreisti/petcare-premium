"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Registrar plugins do GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface TestTubeSliderProps {
  steps: number;
  activeStep: number;
  onStepChange: (step: number) => void;
}

export default function TestTubeSlider({
  steps = 4,
  activeStep,
  onStepChange,
}: TestTubeSliderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragIdRef = useRef(activeStep);

  // Setup GSAP and Draggable ONLY ONCE
  useEffect(() => {
    if (!svgRef.current) return;

    const follower = svgRef.current.querySelector(".follower") as HTMLElement;
    const testTubeLiquid = svgRef.current.querySelector(
      ".testTubeLiquid"
    ) as HTMLElement;
    const popGroup = svgRef.current.querySelector(".popGroup") as HTMLElement;
    const dragger = svgRef.current.querySelector(".dragger") as HTMLElement;
    const bubbleContainer = svgRef.current.querySelector(
      ".bubbleContainer"
    ) as HTMLElement;
    const singleBubble = svgRef.current.querySelector(
      ".singleBubble"
    ) as HTMLElement;
    const valueBubble = svgRef.current.querySelector(
      ".valueBubble"
    ) as HTMLElement;

    // Configurações e Cálculos
    const maxDrag = 500;
    const stepDistance = maxDrag / (steps - 1);
    const snapPoints = Array.from({ length: steps }).map(
      (_, i) => i * stepDistance
    );

    let followerVX = 0;
    let dragCount = 0;

    // Set initial states
    gsap.set(svgRef.current, { visibility: "visible" });
    gsap.set([valueBubble, singleBubble], { transformOrigin: "50% 50%" });
    gsap.set(testTubeLiquid, { transformOrigin: "50% 0%" });
    // testTubeGroup has the dragger class
    gsap.set(dragger, { transformOrigin: "50% 10%", x: snapPoints[activeStep] });

    // Utilitário randômico
    function randomBetween(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Lógica para remover clone
    function removeClone(clone: Element, willpop?: boolean) {
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }

      if (willpop) {
        const pop = popGroup.cloneNode(true) as HTMLElement;
        bubbleContainer.appendChild(pop);

        const currentX = gsap.getProperty(clone, "x") as number;
        const currentY = gsap.getProperty(clone, "y") as number;

        const tl = gsap.timeline({
          onComplete: () => removeClone(pop),
        });
        tl.timeScale(3.6);

        gsap.set(pop, {
          x: currentX + 150 - 37,
          y: currentY + 270 - 37,
        });

        const lines = pop.querySelectorAll("line");
        // Simulated drawSVG without the premium plugin:
        // We will just scale them from 0 to 1
        tl.fromTo(
          lines,
          { scale: 0, opacity: 1, transformOrigin: "50% 50%" },
          { scale: 1.5, opacity: 0, duration: 1.4, ease: "power2.out" }
        );
      }
    }

    // Lógica principal de geração de bolhas
    function createBubbleCloud() {
      dragCount++;
      const numBubblesToCreate = 2; // Original code used 2
      let i = numBubblesToCreate;

      const currentX = gsap.getProperty(dragger, "x") as number;
      const currentY = gsap.getProperty(dragger, "y") as number;

      // Calcular step atual
      const currentSnap = Math.round(currentX / stepDistance);
      const newDragId = currentSnap; // 0-indexed internally

      if (newDragId !== dragIdRef.current) {
        dragIdRef.current = newDragId;
        onStepChange(dragIdRef.current); // Atualizar o React state
      }

      while (--i > -1) {
        const isMainBubble = i === 0;
        const clone = isMainBubble
          ? (valueBubble.cloneNode(true) as HTMLElement)
          : (singleBubble.cloneNode(true) as HTMLElement);

        bubbleContainer.appendChild(clone);
        const tweenDuration = !isMainBubble ? randomBetween(5, 30) / 10 : 1;

        if (!isMainBubble) {
          const tl = gsap.timeline();
          tl.fromTo(
            clone,
            {
              attr: { r: tweenDuration * 2.7 },
              x: currentX + 6,
              y: randomBetween(currentY + 10, currentY - 45),
              opacity: randomBetween(1, 10) / 10,
              rotation: 0,
            },
            {
              rotation: randomBetween(12, 120),
              x: randomBetween(currentX - 25, currentX + 25),
              y: randomBetween(-60, -150),
              duration: tweenDuration,
              ease: "expo.out",
            }
          ).to(
            clone,
            {
              opacity: 0,
              attr: { r: 0 },
              duration: tweenDuration / 3,
              ease: "expo.in",
              onComplete: () => removeClone(clone),
            },
            `-=${tweenDuration}`
          );
        } else {
          // Reduce main bubble frequency
          if (dragCount % 15 !== 0) {
            removeClone(clone);
            continue;
          }

          const tl = gsap.timeline({
            onComplete: () => removeClone(clone, true),
          });

          tl.from(clone, {
            scaleY: 0,
            duration: 2,
            ease: "elastic.out(0.9, 0.3)",
          })
            .from(
              clone,
              {
                scaleX: 0,
                duration: 2,
                ease: "elastic.out(0.7, 0.3)",
              },
              "-=2"
            )
            .fromTo(
              clone,
              {
                x: randomBetween(currentX - 6, currentX + 6),
                y: randomBetween(-30, currentY - 60),
              },
              {
                x: currentX,
                y: randomBetween(-30, -120),
                duration: 2.2,
                ease: "none",
              },
              "-=2"
            );
        }
      }
    }

    // Efeitos passivos no tubo e líquido
    const followerTween = gsap.to(follower, {
      x: "+=0", // Dummy anim just to run modifier
      repeat: -1,
      duration: 1,
      modifiers: {
        x: () => {
          const draggerX = gsap.getProperty(dragger, "x") as number;
          const followerX = gsap.getProperty(follower, "x") as number;
          followerVX += (draggerX - followerX) * 0.3;
          followerVX *= 0.9;

          // Atualiza a mangueira elástica
          if (svgRef.current) {
            const hose = svgRef.current.querySelector(".hoseLine");
            const hoseInner = svgRef.current.querySelector(".hoseLineInner");
            if (hose && hoseInner) {
              hose.setAttribute("x2", String(110 + draggerX));
              hoseInner.setAttribute("x2", String(110 + draggerX));
            }
          }

          return followerX + followerVX;
        },
      },
    });

    const liquidTween = gsap.to(testTubeLiquid, {
      rotation: "+=0",
      repeat: -1,
      duration: 1,
      modifiers: {
        rotation: (rotation: number) => {
          return rotation + followerVX * 0.5;
        },
      },
    });

    // Criar o Draggable
    Draggable.create(dragger, {
      type: "x",
      bounds: { minX: 0, maxX: maxDrag },
      onDrag: createBubbleCloud,
      snap: snapPoints,
    });

    return () => {
      followerTween.kill();
      liquidTween.kill();
      Draggable.get(dragger)?.kill();
    };
  }, [steps, onStepChange]);

  // Sync external state changes (when user clicks the mosaic)
  useEffect(() => {
    if (!svgRef.current) return;
    if (activeStep !== dragIdRef.current) {
      const dragger = svgRef.current.querySelector(".dragger") as HTMLElement;
      const maxDrag = 500;
      const stepDistance = maxDrag / (steps - 1);
      
      gsap.to(dragger, {
        x: activeStep * stepDistance,
        duration: 0.6,
        ease: "power2.out",
      });
      dragIdRef.current = activeStep;
    }
  }, [activeStep, steps]);

  return (
    <div className="w-full max-w-4xl mx-auto touch-none select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        style={{ visibility: "hidden" }}
      >
        <defs>
          <filter id="blur" x="-100%" y="-100%" width="250%" height="250%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feOffset dx="0" dy="28" result="offsetblur"></feOffset>
            <feFlood id="glowAlpha" floodColor="#0a3641" floodOpacity="0.2"></feFlood>
            <feComposite in2="offsetblur" operator="in"></feComposite>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>

          <g
            className="popGroup"
            stroke="#399D9D"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="37" y1="37" y2="0" x2="37" fill="none" strokeMiterlimit="10" />
            <line x1="37" y1="37" x2="63.16" y2="10.84" fill="none" strokeMiterlimit="10" />
            <line x1="37" y1="37" x2="74" y2="37" fill="none" strokeMiterlimit="10" />
            <line x1="37" y1="37" x2="63.16" y2="63.16" fill="none" strokeMiterlimit="10" />
            <line x1="37" y1="37" x2="37" y2="74" fill="none" strokeMiterlimit="10" />
            <line x1="37" y1="37" x2="10.84" y2="63.16" fill="none" strokeMiterlimit="10" />
            <line x1="37" x2="0" y1="37" y2="37" fill="none" strokeMiterlimit="10" />
            <line x1="37" y1="37" x2="10.84" y2="10.84" fill="none" strokeMiterlimit="10" />
          </g>
          <circle
            className="singleBubble"
            cx="150"
            cy="270"
            r="10"
            fill="#399D9D"
            stroke="none"
            strokeWidth="1"
          />
          <g className="valueBubble" id="numBubble">
            <circle
              cx="150"
              cy="270"
              r="20"
              fill="#399D9D"
              stroke="none"
              strokeWidth="1"
              fillOpacity="0.8"
            />
            <circle
              cx="150"
              cy="270"
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
        <g filter="url(#blur)">
          <line
            x1="150"
            x2="650"
            y1="300"
            y2="300"
            stroke="#e2e8f0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            strokeDasharray="4 8"
          />
          <line
            className="hoseLine"
            x1="-100"
            x2="120"
            y1="315"
            y2="315"
            stroke="#399D9D"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <line
            className="hoseLineInner"
            x1="-100"
            x2="120"
            y1="312"
            y2="312"
            stroke="#2c7a7a"
            strokeWidth="4"
            opacity="0.3"
          />
          <g className="draggerOld" opacity="0">
            <circle
              cx="150"
              cy="300"
              r="18"
              fill="#399D9D"
              fillOpacity="1"
              stroke="#FFFCF9"
              strokeWidth="4"
            />
            <circle
              cx="150"
              cy="300"
              r="12"
              fill="none"
              stroke="#FFFCF9"
              strokeWidth="2"
              strokeDasharray="10 100"
              strokeDashoffset="70"
              opacity="0.5"
            />
          </g>
          <g className="bubbleContainer" />
          <g className="testTubeGroup dragger cursor-grab active:cursor-grabbing">
            <rect className="testTubeLiquid" display="none" />
            
            <g id="sprayGun" fill="#399D9D">
              {/* Handle */}
              <rect x="115" y="275" width="10" height="30" />
              {/* Hose connection block */}
              <rect x="115" y="307" width="10" height="15" />
              {/* Connector Ring */}
              <rect x="112" y="303" width="16" height="4" rx="2" />
              {/* Cylinder */}
              <rect x="110" y="265" width="30" height="10" rx="2" />
              {/* Front Nozzle */}
              <path d="M 140 263 L 150 260 V 280 L 140 277 Z" />
              {/* Back Cap */}
              <path d="M 110 266 H 107 A 2 2 0 0 0 105 268 V 272 A 2 2 0 0 0 107 274 H 110 Z" />
              {/* Trigger (Back) */}
              <path d="M 110 273 Q 95 273 100 290 Q 105 285 110 280 Z" />
            </g>
          </g>
          <circle
            className="follower"
            cx="150"
            cy="240"
            r="0"
            fill="#399D9D"
            fillOpacity="1"
            stroke="#FFFCF9"
            strokeWidth="0"
          />
        </g>
      </svg>
    </div>
  );
}
