import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Clock, Mail, MapPin, Phone, Send, Smartphone } from "lucide-react";
import { Reveal, SectionHeading } from "./ui.jsx";
import { pricingCategories } from "../data/packages.js";
import { services } from "../data/services.js";
import { site } from "../data/site.js";

const budgetOptions = [
  "Under KSh 5,000",
  "KSh 5,000 – 15,000",
  "KSh 15,000 – 50,000",
  "KSh 50,000+",
  "Not sure yet",
];

const initialForm = {
  name: "",
  contact: "",
  service: "",
  pkg: "",
  budget: "",
  message: "",
};

const quickIntents = [
  { label: "A poster", text: "I have a poster/project I want designed." },
  { label: "An event", text: "I'm planning an event and need event communication." },
  { label: "A brand", text: "I need a brand identity for my business." },
  { label: "A website", text: "I want a website for my business." },
  { label: "Social content", text: "I need consistent content for my social media." },
];

export default function Contact() {
  const { state } = useLocation();
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state && (state.service || state["package"])) {
      setForm((f) => ({
        ...f,
        service: state.service || f.service,
        pkg: state["package"] || f.pkg,
      }));
      setSent(false);
    }
  }, [state]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const buildMessage = () =>
    [
      `Hello Cris Creatives! New project enquiry:`,
      ``,
      `• Name: ${form.name}`,
      `• Contact: ${form.contact}`,
      `• Service: ${form.service || "Not specified"}`,
      `• Package: ${form.pkg || "Not specified"}`,
      `• Budget: ${form.budget || "Not specified"}`,
      ``,
      `Message:`,
      form.message,
    ].join("\n");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.message.trim()) {
      setError("Please fill in your name, a contact, and a short message.");
      return;
    }
    setError("");
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(buildMessage())}`,
      "_blank",
      "noopener"
    );
    setSent(true);
  };

  const mailtoFallback = `mailto:${site.email}?subject=${encodeURIComponent(
    `Project enquiry — ${form.name || "New client"}`
  )}&body=${encodeURIComponent(buildMessage())}`;

  const allPackages = pricingCategories.flatMap((c) => c.packages.map((p) => p.name));

  return (
    <section id="contact" className="section relative" aria-labelledby="contact-heading">
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            align="left"
            num="01" eyebrow="Contact"
            title={
              <span id="contact-heading">
                Tell us about your <em className="accent-text">project</em>
              </span>
            }
            lead="Send the form and we'll continue on WhatsApp — or email us directly. Every enquiry is acknowledged within one business day."
          />

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <a href={`tel:${site.phone}`} className="card card-hover flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-accent-400/30 bg-accent-400/10 text-accent-300">
                <Phone size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wider text-chrome-500 uppercase">
                  Call / WhatsApp
                </span>
                <span className="text-sm font-semibold text-cream">{site.phoneDisplay}</span>
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="card card-hover flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-accent-400/30 bg-accent-400/10 text-accent-300">
                <Mail size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wider text-chrome-500 uppercase">
                  Email
                </span>
                <span className="text-sm font-semibold text-cream">{site.email}</span>
              </span>
            </a>
            <div className="card flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-accent-400/30 bg-accent-400/10 text-accent-300">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wider text-chrome-500 uppercase">
                  Studio
                </span>
                <span className="text-sm font-semibold text-cream">{site.location}</span>
              </span>
            </div>
            <div className="card flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-accent-400/30 bg-accent-400/10 text-accent-300">
                <Clock size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wider text-chrome-500 uppercase">
                  Hours
                </span>
                <span className="text-sm font-semibold text-cream">{site.hours}</span>
              </span>
            </div>
            <p className="flex items-start gap-2 text-xs text-chrome-500">
              <Smartphone size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              {site.mpesa.label}: {site.mpesa.value} — details shared on invoice.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} noValidate className="card flex flex-col gap-5 p-7 sm:p-9">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Quick intents">
              {quickIntents.map((q) => (
                <a
                  key={q.label}
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                    `Hello Cris Creatives! ${q.text}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-400/5 px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-accent-300 uppercase transition-colors hover:border-accent-400 hover:bg-accent-400/15"
                >
                  {q.label}
                </a>
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="cf-name" className="text-sm font-semibold text-cream">
                  Your name <span className="text-accent-400">*</span>
                </label>
                <input
                  id="cf-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Jane Wanjiku"
                  className="field"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cf-contact" className="text-sm font-semibold text-cream">
                  Email or phone <span className="text-accent-400">*</span>
                </label>
                <input
                  id="cf-contact"
                  type="text"
                  autoComplete="email"
                  required
                  value={form.contact}
                  onChange={set("contact")}
                  placeholder="jane@company.co.ke"
                  className="field"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="cf-service" className="text-sm font-semibold text-cream">
                  Service
                </label>
                <select id="cf-service" value={form.service} onChange={set("service")} className="field">
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cf-package" className="text-sm font-semibold text-cream">
                  Package
                </label>
                <select id="cf-package" value={form.pkg} onChange={set("pkg")} className="field">
                  <option value="">Select a package…</option>
                  {allPackages.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-budget" className="text-sm font-semibold text-cream">
                Budget range
              </label>
              <select id="cf-budget" value={form.budget} onChange={set("budget")} className="field">
                <option value="">Select a range…</option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-message" className="text-sm font-semibold text-cream">
                About your project <span className="text-accent-400">*</span>
              </label>
              <textarea
                id="cf-message"
                rows={5}
                required
                value={form.message}
                onChange={set("message")}
                placeholder="What are you building, and what should the work achieve?"
                className="field resize-y"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button type="submit" className="btn-accent w-full sm:w-auto">
              Send via WhatsApp
              <Send size={16} aria-hidden="true" />
            </button>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg border border-accent-400/30 bg-accent-400/5 px-4 py-3 text-sm text-chrome-300"
                  role="status"
                >
                  <p className="font-semibold text-accent-300">
                    WhatsApp should be open with your message ready to send.
                  </p>
                  <p className="mt-1">
                    Prefer email?{" "}
                    <a
                      href={mailtoFallback}
                      className="inline-flex items-center gap-1 font-semibold text-accent-300 underline-offset-4 hover:underline"
                    >
                      Send the same enquiry by email
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
