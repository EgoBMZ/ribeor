"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Code2, Smartphone, Cpu } from "lucide-react";
import { useTranslations } from "../lib/i18n/TranslationsProvider";

const STACK_MARQUEE = [
  "React", "React Native", "TypeScript", "Expo", "Next.js", "Figma",
  "Firebase", "Node.js", "Tailwind CSS", "Git",
  // duplicated so the marquee loops seamlessly
  "React", "React Native", "TypeScript", "Expo", "Next.js", "Figma",
  "Firebase", "Node.js", "Tailwind CSS", "Git",
];

const ICONS = [<Smartphone key="sm" size={28} />, <Code2 key="c2" size={28} />, <Cpu key="cpu" size={28} />];

export default function Home() {
  const { t } = useTranslations();
  const s = t.services;
  const a = t.about;
  const p = t.projects_cta;

  return (
    <main className="overflow-hidden">

      {/* ─────────────────────────────────────────
          HERO — Aurora background + massive type
          ───────────────────────────────────────── */}
      <section className="aurora-hero relative min-h-[92vh] flex items-center px-6 md:px-12 py-20 max-w-7xl mx-auto">
        {/* Third aurora orb */}
        <div className="aurora-orb-3" />

        {/* Grid dots background (subtle) */}
        <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none z-0" />

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Column ── */}
          <div>
            {/* Animated badge */}
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest animate-slide-up"
              style={{ borderColor: "var(--accent-lime)", color: "var(--accent-lime)", animationDelay: "0s" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent-lime)" }} />
              {t.hero.badge}
            </div>

            {/* Main tagline — massive, like references */}
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl mb-8 animate-slide-up"
              style={{ animationDelay: "0.1s", lineHeight: "1.05" }}
            >
              {t.hero.tagline_1}<br />
              <span className="animate-shimmer">{t.hero.tagline_2}</span><br />
              {t.hero.tagline_3}
            </h1>

            {/* Bio */}
            <p
              className="text-base md:text-lg max-w-xl mb-10 animate-slide-up"
              style={{ animationDelay: "0.2s", color: "var(--text-secondary)", lineHeight: "1.7" }}
            >
              <strong style={{ color: "var(--text-primary)" }}>{t.hero.bio_strong}</strong>
              {t.hero.bio_rest}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "var(--accent-lime)", color: "#0D1117" }}
              >
                {t.hero.cta_projects} <ArrowRight size={16} />
              </Link>
              <a
                href="https://ribeor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider border-2 transition-all duration-200 hover:-translate-y-1"
                style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-lime)";
                  (e.currentTarget as HTMLElement).style.color = "var(--accent-lime)";
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }}
              >
                {t.hero.cta_site} <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* ── Right Column: Identity card ── */}
          <div
            className="flex justify-center lg:justify-end animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="relative w-full max-w-[340px] rounded-3xl border p-8 flex flex-col gap-6"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}
            >
              {/* Decorative accent corner */}
              <div
                className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg animate-pulse-glow select-none"
                style={{ background: "var(--accent-lime)", color: "#0D1117" }}
              >
                ›
              </div>

              {/* Profile photo + identity */}
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <Image
                    src="https://avatars.githubusercontent.com/u/297014950?v=4"
                    alt="Diego Berríos — EgoBMZ"
                    width={64}
                    height={64}
                    className="rounded-2xl object-cover"
                    style={{ border: "2px solid var(--accent-lime)" }}
                    unoptimized
                  />
                </div>
                <div>
                  <h3
                    className="text-base font-bold normal-case tracking-normal leading-tight"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-inter)" }}
                  >
                    Diego Berríos
                  </h3>
                  <p className="text-sm font-mono mt-0.5" style={{ color: "var(--accent-lime)" }}>
                    @EgoBMZ
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--text-meta)" }}>
                  Rol actual
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {t.hero.role}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t.hero.role_sub}
                </p>
              </div>

              <div className="h-px" style={{ background: "var(--border-color)" }} />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { value: "7+", label: t.hero.stat_years },
                  { value: "∞", label: t.hero.stat_industries },
                  { value: "IA", label: t.hero.stat_ai },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-xl font-bold font-oswald" style={{ color: "var(--accent-lime)" }}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-meta)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stack chips */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "var(--text-meta)" }}>
                  {t.hero.stack_label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "React Native", "TypeScript", "Expo", "Figma"].map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border"
                      style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          MARQUEE TICKER — tech stack
          ───────────────────────────────────────── */}
      <div
        className="border-y py-4 overflow-hidden"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
      >
        <div className="flex gap-12 animate-marquee w-max">
          {STACK_MARQUEE.map((tech, i) => (
            <span
              key={i}
              className="text-xs uppercase tracking-widest font-bold whitespace-nowrap flex items-center gap-3"
              style={{ color: "var(--text-meta)" }}
            >
              <span style={{ color: "var(--accent-lime)" }}>›</span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────
          SERVICES — Cards with lime accents
          ───────────────────────────────────────── */}
      <section
        className="py-24 px-6 md:px-12 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-16 flex-wrap gap-8">
            <div>
              <span
                className="text-xs uppercase tracking-widest font-bold block mb-3"
                style={{ color: "var(--accent-lime)" }}
              >
                {s.label}
              </span>
              <h2 className="text-5xl lg:text-6xl">
                {s.heading_1}<br />{s.heading_2}
              </h2>
            </div>
            <p
              className="max-w-sm text-base self-end leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {s.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {s.items.map((item, i) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden"
                style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}
                onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-lime)"}
                onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"}
              >
                <span
                  className="absolute top-6 right-6 text-xs font-bold font-mono opacity-25"
                  style={{ color: "var(--accent-lime)" }}
                >
                  0{i + 1}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(182,255,75,0.1)", color: "var(--accent-lime)" }}
                >
                  {ICONS[i]}
                </div>
                <h3
                  className="text-xl mb-1 normal-case tracking-normal"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-inter)", fontWeight: 700 }}
                >
                  {item.title}
                </h3>
                <p className="text-xs uppercase tracking-wider font-bold mb-4" style={{ color: "var(--accent-lime)" }}>
                  {item.subtitle}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          ABOUT STRIP
          ───────────────────────────────────────── */}
      <section
        className="py-24 px-6 md:px-12 border-t"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="text-xs uppercase tracking-widest font-bold block mb-4"
              style={{ color: "var(--accent-lime)" }}
            >
              {a.label}
            </span>
            <div
              className="text-7xl font-bold mb-6 leading-none select-none animate-arrow-reveal"
              style={{ color: "var(--accent-lime)", fontFamily: "sans-serif" }}
            >
              ›
            </div>
            <h2 className="text-4xl lg:text-5xl mb-8">
              {a.tagline_1}<br />{a.tagline_2}<br />{a.tagline_3}
            </h2>
            <a
              href="https://linkedin.com/in/egobmz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
              style={{ color: "var(--accent-lime)" }}
            >
              {a.cta} <ArrowRight size={14} />
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>{a.bio_1_strong}</strong>
              {a.bio_1_rest}
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {a.bio_2_start}
              <strong style={{ color: "var(--accent-lime)" }}>{a.bio_2_highlight}</strong>
              {a.bio_2_end}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {a.highlights.map(item => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border"
                  style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}
                >
                  <p className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "var(--accent-lime)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-meta)" }}>
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          PROJECTS CTA
          ───────────────────────────────────────── */}
      <section
        className="py-24 px-6 md:px-12 border-t text-center relative overflow-hidden aurora-hero"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <span
            className="text-xs uppercase tracking-widest font-bold block mb-6"
            style={{ color: "var(--accent-lime)" }}
          >
            {p.label}
          </span>
          <h2 className="text-5xl lg:text-7xl mb-8">
            {p.heading_1}<br />{p.heading_2}
          </h2>
          <p
            className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {p.description}
          </p>
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "var(--accent-lime)", color: "#0D1117" }}
          >
            {p.cta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </main>
  );
}
