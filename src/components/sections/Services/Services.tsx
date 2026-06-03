"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ServiceCard from "./ServiceCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const container = useRef<HTMLElement>(null);

  const services = [
    {
      icon: "🛁",
      image: "/images/service_bath.png",
      title: "Estética Premium",
      description:
        "Banho, tosa, hidratação e cuidados estéticos com produtos premium e técnicas profissionais.",
      features: ["Banho terapêutico", "Tosa higiênica", "Hidratação"],
    },
    {
      icon: "🏥",
      image: "/images/service_vet.png",
      title: "Saúde Clínica",
      description:
        "Consultas, exames, vacinas e tratamentos avançados para a saúde do seu pet.",
      features: ["Consultas", "Vacinas", "Exames"],
    },
    {
      icon: "🎾",
      image: "/images/service_hotel.png",
      title: "Resort & Creche",
      description:
        "Espaço seguro com monitoramento constante e muita diversão.",
      features: ["Creche", "Hotel Pet", "Recreação"],
    },
  ];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      const cleanups: (() => void)[] = [];

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

        const handleMouseEnter = () => {
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
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        cleanups.push(() => card.removeEventListener("mouseenter", handleMouseEnter));
      });

      return () => cleanups.forEach(c => c());
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
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
