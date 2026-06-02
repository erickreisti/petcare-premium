"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const [isWaterRunning, setIsWaterRunning] = useState(true);

  const currentYear = new Date().getFullYear();

  useGSAP(() => {
    // Animação da espuma respirando
    gsap.to(".foam-wave", {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.4
    });

    // Animação da água caindo (dashoffset)
    const waterAnim = gsap.to(".water-stream", {
      strokeDashoffset: -40,
      duration: 0.5,
      repeat: -1,
      ease: "none",
      paused: !isWaterRunning
    });

    // Emissor de bolhas contínuo vindo da banheira
    let bubbleInterval: NodeJS.Timeout | null = null;
    
    if (isWaterRunning) {
      waterAnim.play();
      bubbleInterval = setInterval(() => {
        const tub = document.querySelector(".bathtub-container");
        if(!tub) return;
        
        const bubble = document.createElement("div");
        bubble.className = "absolute rounded-full border border-white/60 shadow-sm backdrop-blur-sm z-0 pointer-events-none";
        bubble.style.width = `${Math.random() * 25 + 10}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.background = "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(57, 157, 157, 0.2) 100%)";
        
        tub.appendChild(bubble);
        
        // Nasce perto da água
        gsap.set(bubble, {
          x: "random(40, 60)%", // no meio da banheira
          y: "80%", // da base da espuma
          opacity: 0.8,
          scale: 0.5
        });
        
        gsap.to(bubble, {
          y: -400,
          x: "+=random(-100, 100)",
          opacity: 0,
          scale: 1.5,
          duration: "random(3, 6)",
          ease: "power1.out",
          onComplete: () => bubble.remove()
        });
      }, 400);
    } else {
      waterAnim.pause();
    }

    return () => {
      if(bubbleInterval) clearInterval(bubbleInterval);
    };
  }, [isWaterRunning]);

  type FooterLink = { name: string; href: string; icon?: string };
  const footerSections: { title: string; links: FooterLink[] }[] = [
    {
      title: "Nossos Serviços",
      links: [
        { name: "Banho & Tosa", href: "#services" },
        { name: "Consultas Veterinárias", href: "#services" },
        { name: "Vacinação", href: "#services" },
        { name: "Creche Pet", href: "#services" },
      ],
    },
    {
      title: "Sobre Nós",
      links: [
        { name: "Nossa História", href: "#about" },
        { name: "Equipe", href: "#about" },
        { name: "Instalações", href: "#about" },
        { name: "Trabalhe Conosco", href: "#about" },
      ],
    },
    {
      title: "Planos",
      links: [
        { name: "Plano Básico", href: "#prices" },
        { name: "Plano Completo", href: "#prices" },
        { name: "Plano Premium", href: "#prices" },
      ],
    },
    {
      title: "Contato",
      links: [
        { name: "Rua dos Animais, 123", href: "#", icon: "📍" },
        { name: "(11) 9999-9999", href: "tel:+551199999999", icon: "📞" },
        {
          name: "contato@petcare.com",
          href: "mailto:contato@petcare.com",
          icon: "📧",
        },
      ],
    },
  ];

  const socialLinks = [
    { name: "Instagram", icon: "📸", href: "https://instagram.com/petcare" },
    { name: "Facebook", icon: "👥", href: "https://facebook.com/petcare" },
    { name: "WhatsApp", icon: "💬", href: "https://wa.me/5511999999999" },
  ];

  return (
    <footer ref={container} className="bg-pet-navy text-white relative overflow-hidden">
      
      {/* Cena da Banheira (Topo do Footer) */}
      <div className="bathtub-container relative w-full h-48 md:h-64 bg-pet-bg flex items-end justify-center overflow-visible z-20">
        
        {/* Torneira */}
        <div 
          className="absolute bottom-20 left-1/2 transform -translate-x-32 md:-translate-x-40 cursor-pointer group z-30"
          onClick={() => setIsWaterRunning(!isWaterRunning)}
          title="Clique para ligar/desligar a água"
        >
          {/* Tubo da torneira */}
          <div className="w-8 h-16 border-t-8 border-l-8 border-gray-400 rounded-tl-xl relative">
             {/* Água caindo */}
             <svg className="absolute top-16 left-4 w-6 h-32 md:h-48 overflow-visible" viewBox="0 0 20 100" preserveAspectRatio="none">
               <line 
                 x1="10" y1="0" x2="10" y2="100" 
                 stroke="#399d9d" strokeWidth="8" strokeLinecap="round"
                 className={`water-stream ${isWaterRunning ? 'opacity-80' : 'opacity-0'} transition-opacity duration-300`}
                 strokeDasharray="10 10"
               />
             </svg>
             {/* Registro */}
             <div className={`absolute -top-4 -left-4 w-6 h-6 bg-pet-orange rounded-full shadow-md transform transition-transform duration-300 ${isWaterRunning ? 'rotate-0' : 'rotate-90'}`}></div>
          </div>
          <div className="absolute -top-10 left-0 bg-white text-pet-navy text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {isWaterRunning ? "Desligar Água" : "Ligar Água"}
          </div>
        </div>

        {/* Banheira SVG */}
        <div className="relative w-72 md:w-96 h-32 md:h-40 z-20">
          <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-2xl">
            {/* Pés da banheira */}
            <path d="M 30 80 Q 20 100 10 95" stroke="#d1d5db" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 170 80 Q 180 100 190 95" stroke="#d1d5db" strokeWidth="6" fill="none" strokeLinecap="round"/>
            {/* Corpo da banheira */}
            <path d="M 10 20 L 190 20 Q 200 80 170 85 L 30 85 Q 0 80 10 20 Z" fill="#ffffff" />
            <path d="M 15 25 L 185 25 Q 190 75 165 80 L 35 80 Q 10 75 15 25 Z" fill="#F4FAFA" />
            <rect x="5" y="15" width="190" height="8" rx="4" fill="#e5e7eb" />
          </svg>
          
          {/* Easter Egg Cachorrinho */}
          <div className="absolute top-0 right-10 w-16 h-16 transform translate-y-4 z-10 animate-bounce" style={{ animationDuration: '3s' }}>
             <div className="w-full h-full bg-white rounded-full relative shadow-sm border-2 border-gray-100">
                {/* Orelhas */}
                <div className="absolute -top-2 -left-2 w-6 h-8 bg-pet-orange rounded-full transform -rotate-12"></div>
                <div className="absolute -top-2 -right-2 w-6 h-8 bg-pet-orange rounded-full transform rotate-12"></div>
                {/* Olhos e focinho */}
                <div className="absolute top-6 left-3 w-2 h-2 bg-pet-navy rounded-full"></div>
                <div className="absolute top-6 right-3 w-2 h-2 bg-pet-navy rounded-full"></div>
                <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gray-800 rounded-full"></div>
             </div>
          </div>
        </div>

        {/* Espuma SVG na frente */}
        <div className="absolute bottom-16 md:bottom-24 left-1/2 transform -translate-x-1/2 w-80 md:w-110 h-20 z-30 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 300 80" className="w-full h-full opacity-90 fill-white drop-shadow-md">
            <circle cx="50" cy="50" r="30" className="foam-wave" />
            <circle cx="90" cy="30" r="35" className="foam-wave" />
            <circle cx="140" cy="50" r="40" className="foam-wave" />
            <circle cx="190" cy="35" r="38" className="foam-wave" />
            <circle cx="240" cy="55" r="28" className="foam-wave" />
          </svg>
        </div>
      </div>

      {/* Onda de Transição para o Footer Escuro */}
      <svg className="w-full h-12 md:h-16 text-pet-navy fill-current bg-pet-bg transform rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C54.71,76.51,126.11,54.52,192.31,50.15,236.4,47.25,280.4,50.31,321.39,56.44Z"></path>
      </svg>

      {/* Conteúdo do Footer */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-pet-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐾</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-ubuntu">Petcare</h3>
                <p className="text-gray-400 text-sm">
                  Centro Veterinário Integral
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Cuidamos do seu pet com amor e profissionalismo há mais de 10
              anos. Oferecemos serviços veterinários completos, estética animal
              e hospedagem.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 glass-dark hover:bg-pet-orange rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-orange-glow"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-bold mb-6 text-white relative">
                {section.title}
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-pet-orange rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-pet-orange transition-colors duration-300 flex items-center gap-2 group"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass-dark rounded-2xl p-8 mb-12 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-2">📬 Fique por Dentro</h4>
              <p className="text-gray-300">
                Receba dicas de cuidado pet, promoções exclusivas e novidades.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-pet-orange focus:ring-1 focus:ring-pet-orange transition-all duration-300"
              />
              <button className="bg-pet-orange hover:bg-pet-orange-hover text-white font-bold py-3 px-6 rounded-xl shadow-orange-glow transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                Assinar Newsletter
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              &copy; {currentYear} Petcare Centro Veterinário. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-pet-orange transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-pet-orange transition-colors">
                Termos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
