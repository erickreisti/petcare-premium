import Header from "../components/layout/Header/Header";
import Hero from "../components/sections/Hero/Hero";
import Services from "../components/sections/Services/Services";
import About from "../components/sections/About/About";
import Prices from "../components/sections/Prices/Prices";
import Testimonials from "../components/sections/Testimonials/Testimonials";
import Footer from "../components/layout/Footer/Footer";
import Bubbles from "../components/ui/Bubbles/Bubbles";

export default function Page() {
  return (
    <main>
      <Bubbles />
      <Header />
      <Hero />
      <Services />
      <About />
      <Prices />
      <Testimonials />
      <Footer />
    </main>
  );
}
