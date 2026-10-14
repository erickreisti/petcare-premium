"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PriceCard, { type Plan } from "./PriceCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bubbleReveal } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const plans: Plan[] = [
  {
    name: "Básico",
    monthlyPrice: 89,
    annualPrice: 69,
    description: "Para cuidados essenciais",
    features: ["Banho e tosa mensais", "Consulta clínica geral", "Vacinação anual", "Suporte por email"],
  },
  {
    name: "Completo",
    monthlyPrice: 149,
    annualPrice: 119,
    description: "Mais popular - Cuidado integral",
    features: ["Todos os serviços básicos", "Consultas de rotina", "Creche 2x na semana", "Emergências 24h", "10% off na boutique"],
    popular: true,
  },
  {
    name: "Premium",
    monthlyPrice: 229,
    annualPrice: 189,
    description: "Cuidado máximo e luxo para seu pet",
    features: ["Todos os serviços completos", "Hotel pet 5 dias/mês", "Transporte VIP", "Nutricionista", "Banho de ofurô semanal"],
  },
];

const toggleClass = (active: boolean) =>
  `px-6 py-3 rounded-full font-bold text-sm transition-[background-color,color,box-shadow] duration-300 ${
    active ? "bg-pet-navy text-white shadow-md" : "text-gray-500 hover:text-pet-navy"
  }`;

export default function Prices() {
  const container = useRef<HTMLElement>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      bubbleReveal(".prices-header h2, .prices-header p", container.current);

      // Entrada dos cards com efeito 3D sutil
      gsap.from(".price-card-wrapper", {
        scrollTrigger: { trigger: ".prices-grid", start: "top 80%" },
        y: 60,
        opacity: 0,
        rotationX: 15,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    });
  }, { scope: container });

  // Troca Mensal/Anual: os cards "respiram" como gelatina e o selo de desconto dá um pulinho
  const isFirstToggleRender = useRef(true);
  useGSAP(() => {
    if (isFirstToggleRender.current) {
      isFirstToggleRender.current = false;
      return;
    }
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".price-card",
        { scaleX: 1, scaleY: 1 },
        {
          keyframes: { scaleX: [1.03, 0.985, 1], scaleY: [0.97, 1.015, 1] },
          duration: 0.7,
          stagger: 0.07,
          ease: "sine.inOut",
          clearProps: "transform",
        },
      );
      if (isAnnual) {
        gsap.fromTo(
          ".discount-badge",
          { scale: 1, rotation: 0 },
          { keyframes: { scale: [1.35, 0.9, 1], rotation: [-10, 6, 0] }, duration: 0.6, ease: "power2.out", clearProps: "transform" },
        );
      }
    });
  }, { scope: container, dependencies: [isAnnual] });

  return (
    <section id="prices" ref={container} className="py-24 px-6 bg-pet-bg overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="prices-header text-center mb-12 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-pet-orange/10 blur-[100px] rounded-[100%] pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-bold text-pet-navy mb-6 font-ubuntu leading-tight relative z-10">
            Planos & <span className="text-transparent bg-clip-text bg-linear-to-r from-pet-orange to-amber-400 drop-shadow-sm">Preços</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10">
            Escolha o plano ideal para as necessidades do seu pet. Todos incluem <span className="text-pet-teal-dark font-medium">cuidados essenciais</span> e muito carinho.
          </p>
        </div>

        {/* Toggle Mensal/Anual */}
        <div className="flex justify-center mb-16 relative z-10">
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md p-2 rounded-full border border-white/80 shadow-premium">
            <button type="button" aria-pressed={!isAnnual} onClick={() => setIsAnnual(false)} className={toggleClass(!isAnnual)}>
              Mensal
            </button>
            <button type="button" aria-pressed={isAnnual} onClick={() => setIsAnnual(true)} className={`relative ${toggleClass(isAnnual)}`}>
              Anual
              <span className="discount-badge absolute -top-4 -right-6 bg-pet-orange text-pet-navy text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-orange-glow animate-pulse">
                Até 22% Off
              </span>
            </button>
          </div>
        </div>

        <div className="prices-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-[1000px]">
          {plans.map((plan) => (
            <PriceCard key={plan.name} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  );
}
