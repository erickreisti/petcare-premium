const STAR = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

export default function TestimonialCard({ testimonial }: { testimonial: { name: string; role: string; content: string } }) {
  const initials = testimonial.name.split(" ").map((word) => word[0]).join("");

  return (
    <div className="h-full">
      {/* Sem backdrop-blur: o fundo atrás é liso e são 18 cards se movendo, o desfoque travava o carrossel */}
      <div className="h-full relative bg-white/70 p-8 md:p-10 rounded-[2.5rem] border border-white/80 shadow-premium hover:shadow-[0_20px_50px_rgba(255,159,67,0.15)] transition-[translate,box-shadow] duration-500 hover:-translate-y-2 group overflow-hidden">
        {/* Aspas d'água */}
        <div className="absolute -top-6 -right-2 text-[10rem] font-serif leading-none text-pet-teal/5 rotate-12 group-hover:text-pet-orange/5 transition-colors duration-500 select-none pointer-events-none" aria-hidden="true">
          &ldquo;
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex gap-1 mb-6" role="img" aria-label="Nota 5 de 5">
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} aria-hidden="true" className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d={STAR} />
              </svg>
            ))}
          </div>

          <p className="text-gray-700 mb-8 grow italic font-medium leading-relaxed text-lg">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          <div className="flex items-center gap-4 mt-auto pt-6 border-t border-pet-teal/10">
            <div aria-hidden="true" className="w-14 h-14 rounded-full bg-linear-to-br from-pet-teal to-pet-teal-dark flex items-center justify-center text-white font-bold text-xl shadow-md border-2 border-white">
              {initials}
            </div>
            <div>
              <p className="font-bold text-pet-navy leading-tight text-lg">{testimonial.name}</p>
              <p className="text-xs text-pet-orange-text font-bold uppercase tracking-wider mt-1">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
