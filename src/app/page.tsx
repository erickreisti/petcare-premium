import Header from "../components/Header";
import Home from "../components/Home";
import Services from "../components/Services";
import About from "../components/About";
import Prices from "../components/Prices";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <main>
      <Header />
      <Home />
      <Services />
      <About />
      <Prices />
      <Footer />
    </main>
  );
}
