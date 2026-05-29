"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  closeMenu: () => void;
}

const NavLink = ({ href, children, closeMenu }: NavLinkProps) => (
  <li>
    <Link
      href={href}
      onClick={closeMenu}
      className="relative group px-4 py-2 font-medium text-lg text-gray-700 transition-all duration-300 hover:text-pet-orange after:content-[''] after:absolute after:bottom-1 after:left-0.5 after:w-0 after:-translate-x-1/2 after:bg-pet-orange after:transition-all after:duration-300 hover:after:w-[75%]"
    >
      {children}
    </Link>
  </li>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Reduzido para 20px para uma resposta mais rápida
    };

    // O { passive: true } melhora a performance da rolagem no navegador
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-premium py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6" aria-label="Navegação Principal">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pet-orange rounded-lg"
          >
            <div className="w-12 h-12 bg-pet-orange rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg" aria-hidden="true">
                🐾
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-pet-navy font-ubuntu tracking-tight">
                Petcare
              </h1>
              <p className="text-xs text-pet-teal -mt-1 font-medium">
                Centro Veterinário
              </p>
            </div>
          </Link>

          {/* Menu Desktop */}
          <ul className="hidden lg:flex items-center space-x-2">
            <NavLink href="#home" closeMenu={handleCloseMenu}>
              Início
            </NavLink>
            <NavLink href="#services" closeMenu={handleCloseMenu}>
              Serviços
            </NavLink>
            <NavLink href="#about" closeMenu={handleCloseMenu}>
              Sobre Nós
            </NavLink>
            <NavLink href="#prices" closeMenu={handleCloseMenu}>
              Planos
            </NavLink>
          </ul>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+551199999999"
              className="flex items-center gap-2 text-gray-700 hover:text-pet-orange transition-colors duration-300 font-semibold"
              aria-label="Ligar para (11) 9999-9999"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              (11) 9999-9999
            </a>
            <button className="bg-pet-orange hover:bg-pet-orange-hover text-white font-bold py-2.5 px-6 rounded-full shadow-orange-glow hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
              Agendar Consulta
            </button>
          </div>

          {/* Botão Menu Mobile */}
          <button
            className="lg:hidden p-2.5 rounded-lg glass shadow-sm border border-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pet-orange"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Alternar menu de navegação"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 origin-left ${isMenuOpen ? "rotate-45 translate-x-1" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-pet-orange rounded-full transition-all duration-300 origin-left ${isMenuOpen ? "-rotate-45 translate-x-1" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full glass shadow-premium transition-all duration-500 overflow-hidden ${
            isMenuOpen
              ? "max-h-96 border-t border-gray-100 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            <ul className="flex flex-col gap-2">
              <NavLink href="#home" closeMenu={handleCloseMenu}>
                Início
              </NavLink>
              <NavLink href="#services" closeMenu={handleCloseMenu}>
                Serviços
              </NavLink>
              <NavLink href="#about" closeMenu={handleCloseMenu}>
                Sobre Nós
              </NavLink>
              <NavLink href="#prices" closeMenu={handleCloseMenu}>
                Planos
              </NavLink>
            </ul>

            <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
              <a
                href="tel:+551199999999"
                className="flex items-center justify-center gap-3 text-gray-800 font-semibold text-lg"
              >
                <svg
                  className="w-5 h-5 text-pet-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (11) 9999-9999
              </a>
              <button className="w-full bg-pet-orange hover:bg-pet-orange-hover text-white font-bold py-3.5 px-6 rounded-full shadow-orange-glow transition-all duration-300 active:scale-95">
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
