export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-pet-navy text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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

        <div className="border-t border-white/10 pt-8">
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

        {/* WhatsApp Fixed Button */}
        <a
          href="https://wa.me/5511999999999"
          className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl z-40 transform hover:scale-110 transition-all duration-300 group"
          aria-label="Fale conosco no WhatsApp"
        >
          <span className="text-2xl">💬</span>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-ping"></div>
        </a>
      </div>
    </footer>
  );
}
