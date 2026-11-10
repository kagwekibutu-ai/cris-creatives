import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { marqueeWords } from "../data/about.js";

export default function Home() {
  const reduce = useReducedMotion();

  const line = (text, i, accent = false) => (
    <motion.span
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`block ${accent ? "accent-text" : "text-cream"}`}
    >
      {text}
    </motion.span>
  );

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[72px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[26rem] leading-none text-white/[0.025] uppercase lg:block"
      >
        CC
      </span>

      <div className="container-x relative flex flex-1 flex-col justify-center py-16">
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow mb-8"
        >
          <span className="h-px w-8 bg-accent-400" aria-hidden="true" />
          Cris Creatives — Murang'a, Kenya
        </motion.p>

        <h1 className="font-display text-[22vw] leading-[0.92] uppercase sm:text-[9rem] lg:text-[11rem]">
          {line("Less is", 0)}
          <motion.span
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="accent-text hand-underline block"
          >
            more.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="hand-note mt-2"
          aria-hidden="true"
        >
          the brand idea we live by
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-8 max-w-xl text-base text-chrome-300 sm:text-lg"
        >
          Creative design, brand identity and digital growth — delivered with
          intention. Every poster, pixel and post has one job: make your
          business easier to recognise, understand and trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link to="/about" className="btn-accent">
            Step inside
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/work" className="btn-ghost">
            See the work
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="label-mono mt-10 flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-pop" aria-hidden="true" />
          Currently booking new projects
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative border-y border-white/10 bg-white/[0.03] py-4"
      >
        <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex items-center">
              {marqueeWords.map((w) => (
                <span key={`${dup}-${w}`} className="flex items-center">
                  <span className="px-6 font-display text-lg tracking-[0.15em] text-chrome-300 uppercase">
                    {w}
                  </span>
                  <span className="h-2 w-2 rotate-45 bg-accent-400" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
