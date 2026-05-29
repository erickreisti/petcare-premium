import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-linear-to-br from-[#FAF7F2] via-white to-[#FFF5E6]"
    >
      {/* Bolhas Decorativas Animadas (aria-hidden remove do leitor de tela) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-pet-orange/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/3 -right-16 w-48 md:w-64 h-48 md:h-64 bg-yellow-400/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-20 right-1/4 w-16 md:w-32 h-16 md:h-32 bg-pet-orange-hover/5 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-16 md:w-24 h-16 md:h-24 bg-orange-300/10 rounded-full blur-lg animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 w-full mt-12 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texto */}
          <div className="space-y-8 animate-fade-in-up">
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
          </div>

          {/* Imagem do Pet e Decorações */}
          <div className="relative mt-10 lg:mt-0">
            <div className="relative z-10 flex justify-center">
              <Image
                src="/images/dog.png"
                alt="Cachorro Feliz deitado de barriga para cima - Mascote Petcare"
                width={700}
                height={700}
                priority
                className="w-full max-w-125 lg:max-w-2xl transform hover:scale-105 transition-transform duration-700 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Elementos Decorativos (aria-hidden) */}
            <div aria-hidden="true">
              <div className="absolute top-10 -left-6 md:-top-6 md:-left-6 w-20 md:w-24 h-20 md:h-24 bg-pet-orange/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 right-0 md:-right-8 w-28 md:w-32 h-28 md:h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-64 md:h-80 bg-pet-orange/10 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Card flutuante */}
            <div className="absolute z-20 -bottom-6 right-4 md:bottom-10 md:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-100 animate-float">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl" aria-hidden="true">
                    ★
                  </span>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm md:text-base">
                    Excelente
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 font-medium">
                    4.9/5 - 500+ avaliações
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        <Link href="#services" aria-label="Rolar para a seção de serviços">
          <div className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Descubra
            </span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-2.5 bg-pet-orange rounded-full animate-bounce"></div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
