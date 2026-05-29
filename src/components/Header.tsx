"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "#home", label: "Início" },
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);

      // Smart Hide Logic
      if (currentScrollY > lastScrollY && currentScrollY > 150 && !isMenuOpen) {
        setIsHidden(true); // Esconde ao rolar para baixo
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false); // Mostra ao rolar para cima
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed w-full z-50 flex justify-center px-4 transition-all duration-300 ${
        isScrolled ? "pt-4" : "pt-6"
      }`}
    >
      <nav
        className={`w-full max-w-5xl transition-all duration-500 rounded-full relative ${
          isScrolled
            ? "glass shadow-premium py-2 px-4 border border-white/40"
            : "bg-transparent py-2 px-2"
        }`}
        aria-label="Navegação Principal"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pet-orange rounded-full pr-4"
          >
            <div className="w-10 h-10 bg-pet-orange rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-base" aria-hidden="true">
                🐾
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-pet-navy font-ubuntu tracking-tight">
                Petcare
              </h1>
            </div>
          </Link>

          {/* Menu Desktop com Destaque Magnético (Sliding Highlight) */}
          <ul className="hidden lg:flex items-center space-x-1 relative">
            {navItems.map((item) => (
              <li key={item.href} className="relative z-10">
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative block px-5 py-2.5 font-semibold text-[15px] transition-colors duration-300 ${
                    hoveredItem === item.href ? "text-pet-navy" : "text-gray-600"
                  }`}
                >
                  {hoveredItem === item.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-pet-teal/10 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.5,
                      }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-4 pl-4">
            <button className="bg-pet-orange hover:bg-pet-orange-hover text-white font-bold py-2 px-6 rounded-full shadow-orange-glow transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95 text-sm">
              Agendar
            </button>
          </div>

          {/* Botão Menu Mobile */}
          <button
            className="lg:hidden p-2 rounded-full glass shadow-sm border border-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pet-orange mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Alternar menu de navegação"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 origin-left ${
                  isMenuOpen ? "rotate-45 translate-x-0.5" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 origin-left ${
                  isMenuOpen ? "-rotate-45 translate-x-0.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full glass shadow-premium transition-all duration-500 overflow-hidden mt-4 rounded-3xl ${
            isMenuOpen
              ? "max-h-96 border border-white/50 opacity-100"
              : "max-h-0 opacity-0 border-transparent"
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
  );
}
