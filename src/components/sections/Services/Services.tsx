"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ServiceCard, { type Service } from "./ServiceCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BASE_PATH } from "@/lib/basePath";
import { bubbleReveal } from "@/lib/motion";
import WaveDivider from "@/components/ui/WaveDivider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services: Service[] = [
  {
    image: `${BASE_PATH}/images/service_bath.webp`,
    title: "Estética Premium",
    description: "Banho, tosa, hidratação e cuidados estéticos com produtos premium e técnicas profissionais.",
    features: ["Banho terapêutico", "Tosa higiênica", "Hidratação"],
  },
  {
    image: `${BASE_PATH}/images/service_vet.webp`,
    title: "Saúde Clínica",
    description: "Consultas, exames, vacinas e tratamentos avançados para a saúde do seu pet.",
    features: ["Consultas", "Vacinas", "Exames"],
  },
  {
    image: `${BASE_PATH}/images/service_hotel.webp`,
    title: "Resort & Creche",
    description: "Espaço seguro com monitoramento constante e muita diversão.",
    features: ["Creche", "Hotel Pet", "Recreação"],
  },
];

export default function Services() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      bubbleReveal(".services-header h2, .services-header p", container.current);

      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, index) => {
        const panel = card.querySelector<HTMLElement>(".service-panel");
        const media = card.querySelector<HTMLElement>(".service-media");
        if (!panel || !media) return;
        // Cards alternam de lado, então cada um entra pelo lado em que está
        const fromLeft = index % 2 === 0;

        gsap
          .timeline({ scrollTrigger: { trigger: card, start: "top 80%" } })
          .from(panel, { x: fromLeft ? -60 : 60, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" })
          .from(
            media,
            { scale: 0.7, opacity: 0, rotation: fromLeft ? 6 : -6, duration: 1, ease: "back.out(1.6)" },
            "-=0.6",
          );

        // Parallax: a foto flutua um pouco mais rápido que o texto
        gsap.to(media, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
  }, { scope: container });

  return (
    <section
      id="services"
      ref={container}
      className="pt-16 md:pt-20 pb-28 md:pb-32 px-6 bg-pet-bg overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="services-header text-center mb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-pet-teal/10 blur-[100px] rounded-[100%] pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-bold text-pet-navy mb-6 font-ubuntu leading-tight relative z-10">
            Cuidado <span className="text-transparent bg-clip-text bg-linear-to-r from-pet-orange to-amber-400 drop-shadow-sm">Completo</span> para seu Pet
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10">
            Oferecemos um <span className="text-pet-teal-dark font-medium">ecossistema integrado</span> com tudo que você precisa para a saúde, bem-estar e diversão do seu melhor amigo.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* Onda branca: transição para a seção Sobre Nós */}
      <WaveDivider className="bottom-0 text-white" />
    </section>
  );
}
