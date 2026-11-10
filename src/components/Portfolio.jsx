import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Reveal, SectionHeading } from "./ui.jsx";
import { portfolioCategories, portfolioItems } from "../data/portfolio.js";

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const visible =
    filter === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === filter);

  const close = useCallback(() => setLightboxIdx(null), []);
  const step = useCallback(
    (dir) =>
      setLightboxIdx((i) =>
        i === null ? null : (i + dir + visible.length) % visible.length
      ),
    [visible.length]
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIdx, close, step]);

  const current = lightboxIdx !== null ? visible[lightboxIdx] : null;

  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <div className="container-x">
        <SectionHeading
          num="01" eyebrow="Selected work"
          title={
            <span id="work-heading">
              Every poster opens the <em className="accent-text">brief behind it</em>
            </span>
          }
          lead="Real design work — events, leadership platforms, ministry communication, businesses and publishing. Click any piece to see its story."
        />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`rounded-full border px-5 py-2 font-mono text-xs font-medium tracking-[0.14em] uppercase transition-all focus-visible:outline-2 focus-visible:outline-accent-400 ${
                filter === cat
                  ? "border-accent-400 bg-accent-400/10 text-accent-300"
                  : "border-white/10 text-chrome-400 hover:border-white/25 hover:text-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
                className="card group overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIdx(i)}
                  aria-label={`Open case study: ${item.headline}`}
                  className="relative block w-full focus-visible:outline-2 focus-visible:outline-accent-400"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-ink-800">
                    <img
                      src={item.image}
                      alt={`${item.headline} — ${item.category.toLowerCase()} design by Cris Creatives`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.18em] text-chrome-200 uppercase backdrop-blur">
                    {item.category}
                  </span>
                  <span className="absolute top-4 right-4 font-mono text-xs text-chrome-300/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all duration-300 group-hover:bg-ink-950/45 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-accent-400 px-5 py-2.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-950 uppercase">
                      Show project <Expand size={14} aria-hidden="true" />
                    </span>
                  </span>
                </button>
                <div className="p-5">
                  <h3 className="text-[15px] leading-snug font-semibold text-cream">
                    {item.headline}
                  </h3>
                  <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-chrome-500 uppercase">
                    {item.context}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current.headline} case study`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-800/90 text-cream transition-colors hover:border-accent-400/60 hover:text-accent-300"
            >
              <X size={20} aria-hidden="true" />
            </button>
            {lightboxIdx > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous project"
                className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-800/90 text-cream transition-colors hover:border-accent-400/60 hover:text-accent-300 sm:left-8"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            )}
            {lightboxIdx < visible.length - 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next project"
                className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-800/90 text-cream transition-colors hover:border-accent-400/60 hover:text-accent-300 sm:right-8"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="card grid max-h-full w-full max-w-5xl overflow-y-auto md:grid-cols-[1.4fr_1fr] md:overflow-hidden"
            >
              <div className="flex max-h-[70vh] items-center justify-center overflow-hidden bg-ink-800 md:max-h-[85vh]">
                <img
                  src={current.image}
                  alt={`${current.headline} — full poster`}
                  className="max-h-full w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-4 overflow-y-auto p-7 sm:p-9">
                <span className="eyebrow">{current.category}</span>
                <h3 className="font-display text-3xl uppercase text-cream sm:text-4xl">
                  {current.headline}
                </h3>
                <p className="font-mono text-[11px] tracking-[0.16em] text-chrome-400 uppercase">
                  {current.context}
                </p>
                <p className="text-sm leading-relaxed text-chrome-300 sm:text-base">
                  {current.description}
                </p>
                <div className="mt-auto border-t border-white/10 pt-5">
                  <p className="label-mono mb-3">Scope</p>
                  <ul className="flex flex-wrap gap-2">
                    {current.scope.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-accent-400/25 bg-accent-400/5 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-accent-300 uppercase"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/contact" onClick={close} className="btn-accent self-start">
                  Start a project like this
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
