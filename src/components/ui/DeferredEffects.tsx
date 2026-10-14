"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Efeitos decorativos ficam fora do bundle inicial: só baixam depois que a
// primeira tela já foi pintada, para não atrasar o LCP no celular.
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const ScrollProgress = dynamic(() => import("./ScrollProgress"), { ssr: false });
const Bubbles = dynamic(() => import("./Bubbles/Bubbles"), { ssr: false });

// Animações CSS infinitas (bolha do Hero, ondas, manchas, rodapé) continuam repintando mesmo
// fora da tela. Marcamos as seções que saíram da vista e o globals.css pausa o que há nelas.
function pauseOffscreenAnimations() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.toggleAttribute("data-offscreen", !e.isIntersecting)),
    { rootMargin: "200px 0px" },
  );
  document.querySelectorAll("main section, footer").forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

export default function DeferredEffects() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return pauseOffscreenAnimations();
  }, [ready]);

  useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(start, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1);
    return () => clearTimeout(id);
  }, []);

  if (!ready) return null;

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Bubbles />
    </>
  );
}
