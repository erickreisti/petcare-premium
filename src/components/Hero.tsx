"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen w-full relative flex items-center justify-center bg-linear-to-b from-[#FAF7F2] to-white"
    >
      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 w-full mt-12 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block glass text-pet-teal px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm border border-pet-teal/10">
                🐾 Centro Veterinário de Excelência
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-pet-navy font-ubuntu">
                Cuidado que
                <span className="text-pet-orange relative inline-block mx-3">
                  Transforma
                  <svg
                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full text-pet-orange/30"
                    viewBox="0 0 200 12"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,6 Q100,0 200,6"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Vidas
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Oferecemos cuidados veterinários completos, estética animal
              premium e hospedagem com o carinho que seu companheiro merece.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="group relative bg-pet-orange hover:bg-pet-orange-hover text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-orange-glow transition-all duration-300 overflow-hidden transform hover:-translate-y-1 active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Agendar Consulta
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              {/* Trocado <button> por <Link> do Next.js para navegação suave na âncora */}
              <Link
                href="#services"
                className="group flex items-center justify-center gap-2 glass hover:bg-white border-2 border-transparent hover:border-pet-teal/20 text-pet-navy hover:text-pet-teal font-bold text-lg px-8 py-4 rounded-2xl shadow-premium transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                Ver Nossos Serviços
              </Link>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6 pt-8 md:pt-10 border-t border-gray-200/60">
              {[
                { number: "2K+", label: "Pets Felizes" },
                { number: "98%", label: "Satisfação" },
                { number: "24/7", label: "Atendimento" },
              ].map((stat, index) => (
                <div key={index} className="text-left md:text-center">
                  <div className="text-2xl md:text-3xl font-bold text-pet-orange font-ubuntu">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Imagem do Pet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative mt-10 lg:mt-0 flex justify-center"
          >
            <div className="relative z-10 w-full max-w-lg aspect-square">
              {/* O nome da imagem será atualizado assim que a IA gerar */}
              <div className="w-full h-full rounded-full bg-white shadow-premium overflow-hidden border-8 border-white">
                <Image
                  src="/images/premium_dog_hero.png"
                  alt="Cachorro Feliz de alta qualidade"
                  fill
                  priority
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Elemento flutuante simplificado */}
            <div className="absolute z-20 bottom-10 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-float">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pet-teal/10 rounded-full flex items-center justify-center text-pet-teal font-bold text-xl">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-gray-800">Alta Qualidade</div>
                  <div className="text-sm text-gray-500">Cuidado Premium</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
