/**
 * src/App.jsx
 * Page layout: skip link, header, main sections in order, footer.
 * Single page with anchor navigation, so no router is needed.
 */
import BmiCalculator from './components/BmiCalculator';
import Classes from './components/Classes';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Navbar from './components/Navbar';
import Plans from './components/Plans';
import Testimonials from './components/Testimonials';
import Trainers from './components/Trainers';
import TrialForm from './components/TrialForm';
import WhyUs from './components/WhyUs';

export default function App() {
  return (
    <>
      {/* First focusable element: lets keyboard users jump past the navigation. */}
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-3 z-[100] bg-volt px-4 py-3 font-semibold text-ink-950"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <WhyUs />
        <Classes />
        <Trainers />
        <Plans />
        <BmiCalculator />
        <Testimonials />
        <TrialForm />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
