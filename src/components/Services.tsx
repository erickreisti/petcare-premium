"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const container = useRef<HTMLElement>(null);

  const services = [
    {
      icon: "🛁",
      title: "Estética Premium",
      description:
        "Banho, tosa, hidratação e cuidados estéticos com produtos premium e técnicas profissionais.",
      features: ["Banho terapêutico", "Tosa higiênica", "Hidratação"],
      className: "md:col-span-2 lg:col-span-2 row-span-2",
    },
    {
      icon: "🏥",
      title: "Saúde Clínica",
      description:
        "Consultas, exames, vacinas e tratamentos avançados.",
      features: ["Consultas", "Vacinas", "Exames"],
      className: "col-span-1",
    },
    {
      icon: "🎾",
      title: "Resort & Creche",
      description:
        "Espaço seguro com monitoramento e muita diversão.",
      features: ["Creche", "Hotel Pet", "Recreação"],
      className: "col-span-1 md:col-span-2 lg:col-span-1",
    },
  ];

  useGSAP(() => {
    // Animação de entrada do cabeçalho
    gsap.from(".services-header", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Animação de entrada dos cards
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });

    // Efeito de Bolhas no Hover dos cards
    const cards = gsap.utils.toArray<HTMLElement>(".service-card");
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        // Cria 3-5 pequenas bolhas
        const numBubbles = Math.floor(Math.random() * 3) + 3;
        
        for(let i=0; i<numBubbles; i++) {
          const bubble = document.createElement('div');
          bubble.className = "absolute rounded-full border border-white/60 pointer-events-none z-0 shadow-sm backdrop-blur-sm";
          bubble.style.background = "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(57, 157, 157, 0.2) 60%, rgba(255, 255, 255, 0.3) 100%)";
          
          // Tamanho aleatório
          const size = Math.random() * 20 + 10;
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          
          card.appendChild(bubble);
          
          // Animação subindo
          gsap.fromTo(bubble, 
            {
              x: `${Math.random() * 80 + 10}%`, // 10% a 90% da largura
              y: "90%",
              opacity: 0.8,
              scale: 0.5
            },
            {
              y: "-20%", // Sobe para fora do card
              x: `+=${(Math.random() - 0.5) * 50}`, // Zigzag leve
              opacity: 0,
              scale: 1.2,
              duration: Math.random() * 1 + 1,
              ease: "power1.out",
              onComplete: () => bubble.remove() // Limpa a DOM
            }
          );
        }
      });
    });

  }, { scope: container });

  return (
    <section
      id="services"
      ref={container}
      className="py-20 px-6 bg-pet-bg overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="services-header text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-pet-teal/20 shadow-sm">
            <span className="w-2 h-2 bg-pet-teal-dark rounded-full animate-pulse"></span>
            <span className="text-pet-teal-dark font-semibold text-sm uppercase tracking-wider">
              Nossos Serviços
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pet-navy mb-6 font-ubuntu">
            Cuidado <span className="text-pet-orange">Completo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma gama completa de serviços no formato de um ecossistema 
            integrado para a saúde e felicidade do seu melhor amigo.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card glass relative rounded-3xl p-8 lg:p-10 flex flex-col justify-between overflow-hidden group shadow-premium hover:shadow-teal-glow transition-all duration-500 border border-white/80 ${service.className}`}
            >
              {/* Background Decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pet-teal/5 rounded-full blur-2xl group-hover:bg-pet-teal/20 transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-sm mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 border border-white">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-pet-navy font-ubuntu mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-700 font-medium"
                    >
                      <div className="w-6 h-6 rounded-full bg-pet-orange/10 flex items-center justify-center shrink-0">
                        <svg
                          className="w-3.5 h-3.5 text-pet-orange"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-auto pointer-events-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pet-navy text-white font-bold py-3 px-6 rounded-xl hover:bg-pet-teal transition-colors duration-300 shadow-sm">
                  Saiba mais
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
