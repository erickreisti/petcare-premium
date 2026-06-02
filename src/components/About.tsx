"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const container = useRef<HTMLElement>(null);

  const timelineItems = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Avaliação completa do seu pet",
    },
    {
      step: "02",
      title: "Plano Personalizado",
      description: "Cuidados específicos para suas necessidades",
    },
    {
      step: "03",
      title: "Execução Profissional",
      description: "Serviços realizados por especialistas",
    },
    {
      step: "04",
      title: "Acompanhamento",
      description: "Monitoramento contínuo da saúde",
    },
  ];

  useGSAP(() => {
    // Animação de entrada da seção
    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(".about-gallery", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Efeito Lente de Sabão (Soap Lens) nas imagens da galeria
    const images = gsap.utils.toArray<HTMLElement>(".soap-container");
    
    images.forEach(imgContainer => {
      const soapLayer = imgContainer.querySelector('.soap-layer');
      const img = imgContainer.querySelector('img');
      
      imgContainer.addEventListener("mouseenter", () => {
        // A espuma dissipa
        gsap.to(soapLayer, {
          opacity: 0,
          scale: 1.2, // expande antes de sumir
          duration: 0.4,
          ease: "power2.out"
        });
        // A imagem faz um leve zoom
        gsap.to(img, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out"
        });
      });
      
      imgContainer.addEventListener("mouseleave", () => {
        // A espuma volta lentamente
        gsap.to(soapLayer, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.inOut"
        });
        gsap.to(img, {
          scale: 1,
          duration: 0.6,
          ease: "power2.inOut"
        });
      });
    });

  }, { scope: container });

  return (
    <section id="about" ref={container} className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="about-text space-y-8">
            <div>
              <span className="text-pet-teal-dark font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-8 h-0.5 bg-pet-teal-dark rounded-full"></span>
                Nossa Essência
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-pet-navy mt-4 mb-6 font-ubuntu leading-tight">
                Paixão por <span className="text-pet-orange">Pets</span> desde
                2010
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Há mais de uma década dedicamos nosso trabalho ao cuidado e
              bem-estar dos animais. Nossa missão é proporcionar uma experiência
              excepcional para pets e seus tutores.
            </p>
            <div className="space-y-6">
              {timelineItems.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-pet-orange text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 group-hover:bg-pet-orange-hover transition-all duration-300 shadow-md">
                      {item.step}
                    </div>
                    {index < 3 && (
                      <div className="w-0.5 h-12 bg-gray-200 mt-2 group-hover:bg-pet-orange transition-colors duration-300"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold text-pet-navy mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gallery with Soap Lens Effect */}
          <div className="about-gallery grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="soap-container aspect-square relative rounded-3xl overflow-hidden shadow-premium group cursor-pointer">
                <Image src="/images/happy_dog_vet.png" alt="Cachorro feliz sendo examinado" fill className="object-cover transition-transform duration-700" />
                {/* Camada de Espuma */}
                <div className="soap-layer absolute inset-0 glass backdrop-blur-md bg-white/40 border border-white/50 flex items-center justify-center">
                   <span className="text-white drop-shadow-md font-bold tracking-widest uppercase text-sm">Limpar</span>
                </div>
              </div>
              <div className="soap-container aspect-video relative rounded-3xl overflow-hidden shadow-premium group cursor-pointer">
                <Image src="/images/clinic_modern.png" alt="Clínica Veterinária Moderna" fill className="object-cover transition-transform duration-700" />
                <div className="soap-layer absolute inset-0 glass backdrop-blur-md bg-white/40 border border-white/50"></div>
              </div>
            </div>
            <div className="space-y-4 pt-8 lg:pt-12">
              <div className="soap-container aspect-video relative rounded-3xl overflow-hidden shadow-premium group cursor-pointer">
                <Image src="/images/cute_cat_vet.png" alt="Gato fofo em mesa cirúrgica" fill className="object-cover transition-transform duration-700" />
                <div className="soap-layer absolute inset-0 glass backdrop-blur-md bg-white/40 border border-white/50"></div>
              </div>
              <div className="soap-container aspect-square relative rounded-3xl overflow-hidden shadow-premium group cursor-pointer">
                <Image src="/images/pet_grooming.png" alt="Banho e tosa de pet" fill className="object-cover transition-transform duration-700" />
                <div className="soap-layer absolute inset-0 glass backdrop-blur-md bg-white/40 border border-white/50"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
