import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BUBBLE_BG =
  "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(57, 157, 157, 0.2) 60%, rgba(255, 255, 255, 0.3) 100%)";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Assinatura de movimento do site: o elemento "infla" como uma bolha de sabão,
 * revelado por um círculo que cresce a partir da base.
 */
export function bubbleReveal(
  targets: gsap.TweenTarget,
  trigger: Element | null,
  vars: gsap.TweenVars = {},
) {
  return gsap.fromTo(
    targets,
    { clipPath: "circle(0% at 50% 100%)", y: 24 },
    {
      clipPath: "circle(150% at 50% 100%)",
      y: 0,
      duration: 1.1,
      stagger: 0.15,
      ease: "power3.out",
      clearProps: "clipPath",
      scrollTrigger: { trigger, start: "top 80%" },
      ...vars,
    },
  );
}

/** Solta bolhas que sobem a partir da base do elemento (que precisa de position relative + overflow hidden) */
export function riseBubbles(parent: HTMLElement, count = 4) {
  if (prefersReducedMotion()) return;
  const height = parent.offsetHeight;

  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("div");
    const size = gsap.utils.random(10, 30);
    bubble.className = "absolute rounded-full border border-white/60 pointer-events-none z-0 shadow-sm";
    Object.assign(bubble.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${gsap.utils.random(10, 90)}%`,
      bottom: "0",
      background: BUBBLE_BG,
    });
    parent.appendChild(bubble);

    gsap.fromTo(
      bubble,
      { y: size, opacity: 0.9, scale: 0.5 },
      {
        y: -height * gsap.utils.random(0.5, 1),
        x: gsap.utils.random(-25, 25),
        opacity: 0,
        scale: 1.2,
        duration: gsap.utils.random(1, 2),
        delay: i * 0.05,
        ease: "power1.out",
        onComplete: () => bubble.remove(),
      },
    );
  }
}

/** Gotinhas que espirram de um ponto (coordenadas relativas ao parent) quando uma bolha estoura */
export function splashDroplets(parent: HTMLElement, x: number, y: number, count = 8) {
  if (prefersReducedMotion()) return;

  for (let i = 0; i < count; i++) {
    const drop = document.createElement("div");
    const size = gsap.utils.random(4, 9);
    const angle = (i / count) * Math.PI * 2 + gsap.utils.random(-0.3, 0.3);
    const distance = gsap.utils.random(30, 60);
    drop.className = "absolute top-0 left-0 rounded-full pointer-events-none bg-white/90 border border-pet-teal/30";
    Object.assign(drop.style, { width: `${size}px`, height: `${size}px` });
    parent.appendChild(drop);

    gsap.fromTo(
      drop,
      { x: x - size / 2, y: y - size / 2, scale: 1, opacity: 1 },
      {
        x: x - size / 2 + Math.cos(angle) * distance,
        y: y - size / 2 + Math.sin(angle) * distance + 10,
        scale: 0.3,
        opacity: 0,
        duration: gsap.utils.random(0.45, 0.75),
        ease: "power2.out",
        onComplete: () => drop.remove(),
      },
    );
  }
}

const CONFETTI_COLORS = [
  "rgba(255,255,255,0.9)",
  "radial-gradient(circle at 30% 30%, rgba(180, 240, 240, 0.9) 0%, rgba(57, 157, 157, 0.6) 100%)",
  "radial-gradient(circle at 30% 30%, rgba(255, 200, 150, 0.9) 0%, rgba(255, 159, 67, 0.6) 100%)",
];

/** Confete de bolhas que explode do centro de um botão */
export function bubbleConfetti(btn: HTMLElement) {
  if (prefersReducedMotion()) return;
  const rect = btn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement("div");
    const size = gsap.utils.random(8, 28);
    bubble.className = "fixed top-0 left-0 rounded-full pointer-events-none z-50 shadow-glass border border-white/60";
    Object.assign(bubble.style, {
      width: `${size}px`,
      height: `${size}px`,
      background: CONFETTI_COLORS[Math.min(2, Math.floor(Math.random() / 0.3))],
    });
    document.body.appendChild(bubble);

    gsap.fromTo(
      bubble,
      { x, y, scale: 0 },
      {
        x: x + gsap.utils.random(-200, 200),
        y: y - gsap.utils.random(50, 350),
        opacity: 0,
        scale: gsap.utils.random(0.5, 2),
        rotation: gsap.utils.random(0, 360),
        duration: gsap.utils.random(0.8, 2.3),
        ease: "power3.out",
        onComplete: () => bubble.remove(),
      },
    );
  }
}

/**
 * Botão "magnético": puxa o elemento levemente na direção do cursor quando ele chega perto.
 * Só liga com mouse (ponteiro fino) e sem reduced-motion. Retorna a limpeza dos listeners.
 */
export function magnetic(el: HTMLElement, strength = 0.35, radius = 80, max = Infinity) {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover || prefersReducedMotion()) return () => {};

  const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
  const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
  let frame = 0;
  let mouseX = 0;
  let mouseY = 0;

  const update = () => {
    frame = 0;
    // Mede sem o deslocamento atual, para o centro não "fugir" junto com o botão
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2 - (gsap.getProperty(el, "x") as number);
    const cy = rect.top + rect.height / 2 - (gsap.getProperty(el, "y") as number);
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const near =
      Math.abs(dx) < rect.width / 2 + radius && Math.abs(dy) < rect.height / 2 + radius;

    if (near) {
      // `max` limita o deslocamento: em botões largos, dx * strength sairia grande demais
      moveX(gsap.utils.clamp(-max, max, dx * strength));
      moveY(gsap.utils.clamp(-max, max, dy * strength));
    } else {
      moveX(0);
      moveY(0);
    }
  };

  const handleMove = (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener("pointermove", handleMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", handleMove);
    cancelAnimationFrame(frame);
    gsap.set(el, { x: 0, y: 0 });
  };
}
