"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PriceCard from "./PriceCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Prices() {
  const container = useRef<HTMLElement>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Básico",
      monthlyPrice: "89",
      annualPrice: "69",
      period: "/mês",
      description: "Para cuidados essenciais",
      features: [
        "Banho e tosa mensais",
        "Consulta clínica geral",
        "Vacinação anual",
        "Suporte por email",
      ],
      popular: false,
    },
    {
      name: "Completo",
      monthlyPrice: "149",
      annualPrice: "119",
      period: "/mês",
      description: "Mais popular - Cuidado integral",
      features: [
        "Todos os serviços básicos",
        "Consultas de rotina",
        "Creche 2x na semana",
        "Emergências 24h",
        "10% off na boutique",
      ],
      popular: true,
    },
    {
      name: "Premium",
      monthlyPrice: "229",
      annualPrice: "189",
      period: "/mês",
      description: "Cuidado máximo e luxo para seu pet",
      features: [
        "Todos os serviços completos",
        "Hotel pet 5 dias/mês",
        "Transporte VIP",
        "Nutricionista",
        "Banho de ofurô semanal",
      ],
      popular: false,
    },
  ];

  useGSAP(() => {
    // Animação de entrada dos cards com efeito 3D sutil
    gsap.from(".price-card-wrapper", {
      scrollTrigger: {
        trigger: ".prices-grid",
        start: "top 80%",
      },
      y: 60,
      opacity: 0,
      rotationX: 15,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Efeito Confete de Bolhas nos botões
    const buttons = gsap.utils.toArray<HTMLElement>(".btn-price");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const rect = btn.getBoundingClientRect();
        
        // Criar 20 bolhas de confete premium
        for(let i=0; i<20; i++) {
          const bubble = document.createElement('div');
          bubble.className = "fixed rounded-full pointer-events-none z-50 shadow-glass border border-white/60 backdrop-blur-md";
          
          const size = Math.random() * 20 + 8;
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          
          // Cores Premium
          const rand = Math.random();
          if (rand > 0.6) {
            bubble.style.background = "radial-gradient(circle at 30% 30%, rgba(255, 200, 150, 0.9) 0%, rgba(255, 159, 67, 0.6) 100%)";
          } else if (rand > 0.3) {
            bubble.style.background = "radial-gradient(circle at 30% 30%, rgba(180, 240, 240, 0.9) 0%, rgba(57, 157, 157, 0.6) 100%)";
          } else {
            bubble.style.background = "rgba(255,255,255,0.9)";
          }
          
          document.body.appendChild(bubble);
          
          const startX = rect.left + rect.width / 2;
          const startY = rect.top + rect.height / 2;
          
          gsap.set(bubble, { x: startX, y: startY, opacity: 1, scale: 0 });
          
          gsap.to(bubble, {
            x: startX + (Math.random() - 0.5) * 400,
            y: startY - Math.random() * 300 - 50,
            opacity: 0,
            scale: Math.random() * 1.5 + 0.5,
            rotation: Math.random() * 360,
            duration: Math.random() * 1.5 + 0.8,
            ease: "power3.out",
            onComplete: () => bubble.remove()
          });
        }
      });
    });
  }, { scope: container });

  // Animação de transição dos números usando useEffect para não recriar os listeners
  useGSAP(() => {
    gsap.fromTo(
      ".price-number",
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.5)" }
    );
  }, { dependencies: [isAnnual], scope: container });

  return (
    <section id="prices" ref={container} className="py-24 px-6 bg-pet-bg overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Premium (Mesmo estilo de Serviços e Sobre Nós) */}
        <div className="text-center mb-12 relative z-10">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-pet-orange/10 blur-[100px] rounded-[100%] pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl font-bold text-pet-navy mb-6 font-ubuntu leading-tight relative z-10">
            Planos & <span className="text-transparent bg-clip-text bg-linear-to-r from-pet-orange to-amber-400 drop-shadow-sm">Preços</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10">
            Escolha o plano ideal para as necessidades do seu pet. Todos incluem <span className="text-pet-teal-dark font-medium">cuidados essenciais</span> e muito carinho.
          </p>
        </div>

        {/* Toggle Mensal/Anual */}
        <div className="flex flex-col items-center justify-center mb-16 relative z-10">
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md p-2 rounded-full border border-white/80 shadow-premium">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                !isAnnual
                  ? "bg-pet-navy text-white shadow-md"
                  : "text-gray-500 hover:text-pet-navy"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 relative ${
                isAnnual
                  ? "bg-pet-navy text-white shadow-md"
                  : "text-gray-500 hover:text-pet-navy"
              }`}
            >
              Anual
              {/* Badge Economize */}
              <span className="absolute -top-4 -right-6 bg-pet-orange text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-orange-glow animate-pulse">
                Ganhe 20% Off
              </span>
            </button>
          </div>
        </div>
        
        {/* Grid de Cards */}
        <div className="prices-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
          {plans.map((plan, index) => (
            <PriceCard key={index} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  );
}
