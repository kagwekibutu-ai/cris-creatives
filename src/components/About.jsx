import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeading, CountUp } from "./ui.jsx";
import { metrics } from "../data/about.js";
import { site } from "../data/site.js";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            num="01" eyebrow="About the studio"
            title={
              <span id="about-heading">
                Make your ideas <em className="accent-text">easier to recognise, understand and trust</em>
              </span>
            }
          />
          <Reveal delay={0.1}>
            <p className="text-chrome-300">
              {site.name} is a creative and digital communications organisation
              from Murang'a, Kenya. We help businesses, entrepreneurs and
              institutions present themselves professionally, communicate
              clearly and strengthen their visibility — through design, brand
              identity, video, websites and social media content.
            </p>
            <p className="mt-4 text-chrome-300">
              Our flagship strength is poster design and promotional visual
              communication, backed by an integrated team mindset: understand
              the business objective first, then choose the creative treatment.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/contact" className="btn-ghost self-start">
              Work with us
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <dl className="grid grid-cols-2 gap-4 sm:gap-5">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="card card-hover flex h-full flex-col gap-2 p-6 sm:p-8">
                <dd className="font-display text-5xl uppercase sm:text-6xl">
                  <span className="accent-text">
                    <CountUp to={m.value} suffix={m.suffix} pad={m.pad} />
                  </span>
                </dd>
                <dt className="order-first text-xs font-semibold tracking-[0.18em] text-chrome-400 uppercase">
                  {m.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
