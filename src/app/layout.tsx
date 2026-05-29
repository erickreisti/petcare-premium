import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Petcare Premium | Centro Veterinário de Excelência",
  description: "Cuidado veterinário completo, estética premium e hotelzinho com amor e profissionalismo. Agende sua consulta no Petcare.",
  keywords: ["clínica veterinária", "pet shop", "banho e tosa", "veterinário", "hotel pet"],
  openGraph: {
    title: "Petcare Premium | Centro Veterinário",
    description: "Cuidado veterinário completo e estética premium para o seu pet.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      // Classes do Tailwind ajustadas conforme a sugestão da extensão
      className="scroll-smooth scroll-pt-17.5 md:scroll-pt-20"
    >
      <body
        className={`${nunito.variable} ${fredoka.variable} font-work text-[#333] leading-relaxed overflow-x-hidden antialiased selection:bg-pet-orange selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
