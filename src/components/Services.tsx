"use client";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      icon: "🛁",
      title: "Estética Premium",
      description:
        "Banho, tosa, hidratação e cuidados estéticos com produtos premium e técnicas profissionais.",
      features: ["Banho terapêutico", "Tosa higiênica", "Hidratação"],
      className: "md:col-span-2 lg:col-span-2 row-span-2",
      delay: 0.1,
    },
    {
      icon: "🏥",
      title: "Saúde Clínica",
      description:
        "Consultas, exames, vacinas e tratamentos avançados.",
      features: ["Consultas", "Vacinas", "Exames"],
      className: "col-span-1",
      delay: 0.2,
    },
    {
      icon: "🎾",
      title: "Resort & Creche",
      description:
        "Espaço seguro com monitoramento e muita diversão.",
      features: ["Creche", "Hotel Pet", "Recreação"],
      className: "col-span-1 md:col-span-2 lg:col-span-1",
      delay: 0.3,
    },
  ];

  return (
    <section
      id="services"
      className="py-20 px-6 bg-linear-to-b from-[#FAF7F2] to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
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
            Oferecemos uma gama completa de serviços no formato de um ecossistema 
            integrado para a saúde e felicidade do seu melhor amigo.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: service.delay }}
              className={`glass-dark relative rounded-3xl p-8 lg:p-10 flex flex-col justify-between overflow-hidden group shadow-premium hover:shadow-teal-glow transition-all duration-500 border border-pet-teal/5 ${service.className}`}
            >
              {/* Background Decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pet-teal-light/5 rounded-full blur-2xl group-hover:bg-pet-teal-light/10 transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/50 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-sm mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-pet-navy font-ubuntu mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-700 font-medium"
                    >
                      <div className="w-6 h-6 rounded-full bg-pet-orange/10 flex items-center justify-center shrink-0">
                        <svg
                          className="w-3.5 h-3.5 text-pet-orange"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-pet-teal font-bold py-3 px-6 rounded-xl hover:bg-pet-teal hover:text-white transition-colors duration-300 shadow-sm">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
