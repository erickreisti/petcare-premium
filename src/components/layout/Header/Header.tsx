"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LogoIcon, { LogoBadge } from "@/components/ui/LogoIcon";
import { useMagnetic } from "@/lib/useMagnetic";

gsap.registerPlugin(useGSAP);

// Ícones do menu lateral (Tabler Icons, traço 2)
const SideIcon = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const navItems = ([
  { href: "#home", label: "Início", icon: <SideIcon><path d="M5 12H3l9-9 9 9h-2" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" /></SideIcon> },
  { href: "#services", label: "Serviços", icon: <SideIcon><path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" /><path d="M8 15a6 6 0 1 0 12 0v-3" /><path d="M11 3v2M6 3v2" /><circle cx="20" cy="10" r="2" /></SideIcon> },
  { href: "#about", label: "Sobre Nós", icon: <SideIcon><path d="M19.5 12.572 12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" /></SideIcon> },
  { href: "#prices", label: "Planos", icon: <SideIcon><circle cx="7.5" cy="7.5" r="1" /><path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592-5.592a2.41 2.41 0 0 0 0-3.408l-7.71-7.71A2 2 0 0 0 11.172 3H6a3 3 0 0 0-3 3z" /></SideIcon> },
  { href: "#testimonials", label: "Depoimentos", icon: <SideIcon><path d="m3 20 1.3-3.9C1.976 12.663 2.874 8.228 6.4 5.726c3.526-2.501 8.59-2.296 11.845.48 3.255 2.777 3.695 7.266 1.029 10.501-2.666 3.235-7.615 4.215-11.574 2.293L3 20" /></SideIcon> },
]).map((item) => ({ ...item, id: item.href.slice(1) }));

// Rótulo do menu lateral: fechado tem largura zero e abre quando a cápsula recebe hover ou foco.
// Fecha com um pequeno atraso para a cápsula não "piscar" se o mouse escapar por um instante
const SideLabel = ({ className, hidden, children }: { className: string; hidden?: boolean; children: ReactNode }) => (
  <span
    aria-hidden={hidden}
    className="grid grid-cols-[0fr] opacity-0 delay-150 transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/side:grid-cols-[1fr] group-hover/side:opacity-100 group-hover/side:delay-0 group-focus-within/side:grid-cols-[1fr] group-focus-within/side:opacity-100 group-focus-within/side:delay-0 motion-reduce:transition-none"
  >
    <span className="min-w-0 overflow-hidden">
      <span className={`block whitespace-nowrap ${className}`}>{children}</span>
    </span>
  </span>
);

// Seção visível agora: a que cruza a linha a 45% da altura da tela
function useActiveSection() {
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    // O rodapé conta como a última seção: um salto direto até ele (tecla End) não cruza as do meio
    const footer = document.querySelector("footer");
    const lastId = sections.at(-1)?.id;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveId(entry.target === footer && lastId ? lastId : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return activeId;
}

// true quando o rodapé ocupa a parte de baixo da tela (o menu lateral cobriria o conteúdo dele)
function useFooterInView() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return inView;
}

// Posição de layout de um item dentro da lista. Soma a cadeia de offsetParent porque, durante a
// entrada em cascata (GSAP), os itens têm transform e viram o offsetParent dos próprios filhos
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

// Pílula que desliza até o item ativo de uma lista (posição escrita direto no DOM, sem re-render)
function useSlidingIndicator(activeId: string, pad: { x: number; y: number }) {
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const { x: padX, y: padY } = pad;

  useEffect(() => {
    const update = () => {
      const list = listRef.current;
      const item = list?.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
      const indicator = indicatorRef.current;
      if (!list || !item || !indicator || !item.offsetWidth) return;

      const firstPlacement = indicator.style.opacity !== "1";
      if (firstPlacement) indicator.style.transition = "none";
      const { x, y } = offsetWithin(item, list);
      indicator.style.transform = `translate(${x - padX}px, ${y - padY}px)`;
      indicator.style.width = `${item.offsetWidth + padX * 2}px`;
      indicator.style.height = `${item.offsetHeight + padY * 2}px`;
      indicator.style.opacity = "1";
      if (firstPlacement) {
        void indicator.offsetWidth; // aplica a posição antes de religar a transição
        indicator.style.transition = "";
      }
    };

    // Observa a própria lista: remede quando ela aparece (display), muda de tamanho ou a janela muda
    update();
    const observer = new ResizeObserver(update);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [activeId, padX, padY]);

  return { listRef, indicatorRef };
}

const INDICATOR_CLASS =
  "absolute top-0 left-0 opacity-0 rounded-full pointer-events-none transition-[transform,width,height] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

// Botão laranja "Agendar" (topo, menu do celular e menu lateral)
const CTA_CLASS =
  "bg-linear-to-r from-pet-orange to-amber-500 hover:from-pet-orange-hover hover:to-pet-orange text-white font-bold rounded-full shadow-orange-glow";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Quando passar de 120px de rolagem, troca o menu de topo pelo menu lateral (só em telas largas)
      setIsScrolled(window.scrollY > 120);
    };
    const desktopQuery = window.matchMedia("(min-width: 1600px)");
    const handleDesktopChange = () => setIsDesktop(desktopQuery.matches);

    handleScroll();
    handleDesktopChange();
    window.addEventListener("scroll", handleScroll, { passive: true });
    desktopQuery.addEventListener("change", handleDesktopChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleCloseMenu = () => setIsMenuOpen(false);

  const activeId = useActiveSection();
  const footerInView = useFooterInView();
  const { listRef: topListRef, indicatorRef: topIndicatorRef } = useSlidingIndicator(activeId, { x: 12, y: 6 });
  const { listRef: sideListRef, indicatorRef: sideIndicatorRef } = useSlidingIndicator(activeId, { x: 0, y: 0 });

  // Até 1600px o menu do topo fica sempre visível (o lateral cobriria o conteúdo); em telas
  // mais largas ele dá lugar ao menu lateral, que sai de cena ao chegar no rodapé
  const showSideMenu = isScrolled && isDesktop && !footerInView;

  const asideRef = useRef<HTMLElement>(null);
  const topCtaRef = useMagnetic<HTMLAnchorElement>();
  // Ímã contido: raio curto para não reagir ao item de cima e no máximo 6px de deslocamento
  const sideCtaRef = useMagnetic<HTMLAnchorElement>(0.2, 24, 6);

  // Menu lateral: a cápsula desliza (CSS) e os itens "borbulham" para dentro um a um
  useGSAP(() => {
    if (!showSideMenu) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".side-item",
        { x: 24, opacity: 0, scale: 0.6 },
        { x: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, delay: 0.12, ease: "back.out(2.2)", clearProps: "all" },
      );
    });
  }, { scope: asideRef, dependencies: [showSideMenu] });

  return (
    <>
      {/* Menu do topo */}
      <header
        inert={showSideMenu}
        className={`fixed left-0 w-full z-50 flex justify-center px-4 transition-[top,translate,opacity] duration-500 ease-in-out ${
          isScrolled ? "top-3" : "top-6"
        } ${showSideMenu ? "-translate-y-32 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
      >
        <nav aria-label="Principal" className={`w-full max-w-5xl relative shadow-premium border py-3 px-6 rounded-4xl transition-[background-color,border-color] duration-500 ${
          // Rolando, o fundo fica quase opaco para o texto da página não atravessar o menu
          isScrolled ? "bg-white/92 backdrop-blur-xl border-white/80" : "glass border-white/60"
        }`}>
          <div className="flex items-center justify-between">

            {/* Logo e Nome */}
            <Link href="#home" className="flex items-center gap-3 group pr-4" aria-label="PetCare - voltar ao início">
              <div className="w-12 h-12 group-hover:scale-110 transition-[scale] duration-300">
                <LogoIcon />
              </div>
              <span className="text-2xl font-bold text-pet-navy font-ubuntu tracking-tight">Pet<span className="text-pet-teal">Care</span></span>
            </Link>

            {/* Links Horizontais (Efeito Hover Premium do Footer) */}
            <ul ref={topListRef} className="hidden lg:flex items-center space-x-6 relative">
              <span ref={topIndicatorRef} aria-hidden="true" className={`${INDICATOR_CLASS} bg-pet-teal/12 border border-pet-teal/20`} />
              {navItems.map((item) => (
                <li key={item.href} data-section={item.id} className="relative z-10">
                  <Link
                    href={item.href}
                    aria-current={activeId === item.id ? "location" : undefined}
                    className={`group relative block font-semibold text-[15px] overflow-hidden transition-colors duration-300 ${activeId === item.id ? "text-pet-teal-dark" : "text-pet-navy"}`}
                  >
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="absolute inset-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-pet-orange">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Agendar (Pílula) */}
            <div className="hidden lg:flex pl-4">
              <Link ref={topCtaRef} href="#contact" className={`${CTA_CLASS} py-2.5 px-6 transition-[translate,scale,box-shadow] duration-300 text-sm hover:-translate-y-0.5 active:scale-95`}>
                Agendar
              </Link>
            </div>

            {/* Botão Menu Mobile */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-full glass shadow-sm border border-gray-100 mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-pet-navy rounded-full transition-[rotate,translate] duration-300 origin-left ${isMenuOpen ? "rotate-45 translate-x-0.5" : ""}`} />
                <span className={`w-full h-0.5 bg-pet-navy rounded-full transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`w-full h-0.5 bg-pet-navy rounded-full transition-[rotate,translate] duration-300 origin-left ${isMenuOpen ? "-rotate-45 translate-x-0.5" : ""}`} />
              </div>
            </button>

          </div>

          {/* Menu Mobile Expandido. Fundo sólido: dentro da nav (que já tem backdrop-filter) o blur
              próprio não alcança a página, e o texto de trás vazaria entre os links */}
          <div
            id="mobile-menu"
            inert={!isMenuOpen}
            className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-premium transition-[max-height,opacity,border-color] duration-500 overflow-hidden mt-4 rounded-3xl ${
              isMenuOpen ? "max-h-96 border border-white/50 opacity-100" : "max-h-0 opacity-0 border-transparent"
            }`}
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  // Os links entram em cascata quando o menu abre
                  <li
                    key={item.href}
                    className={`transition-[opacity,translate] duration-500 ease-out ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                    style={{ transitionDelay: isMenuOpen ? `${120 + index * 50}ms` : "0ms" }}
                  >
                    <Link
                      href={item.href}
                      onClick={handleCloseMenu}
                      aria-current={activeId === item.id ? "location" : undefined}
                      className={`block px-4 py-2 font-medium text-lg transition-colors duration-300 hover:text-pet-orange hover:bg-white/50 rounded-xl ${activeId === item.id ? "text-pet-teal-dark bg-pet-teal/10" : "text-gray-700"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-4 mt-2 border-t border-gray-100/50 flex flex-col">
                <Link href="#contact" onClick={handleCloseMenu} className={`text-center ${CTA_CLASS} py-3.5 px-6 transition-transform duration-300 active:scale-95`}>
                  Agendar Consulta
                </Link>
              </div>
            </div>
          </div>

        </nav>
      </header>

      {/* Menu lateral: aparece só depois de rolar, em telas de 1600px+ */}
      <aside
        ref={asideRef}
        inert={!showSideMenu}
        className={`hidden min-[1600px]:flex fixed top-1/2 right-6 -translate-y-1/2 z-50 transition-[translate,opacity] duration-500 ease-out ${
          showSideMenu ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0 pointer-events-none"
        }`}
      >
        {/* Cápsula: só ícones; com hover ou foco ela se abre para a esquerda e mostra os nomes */}
        <nav aria-label="Navegação lateral" className="group/side relative glass shadow-premium border border-white/60 py-5 px-3 rounded-[2.5rem] flex flex-col gap-4">

          {/* Logo (versão centralizada) */}
          <Link href="#home" className="side-item group flex items-center" aria-label="PetCare - voltar ao início">
            <span className="w-11 h-11 shrink-0 group-hover:scale-110 transition-[scale] duration-300">
              <LogoBadge />
            </span>
            <SideLabel hidden className="px-3 text-xl font-bold text-pet-navy font-ubuntu tracking-tight">
              Pet<span className="text-pet-teal">Care</span>
            </SideLabel>
          </Link>

          {/* Links Verticais: o destaque desliza entre os círculos dos ícones */}
          <ul ref={sideListRef} className="flex flex-col gap-1.5 relative border-t border-pet-teal/15 pt-4">
            {/* Destaque: círculo teal sólido atrás do ícone ativo */}
            <span
              ref={sideIndicatorRef}
              aria-hidden="true"
              className={`${INDICATOR_CLASS} bg-linear-to-br from-pet-teal to-pet-teal-dark shadow-md shadow-pet-teal/30 motion-reduce:transition-none`}
            />
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.href} className="side-item">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className="group flex items-center rounded-full"
                  >
                    {/* data-section aqui: o destaque mede só o círculo, não a linha inteira */}
                    <span
                      data-section={item.id}
                      className={`relative z-10 w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isActive ? "text-white" : "text-pet-navy/70 group-hover:text-pet-orange group-hover:bg-pet-orange/10"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <SideLabel
                      className={`pl-3 pr-4 text-[15px] font-semibold transition-colors duration-300 ${
                        isActive ? "text-pet-teal-dark" : "text-pet-navy group-hover:text-pet-orange"
                      }`}
                    >
                      {item.label}
                    </SideLabel>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA Agendar: círculo laranja que vira pílula "Agendar consulta" */}
          <div className="side-item pt-4 border-t border-pet-teal/15">
            <Link
              ref={sideCtaRef}
              href="#contact"
              className={`flex items-center w-fit ${CTA_CLASS} transition-[translate,scale] duration-300 hover:-translate-y-0.5 active:scale-95`}
            >
              <span className="w-11 h-11 shrink-0 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </span>
              <SideLabel className="pr-5 text-sm">Agendar consulta</SideLabel>
            </Link>
          </div>

        </nav>
      </aside>
    </>
  );
}
