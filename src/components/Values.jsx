import { Reveal, SectionHeading } from "./ui.jsx";
import { values } from "../data/values.js";

export default function Values() {
  return (
    <section id="values" className="section relative" aria-labelledby="values-heading">
      <div className="container-x">
        <SectionHeading
          num="02" eyebrow="What we hold ourselves to"
          title={<span id="values-heading">Values you'll feel in every project</span>}
          lead="Eight working standards that shape how we brief, create, communicate and deliver."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li key={v.title}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <div className="card card-hover flex h-full flex-col gap-3 p-6">
                  <span className="font-display text-3xl uppercase accent-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-cream">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-chrome-400">{v.blurb}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
