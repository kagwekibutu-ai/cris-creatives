import { Clapperboard, Fingerprint, Globe, Image, Megaphone, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./ui.jsx";
import { services } from "../data/services.js";

const icons = {
  Image,
  Fingerprint,
  Clapperboard,
  Globe,
  Megaphone,
};

export default function Services() {
  return (
    <section id="services" className="section relative" aria-labelledby="services-heading">
      <div className="container-x relative">
        <SectionHeading
          num="01" eyebrow="What we do"
          title={<span id="services-heading">One partner. Every creative touchpoint.</span>}
          lead="Integrated creative support — design, identity, video, websites and social media content that work as one system."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <article
                  className={`card card-hover group relative flex h-full flex-col gap-4 p-7 ${
                    s.flagship ? "border-accent-400/50" : ""
                  }`}
                >
                  {s.flagship && (
                    <span className="absolute -top-3 right-6 flex items-center gap-1.5 rounded-full bg-pop px-3 py-1 text-[10px] font-bold tracking-wider text-ink-950 uppercase">
                      <Star size={11} aria-hidden="true" />
                      Our flagship
                    </span>
                  )}
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-accent-400/30 bg-accent-400/10 text-accent-300 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-cream">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-chrome-400">{s.blurb}</p>
                  <ul className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs font-medium text-chrome-300">
                        <span className="h-1.5 w-1.5 rotate-45 bg-accent-400" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
