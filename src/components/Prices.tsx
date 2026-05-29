"use client";
import { motion } from "framer-motion";

export default function Prices() {
  const plans = [
    {
      name: "Básico",
      price: "R$ 89",
      period: "/mês",
      description: "Para cuidados essenciais",
      features: [
        "Banho e tosa",
        "Consulta básica",
        "Vacina anual",
        "Suporte por email",
      ],
      popular: false,
    },
    {
      name: "Completo",
      price: "R$ 149",
      period: "/mês",
      description: "Mais popular - Cuidado integral",
      features: [
        "Todos os serviços básicos",
        "Consultas ilimitadas",
        "Creche 2x na semana",
        "Emergências 24h",
        "Desconto em produtos",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "R$ 229",
      period: "/mês",
      description: "Cuidado máximo para seu pet",
      features: [
        "Todos os serviços completos",
        "Hotel pet 5 dias/mês",
        "Transporte",
        "Nutricionista",
        "Treinador personalizado",
      ],
      popular: false,
    },
  ];

  return (
    <section id="prices" className="py-20 px-6 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-pet-teal font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-pet-teal rounded-full"></span>
            Nossos Valores
            <span className="w-8 h-0.5 bg-pet-teal rounded-full"></span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-pet-navy mb-6 font-ubuntu">
            Planos & <span className="text-pet-orange">Preços</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para as necessidades do seu pet. Todos incluem
            cuidados básicos essenciais.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 ${plan.popular ? "bg-white border-2 border-pet-orange shadow-orange-glow scale-105" : "glass border border-white shadow-premium"} transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-glow z-10 group`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pet-orange text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Mais Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-pet-navy mb-2 font-ubuntu">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-4xl font-bold text-pet-navy group-hover:scale-110 transition-transform duration-300">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
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
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${plan.popular ? "bg-pet-orange hover:bg-pet-orange-hover text-white shadow-lg hover:shadow-orange-glow" : "glass hover:bg-pet-teal hover:text-white hover:border-pet-teal text-pet-navy border border-gray-200 shadow-sm"}`}
              >
                Escolher Plano
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
