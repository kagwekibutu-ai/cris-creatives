import { Link } from "react-router-dom";
import AboutSection from "../components/About.jsx";
import Values from "../components/Values.jsx";
import Process from "../components/Process.jsx";
import { usePageMeta } from "../components/ui.jsx";
import { site } from "../data/site.js";

export default function About() {
  usePageMeta(
    "About — Cris Creatives",
    "Cris Creatives is a creative and digital communications organisation from Murang'a, Kenya — poster design, brand identity, video, websites and social media content."
  );

  return (
    <>
      <AboutSection />
      <Values />
      <Process />
      <section className="section pt-0" aria-label="Call to action">
        <div className="container-x">
          <div className="card flex flex-col items-center gap-6 p-10 text-center sm:p-14">
            <p className="eyebrow">Enough about us</p>
            <p className="max-w-2xl font-display text-3xl uppercase leading-tight sm:text-4xl">
              Ready to make your business <span className="accent-text">impossible to ignore</span>?
            </p>
            <Link to="/contact" className="btn-accent">
              Start a project
            </Link>
            <p className="text-xs text-chrome-500">
              {site.location} · Replies within one business day
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
