import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CtaBand from "./components/CtaBand.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { BackToTop, CursorGlow, ScrollProgress, WhatsAppFloat } from "./components/effects.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Work from "./pages/Work.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <RouteEffects />
      <div className="relative flex min-h-screen flex-col overflow-x-clip bg-ink-950 text-cream">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-accent-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink-950"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <CursorGlow />
        <div className="noise-overlay" aria-hidden="true" />

        <Navbar />

        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <CtaBand />

        <Footer />

        <WhatsAppFloat />
        <BackToTop />
        <LoadingScreen />
      </div>
    </HashRouter>
  );
}
