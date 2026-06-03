export default function PriceCard({
  plan,
  isAnnual,
}: {
  plan: {
    name: string;
    monthlyPrice: string;
    annualPrice: string;
    period: string;
    description: string;
    popular: boolean;
    features: string[];
  };
  isAnnual: boolean;
}) {
  return (
    <div className="price-card-wrapper perspective-1000">
      <div
        className={`price-card relative rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 group h-full ${
          plan.popular 
          ? "bg-white border border-pet-orange/50 shadow-[0_20px_60px_-15px_rgba(255,159,67,0.3)] z-20 md:scale-105 hover:shadow-[0_20px_80px_-15px_rgba(255,159,67,0.4)]" 
          : "glass border border-white/80 shadow-premium z-10 hover:shadow-teal-glow hover:bg-white/60"
        }`}
      >
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-linear-to-r from-pet-orange to-amber-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-orange-glow border border-white/20">
              Mais Popular
            </span>
          </div>
        )}
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-pet-navy mb-2 font-ubuntu">
            {plan.name}
          </h3>
          <p className="text-gray-500 text-sm mb-6 h-10 flex items-center justify-center">{plan.description}</p>
          
          <div className="flex items-baseline justify-center gap-1 mb-2 h-16">
            <span className="text-2xl font-bold text-pet-navy mt-1">R$</span>
            <span className="price-number text-5xl font-bold text-pet-navy tracking-tight">
              {isAnnual ? plan.annualPrice : plan.monthlyPrice}
            </span>
            <span className="text-gray-500 font-medium">{plan.period}</span>
          </div>
          {isAnnual && (
            <div className="text-pet-orange text-sm font-medium animate-fade-in h-6">
              Faturado anualmente (R$ {Number(plan.annualPrice) * 12})
            </div>
          )}
          {!isAnnual && <div className="h-6"></div>}
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

        <ul className="space-y-5 mb-10">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-4">
              {/* Premium Icon Check */}
              <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? "bg-pet-orange/10 text-pet-orange" : "bg-pet-teal/10 text-pet-teal-dark"}`}>
                <svg
                  className="w-4 h-4"
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
              <span className="text-gray-700 font-medium text-sm leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`btn-price w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
            plan.popular 
            ? "bg-linear-to-r from-pet-orange to-amber-500 hover:from-pet-orange-hover hover:to-pet-orange text-white shadow-[0_10px_20px_-10px_rgba(255,159,67,0.8)] transform hover:-translate-y-1 active:scale-95" 
            : "bg-white hover:bg-pet-teal hover:text-white text-pet-navy shadow-sm transform hover:-translate-y-1 active:scale-95 border border-gray-100"
          }`}
        >
          Assinar {plan.name}
        </button>
      </div>
    </div>
  );
}
