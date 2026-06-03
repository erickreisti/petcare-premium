"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLElement>(null);

  const currentYear = new Date().getFullYear();

  useGSAP(() => {
    // Reveal text links staggering
    gsap.from(".footer-link", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%"
      }
    });

    gsap.from(".footer-social", {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%"
      }
    });
  }, { scope: container });

  type NavLink = { name: string; href: string };
  const navLinks: NavLink[] = [
    { name: "Início", href: "#" },
    { name: "Serviços", href: "#services" },
    { name: "Sobre Nós", href: "#about" },
    { name: "Planos & Preços", href: "#prices" },
    { name: "Depoimentos", href: "#testimonials" }
  ];

  const contactLinks = [
    { name: "(11) 99999-9999", href: "tel:+5511999999999" },
    { name: "contato@petcare.com", href: "mailto:contato@petcare.com" },
    { name: "Rua dos Pets, 123 - SP", href: "#" }
  ];

  return (
    <footer ref={container} className="bg-pet-navy text-white relative overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-up {
          0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-1000px) scale(1.2) rotate(360deg); opacity: 0; }
        }
      `}} />

      {/* 
        ========================================================
        EFEITO LIQUID DISPLACEMENT (Filtro SVG Nativo)
        Substitui o WebGL/PixiJS por uma solução super leve!
        ========================================================
      */}
      <svg className="absolute w-0 h-0">
        <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
            {/* Anima o ruído criando a ilusão de água fluindo */}
            <animate attributeName="baseFrequency" values="0.015;0.025;0.015" dur="15s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen"
          style={{
            // Um fundo construído apenas com CSS:
            // 1. Linhas diagonais repetitivas (para o displacement "dobrar" e criar as ondas)
            // 2. Um brilho Teal no canto inferior esquerdo
            // 3. Fundo base azul marinho
            background: `
              repeating-linear-gradient(45deg, rgba(57, 157, 157, 0.15) 0px, rgba(57, 157, 157, 0.15) 2px, transparent 2px, transparent 16px),
              radial-gradient(circle at 20% 80%, rgba(57, 157, 157, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, rgba(255, 159, 67, 0.1) 0%, transparent 50%),
              #1f2b45
            `,
            filter: 'url(#liquid)',
            transform: 'scale(1.2)' // Escala para esconder as bordas puxadas pelo displacement
          }}
        />
        {/* Overlay para escurecer o fundo liquid e manter o contraste */}
        <div className="absolute inset-0 bg-pet-navy/60 backdrop-blur-[2px]" />
      </div>

      {/* Bolhas flutuantes subindo pela piscina (Pseudo-aleatórias para evitar Hydration Error) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/20 bg-white/5 backdrop-blur-xs"
            style={{
              left: `${(i * 27) % 100}%`,
              bottom: `-50px`,
              width: `${(i * 11) % 40 + 10}px`,
              height: `${(i * 11) % 40 + 10}px`,
              animation: `float-up ${(i * 5) % 15 + 10}s linear infinite`,
              animationDelay: `${(i * 2.3) % 10}s`
            }}
          />
        ))}
      </div>


      {/* Conteúdo do Footer (Split Layout Premium) */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24 pb-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start mb-20">
          
          {/* Lado Esquerdo - Branding */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-6 footer-link">
              <div className="w-14 h-14 bg-linear-to-br from-pet-teal to-pet-teal-dark rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,157,157,0.4)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-white"
                >
                  <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
                  <path d="M9 13.5c-1.5 0-2.5-1-2.5-2.5S7.5 8.5 9 8.5s2.5 1 2.5 2.5-1 2.5-2.5 2.5Z" />
                  <path d="M15 13.5c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5-2.5 1-2.5 2.5 1 2.5 2.5 2.5Z" />
                  <path d="M12 16.5c-1.5 0-2.5 1-2.5 2.5S10.5 21 12 21s2.5-1 2.5-2.5-1-2.5-2.5-2.5Z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold font-ubuntu tracking-tight">Pet<span className="text-pet-teal">Care</span></h2>
            </div>
            
            <p className="text-gray-400 text-lg max-w-sm mb-8 footer-link leading-relaxed">
              Elevando o padrão de cuidados veterinários. Onde luxo e saúde se encontram para o bem-estar do seu melhor amigo.
            </p>

            <div className="flex gap-4">
              {['instagram', 'facebook', 'twitter'].map((social, idx) => (
                <a key={idx} href="#" className="footer-social w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-pet-orange hover:border-pet-orange transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-orange-glow group">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>


          {/* Centro - Menu Rápido */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-white font-bold text-xl mb-6 footer-link font-ubuntu">Navegação</h4>
            <ul className="space-y-4">
              {navLinks.map((link, idx) => (
                <li key={idx} className="footer-link">
                  <a href={link.href} className="group relative text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 w-fit">
                    <span className="relative overflow-hidden">
                      {/* Texto Estático */}
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                      </span>
                      {/* Texto que sobe no Hover */}
                      <span className="absolute inset-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-pet-orange font-medium">
                        {link.name}
                      </span>
                    </span>
                    {/* Seta Deslizante */}
                    <svg className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-pet-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Lado Direito - Contato */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-white font-bold text-xl mb-6 footer-link font-ubuntu">Fale Conosco</h4>
            <ul className="space-y-4 mb-8">
              {contactLinks.map((link, idx) => (
                <li key={idx} className="footer-link">
                  <a href={link.href} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 w-fit">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pet-teal group-hover:border-pet-teal transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-pet-teal transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Minimalista */}
            <div className="footer-link">
              <div className="relative w-full max-w-sm">
                <input 
                  type="email" 
                  placeholder="Seu e-mail..." 
                  className="w-full bg-white/5 border border-white/20 rounded-full py-3 px-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-pet-teal transition-colors"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-pet-teal hover:bg-pet-teal-dark text-white rounded-full px-6 font-bold transition-colors shadow-lg text-sm cursor-pointer">
                  Assinar
                </button>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Bathtub Element na Base (opcional se quiser manter) */}
        <div className="flex justify-center mb-8 relative z-10 footer-link">
           {/* <Bathtub /> */}
        </div>

        {/* Linha Divisória e Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-gray-500 text-sm footer-link">
            &copy; {currentYear} PetCare Premium. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm footer-link">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
