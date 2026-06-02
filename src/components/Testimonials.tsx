"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
  {
    name: "Mariana Silva",
    role: "Tutora do Max (Golden)",
    content: "O melhor centro veterinário que já conheci! O carinho que a equipe tem com os animais é emocionante. O Max adora o dia de creche e volta super feliz.",
    rating: 5,
    initials: "MS"
  },
  {
    name: "Juliana Castro",
    role: "Tutora do Simba (Maine Coon)",
    content: "Ambiente impecável! O cuidado que tiveram durante as consultas preventivas me deixou muito tranquila. Serviço realmente nível 5 estrelas.",
    rating: 5,
    initials: "JC"
  },
  {
    name: "Carlos Mendes",
    role: "Tutor da Luna (Persa)",
    content: "A estrutura é fantástica e os profissionais são muito bem preparados. A Luna fez uma cirurgia complexa aqui e a recuperação foi maravilhosa.",
    rating: 5,
    initials: "CM"
  },
  {
    name: "Ricardo Gomes",
    role: "Tutor da Belinha (Poodle)",
    content: "Fiquei impressionado com o resort! A Belinha é ansiosa, mas volta super calma e relaxada depois de um fim de semana hospedada com a equipe.",
    rating: 5,
    initials: "RG"
  },
  {
    name: "Ana Costa",
    role: "Tutora do Thor (Buldogue)",
    content: "Assinamos o Plano Premium e foi a melhor decisão. Banho, tosa e consultas sempre em dia. Recomendo de olhos fechados!",
    rating: 5,
    initials: "AC"
  },
  {
    name: "Fernando Lima",
    role: "Tutor do Bidu (SRD)",
    content: "Adotei o Bidu recentemente e a equipe me deu todo o suporte nutricional e comportamental que eu precisava. Equipe nota 10!",
    rating: 5,
    initials: "FL"
  }
];

export default function Testimonials() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax/Stagger effect on the cards
    gsap.from(".testimonial-wrapper", {
      y: 80,
      opacity: 0,
      rotationX: 10,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    gsap.from(".testimonials-title", {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      }
    });
  }, { scope: container });

  // Function to render a single card
  const renderCard = (testimonial: typeof testimonials[0]) => (
    <div key={testimonial.name} className="testimonial-wrapper perspective-1000">
      <div className="testimonial-card relative glass bg-white/40 p-8 md:p-10 rounded-[2.5rem] border border-white/80 shadow-premium hover:shadow-[0_20px_50px_rgba(255,159,67,0.15)] transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
        
        {/* Watermark Quote */}
        <div className="absolute -top-6 -right-2 text-[10rem] font-serif leading-none text-pet-teal/5 rotate-12 group-hover:text-pet-orange/5 transition-colors duration-500 select-none pointer-events-none">
          "
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          <p className="text-gray-700 mb-8 grow italic font-medium leading-relaxed text-lg">
            "{testimonial.content}"
          </p>

          <div className="flex items-center gap-4 mt-auto pt-6 border-t border-pet-teal/10">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-pet-teal to-pet-teal-dark flex items-center justify-center text-white font-bold text-xl shadow-md border-2 border-white">
              {testimonial.initials}
            </div>
            <div>
              <h4 className="font-bold text-pet-navy leading-tight text-lg">{testimonial.name}</h4>
              <p className="text-xs text-pet-orange font-bold uppercase tracking-wider mt-1">{testimonial.role}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <section ref={container} id="testimonials" className="relative z-10 py-24 pb-40 md:pb-52 bg-pet-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Premium */}
        <div className="text-center mb-20 testimonials-title relative z-10">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-pet-teal/10 blur-[100px] rounded-[100%] pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl font-bold font-ubuntu text-pet-navy mb-6 leading-tight relative z-10">
            O que dizem sobre <span className="text-transparent bg-clip-text bg-linear-to-r from-pet-teal to-pet-teal-dark drop-shadow-sm">nós</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10">
            A satisfação dos nossos clientes de quatro patas (e dos seus tutores) é a nossa maior <span className="text-pet-orange font-medium">recompensa</span>.
          </p>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Column 1 - Starts normally */}
          <div className="space-y-6 md:space-y-8 md:mt-12">
            {testimonials.slice(0, 2).map(renderCard)}
          </div>
          
          {/* Column 2 - Shifted upwards (or downwards relative to cols 1 and 3) */}
          <div className="space-y-6 md:space-y-8">
            {testimonials.slice(2, 4).map(renderCard)}
          </div>
          
          {/* Column 3 - Starts normally */}
          <div className="space-y-6 md:space-y-8 md:mt-12">
            {testimonials.slice(4, 6).map(renderCard)}
          </div>
        </div>

      </div>
    </section>
  );
}
