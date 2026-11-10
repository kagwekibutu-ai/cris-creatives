import {
  Building2,
  CalendarDays,
  GraduationCap,
  HardHat,
  HeartHandshake,
  Sofa,
  Sparkles,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui.jsx";
import { industries } from "../data/industries.js";

const icons = {
  HardHat,
  Sofa,
  Sparkles,
  UtensilsCrossed,
  Building2,
  CalendarDays,
  GraduationCap,
  Wifi,
  HeartHandshake,
};

export default function Industries() {
  return (
    <section id="industries" className="section" aria-labelledby="industries-heading">
      <div className="container-x">
        <SectionHeading
          num="02" eyebrow="Who we serve"
          title={<span id="industries-heading">Creative work that speaks your industry's language</span>}
          lead="We adapt messaging, imagery and formats to your sector and audience — from hardware suppliers to hospitality houses."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((b, i) => {
            const Icon = icons[b.icon];
            return (
              <li key={b.title}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <div className="card card-hover flex h-full flex-col gap-3 p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-accent-400/25 bg-accent-400/10 text-accent-300">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-bold text-cream">{b.title}</h3>
                    <p className="text-sm leading-relaxed text-chrome-400">{b.blurb}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
