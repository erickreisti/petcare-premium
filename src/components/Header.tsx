"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Início" },
  { href: "#services", label: "Serviços" },
  { href: "#about", label: "Sobre Nós" },
  { href: "#prices", label: "Planos" },
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

  // SVG Logo Cachorrinho Banheira
  const LogoSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8 text-pet-teal-dark"
      aria-hidden="true"
    >
      <path d="M3 13h18v4a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-4z" />
      <path d="M2 13h20" />
      <path d="M7 23l-1 1" />
      <path d="M17 23l1 1" />
      <path d="M8 13V8a4 4 0 0 1 8 0v5" />
      <path d="M8 8c-1.5-1-3 0-3 2s1.5 2 3 2" />
      <path d="M16 8c1.5-1 3 0 3 2s-1.5 2-3 2" />
      <circle cx="10" cy="9" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14" cy="9" r="0.8" fill="currentColor" stroke="none" />
      <path d="M9 13v1.5a1.5 1.5 0 0 0 3 0V13" />
      <path d="M12 13v1.5a1.5 1.5 0 0 0 3 0V13" />
      <circle cx="4" cy="7" r="1.5" />
      <circle cx="20" cy="5" r="2" />
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
            <nav className="w-full max-w-4xl relative glass shadow-[0_15px_30px_rgba(53,126,151,0.15)] border border-white/60 py-2 px-4 rounded-full">
              <div className="flex items-center justify-between">
                
                {/* Logo e Nome */}
                <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none pr-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <LogoSvg />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-pet-navy font-ubuntu tracking-tight">Petcare</h1>
                  </div>
                </Link>

                {/* Links Horizontais */}
                <ul className="hidden lg:flex items-center space-x-1">
                  {navItems.map((item) => (
                    <li key={item.href} className="relative z-10 group">
                      <Link href={item.href} className="relative block px-5 py-2.5 font-semibold text-[15px] transition-colors duration-300 text-gray-600 hover:text-pet-navy">
                        <div className="absolute inset-0 bg-pet-teal/10 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* CTA Agendar (Pílula) */}
                <div className="hidden lg:flex items-center gap-4 pl-4">
                  <button className="bg-pet-teal-dark text-white font-bold py-2 px-6 rounded-full hover:bg-pet-teal transition-colors duration-300 text-sm">
                    Agendar
                  </button>
                </div>

                {/* Botão Menu Mobile */}
                <button
                  className="lg:hidden p-2 rounded-full glass shadow-sm border border-gray-100 mr-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="w-5 h-4 relative flex flex-col justify-between">
                    <span className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 origin-left ${isMenuOpen ? "rotate-45 translate-x-0.5" : ""}`} />
                    <span className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                    <span className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 origin-left ${isMenuOpen ? "-rotate-45 translate-x-0.5" : ""}`} />
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
                    <button className="w-full bg-pet-orange hover:bg-pet-orange-hover text-white font-bold py-3.5 px-6 rounded-full shadow-orange-glow transition-all duration-300 active:scale-95">
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
            <nav className="relative glass shadow-[0_15px_30px_rgba(53,126,151,0.15)] border border-white/60 py-8 px-3 rounded-[2.5rem] flex flex-col items-center gap-6">
              
              {/* Logo Somente Ícone */}
              <Link href="/" className="group focus-visible:outline-none mb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white/50 shadow-sm border border-white/50">
                  <LogoSvg />
                </div>
              </Link>

              {/* Links Verticais */}
              <ul className="flex flex-col items-center gap-4">
                {navItems.map((item) => (
                  <li key={item.href} className="relative z-10 group w-full text-center">
                    <Link
                      href={item.href}
                      className="relative block font-semibold text-sm transition-colors duration-300 text-gray-600 hover:text-pet-navy p-2"
                    >
                      <div className="absolute inset-0 bg-pet-teal/10 rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Mostrar apenas a primeira palavra no menu lateral para não ficar muito largo, ou podemos manter o nome se for curto */}
                      {item.label.split(' ')[0]}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Agendar (Ícone Redondo) */}
              <div className="pt-4 mt-2 border-t border-pet-teal/20 w-full flex justify-center">
                <button 
                  className="bg-pet-teal-dark text-white font-bold w-12 h-12 rounded-full hover:bg-pet-teal transition-all duration-300 shadow-md flex items-center justify-center hover:-translate-y-1"
                  aria-label="Agendar Consulta"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                </button>
              </div>

            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
