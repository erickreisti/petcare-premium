export default function Services() {
  const services = [
    {
      icon: "🛁",
      title: "Estética & Bem-estar",
      description:
        "Banho, tosa, hidratação e cuidados estéticos com produtos premium e técnicas profissionais.",
      features: [
        "Banho terapêutico",
        "Tosa higiênica",
        "Hidratação",
        "Corte de unhas",
      ],
      reverse: false,
    },
    {
      icon: "🏥",
      title: "Saúde Veterinária",
      description:
        "Consultas, exames, vacinas e tratamentos com equipamentos modernos e veterinários especializados.",
      features: [
        "Consultas gerais",
        "Exames laboratoriais",
        "Vacinação",
        "Cirurgias",
      ],
      reverse: true,
    },
    {
      icon: "🎾",
      title: "Hospedagem & Lazer",
      description:
        "Creche e hotel com ambiente seguro, monitoramento 24h e atividades recreativas.",
      features: [
        "Creche diária",
        "Hotel pet",
        "Área de recreação",
        "Monitoramento",
      ],
      reverse: false,
    },
  ];

  return (
    <section
      id="services"
      className="py-20 px-6 bg-linear-to-b from-[#FAF7F2] to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-pet-teal/10 shadow-sm">
            <span className="w-2 h-2 bg-pet-teal rounded-full animate-pulse"></span>
            <span className="text-pet-teal font-semibold text-sm uppercase tracking-wider">
              Nossos Serviços
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pet-navy mb-6 font-ubuntu">
            Cuidado <span className="text-pet-orange">Completo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma gama completa de serviços para todas as necessidades
            do seu pet, com profissionais especializados e equipamentos de
            última geração.
          </p>
        </div>
        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${service.reverse ? "lg:grid-flow-dense" : ""}`}
            >
              <div
                className={`relative ${service.reverse ? "lg:col-start-2" : ""}`}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-premium hover:shadow-teal-glow transition-shadow duration-500 group cursor-default">
                  <div className="aspect-video bg-linear-to-br from-pet-teal to-pet-teal-light flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    <span className="text-6xl transform group-hover:scale-125 transition-transform duration-700 relative z-10">
                      {service.icon}
                    </span>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 glass rounded-2xl shadow-lg p-4 border border-white/50 animate-float">
                  <span className="text-3xl">{service.icon}</span>
                </div>
              </div>
              <div
                className={`space-y-6 ${service.reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-pet-navy font-ubuntu">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-pet-orange shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="group inline-flex items-center gap-2 text-pet-teal font-bold hover:text-pet-orange transition-colors duration-300">
                  Saiba mais
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
