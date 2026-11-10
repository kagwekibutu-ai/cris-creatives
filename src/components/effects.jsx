import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { site } from "../data/site.js";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-accent-400"
      style={{ scaleX }}
    />
  );
}

export function CursorGlow() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      el.style.opacity = "1";
      el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[5] h-[500px] w-[500px] rounded-full bg-accent-400/10 opacity-0 blur-[130px] transition-opacity duration-500"
    />
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    if (reduce) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed right-5 bottom-24 z-[75] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-800/90 text-chrome-200 shadow-lg backdrop-blur transition-colors hover:border-accent-400/60 hover:text-accent-300 sm:right-8"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        "Hello Cris Creatives! I'd like to discuss a project."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
      className="group fixed right-5 bottom-6 z-[75] flex h-12 w-12 items-center justify-center rounded-full bg-accent-400 text-ink-950 shadow-[0_10px_30px_-8px_rgba(77,163,255,0.6)] transition-transform hover:scale-105 sm:right-8"
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-white/10 bg-ink-800/95 px-3 py-1.5 text-xs font-medium text-cream opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </motion.a>
  );
}
