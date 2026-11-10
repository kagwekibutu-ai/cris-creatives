import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { Reveal, SectionHeading } from "./ui.jsx";
import { processSteps } from "../data/process.js";

export default function Process() {
  const timelineRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="process" className="section" aria-labelledby="process-heading">
      <div className="container-x">
        <SectionHeading
          num="03" eyebrow="How we work"
          title={<span id="process-heading">A process with zero guesswork</span>}
          lead="Five stages, clear milestones and a dated timeline from kickoff to launch."
        />

        <div ref={timelineRef} className="relative mx-auto mt-16 max-w-3xl">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[27px] w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[27px] w-px origin-top bg-accent-400 sm:left-1/2 sm:-translate-x-1/2"
            style={{ scaleY: reduce ? 1 : lineScale }}
          />

          <ol className="flex flex-col gap-12">
            {processSteps.map((step, i) => {
              const leftSide = i % 2 === 0;
              return (
                <li key={step.title} className="relative">
                  <Reveal delay={0.05}>
                    <div
                      className={`flex items-start gap-6 sm:items-center ${
                        leftSide ? "sm:flex-row" : "sm:flex-row-reverse"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent-400/40 bg-ink-900 font-display text-lg font-semibold text-accent-300 shadow-[0_0_24px_rgba(110,160,205,0.18)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className={`card card-hover flex-1 p-6 ${leftSide ? "" : "sm:text-right"}`}>
                        <h3 className="text-lg font-semibold text-cream">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-chrome-400">{step.blurb}</p>
                      </div>
                      <div className="hidden flex-1 sm:block" aria-hidden="true" />
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
