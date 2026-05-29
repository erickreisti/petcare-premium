"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const timelineItems = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Avaliação completa do seu pet",
    },
    {
      step: "02",
      title: "Plano Personalizado",
      description: "Cuidados específicos para suas necessidades",
    },
    {
      step: "03",
      title: "Execução Profissional",
      description: "Serviços realizados por especialistas",
    },
    {
      step: "04",
      title: "Acompanhamento",
      description: "Monitoramento contínuo da saúde",
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-pet-teal font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-8 h-0.5 bg-pet-teal rounded-full"></span>
                Nossa Essência
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-pet-navy mt-4 mb-6 font-ubuntu leading-tight">
                Paixão por <span className="text-pet-orange">Pets</span> desde
                2010
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Há mais de uma década dedicamos nosso trabalho ao cuidado e
              bem-estar dos animais. Nossa missão é proporcionar uma experiência
              excepcional para pets e seus tutores.
            </p>
            <div className="space-y-6">
              {timelineItems.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-pet-orange text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    {index < 3 && (
                      <div className="w-0.5 h-12 bg-gray-200 mt-2 group-hover:bg-pet-orange transition-colors duration-300"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-premium group">
                <Image src="/images/happy_dog_vet.png" alt="Cachorro feliz sendo examinado" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-pet-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="aspect-video relative rounded-3xl overflow-hidden shadow-premium group">
                <Image src="/images/clinic_modern.png" alt="Clínica Veterinária Moderna" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-pet-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            <div className="space-y-4 pt-8 lg:pt-12">
              <div className="aspect-video relative rounded-3xl overflow-hidden shadow-premium group">
                <Image src="/images/cute_cat_vet.png" alt="Gato fofo em mesa cirúrgica" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-pet-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-premium group">
                <Image src="/images/pet_grooming.png" alt="Banho e tosa de pet" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-pet-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
