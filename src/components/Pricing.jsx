import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "./ui.jsx";
import { pricingCategories } from "../data/packages.js";

export default function Pricing() {
  const [activeId, setActiveId] = useState(pricingCategories[0].id);
  const tabRefs = useRef([]);
  const navigate = useNavigate();
  const activeCat = pricingCategories.find((c) => c.id === activeId);

  const onKeyDown = (e) => {
    const idx = pricingCategories.findIndex((c) => c.id === activeId);
    let next = null;
    if (e.key === "ArrowRight") next = (idx + 1) % pricingCategories.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + pricingCategories.length) % pricingCategories.length;
    if (next !== null) {
      e.preventDefault();
      setActiveId(pricingCategories[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  const choose = (service, pkg) => {
    navigate("/contact", { state: { service, package: pkg } });
  };

  return (
    <section id="pricing" className="section relative" aria-labelledby="pricing-heading">
      <div className="container-x relative">
        <SectionHeading
          num="01" eyebrow="Pricing"
          title={<span id="pricing-heading">Transparent packages. No surprises.</span>}
          lead="Pick a starting point — every package is scoped, priced and delivered on a dated timeline."
        />

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Pricing categories"
            onKeyDown={onKeyDown}
            className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-ink-800/80 p-1.5 backdrop-blur"
          >
            {pricingCategories.map((cat, i) => (
              <button
                key={cat.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={activeId === cat.id}
                aria-controls={`panel-${cat.id}`}
                tabIndex={activeId === cat.id ? 0 : -1}
                onClick={() => setActiveId(cat.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 ${
                  activeId === cat.id ? "text-ink-950" : "text-chrome-300 hover:text-cream"
                }`}
              >
                {activeId === cat.id && (
                  <motion.span
                    layoutId="pricing-tab"
                    className="absolute inset-0 rounded-full bg-accent-400"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            role="tabpanel"
            id={`panel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-5 lg:grid-cols-3"
          >
            {activeCat.packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`card relative flex h-full flex-col p-8 ${
                  pkg.featured
                    ? "border-accent-400/60 bg-accent-400/[0.07] shadow-[0_30px_70px_-30px_rgba(77,163,255,0.4)]"
                    : ""
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent-400 px-4 py-1 text-[11px] font-bold tracking-wider text-ink-950 uppercase">
                    <Sparkles size={12} aria-hidden="true" />
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-cream">{pkg.name}</h3>
                <p className="mt-2 min-h-[44px] text-sm text-chrome-400">{pkg.blurb}</p>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="accent-text font-display text-4xl uppercase">{pkg.price}</span>
                  <span className="text-xs font-medium tracking-wide text-chrome-500 uppercase">
                    {pkg.period}
                  </span>
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-white/10 pt-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-chrome-300">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-400" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => choose(activeCat.service, pkg.name)}
                  className={`mt-8 ${pkg.featured ? "btn-accent" : "btn-ghost"} w-full`}
                >
                  Choose {pkg.name.split(" ")[0]}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="text-sm text-chrome-400">
            Need something custom?{" "}
            <Link to="/contact" className="font-semibold text-accent-300 underline-offset-4 hover:underline">
              Tell us what you have in mind
            </Link>{" "}
            — every project receives an itemised proposal.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-xs text-chrome-500">
            Prices are indicative starting points. Final quotes depend on scope, complexity and
            production time — no vague promises, ever.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
