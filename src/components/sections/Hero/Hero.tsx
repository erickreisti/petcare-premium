"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Animações de Entrada (substituindo o Framer Motion)
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-text > *", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
        })
          .from(
            ".hero-image",
            {
              scale: 0.9,
              opacity: 0,
              duration: 1,
            },
            "-=0.6",
          )
          ;
      });
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
      <div className="flex flex-row xl:flex-col gap-4 relative xl:absolute xl:left-8 xl:top-1/2 xl:-translate-y-1/2 z-40 bg-white/30 backdrop-blur-2xl border-2 border-white/60 p-3 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.9),0_15px_30px_rgba(53,126,151,0.15)] opacity-90 hover:opacity-100 transition-opacity duration-300 order-2 xl:order-0 mt-0 mb-8 xl:my-0 pointer-events-auto scale-90 md:scale-100">
        {/* Instagram */}
        <a
          href="#"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white/40 text-pet-teal-dark hover:bg-white hover:text-pet-orange hover:-translate-y-1 transition-all duration-300 shadow-sm border border-white/50"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
        {/* Facebook */}
        <a
          href="#"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white/40 text-pet-teal-dark hover:bg-white hover:text-pet-orange hover:-translate-y-1 transition-all duration-300 shadow-sm border border-white/50"
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        {/* TikTok */}
        <a
          href="#"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white/40 text-pet-teal-dark hover:bg-white hover:text-pet-orange hover:-translate-y-1 transition-all duration-300 shadow-sm border border-white/50"
          aria-label="TikTok"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          </svg>
        </a>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-32 w-full mt-4 lg:mt-0 pointer-events-none order-1 xl:order-0">
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
                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full text-pet-orange/30"
                    viewBox="0 0 200 12"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,6 Q100,0 200,6"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
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
              <button className="btn-magic group relative bg-pet-teal-dark text-white font-bold text-lg rounded-full transition-colors duration-300 overflow-hidden">
                <div className="btn-cells">
                  {[...Array(20)].map((_, i) => (
                    <span key={i}></span>
                  ))}
                </div>
                <span className="btn-content px-8 py-4 flex items-center justify-center gap-2">
                  Agendar Banho
                </span>
              </button>

              <Link
                href="#services"
                className="group glass hover:glass-dark text-pet-navy hover:text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 shadow-sm border border-pet-navy/10 hover:border-white/20"
              >
                Ver Pacotes
              </Link>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6 pt-8 md:pt-10 border-t border-pet-teal/10">
              {[
                { number: "2K+", label: "Pets Limpinhos" },
                { number: "100%", label: "Carinho" },
                { number: "Eco", label: "Produtos Naturais" },
              ].map((stat, index) => (
                <div key={index} className="text-left md:text-center">
                  <div className="text-xl md:text-3xl font-bold text-pet-teal-dark font-ubuntu">
                    {stat.number}
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
            <div className="relative z-10 w-full max-w-xl aspect-square flex items-center justify-center">
              {/* Imagem do Cachorro e Bolha de Sabão Integrados (SVG) */}
              <svg
                className="absolute w-[120%] h-[120%] z-20 drop-shadow-2xl pointer-events-auto hover-water-jiggle"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Máscara com a forma animada da bolha */}
                  <clipPath id="blob-clip">
                    <path
                      transform="translate(100 100)"
                      style={{
                        animation: "morphBubbleShape 20s linear infinite",
                      }}
                      d="M46.5,-54.1C60.2,-44,71.1,-29.2,75.4,-12.2C79.7,4.9,77.5,24.2,68.7,39.9C59.9,55.6,44.5,67.7,27.1,73.8C9.7,79.8,-9.7,79.8,-25.8,73C-42,66.2,-54.9,52.7,-64.8,36.8C-74.8,20.9,-81.8,2.6,-80,-15.3C-78.2,-33.1,-67.6,-50.6,-52.8,-60.5C-38,-70.5,-19,-73,-1.3,-71.5C16.4,-69.9,32.9,-64.3,46.5,-54.1Z"
                    />
                  </clipPath>

                  {/* Gradiente Transparente de Bolha de Sabão (Apenas reflexos nas bordas) */}
                  <radialGradient id="soapGlassGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
                    <stop offset="70%" stopColor="rgba(200, 240, 255, 0.1)" />
                    <stop offset="85%" stopColor="rgba(255, 200, 255, 0.2)" />
                    <stop offset="95%" stopColor="rgba(100, 200, 255, 0.4)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
                  </radialGradient>
                </defs>

                {/* Grupo Clipado: A máscara não aumenta de tamanho quando passamos o mouse! */}
                <g clipPath="url(#blob-clip)">
                  {/* Cachorro Grande, animando dentro do limite estrito da bolha */}
                  <image
                    href="/petcare-premium/images/premium_dog_hero-transparent.png"
                    x="10"
                    y="10"
                    width="180"
                    height="180"
                    preserveAspectRatio="xMidYMid slice"
                    style={{
                      transformOrigin: "center",
                      transition: "transform 0.7s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </g>

                {/* Camada Principal da Bolha (Vidro de Sabão Transparente) */}
                <path
                  transform="translate(100 100)"
                  style={{
                    animation: "morphBubbleShape 20s linear infinite",
                    pointerEvents: "none",
                  }}
                  fill="url(#soapGlassGrad)"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="1.5"
                />

                {/* Camada de Brilho Translúcido */}
                <path
                  transform="translate(100 100)"
                  style={{
                    animation: "morphBubbleShape 20s linear infinite",
                    pointerEvents: "none",
                  }}
                  fill="rgba(255,255,255,0.05)"
                />
              </svg>

              {/* Reflexo Especular Cruzeta */}
              <div className="absolute top-[18%] left-[24%] w-6 h-6 bg-white rounded-full blur-[2px] z-30 pointer-events-none flex items-center justify-center">
                <div className="w-12 h-1 bg-white blur-[1px] transform rotate-45 absolute"></div>
                <div className="w-1 h-12 bg-white blur-[1px] transform rotate-45 absolute"></div>
              </div>
              <div className="absolute bottom-[22%] right-[26%] w-4 h-4 bg-white rounded-full blur-[2px] z-30 pointer-events-none flex items-center justify-center opacity-80">
                <div className="w-8 h-0.5 bg-white blur-[1px] transform rotate-45 absolute"></div>
                <div className="w-0.5 h-8 bg-white blur-[1px] transform rotate-45 absolute"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Banner - Pessoas curtindo */}
      <div className="w-full bg-white/95 backdrop-blur-md py-6 mt-4 xl:mt-12 border-y border-pet-teal/10 relative z-20 shadow-[0_10px_30px_rgba(53,126,151,0.05)] order-3 xl:order-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-4">
            <img
              src="https://i.pravatar.cc/100?img=47"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
              alt="Perfil"
            />
            <img
              src="https://i.pravatar.cc/100?img=44"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
              alt="Perfil"
            />
            <img
              src="https://i.pravatar.cc/100?img=33"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
              alt="Perfil"
            />
            <img
              src="https://i.pravatar.cc/100?img=22"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
              alt="Perfil"
            />
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
