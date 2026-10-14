"use client";
import { useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoIcon from "@/components/ui/LogoIcon";
import { socialLinks, SocialIcon } from "@/components/ui/socialLinks";
import { showDemoNotice } from "@/lib/demo";
import { bubbleReveal } from "@/lib/motion";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const navLinks = [
  { name: "Início", href: "#home" },
  { name: "Serviços", href: "#services" },
  { name: "Sobre Nós", href: "#about" },
  { name: "Planos & Preços", href: "#prices" },
  { name: "Depoimentos", href: "#testimonials" },
];

// Dados fictícios (site demo)
const contactLinks = [
  { name: "(11) 99999-9999", href: "tel:+5511999999999", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  { name: "contato@petcare.com", href: "mailto:contato@petcare.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { name: "Rua dos Pets, 123 - SP", href: "https://maps.google.com/?q=Sao+Paulo", icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
];

// Fundo "líquido": linhas diagonais (que o displacement dobra em ondas) + brilhos teal e laranja
const LIQUID_BACKGROUND = [
  "repeating-linear-gradient(45deg, rgba(57, 157, 157, 0.15) 0px, rgba(57, 157, 157, 0.15) 2px, transparent 2px, transparent 16px)",
  "radial-gradient(circle at 20% 80%, rgba(57, 157, 157, 0.4) 0%, transparent 60%)",
  "radial-gradient(circle at 80% 20%, rgba(255, 159, 67, 0.1) 0%, transparent 50%)",
  "#1f2b45",
].join(", ");

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    showDemoNotice("Obrigado! Este site é uma demonstração, então nenhum e-mail foi cadastrado.");
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Títulos com a mesma "bolha de sabão" das outras seções
      bubbleReveal(".footer-heading", container.current, {
        scrollTrigger: { trigger: container.current, start: "top 85%" },
      });

      gsap.from(".footer-link", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: container.current, start: "top 85%" },
      });

      gsap.from(".footer-social", {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
        // Devolve o translate ao CSS (hover:-translate-y-1)
        clearProps: "all",
        scrollTrigger: { trigger: container.current, start: "top 90%" },
      });
    });
  }, { scope: container });

  return (
    <footer ref={container} className="bg-pet-navy text-white relative overflow-hidden">
      {/* Onda de água: transição dos Depoimentos para o rodapé */}
      <div aria-hidden="true" className="relative z-10 h-15 md:h-22.5 overflow-hidden isolate">
        <div className="footer-water-wave wave-bg" />
        <div className="footer-water-wave" />
      </div>

      {/* Efeito líquido: filtro SVG de displacement (leve, sem WebGL) */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="absolute inset-0 pointer-events-none z-0">
        {/* scale-120 esconde as bordas puxadas pelo displacement */}
        <div
          className="absolute inset-0 opacity-70 mix-blend-screen scale-120"
          style={{ background: LIQUID_BACKGROUND, filter: "url(#liquid)" }}
        />
        {/* Overlay para escurecer o fundo liquid e manter o contraste */}
        <div className="absolute inset-0 bg-pet-navy/60" />
      </div>

      {/* Bolhas flutuantes subindo pela piscina (Pseudo-aleatórias para evitar Hydration Error) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="footer-bubble absolute -bottom-12.5 rounded-full border border-white/20 bg-white/5"
            style={{
              left: `${(i * 27) % 100}%`,
              width: (i * 11) % 40 + 10,
              height: (i * 11) % 40 + 10,
              animationDuration: `${(i * 5) % 15 + 10}s`,
              animationDelay: `${(i * 2.3) % 10}s`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo do Footer (Split Layout Premium) */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10 md:pt-14 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-12 items-start mb-12 md:mb-20">
          {/* Lado Esquerdo - Branding */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-6 footer-link">
              <div className="w-14 h-14">
                <LogoIcon />
              </div>
              <p className="text-4xl font-bold font-ubuntu tracking-tight">Pet<span className="text-pet-teal">Care</span></p>
            </div>

            <p className="text-gray-400 text-lg max-w-sm mb-8 footer-link leading-relaxed">
              Elevando o padrão de cuidados veterinários. Onde luxo e saúde se encontram para o bem-estar do seu melhor amigo.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="footer-social w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-pet-orange hover:border-pet-orange transition-[background-color,border-color,box-shadow,translate] duration-300 hover:-translate-y-1 shadow-sm hover:shadow-orange-glow group">
                  <SocialIcon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors">{social.icon}</SocialIcon>
                </a>
              ))}
            </div>
          </div>

          {/* Centro - Menu Rápido */}
          <div className="lg:col-span-3 flex flex-col">
            <h2 className="footer-heading text-white font-bold text-xl mb-6 font-ubuntu">Navegação</h2>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href} className="footer-link">
                  <a href={link.href} className="group relative text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 w-fit">
                    <span className="relative overflow-hidden">
                      {/* Texto Estático */}
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                      </span>
                      {/* Texto que sobe no Hover */}
                      <span aria-hidden="true" className="absolute inset-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-pet-orange font-medium">
                        {link.name}
                      </span>
                    </span>
                    {/* Seta Deslizante */}
                    <svg aria-hidden="true" className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-[opacity,margin-left] duration-300 text-pet-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Lado Direito - Contato */}
          <div id="contact" className="lg:col-span-4 flex flex-col scroll-mt-28">
            <h2 className="footer-heading text-white font-bold text-xl mb-6 font-ubuntu">Fale Conosco</h2>
            <p className="text-gray-400 mb-6 footer-link">Agende sua visita pelo telefone ou e-mail abaixo.</p>
            <ul className="space-y-4 mb-8">
              {contactLinks.map((link) => (
                <li key={link.href} className="footer-link">
                  <a href={link.href} {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 w-fit">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pet-teal group-hover:border-pet-teal transition-colors duration-300">
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                      </svg>
                    </div>
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-pet-teal transition-[width] duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Minimalista */}
            <form onSubmit={handleNewsletterSubmit} className="footer-link">
              <label htmlFor="newsletter-email" className="sr-only">Seu e-mail</label>
              <div className="relative w-full max-w-sm">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail..."
                  className="w-full bg-white/5 border border-white/20 rounded-full py-3 pl-6 pr-28 text-white placeholder:text-gray-500 focus:outline-none focus:border-pet-teal transition-colors"
                />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-pet-teal-dark hover:bg-pet-navy text-white rounded-full px-6 font-bold transition-colors shadow-lg text-sm cursor-pointer">
                  Assinar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Linha Divisória e Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-gray-500 text-sm footer-link">
            &copy; {new Date().getFullYear()} PetCare Premium. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm footer-link">Projeto demonstrativo &mdash; dados fictícios</p>
        </div>
      </div>
    </footer>
  );
}
