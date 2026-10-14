"use client";
import Image from "next/image";
import { BASE_PATH } from "@/lib/basePath";
import { useRef, useState, useCallback, useEffect, useSyncExternalStore } from "react";
import TestTubeSlider from "./TestTubeSlider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bubbleReveal, riseBubbles } from "@/lib/motion";
import WaveDivider from "@/components/ui/WaveDivider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Textura de espuma: bolhinhas brancas com borda dura sobre o vidro fosco
const FOAM_TEXTURE = [
  "radial-gradient(circle at 18% 28%, rgba(255,255,255,0.95) 0 7%, transparent 8%)",
  "radial-gradient(circle at 72% 18%, rgba(255,255,255,0.85) 0 10%, transparent 11%)",
  "radial-gradient(circle at 40% 72%, rgba(255,255,255,0.9) 0 12%, transparent 13%)",
  "radial-gradient(circle at 86% 66%, rgba(255,255,255,0.75) 0 6%, transparent 7%)",
  "radial-gradient(circle at 10% 85%, rgba(255,255,255,0.7) 0 5%, transparent 6%)",
  "radial-gradient(circle at 58% 45%, rgba(255,255,255,0.6) 0 4%, transparent 5%)",
].join(", ");

const timelineItems = [
  {
    step: "01",
    title: "Consulta Inicial",
    description:
      "Conhecemos seu pet com calma: histórico, rotina e um exame clínico completo, feito sem pressa e com muito carinho.",
    image: `${BASE_PATH}/images/about_vet_dog.webp`,
    alt: "Cachorro feliz sendo examinado",
  },
  {
    step: "02",
    title: "Plano Personalizado",
    description:
      "Com base na avaliação, montamos um plano sob medida de vacinas, nutrição e prevenção, pensado para a fase de vida dele.",
    image: `${BASE_PATH}/images/about_clinic.webp`,
    alt: "Clínica Veterinária Moderna",
  },
  {
    step: "03",
    title: "Execução Profissional",
    description:
      "Veterinários e groomers especializados cuidam de cada etapa, com equipamentos modernos e protocolos de bem-estar.",
    image: `${BASE_PATH}/images/about_grooming.webp`,
    alt: "Banho e tosa de pet",
  },
  {
    step: "04",
    title: "Acompanhamento",
    description:
      "Depois do atendimento seguimos juntos: lembretes, retornos e um canal direto com a equipe para qualquer dúvida.",
    image: `${BASE_PATH}/images/about_cat.webp`,
    alt: "Gato fofo em mesa cirúrgica",
  },
];

const stepTitles = timelineItems.map(item => item.title);

// Preferência de movimento reduzido, lida sem setState em efeito
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true,
  );

export default function About() {
  const container = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [openedSteps, setOpenedSteps] = useState<number[]>([0]);
  const burstSteps = useRef<number[]>([0]);

  // Autoplay: avança sozinho enquanto a seção está visível, pausa com mouse/foco
  // em cima e para de vez quando a pessoa escolhe uma etapa
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [userTookOver, setUserTookOver] = useState(false);
  const autoplay = !reducedMotion && !userTookOver;
  const autoplayRunning = autoplay && inView && !hovering;

  // Ativa um passo e marca como "aberto" (a espuma da foto é lavada)
  const goToStep = useCallback((step: number) => {
    setActiveStep(step);
    setOpenedSteps(prev => (prev.includes(step) ? prev : [...prev, step]));
  }, []);

  const selectStep = useCallback(
    (step: number) => {
      setUserTookOver(true);
      goToStep(step);
    },
    [goToStep],
  );

  const nextStep = () => goToStep((activeStep + 1) % timelineItems.length);

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Quando uma foto é lavada pela primeira vez, a espuma solta bolhas
  useEffect(() => {
    openedSteps.forEach(step => {
      if (burstSteps.current.includes(step)) return;
      burstSteps.current.push(step);
      const photo = container.current?.querySelector<HTMLElement>(`[data-step="${step}"]`);
      if (photo) riseBubbles(photo, 10);
    });
  }, [openedSteps]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      bubbleReveal(".about-text h2, .about-text p", container.current);
      const scrollTrigger = { trigger: card.current, start: "top 80%" };

      gsap.from(".about-step", {
        scrollTrigger,
        x: -24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.from(".about-stage", {
        scrollTrigger,
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.5)",
        clearProps: "all",
      });
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className="pt-20 pb-28 md:pb-32 px-6 bg-white overflow-hidden relative">
      {/* Manchas de cor: dão ao vidro algo para desfocar */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-drift absolute top-[35%] -left-24 w-96 h-96 rounded-full bg-pet-teal/25 blur-3xl" />
        <div className="blob-drift absolute bottom-[10%] -right-16 w-md h-112 rounded-full bg-pet-orange/20 blur-3xl [animation-delay:-7s]" />
        <div className="blob-drift absolute top-[60%] left-[40%] w-72 h-72 rounded-full bg-sky-300/25 blur-3xl [animation-delay:-3s]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título Centralizado */}
        <div className="about-text text-center mb-16 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-pet-teal/10 blur-[100px] rounded-[100%] pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-bold text-pet-navy mb-6 font-ubuntu leading-tight relative z-10">
            Paixão por <span className="text-transparent bg-clip-text bg-linear-to-r from-pet-orange to-amber-400 drop-shadow-sm">Pets</span> desde 2010
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10">
            Há mais de uma década dedicamos nosso trabalho ao cuidado e bem-estar dos animais. Nossa missão é proporcionar uma <span className="text-pet-teal-dark font-medium">experiência excepcional</span> para pets e seus tutores.
          </p>
        </div>

        <div
          ref={card}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
          className="bg-white/40 backdrop-blur-3xl rounded-3xl p-6 md:p-12 lg:p-16 border border-white/50 shadow-glass"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Esquerda: etapas em lista vertical + borrifador */}
            <div className="flex flex-col gap-8">
              <ol className="relative">
                {/* Linha que liga os números */}
                <span aria-hidden="true" className="absolute left-6 top-6 bottom-6 w-0.5 bg-pet-teal/15" />

                {timelineItems.map((item, index) => {
                  const isActive = activeStep === index;
                  return (
                    <li key={item.step} className="about-step relative">
                      <button
                        type="button"
                        onClick={() => selectStep(index)}
                        aria-current={isActive ? "step" : undefined}
                        className={`group w-full text-left flex gap-5 rounded-2xl p-2 pr-4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-pet-orange ${isActive ? "bg-white/70 shadow-premium" : "hover:bg-white/40"}`}
                      >
                        <span
                          className={`relative z-10 shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-[background-color,color,rotate,box-shadow] duration-500 ${isActive ? "bg-linear-to-br from-pet-orange to-amber-400 text-white shadow-lg -rotate-3" : "bg-white text-pet-teal-dark border border-pet-teal/20 group-hover:border-pet-teal/50"}`}
                        >
                          {item.step}
                        </span>

                        <span className="flex-1 py-2.5 min-w-0">
                          <span className={`block text-lg md:text-xl font-bold font-ubuntu transition-colors duration-300 ${isActive ? "text-pet-navy" : "text-pet-navy/60 group-hover:text-pet-navy"}`}>
                            {item.title}
                          </span>

                          {/* Descrição expande só na etapa ativa */}
                          <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                            <span className="overflow-hidden">
                              <span className="block pt-2 text-gray-600 leading-relaxed">{item.description}</span>

                              {/* Barra do autoplay: ao completar, passa para a próxima etapa */}
                              <span aria-hidden="true" className="block mt-4 mb-1 h-1 rounded-full bg-pet-teal/15 overflow-hidden">
                                {isActive && (
                                  <span
                                    key={activeStep}
                                    className={`block h-full rounded-full bg-linear-to-r from-pet-teal to-pet-teal-dark ${autoplay ? "step-progress" : ""}`}
                                    style={{ animationPlayState: autoplayRunning ? "running" : "paused" }}
                                    onAnimationEnd={autoplay ? nextStep : undefined}
                                  />
                                )}
                              </span>
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* Borrifador: arrastar lava a foto da etapa */}
              <div className="about-step px-2">
                <TestTubeSlider
                  steps={timelineItems.length}
                  activeStep={activeStep}
                  onStepChange={selectStep}
                  labels={stepTitles}
                />
              </div>
            </div>

            {/* Direita: foto grande da etapa + miniaturas */}
            <div className="about-stage order-first lg:order-0 flex flex-col gap-4">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-premium border-4 border-white/80">
                {timelineItems.map((item, index) => {
                  const isActive = activeStep === index;
                  const isOpened = openedSteps.includes(index);
                  return (
                    // A foto nova surge por cima; a anterior só some depois, para o fundo branco não aparecer no meio da troca
                    <div
                      key={item.step}
                      data-step={index}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 overflow-hidden transition-opacity ${isActive ? "opacity-100 z-10 duration-700 ease-out" : "opacity-0 duration-0 delay-700"}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        priority={index === 0}
                        className={`object-cover transition-transform duration-6000 ease-out ${isActive ? "scale-105" : "scale-100"}`}
                      />
                      {/* Espuma: é lavada da esquerda para a direita na primeira visita. O recorte é !important
                          porque assim o Chrome anima fora do compositor; lá, ao fim da lavagem, a espuma
                          voltava inteira por um instante e a foto piscava */}
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 backdrop-blur-md bg-white/45 transition-[clip-path] duration-700 delay-200 ease-out pointer-events-none ${isOpened ? "[clip-path:inset(0_0_0_100%)]!" : "[clip-path:inset(0_0_0_0)]!"}`}
                        style={{ backgroundImage: FOAM_TEXTURE }}
                      />
                    </div>
                  );
                })}

                {/* Legenda da etapa sobre a foto */}
                <div className="absolute z-20 left-4 bottom-4 flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-sm pl-1.5 pr-4 py-1.5 shadow-lg">
                  <span className="w-7 h-7 rounded-full bg-pet-orange text-white text-xs font-black flex items-center justify-center">
                    {timelineItems[activeStep].step}
                  </span>
                  <span className="text-sm font-bold text-pet-navy">{timelineItems[activeStep].title}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {timelineItems.map((item, index) => {
                  const isActive = activeStep === index;
                  const isOpened = openedSteps.includes(index);
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => selectStep(index)}
                      aria-label={`Ver etapa ${item.step}: ${item.title}`}
                      aria-pressed={isActive}
                      className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-[border-color,opacity,translate] duration-300 focus-visible:outline-2 focus-visible:outline-pet-orange focus-visible:outline-offset-2 ${isActive ? "border-pet-teal -translate-y-1 shadow-premium" : "border-white/80 opacity-60 hover:opacity-100"}`}
                    >
                      <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 130px, 25vw" className="object-cover" />
                      {!isOpened && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 backdrop-blur-sm bg-white/45"
                          style={{ backgroundImage: FOAM_TEXTURE }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Onda: transição para a seção de Planos */}
      <WaveDivider className="bottom-0 text-pet-bg" />
    </section>
  );
}
