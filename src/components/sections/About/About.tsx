"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import TestTubeSlider from "./TestTubeSlider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const container = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [openedSteps, setOpenedSteps] = useState<number[]>([0]);

  useEffect(() => {
    if (!openedSteps.includes(activeStep)) {
      setOpenedSteps(prev => [...prev, activeStep]);
    }
  }, [activeStep, openedSteps]);

  const timelineItems = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Avaliação completa do seu pet",
      image: "/petcare-premium/images/about_vet_dog.png"
    },
    {
      step: "02",
      title: "Plano Personalizado",
      description: "Cuidados específicos para suas necessidades",
      image: "/petcare-premium/images/about_clinic.png"
    },
    {
      step: "03",
      title: "Execução Profissional",
      description: "Serviços realizados por especialistas",
      image: "/petcare-premium/images/about_grooming.png"
    },
    {
      step: "04",
      title: "Acompanhamento",
      description: "Monitoramento contínuo da saúde",
      image: "/petcare-premium/images/about_cat.png"
    },
  ];

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
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

      // Animação inicial
      gsap.from(container.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className="py-20 px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título Centralizado */}
        <div className="about-text text-center mb-16 relative z-10">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-pet-teal/10 blur-[100px] rounded-[100%] pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-pet-navy mb-6 font-ubuntu leading-tight relative z-10">
            Paixão por <span className="text-transparent bg-clip-text bg-linear-to-r from-pet-orange to-amber-400 drop-shadow-sm">Pets</span> desde 2010
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10">
            Há mais de uma década dedicamos nosso trabalho ao cuidado e bem-estar dos animais. Nossa missão é proporcionar uma <span className="text-pet-teal-dark font-medium">experiência excepcional</span> para pets e seus tutores.
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-3xl rounded-3xl p-8 md:p-12 lg:p-16 border border-white/50 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Timeline Cards Stack + Slider */}
            <div className="flex flex-col gap-0 mt-8 lg:mt-0">
              {/* Timeline Cards Stack */}
              <div className="relative min-h-80 md:min-h-55 w-full perspective-1000 z-20">
              {timelineItems.map((item, index) => {
                const isOpened = openedSteps.includes(index);
                const isActive = activeStep === index;
                
                return (
                  <div
                    key={index}
                    className={`absolute w-full top-0 left-0 transition-all duration-700 ease-out ${
                      isOpened
                        ? "opacity-100"
                        : "opacity-0 -translate-y-12 pointer-events-none"
                    }`}
                    style={{
                      transform: isOpened 
                        ? `translateY(${index * 24}px)` 
                        : "translateY(-50px)",
                      zIndex: index * 10,
                    }}
                  >
                    <div className={`bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-premium transition-colors duration-500 border-2 ${isActive ? 'border-pet-teal/50' : 'border-white/80'}`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-pet-teal/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                      <div className="flex items-center gap-6 mb-4 relative z-10">
                        <div className="w-14 h-14 bg-linear-to-br from-pet-orange to-amber-400 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform -rotate-3">
                          {item.step}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-pet-navy font-ubuntu">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-600 ml-20 relative z-10">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
              </div>

              {/* O Slider Interativo na Esquerda */}
              <div className="w-full relative z-10 -mt-12 lg:-mt-16">
                <TestTubeSlider 
                  steps={timelineItems.length} 
                  activeStep={activeStep} 
                  onStepChange={setActiveStep} 
                />
              </div>
            </div>
          
          {/* Gallery with Soap Lens Effect connected to Slider */}
          <div className="about-gallery grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div onClick={() => setActiveStep(0)} className={`soap-container aspect-square relative rounded-3xl overflow-hidden shadow-premium group cursor-pointer border-2 transition-all duration-500 ${activeStep === 0 ? "border-pet-teal/40 scale-[1.02]" : "border-transparent"}`}>
                <Image src="/petcare-premium/images/about_vet_dog.png" alt="Cachorro feliz sendo examinado" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Camada de Espuma */}
                <div className={`soap-layer absolute inset-0 glass backdrop-blur-md bg-white/40 flex items-center justify-center transition-all duration-700 pointer-events-none ${openedSteps.includes(0) ? "opacity-0" : "opacity-100 group-hover:opacity-0 group-hover:scale-110"}`}>
                   <span className="text-white drop-shadow-md font-bold tracking-widest uppercase text-sm">Limpar</span>
                </div>
              </div>
              <div onClick={() => setActiveStep(1)} className={`soap-container aspect-video relative rounded-3xl overflow-hidden shadow-premium group cursor-pointer border-2 transition-all duration-500 ${activeStep === 1 ? "border-pet-teal/40 scale-[1.02]" : "border-transparent"}`}>
                <Image src="/petcare-premium/images/about_clinic.png" alt="Clínica Veterinária Moderna" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`soap-layer absolute inset-0 glass backdrop-blur-md bg-white/40 transition-all duration-700 pointer-events-none ${openedSteps.includes(1) ? "opacity-0" : "opacity-100 group-hover:opacity-0 group-hover:scale-110"}`}></div>
              </div>
            </div>
            <div className="space-y-4 pt-8 lg:pt-12">
              <div onClick={() => setActiveStep(3)} className={`soap-container aspect-video relative rounded-3xl overflow-hidden shadow-premium group cursor-pointer border-2 transition-all duration-500 ${activeStep === 3 ? "border-pet-teal/40 scale-[1.02]" : "border-transparent"}`}>
                <Image src="/petcare-premium/images/about_cat.png" alt="Gato fofo em mesa cirúrgica" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`soap-layer absolute inset-0 glass backdrop-blur-md bg-white/40 transition-all duration-700 pointer-events-none ${openedSteps.includes(3) ? "opacity-0" : "opacity-100 group-hover:opacity-0 group-hover:scale-110"}`}></div>
              </div>
              <div onClick={() => setActiveStep(2)} className={`soap-container aspect-square relative rounded-3xl overflow-hidden shadow-premium group cursor-pointer border-2 transition-all duration-500 ${activeStep === 2 ? "border-pet-teal/40 scale-[1.02]" : "border-transparent"}`}>
                <Image src="/petcare-premium/images/about_grooming.png" alt="Banho e tosa de pet" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`soap-layer absolute inset-0 glass backdrop-blur-md bg-white/40 transition-all duration-700 pointer-events-none ${openedSteps.includes(2) ? "opacity-0" : "opacity-100 group-hover:opacity-0 group-hover:scale-110"}`}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
