import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo.jsx";
import { navLinks, site } from "../data/site.js";
import { services } from "../data/services.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-900/60">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="text-sm leading-relaxed text-chrome-400">
            {site.tagline} Less is more — creative communications from
            Murang'a, serving Nairobi and the wider region.
          </p>
          <ul className="flex flex-wrap gap-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-chrome-300 transition-colors hover:border-accent-400/50 hover:text-accent-300"
                >
                  {s.label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-xs font-bold tracking-[0.2em] text-accent-400 uppercase">Explore</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-chrome-400 transition-colors hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.portfolioRef.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-chrome-400 transition-colors hover:text-cream"
              >
                {site.portfolioRef.label}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-accent-400 uppercase">Services</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {services.map((s) => (
              <li key={s.title}>
                <Link to="/services" className="text-sm text-chrome-400 transition-colors hover:text-cream">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-accent-400 uppercase">Get in touch</h3>
          <ul className="mt-5 flex flex-col gap-4">
            <li>
              <a href={`tel:${site.phone}`} className="flex items-center gap-3 text-sm text-chrome-400 transition-colors hover:text-cream">
                <Phone size={15} className="text-accent-400" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm text-chrome-400 transition-colors hover:text-cream">
                <Mail size={15} className="text-accent-400" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-chrome-400">
              <MapPin size={15} className="text-accent-400" aria-hidden="true" />
              {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-hidden border-t border-white/5" aria-hidden="true">
        <div className="flex w-max animate-marquee py-8 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {["Cris Creatives", "Less is more", "Cris Creatives", "Less is more"].map(
                (t, i) => (
                  <span
                    key={`${dup}-${i}`}
                    className="flex items-center font-display text-[14vw] leading-none uppercase"
                  >
                    <span className={i % 2 === 0 ? "text-white/[0.06] px-8" : "text-accent-400/[0.08] px-8"}>
                      {t}
                    </span>
                    <span className="h-3 w-3 rotate-45 bg-accent-400/20" />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-chrome-500 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="label-mono">Less is more.</p>
        </div>
      </div>
    </footer>
  );
}
