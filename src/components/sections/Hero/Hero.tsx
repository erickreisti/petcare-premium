"use client";
import Link from "next/link";
import { BASE_PATH } from "@/lib/basePath";
import { socialLinks, SocialIcon } from "@/components/ui/socialLinks";
import { useRef } from "react";
import { preload } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/lib/useMagnetic";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { count: 2, suffix: "K+", label: "Pets Limpinhos" },
  { count: 100, suffix: "%", label: "Carinho" },
  { text: "Eco", label: "Produtos Naturais" },
];

const HERO_IMAGE = `${BASE_PATH}/images/premium_dog_hero-transparent.webp`;

// Forma base da bolha; os outros quadros da animação ficam em globals.css (morphBubbleShape)
const BLOB =
  "M46.5,-54.1C60.2,-44,71.1,-29.2,75.4,-12.2C79.7,4.9,77.5,24.2,68.7,39.9C59.9,55.6,44.5,67.7,27.1,73.8C9.7,79.8,-9.7,79.8,-25.8,73C-42,66.2,-54.9,52.7,-64.8,36.8C-74.8,20.9,-81.8,2.6,-80,-15.3C-78.2,-33.1,-67.6,-50.6,-52.8,-60.5C-38,-70.5,-19,-73,-1.3,-71.5C16.4,-69.9,32.9,-64.3,46.5,-54.1Z";

const highlights = [
  { pos: "top-[18%] left-[24%]", size: "w-6 h-6", bar: "w-12 h-1" },
  { pos: "bottom-[22%] right-[26%] opacity-80", size: "w-4 h-4", bar: "w-8 h-0.5" },
];

export default function Hero() {
  // <image> de SVG não é descoberto cedo pelo navegador: pré-carrega com prioridade alta
  preload(HERO_IMAGE, { as: "image", fetchPriority: "high" });

  const container = useRef<HTMLElement>(null);
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>();
  const secondaryCtaRef = useMagnetic<HTMLAnchorElement>(0.25);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { motion, finePointer } = context.conditions as Record<string, boolean>;
          if (!motion || !container.current) return;
          const section = container.current;

          // Entrada: texto sobe, a bolha "infla" com elástico e o rabisco é desenhado
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.from(".hero-text > *", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
          })
            // Sem opacity: a imagem é o LCP e precisa estar visível desde o primeiro quadro
            .from(
              ".hero-image",
              { scale: 0.8, duration: 1.6, ease: "elastic.out(1, 0.55)" },
              0,
            )
            // Rabisco "feito à mão": desenha bem devagar e suave depois que o título assenta,
            // dá um boing elástico e solta um coraçãozinho na ponta
            .fromTo(
              ".hero-underline",
              { strokeDasharray: 1, strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 4, ease: "power1.inOut" },
              1,
            )
            .fromTo(
              ".hero-underline-svg",
              { scaleY: 1 },
              { keyframes: { scaleY: [1.25, 0.92, 1] }, duration: 1.2, ease: "sine.inOut" },
              "-=0.15",
            )
            .from(
              ".hero-heart",
              { scale: 0, rotation: -30, y: 8, opacity: 0, duration: 0.9, ease: "elastic.out(1.2, 0.4)", clearProps: "all" },
              "<0.1",
            );

          // Contadores das estatísticas (escreve no próprio nó de texto que o React controla)
          const counters = gsap.utils.toArray<HTMLElement>(".stat-count");
          counters.forEach((el) => {
            const node = el.firstChild;
            if (!node) return;
            const counter = { value: 0 };
            tl.to(
              counter,
              {
                value: Number(el.dataset.value),
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  node.nodeValue = String(Math.round(counter.value));
                },
              },
              0.5,
            );
          });

          // Parallax de rolagem: a bolha desce mais devagar que a página
          gsap.to(".hero-image", {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
          });

          const restoreCounters = () =>
            counters.forEach((el) => {
              if (el.firstChild) el.firstChild.nodeValue = el.dataset.value ?? "";
            });

          const stage = section.querySelector<HTMLElement>(".hero-stage");
          if (!finePointer || !stage) return restoreCounters;

          // Parallax de mouse: a bolha se afasta levemente e os reflexos seguem a "luz"
          const quick = (el: Element, prop: "x" | "y") =>
            gsap.quickTo(el, prop, { duration: 0.8, ease: "power3.out" });
          const stageX = quick(stage, "x");
          const stageY = quick(stage, "y");
          const lights = gsap.utils
            .toArray<HTMLElement>(".hero-highlight")
            .map((el, i) => ({ x: quick(el, "x"), y: quick(el, "y"), depth: 28 + i * 14 }));

          const moveTo = (nx: number, ny: number) => {
            stageX(nx * -16);
            stageY(ny * -16);
            lights.forEach((l) => {
              l.x(nx * l.depth);
              l.y(ny * l.depth);
            });
          };
          const handlePointerMove = (e: PointerEvent) => {
            const rect = section.getBoundingClientRect();
            moveTo((e.clientX - rect.left) / rect.width - 0.5, (e.clientY - rect.top) / rect.height - 0.5);
          };
          const handlePointerLeave = () => moveTo(0, 0);

          section.addEventListener("pointermove", handlePointerMove);
          section.addEventListener("pointerleave", handlePointerLeave);
          return () => {
            section.removeEventListener("pointermove", handlePointerMove);
            section.removeEventListener("pointerleave", handlePointerLeave);
            restoreCounters();
          };
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      id="home"
      ref={container}
      className="min-h-screen w-full relative flex flex-col items-center justify-center bg-pet-bg overflow-hidden pt-20"
    >

      {/* Redes Sociais - Vidro Embaçado */}
      <div className="flex flex-row 2xl:flex-col gap-4 relative 2xl:absolute 2xl:left-8 2xl:top-1/2 2xl:-translate-y-1/2 z-40 bg-white/30 backdrop-blur-2xl border-2 border-white/60 p-3 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.9),0_15px_30px_rgba(53,126,151,0.15)] opacity-90 hover:opacity-100 transition-opacity duration-300 order-2 2xl:order-0 mt-0 mb-8 2xl:my-0 pointer-events-auto scale-90 md:scale-100">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/40 text-pet-teal-dark hover:bg-white hover:text-pet-orange hover:-translate-y-1 transition-[background-color,color,translate] duration-300 shadow-sm border border-white/50"
            aria-label={social.name}
          >
            <SocialIcon className="w-5.5 h-5.5">{social.icon}</SocialIcon>
          </a>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-16 lg:py-12 w-full mt-4 lg:mt-0 pointer-events-none order-1 2xl:order-0">
        {/* Adicionado pointer-events-none no container principal e auto nos filhos para as bolhas funcionarem */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texto */}
          <div className="hero-text space-y-8 pointer-events-auto">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-pet-navy font-ubuntu">
                Cuidados para a
                <span className="text-pet-teal-dark relative inline-block mx-3">
                  saúde
                  <svg
                    className="hero-underline-svg absolute -bottom-2 md:-bottom-3 left-0 w-full origin-center text-pet-orange/60"
                    viewBox="0 0 200 16"
                    aria-hidden="true"
                  >
                    <path
                      className="hero-underline"
                      pathLength={1}
                      d="M4,9 C40,4 70,12 100,8 S160,4 196,8"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    aria-hidden="true"
                    className="hero-heart absolute -right-4 -bottom-3 md:-right-5 md:-bottom-4 text-base md:text-xl text-pet-orange rotate-12"
                  >
                    ♥
                  </span>
                </span>
                do seu pet
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Oferecemos banhos relaxantes, hidratação premium e muito carinho
              em um ambiente preparado especialmente para o seu pet se sentir em
              casa.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link ref={primaryCtaRef} href="#contact" className="group relative bg-pet-teal-dark text-white font-bold text-lg rounded-full transition-colors duration-300 overflow-hidden">
                <div className="btn-cells" aria-hidden="true">
                  {Array.from({ length: 20 }, (_, i) => <span key={i} />)}
                </div>
                <span className="relative z-3 pointer-events-none px-8 py-4 flex items-center justify-center gap-2">
                  Agendar Banho
                </span>
              </Link>

              <Link
                ref={secondaryCtaRef}
                href="#services"
                className="group glass hover:glass-dark text-pet-navy hover:text-white font-bold text-lg py-4 px-8 rounded-full transition-[background-color,color,border-color,translate,scale] duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 shadow-sm border border-pet-navy/10 hover:border-white/20"
              >
                Ver Pacotes
              </Link>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6 pt-8 md:pt-10 border-t border-pet-teal/10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left md:text-center">
                  <div className="text-xl md:text-3xl font-bold text-pet-teal-dark font-ubuntu tabular-nums">
                    {stat.count !== undefined ? (
                      <>
                        <span className="stat-count" data-value={stat.count}>{stat.count}</span>
                        {stat.suffix}
                      </>
                    ) : (
                      stat.text
                    )}
                  </div>
                  <div className="text-gray-500 text-xs md:text-sm font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem do Pet */}
          <div className="hero-image relative mt-12 lg:mt-0 flex justify-center pointer-events-auto">
            <div className="hero-stage relative z-10 w-full max-w-xl aspect-square flex items-center justify-center">
              {/* Cachorro dentro da bolha de sabão; a forma anima via CSS (.blob-morph) */}
              <svg
                className="absolute w-[120%] h-[120%] drop-shadow-2xl hover-water-jiggle"
                viewBox="0 0 200 200"
                role="img"
                aria-label="Cachorro feliz dentro de uma bolha de sabão"
              >
                <defs>
                  <clipPath id="blob-clip">
                    <path transform="translate(100 100)" className="blob-morph" d={BLOB} />
                  </clipPath>
                  {/* Vidro de sabão: quase transparente no centro, reflexos coloridos na borda */}
                  <radialGradient id="soapGlassGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="70%" stopColor="rgba(219,245,255,0.145)" />
                    <stop offset="85%" stopColor="rgba(255,211,255,0.24)" />
                    <stop offset="95%" stopColor="rgba(118,206,255,0.43)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.715)" />
                  </radialGradient>
                </defs>

                {/* O clip fica no grupo para a bolha não crescer junto com o zoom do hover */}
                <g clipPath="url(#blob-clip)">
                  <image
                    href={HERO_IMAGE}
                    x="10"
                    y="10"
                    width="180"
                    height="180"
                    className="origin-center transition-transform duration-700 hover:scale-105"
                  />
                </g>
                <path
                  transform="translate(100 100)"
                  className="blob-morph pointer-events-none"
                  d={BLOB}
                  fill="url(#soapGlassGrad)"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Reflexos em cruz que seguem o mouse */}
              {highlights.map((h) => (
                <div
                  key={h.pos}
                  className={`hero-highlight absolute ${h.pos} ${h.size} bg-white rounded-full blur-[2px] pointer-events-none flex items-center justify-center`}
                >
                  <div className={`${h.bar} bg-white blur-[1px] rotate-45 absolute`} />
                  <div className={`${h.bar} bg-white blur-[1px] -rotate-45 absolute`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Banner - Pessoas curtindo */}
      <div className="w-full bg-white/95 backdrop-blur-md py-6 mt-4 2xl:mt-12 border-y border-pet-teal/10 relative z-20 shadow-[0_10px_30px_rgba(53,126,151,0.05)] order-3 2xl:order-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-4" aria-hidden="true">
            {["🐶", "🐱", "🐰", "🐾"].map((pet, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-linear-to-br from-pet-bg to-white flex items-center justify-center text-2xl"
              >
                {pet}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-pet-teal-dark flex items-center justify-center text-white font-bold text-sm">
              +2k
            </div>
          </div>
          <div className="text-pet-navy font-medium text-lg text-center md:text-left">
            Junte-se a{" "}
            <span className="text-pet-teal-dark font-bold">
              milhares de pais de pets
            </span>{" "}
            apaixonados pelos nossos cuidados!
          </div>
        </div>
      </div>
    </section>
  );
}
