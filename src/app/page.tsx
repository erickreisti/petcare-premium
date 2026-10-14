import Header from "@/components/layout/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import Services from "@/components/sections/Services/Services";
import About from "@/components/sections/About/About";
import Prices from "@/components/sections/Prices/Prices";
import Testimonials from "@/components/sections/Testimonials/Testimonials";
import Footer from "@/components/layout/Footer/Footer";
import DemoToast from "@/components/ui/DemoToast";
import DeferredEffects from "@/components/ui/DeferredEffects";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:bg-white focus:text-pet-navy focus:font-bold focus:px-4 focus:py-2 focus:rounded-full focus:shadow-premium"
      >
        Pular para o conteúdo
      </a>
      <DeferredEffects />
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <Prices />
        <Testimonials />
      </main>
      <Footer />
      <DemoToast />
    </>
  );
}
