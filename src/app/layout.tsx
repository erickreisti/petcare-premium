import type { Metadata } from "next";
import { Nunito, Lilita_One } from "next/font/google";
import { SITE_URL } from "@/lib/basePath";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Petcare Premium | Centro Veterinário de Excelência",
  description: "Cuidado veterinário completo, estética premium e hotelzinho com amor e profissionalismo. Agende sua consulta no Petcare.",
  keywords: ["clínica veterinária", "pet shop", "banho e tosa", "veterinário", "hotel pet"],
  openGraph: {
    title: "Petcare Premium | Centro Veterinário",
    description: "Cuidado veterinário completo e estética premium para o seu pet.",
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/images/service_bath.webp`, width: 1000, height: 1000 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth scroll-pt-17.5 md:scroll-pt-20">
      <body
        className={`${nunito.variable} ${lilita.variable} font-work text-[#333] leading-relaxed overflow-x-hidden antialiased selection:bg-pet-orange selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
