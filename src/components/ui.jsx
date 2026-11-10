import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
}

export function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ num, eyebrow, title, lead, align = "center" }) {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignment}`}>
      <span className="eyebrow">
        {num && <span className="text-chrome-400">{num} —</span>}
        {eyebrow}
        {align !== "left" && <span className="h-px w-6 bg-accent-400/70" aria-hidden="true" />}
      </span>
      <h2 className="max-w-3xl font-display text-3xl leading-tight uppercase text-cream sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {lead && <p className="max-w-2xl text-base text-chrome-300 sm:text-lg">{lead}</p>}
    </Reveal>
  );
}

export function CountUp({ to, suffix = "", decimals = 0, pad = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  const display = pad
    ? String(Math.round(val)).padStart(2, "0")
    : val.toFixed(decimals);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
