export default function ServiceCard({
  service,
  index,
}: {
  service: {
    icon: string;
    image: string;
    title: string;
    description: string;
    features: string[];
  };
  index: number;
}) {
  return (
    <div
      className={`service-card relative flex flex-col ${
        index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-8 lg:gap-4 group`}
    >
      {/* Glassmorphism Text Container */}
      <div className="w-full lg:w-[60%] relative z-10 glass p-8 md:p-12 lg:p-16 rounded-4xl shadow-premium border border-white/80 hover:shadow-teal-glow transition-all duration-500 flex flex-col justify-center overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pet-teal/5 rounded-full blur-3xl group-hover:bg-pet-teal/20 transition-colors duration-500 z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-pet-teal to-pet-teal/30 font-ubuntu drop-shadow-sm">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-0.75 w-16 bg-linear-to-r from-pet-orange to-transparent rounded-full opacity-80"></div>
          </div>
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pet-navy font-ubuntu mb-6 tracking-tight">
            {service.title}
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
            {service.description}
          </p>
          
          <ul className="space-y-4 mb-10">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-4 text-gray-700 font-medium text-lg"
              >
                <div className="w-8 h-8 rounded-full bg-pet-orange/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-pet-orange"
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

          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pet-navy text-white font-bold py-4 px-8 rounded-xl hover:bg-pet-teal transition-colors duration-300 shadow-sm pointer-events-auto text-lg">
            Agendar Agora
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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

      {/* Imagem Flutuante 3D */}
      <div 
        className={`w-full lg:w-[45%] aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-112.5 relative z-20 flex items-center justify-center pointer-events-none ${
          index % 2 === 1 ? "lg:-mr-12 xl:-mr-16" : "lg:-ml-12 xl:-ml-16"
        }`}
      >
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-[90%] md:w-full h-full max-w-125 object-cover rounded-[2.5rem] drop-shadow-[0_20px_30px_rgba(10,54,65,0.2)] group-hover:scale-[1.03] group-hover:-translate-y-4 transition-transform duration-700 ease-out border-4 border-white/40" 
        />
      </div>
    </div>
  );
}
