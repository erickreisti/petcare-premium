"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Prices() {
  const container = useRef<HTMLElement>(null);

  const plans = [
    {
      name: "Básico",
      price: "R$ 89",
      period: "/mês",
      description: "Para cuidados essenciais",
      features: [
        "Banho e tosa",
        "Consulta básica",
        "Vacina anual",
        "Suporte por email",
      ],
      popular: false,
    },
    {
      name: "Completo",
      price: "R$ 149",
      period: "/mês",
      description: "Mais popular - Cuidado integral",
      features: [
        "Todos os serviços básicos",
        "Consultas ilimitadas",
        "Creche 2x na semana",
        "Emergências 24h",
        "Desconto em produtos",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "R$ 229",
      period: "/mês",
      description: "Cuidado máximo para seu pet",
      features: [
        "Todos os serviços completos",
        "Hotel pet 5 dias/mês",
        "Transporte",
        "Nutricionista",
        "Treinador personalizado",
      ],
      popular: false,
    },
  ];

  useGSAP(() => {
    // Animação de entrada dos cards (substituindo Framer Motion)
    gsap.from(".price-card", {
      scrollTrigger: {
        trigger: ".prices-grid",
        start: "top 80%",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.5)" // Salto divertido
    });

    // Efeito Confete de Bolhas nos botões
    const buttons = gsap.utils.toArray<HTMLElement>(".btn-price");
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const rect = btn.getBoundingClientRect();
        
        // Criar 15 bolhas de confete
        for(let i=0; i<15; i++) {
          const bubble = document.createElement('div');
          bubble.className = "fixed rounded-full pointer-events-none z-50 shadow-sm backdrop-blur-sm border border-white/60";
          
          const size = Math.random() * 15 + 5;
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          
          // Algumas bolhas tem tom laranja para destacar
          const isOrange = Math.random() > 0.7;
          bubble.style.background = isOrange 
            ? "radial-gradient(circle at 30% 30%, rgba(255, 200, 150, 0.9) 0%, rgba(255, 159, 67, 0.4) 100%)"
            : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(57, 157, 157, 0.1) 100%)";
          
          document.body.appendChild(bubble);
          
          const startX = rect.left + rect.width / 2;
          const startY = rect.top + rect.height / 2;
          
          gsap.set(bubble, { x: startX, y: startY, opacity: 1, scale: 0 });
          
          gsap.to(bubble, {
            x: startX + (Math.random() - 0.5) * 300,
            y: startY - Math.random() * 200 - 50,
            opacity: 0,
            scale: Math.random() * 1.5 + 0.5,
            duration: Math.random() * 1 + 0.6,
            ease: "power2.out",
            onComplete: () => bubble.remove()
          });
        }
      });
    });

  }, { scope: container });

  return (
    <section id="prices" ref={container} className="py-20 px-6 bg-pet-bg/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-pet-teal-dark font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-pet-teal-dark rounded-full"></span>
            Nossos Valores
            <span className="w-8 h-0.5 bg-pet-teal-dark rounded-full"></span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-pet-navy mb-6 font-ubuntu">
            Planos & <span className="text-pet-orange">Preços</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para as necessidades do seu pet. Todos incluem
            cuidados básicos essenciais e muito carinho.
          </p>
        </div>
        
        <div className="prices-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`price-card relative rounded-3xl p-8 ${plan.popular ? "bg-white border-2 border-pet-orange shadow-orange-glow lg:-translate-y-4 lg:scale-105 z-20" : "glass border border-white shadow-premium z-10"} transition-transform duration-300 hover:shadow-teal-glow group`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pet-orange text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Mais Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-pet-navy mb-2 font-ubuntu">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-4xl font-bold text-pet-navy group-hover:scale-110 transition-transform duration-300">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-pet-orange shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`btn-price w-full py-4 rounded-xl font-bold transition-all duration-300 ${plan.popular ? "bg-pet-orange hover:bg-pet-orange-hover text-white shadow-lg hover:shadow-orange-glow transform hover:-translate-y-1" : "glass hover:bg-pet-teal hover:text-white hover:border-pet-teal text-pet-navy border border-white shadow-sm transform hover:-translate-y-1"}`}
              >
                Escolher Plano
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
