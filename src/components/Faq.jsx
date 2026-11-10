import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { Reveal, SectionHeading } from "./ui.jsx";
import { faqs } from "../data/faqs.js";

function FaqItem({ faq, isOpen, onToggle, index }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  const reduce = useReducedMotion();

  return (
    <div className="card overflow-hidden">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-cream transition-colors hover:text-accent-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-400"
        >
          <span className="text-base sm:text-lg">{faq.q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-400/30 text-accent-300"
          >
            <Plus size={16} aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-chrome-400">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="container-x max-w-3xl">
        <SectionHeading
          num="02" eyebrow="FAQ"
          title={<span id="faq-heading">Questions, answered</span>}
          lead="Everything you need to know before we start. Anything else — just ask."
        />

        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.05}>
              <FaqItem
                faq={faq}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
