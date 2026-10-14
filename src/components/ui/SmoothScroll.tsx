"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Rolagem suave (Lenis) sincronizada com o GSAP: o parallax deixa de dar trancos
 * e os links "#secao" deslizam até o destino. Desligada com prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Links internos: o Lenis faz a rolagem (respeitando scroll-padding/scroll-margin).
    // preventDefault na captura faz o next/link pular a própria navegação, mas o onClick
    // do componente (ex.: fechar o menu mobile) continua rodando.
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      // O link "pular para o conteúdo" mantém o comportamento nativo (move o foco)
      if (!hash || hash === "#" || hash === "#main") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.4 });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
