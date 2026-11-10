import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { site } from "../data/site.js";

export default function CtaBand() {
  return (
    <section className="bg-accent-400 py-16 text-ink-950 sm:py-20" aria-label="Call to action">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <p className="font-mono text-xs font-medium tracking-[0.24em] uppercase opacity-70">
          Less is more — start small
        </p>
        <h2 className="font-display text-4xl leading-[0.95] uppercase sm:text-6xl">
          Ready when you are.
        </h2>
        <p className="max-w-xl text-sm font-medium sm:text-base">
          Send the idea, the photos, the rough concept — whatever you already
          have. That's usually enough to begin.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
              "Hello Cris Creatives! I'd like to start a project."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent !bg-ink-950 !text-cream hover:!bg-ink-800"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Talk to us on WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-950/60 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-cream"
          >
            Send a brief
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
