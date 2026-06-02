import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Prices from "../components/Prices";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Bubbles from "../components/Bubbles";

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
