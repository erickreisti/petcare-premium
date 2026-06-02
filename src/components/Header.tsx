"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Início" },
  { href: "#services", label: "Serviços" },
  { href: "#about", label: "Sobre Nós" },
  { href: "#prices", label: "Planos" },
  { href: "#testimonials", label: "Depoimentos" }
];

const MobileNavLink = ({ href, children, closeMenu }: { href: string; children: ReactNode; closeMenu: () => void }) => (
  <li>
    <Link
      href={href}
      onClick={closeMenu}
      className="relative block px-4 py-2 font-medium text-lg text-gray-700 transition-all duration-300 hover:text-pet-orange hover:bg-white/50 rounded-xl"
    >
      {children}
    </Link>
  </li>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Quando passar de 120px de rolagem, troca o menu de topo pelo menu lateral
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMenu = () => setIsMenuOpen(false);

  // SVG Logo Patinha (Harmonizado com o Footer)
  const LogoSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full text-white"
      aria-hidden="true"
    >
      <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
      <path d="M9 13.5c-1.5 0-2.5-1-2.5-2.5S7.5 8.5 9 8.5s2.5 1 2.5 2.5-1 2.5-2.5 2.5Z" />
      <path d="M15 13.5c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5-2.5 1-2.5 2.5 1 2.5 2.5 2.5Z" />
      <path d="M12 16.5c-1.5 0-2.5 1-2.5 2.5S10.5 21 12 21s2.5-1 2.5-2.5-1-2.5-2.5-2.5Z" />
    </svg>
  );

  return (
    <>
      <AnimatePresence>
        {/* ================================================================= */}
        {/* MENU DO TOPO (Aparece quando está no início da página) */}
        {/* ================================================================= */}
        {!isScrolled && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-6 left-0 w-full z-50 flex justify-center px-4"
          >
            <nav className="w-full max-w-5xl relative glass shadow-premium border border-white/60 py-3 px-6 rounded-4xl">
              <div className="flex items-center justify-between">
                
                {/* Logo e Nome */}
                <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none pr-4">
                  <div className="w-12 h-12 bg-linear-to-br from-pet-teal to-pet-teal-dark rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(57,157,157,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(57,157,157,0.5)] transition-all duration-300 p-2">
                    <LogoSvg />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-pet-navy font-ubuntu tracking-tight">Pet<span className="text-pet-teal">Care</span></h1>
                  </div>
                </Link>

                {/* Links Horizontais (Efeito Hover Premium do Footer) */}
                <ul className="hidden lg:flex items-center space-x-6">
                  {navItems.map((item) => (
                    <li key={item.href} className="relative z-10">
                      <Link href={item.href} className="group relative block font-semibold text-[15px] text-pet-navy overflow-hidden">
                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                          {item.label}
                        </span>
                        <span className="absolute inset-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-pet-orange">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* CTA Agendar (Pílula) */}
                <div className="hidden lg:flex items-center gap-4 pl-4">
                  <button className="bg-linear-to-r from-pet-orange to-amber-500 text-white font-bold py-2.5 px-6 rounded-full hover:from-pet-orange-hover hover:to-pet-orange shadow-orange-glow transition-all duration-300 text-sm transform hover:-translate-y-0.5 active:scale-95">
                    Agendar
                  </button>
                </div>

                {/* Botão Menu Mobile */}
                <button
                  className="lg:hidden p-2 rounded-full glass shadow-sm border border-gray-100 mr-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="w-5 h-4 relative flex flex-col justify-between">
                    <span className={`w-full h-0.5 bg-pet-navy rounded-full transition-all duration-300 origin-left ${isMenuOpen ? "rotate-45 translate-x-0.5" : ""}`} />
                    <span className={`w-full h-0.5 bg-pet-navy rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                    <span className={`w-full h-0.5 bg-pet-navy rounded-full transition-all duration-300 origin-left ${isMenuOpen ? "-rotate-45 translate-x-0.5" : ""}`} />
                  </div>
                </button>

              </div>
              
              {/* Menu Mobile Expandido */}
              <div
                className={`lg:hidden absolute top-full left-0 w-full glass shadow-premium transition-all duration-500 overflow-hidden mt-4 rounded-3xl ${
                  isMenuOpen ? "max-h-96 border border-white/50 opacity-100" : "max-h-0 opacity-0 border-transparent"
                }`}
              >
                <div className="px-6 py-6 flex flex-col gap-2">
                  <ul className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <MobileNavLink key={item.href} href={item.href} closeMenu={handleCloseMenu}>
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </ul>
                  <div className="pt-4 mt-2 border-t border-gray-100/50 flex flex-col gap-4">
                    <button className="w-full bg-linear-to-r from-pet-orange to-amber-500 hover:from-pet-orange-hover hover:to-pet-orange text-white font-bold py-3.5 px-6 rounded-full shadow-orange-glow transition-all duration-300 active:scale-95">
                      Agendar Consulta
                    </button>
                  </div>
                </div>
              </div>

            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* ================================================================= */}
        {/* MENU LATERAL (Aparece apenas após rolar e em Desktop lg+) */}
        {/* ================================================================= */}
        {isScrolled && (
          <motion.aside
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hidden lg:flex fixed top-1/2 right-6 -translate-y-1/2 z-50"
          >
            <nav className="relative glass shadow-premium border border-white/60 py-8 px-3 rounded-[2.5rem] flex flex-col items-center gap-6">
              
              {/* Logo Somente Ícone */}
              <Link href="/" className="group focus-visible:outline-none mb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-linear-to-br from-pet-teal to-pet-teal-dark shadow-[0_0_15px_rgba(57,157,157,0.3)] p-2">
                  <LogoSvg />
                </div>
              </Link>

              {/* Links Verticais */}
              <ul className="flex flex-col items-center gap-4">
                {navItems.map((item) => (
                  <li key={item.href} className="relative z-10 w-full text-center group">
                    <Link
                      href={item.href}
                      className="relative block font-semibold text-xs uppercase tracking-wider transition-colors duration-300 text-gray-500 hover:text-pet-orange p-2"
                    >
                      {item.label.split(' ')[0]}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Agendar (Ícone Redondo) */}
              <div className="pt-4 mt-2 border-t border-pet-teal/20 w-full flex justify-center">
                <button 
                  className="bg-linear-to-r from-pet-orange to-amber-500 text-white font-bold w-12 h-12 rounded-full hover:from-pet-orange-hover hover:to-pet-orange transition-all duration-300 shadow-orange-glow flex items-center justify-center hover:-translate-y-1 active:scale-95"
                  aria-label="Agendar Consulta"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                </button>
              </div>

            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
