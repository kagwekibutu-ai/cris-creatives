import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo.jsx";

export default function LoadingScreen() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem("cc_intro");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("cc_intro", "1");
      } catch {}
    }, 1400);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink-950"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo size={56} withWordmark={false} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl uppercase tracking-wide text-cream"
          >
            Cris <span className="accent-text">Creatives</span>
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-40 origin-left bg-accent-400"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="label-mono"
          >
            Less is more
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
