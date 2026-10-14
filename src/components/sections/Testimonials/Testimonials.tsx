"use client";
import { useRef, useState, type UIEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TestimonialCard from "./TestimonialCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bubbleReveal } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Todas as notas são 5 estrelas; as iniciais do avatar saem do nome
const testimonials = [
  { name: "Mariana Silva", role: "Tutora do Max (Golden)", content: "O melhor centro veterinário que já conheci! O carinho que a equipe tem com os animais é emocionante. O Max adora o dia de creche e volta super feliz." },
  { name: "Juliana Castro", role: "Tutora do Simba (Maine Coon)", content: "Ambiente impecável! O cuidado que tiveram durante as consultas preventivas me deixou muito tranquila. Serviço realmente nível 5 estrelas." },
  { name: "Carlos Mendes", role: "Tutor da Luna (Persa)", content: "A estrutura é fantástica e os profissionais são muito bem preparados. A Luna fez uma cirurgia complexa aqui e a recuperação foi maravilhosa." },
  { name: "Ricardo Gomes", role: "Tutor da Belinha (Poodle)", content: "Fiquei impressionado com o resort! A Belinha é ansiosa, mas volta super calma e relaxada depois de um fim de semana hospedada com a equipe." },
  { name: "Ana Costa", role: "Tutora do Thor (Buldogue)", content: "Assinamos o Plano Premium e foi a melhor decisão. Banho, tosa e consultas sempre em dia. Recomendo de olhos fechados!" },
  { name: "Fernando Lima", role: "Tutor do Bidu (SRD)", content: "Adotei o Bidu recentemente e a equipe me deu todo o suporte nutricional e comportamental que eu precisava. Equipe nota 10!" },
  { name: "Patrícia Rocha", role: "Tutora da Mel (Shih Tzu)", content: "A Mel voltou do banho e tosa cheirosa, tranquila e com um lacinho lindo. Dá para ver que a equipe tem paciência de verdade com os bichinhos." },
  { name: "Bruno Almeida", role: "Tutor do Fred (Beagle)", content: "O Fred passou mal de madrugada e fomos atendidos na hora. Explicaram cada passo do tratamento e mandaram notícias o tempo todo." },
  { name: "Camila Ferreira", role: "Tutora da Nina (Siamês)", content: "A Nina odeia sair de casa, mas aqui o atendimento é calmo e sem pressa. Foi a primeira consulta em que ela não ficou estressada." },
];

// Cada coluna do carrossel tem 3 depoimentos e sua velocidade (segundos por volta)
const columns = [48, 60, 54].map((duration, i) => ({ items: testimonials.slice(i * 3, i * 3 + 3), duration }));

export default function Testimonials() {
  const container = useRef<HTMLDivElement>(null);
  // Card visível no swipe do celular, para os pontinhos
  const [activeSlide, setActiveSlide] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { motion, desktop } = context.conditions as Record<string, boolean>;
        if (!motion) return;

        bubbleReveal(".testimonials-title h2, .testimonials-title p", container.current);

        // No celular as colunas viram "display: contents" (não aceitam transform), então entram os cards
        gsap.from(desktop ? ".testimonial-column" : ".testimonial-slide", {
          ...(desktop ? { y: 80 } : { x: 60 }),
          opacity: 0,
          duration: 1,
          stagger: desktop ? 0.15 : 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".testimonials-grid", start: "top 80%" },
        });

        const grid = container.current?.querySelector<HTMLElement>(".testimonials-grid");
        if (!desktop || !grid) return;

        // Carrossel vertical infinito: cada trilho tem o conteúdo duplicado, então -50% fecha o loop.
        // A coluna do meio corre no sentido contrário.
        const loops = gsap.utils.toArray<HTMLElement>(".testimonial-track").map((track, i) =>
          gsap.fromTo(
            track,
            { yPercent: i % 2 ? -50 : 0 },
            { yPercent: i % 2 ? 0 : -50, duration: columns[i].duration, ease: "none", repeat: -1, paused: true },
          ),
        );

        // Pausa suave ao passar o mouse ou focar, para dar tempo de ler
        const setSpeed = (timeScale: number) =>
          loops.forEach((loop) => gsap.to(loop, { timeScale, duration: 0.3, overwrite: true }));
        const pause = () => setSpeed(0);
        const resume = () => setSpeed(1);
        const handlers = { mouseenter: pause, mouseleave: resume, focusin: pause, focusout: resume };

        // Fora da tela o carrossel para de vez, sem gastar quadros
        ScrollTrigger.create({
          trigger: grid,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => loops.forEach((loop) => (self.isActive ? loop.play() : loop.pause())),
        });

        Object.entries(handlers).forEach(([type, fn]) => grid.addEventListener(type, fn));
        return () => Object.entries(handlers).forEach(([type, fn]) => grid.removeEventListener(type, fn));
      },
    );
  }, { scope: container });

  const handleSwipe = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const [first, second] = el.querySelectorAll<HTMLElement>(".testimonial-slide");
    // No desktop o grid não rola na horizontal
    if (!second || el.scrollWidth <= el.clientWidth) return;
    const step = second.offsetLeft - first.offsetLeft; // card + gap
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setActiveSlide(atEnd ? testimonials.length - 1 : Math.round(el.scrollLeft / step));
  };

  return (
    <section ref={container} id="testimonials" className="relative z-10 pt-24 pb-16 bg-pet-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16 testimonials-title relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-pet-teal/10 blur-[100px] rounded-[100%] pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-bold font-ubuntu text-pet-navy mb-6 leading-tight relative z-10">
            O que dizem sobre <span className="text-transparent bg-clip-text bg-linear-to-r from-pet-teal to-pet-teal-dark drop-shadow-sm">nós</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10">
            A satisfação dos nossos clientes de quatro patas (e dos seus tutores) é a nossa maior <span className="text-pet-orange-text font-medium">recompensa</span>.
          </p>
        </div>

        {/*
          Desktop: carrossel em colunas. Celular: swipe horizontal com snap.
          Com movimento reduzido, no desktop vira um grid normal.
        */}
        <div
          role="region"
          aria-label="Depoimentos de clientes"
          tabIndex={0}
          onScroll={handleSwipe}
          className="testimonials-grid flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 scroll-px-6 pt-2 pb-6 [scrollbar-width:none] md:grid md:grid-cols-3 md:items-start md:gap-8 md:mx-0 md:p-0 md:overflow-visible motion-safe:md:h-160 motion-safe:md:overflow-hidden motion-safe:md:[mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)] outline-none focus-visible:ring-2 focus-visible:ring-pet-teal/60 md:rounded-[2.5rem]"
        >
          {columns.map((column) => (
            <div key={column.duration} className="testimonial-column contents md:block">
              <div className="testimonial-track contents md:flex md:flex-col motion-safe:md:will-change-transform">
                {column.items.map((testimonial) => (
                  <div key={testimonial.name} className="testimonial-slide shrink-0 w-[85%] sm:w-[60%] snap-start md:w-auto md:pb-8">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
                {/* Cópia para o loop sem emenda (só existe enquanto o carrossel anima) */}
                <div aria-hidden="true" inert className="hidden motion-safe:md:block">
                  {column.items.map((testimonial) => (
                    <div key={testimonial.name} className="pb-8">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Posição do swipe no celular */}
        <div aria-hidden="true" className="md:hidden flex justify-center gap-2 mt-2">
          {testimonials.map((t, i) => (
            <span
              key={t.name}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 ${i === activeSlide ? "w-6 bg-pet-orange" : "w-2 bg-pet-teal/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
