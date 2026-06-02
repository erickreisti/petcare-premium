"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const container = useRef<HTMLElement>(null);

  const services = [
    {
      icon: "🛁",
      image: "/service_bath_v2.png",
      title: "Estética Premium",
      description:
        "Banho, tosa, hidratação e cuidados estéticos com produtos premium e técnicas profissionais.",
      features: ["Banho terapêutico", "Tosa higiênica", "Hidratação"],
    },
    {
      icon: "🏥",
      image: "/service_vet_v2.png",
      title: "Saúde Clínica",
      description:
        "Consultas, exames, vacinas e tratamentos avançados para a saúde do seu pet.",
      features: ["Consultas", "Vacinas", "Exames"],
    },
    {
      icon: "🎾",
      image: "/service_hotel_v2.png",
      title: "Resort & Creche",
      description:
        "Espaço seguro com monitoramento constante e muita diversão.",
      features: ["Creche", "Hotel Pet", "Recreação"],
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

    // Animação de entrada dos cards e Efeito de Bolhas no Hover
    const cards = gsap.utils.toArray<HTMLElement>(".service-card");
    cards.forEach(card => {
      // Animação individual ao rolar a página
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

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
              x: `${Math.random() * 80 + 10}%`,
              y: "90%",
              opacity: 0.8,
              scale: 0.5
            },
            {
              y: "-20%",
              x: `+=${(Math.random() - 0.5) * 50}`,
              opacity: 0,
              scale: 1.2,
              duration: Math.random() * 1 + 1,
              ease: "power1.out",
              onComplete: () => bubble.remove()
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
        <div className="services-header text-center mb-16 relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-pet-teal/10 blur-[100px] rounded-[100%] pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-pet-navy mb-6 font-ubuntu leading-tight relative z-10">
            Cuidado <span className="text-transparent bg-clip-text bg-linear-to-r from-pet-orange to-amber-400 drop-shadow-sm">Completo</span> para seu Pet
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10">
            Oferecemos um <span className="text-pet-teal-dark font-medium">ecossistema integrado</span> com tudo que você precisa para a saúde, bem-estar e diversão do seu melhor amigo.
          </p>
        </div>

        {/* Horizontal Stack Layout */}
        <div className="services-grid flex flex-col gap-16 md:gap-24 mt-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card relative flex flex-col ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-8 lg:gap-4 group`}
            >
              {/* Glassmorphism Text Container */}
              <div className="w-full lg:w-[60%] relative z-10 glass p-8 md:p-12 lg:p-16 rounded-4xl shadow-premium border border-white/80 hover:shadow-teal-glow transition-all duration-500 flex flex-col justify-center overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pet-teal/5 rounded-full blur-3xl group-hover:bg-pet-teal/20 transition-colors duration-500 z-0"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-pet-teal to-pet-teal/30 font-ubuntu drop-shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-0.75 w-16 bg-linear-to-r from-pet-orange to-transparent rounded-full opacity-80"></div>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-pet-navy font-ubuntu mb-6 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-4 text-gray-700 font-medium text-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-pet-orange/10 flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-pet-orange"
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

                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pet-navy text-white font-bold py-4 px-8 rounded-xl hover:bg-pet-teal transition-colors duration-300 shadow-sm pointer-events-auto text-lg">
                    Agendar Agora
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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

              {/* Imagem Flutuante 3D (Arredondada para esconder fundo quadrado da IA) */}
              <div 
                className={`w-full lg:w-[45%] h-87.5 md:h-100 lg:h-112.5 relative z-20 flex items-center justify-center pointer-events-none ${
                  index % 2 === 1 ? "lg:-mr-12 xl:-mr-16" : "lg:-ml-12 xl:-ml-16"
                }`}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-[90%] md:w-full h-full max-w-125 object-cover rounded-[2.5rem] drop-shadow-[0_20px_30px_rgba(10,54,65,0.2)] group-hover:scale-[1.03] group-hover:-translate-y-4 transition-transform duration-700 ease-out border-4 border-white/40" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
