"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Code2, Smartphone, Cpu, MapPin, Zap } from "lucide-react";
import { useTranslations } from "../lib/i18n/TranslationsProvider";

// Inline SVGs — this lucide-react version lacks social icons
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const STACK_MARQUEE = [
  "React", "React Native", "TypeScript", "Next.js", "Node.js", "Python",
  "OpenAI", "AWS", "PostgreSQL", "Docker", "GraphQL", "Figma",
  "React", "React Native", "TypeScript", "Next.js", "Node.js", "Python",
  "OpenAI", "AWS", "PostgreSQL", "Docker", "GraphQL", "Figma",
];

const ICONS = [<Smartphone key="sm" size={26} />, <Code2 key="c2" size={26} />, <Cpu key="cpu" size={26} />];

export default function Home() {
  const { t } = useTranslations();
  const s = t.services;
  const a = t.about;
  const p = t.projects_cta;
  const social = t.social;

  return (
    <main className="overflow-hidden">

      {/* ─────────────────────────────────────────
          HERO
          ───────────────────────────────────────── */}
      <section className="aurora-hero relative min-h-[92vh] flex items-center px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="aurora-orb-3" />
        <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none z-0" />

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left ── */}
          <div>
            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest animate-slide-up"
              style={{ borderColor: "var(--accent-lime)", color: "var(--accent-lime)", animationDelay: "0s" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent-lime)" }} />
              {t.hero.badge}
            </div>

            {/* Tagline */}
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl mb-6 animate-slide-up"
              style={{ animationDelay: "0.1s", lineHeight: "1.05" }}
            >
              {t.hero.tagline_1}<br />
              <span className="animate-shimmer">{t.hero.tagline_2}</span><br />
              {t.hero.tagline_3}
            </h1>

            {/* Bio */}
            <p
              className="text-base md:text-lg max-w-xl mb-8 animate-slide-up"
              style={{ animationDelay: "0.2s", color: "var(--text-secondary)", lineHeight: "1.75" }}
            >
              <strong style={{ color: "var(--text-primary)" }}>{t.hero.bio_strong}</strong>
              {t.hero.bio_rest}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "var(--accent-lime)", color: "#0D1117" }}
              >
                {t.hero.cta_projects} <ArrowRight size={16} />
              </Link>
              <a
                href={social.github}
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
                <GithubIcon size={14} /> {t.hero.cta_site}
              </a>
            </div>

            {/* Social links row */}
            <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--text-meta)" }}>
                Redes
              </span>
              <div className="h-px flex-1 max-w-[40px]" style={{ background: "var(--border-color)" }} />
              {[
                { href: social.github, Icon: GithubIcon, label: "GitHub" },
                { href: social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
                { href: social.instagram, Icon: InstagramIcon, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-meta)" }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-lime)";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent-lime)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(132,204,22,0.08)";
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-meta)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Enhanced Identity Card ── */}
          <div
            className="flex justify-center lg:justify-end animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="relative w-full max-w-[360px] rounded-3xl border overflow-hidden"
              style={{ borderColor: "var(--accent-lime)", background: "var(--bg-card)" }}
            >
              {/* Card top gradient bar */}
              <div
                className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg, var(--accent-lime), rgba(99,102,241,0.8), var(--accent-lime))" }}
              />

              <div className="p-7 flex flex-col gap-5">
                {/* Header row: photo + name */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <Image
                      src="https://avatars.githubusercontent.com/u/297014950?v=4"
                      alt="Diego Berrio — EgoBMZ"
                      width={60}
                      height={60}
                      className="rounded-2xl object-cover"
                      style={{ border: "2px solid var(--accent-lime)" }}
                      unoptimized
                    />
                    {/* Online dot */}
                    <span
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 animate-pulse"
                      style={{
                        background: "var(--accent-lime)",
                        borderColor: "var(--bg-card)",
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-sm font-bold normal-case tracking-normal leading-tight" style={{ color: "var(--text-primary)", fontFamily: "var(--font-inter)" }}>
                      Diego Berrio
                    </h3>
                    <p className="text-xs font-mono" style={{ color: "var(--accent-lime)" }}>@EgoBMZ</p>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} style={{ color: "var(--text-meta)" }} />
                      <p className="text-[10px]" style={{ color: "var(--text-meta)" }}>Colombia · Remoto</p>
                    </div>
                    {/* Available tag moved below name to avoid collision */}
                    <div
                      className="flex items-center gap-1.5 px-2 py-0.5 mt-1 rounded-md text-[9px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(132,204,22,0.12)", color: "var(--accent-lime)" }}
                    >
                      <Zap size={8} fill="currentColor" />
                      {t.hero.status}
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
                >
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "var(--text-meta)" }}>
                    Rol actual
                  </p>
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    {t.hero.role}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {t.hero.role_sub}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "7+", label: t.hero.stat_years },
                    { value: "12+", label: t.hero.stat_apps },
                    { value: "IA", label: t.hero.stat_ai },
                  ].map(stat => (
                    <div
                      key={stat.label}
                      className="text-center py-3 rounded-xl"
                      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
                    >
                      <p className="text-lg font-bold leading-none mb-1" style={{ color: "var(--accent-lime)", fontFamily: "var(--font-space-grotesk)" }}>
                        {stat.value}
                      </p>
                      <p className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-meta)" }}>
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
                    {["React Native", "TypeScript", "Next.js", "Expo", "Node.js"].map(tech => (
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

                {/* Social icons row */}
                <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: "var(--border-color)" }}>
                  <div className="flex gap-2">
                    {[
                      { href: social.github, Icon: GithubIcon },
                      { href: social.linkedin, Icon: LinkedinIcon },
                      { href: social.instagram, Icon: InstagramIcon },
                    ].map(({ href, Icon }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ background: "var(--bg-secondary)", color: "var(--text-meta)" }}
                        onMouseOver={e => {
                          (e.currentTarget as HTMLElement).style.color = "var(--accent-lime)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(132,204,22,0.1)";
                        }}
                        onMouseOut={e => {
                          (e.currentTarget as HTMLElement).style.color = "var(--text-meta)";
                          (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
                        }}
                      >
                        <Icon size={14} />
                      </a>
                    ))}
                  </div>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "var(--accent-lime)", color: "#0D1117" }}
                  >
                    Contactar <ExternalLink size={9} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          MARQUEE TICKER
          ───────────────────────────────────────── */}
      <div
        className="border-y py-3.5 overflow-hidden"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
      >
        <div className="flex gap-10 animate-marquee w-max">
          {STACK_MARQUEE.map((tech, i) => (
            <span
              key={i}
              className="text-[11px] uppercase tracking-widest font-bold whitespace-nowrap flex items-center gap-3"
              style={{ color: "var(--text-meta)" }}
            >
              <span style={{ color: "var(--accent-lime)" }}>›</span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────
          SERVICES
          ───────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 border-t" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-16 flex-wrap gap-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: "var(--accent-lime)" }}>
                {s.label}
              </span>
              <h2 className="text-5xl lg:text-6xl">
                {s.heading_1}<br />{s.heading_2}
              </h2>
            </div>
            <p className="max-w-sm text-base self-end leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {s.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {s.items.map((item, i) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden"
                style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}
                onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-lime)"}
                onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"}
              >
                <span className="absolute top-5 right-5 text-xs font-bold font-mono opacity-20" style={{ color: "var(--accent-lime)" }}>
                  0{i + 1}
                </span>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(132,204,22,0.1)", color: "var(--accent-lime)" }}
                >
                  {ICONS[i]}
                </div>
                <h3 className="text-lg mb-1 normal-case tracking-normal" style={{ color: "var(--text-primary)", fontFamily: "var(--font-inter)", fontWeight: 700 }}>
                  {item.title}
                </h3>
                <p className="text-[11px] uppercase tracking-wider font-bold mb-4" style={{ color: "var(--accent-lime)" }}>
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: "var(--accent-lime)" }}>
              {a.label}
            </span>
            <div className="text-6xl font-bold mb-4 leading-none select-none animate-arrow-reveal" style={{ color: "var(--accent-lime)", fontFamily: "sans-serif" }}>
              ›
            </div>
            <h2 className="text-4xl lg:text-5xl mb-6">
              {a.tagline_1}<br />{a.tagline_2}<br />{a.tagline_3}
            </h2>
            {/* Social proof row */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { href: social.github, Icon: GithubIcon, label: "GitHub" },
                { href: social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
                { href: social.instagram, Icon: InstagramIcon, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", background: "var(--bg-card)" }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-lime)";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent-lime)";
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  <Icon size={13} /> {label}
                </a>
              ))}
            </div>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:opacity-80"
              style={{ color: "var(--accent-lime)" }}
            >
              {a.cta} <ArrowRight size={14} />
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-base leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>{a.bio_1_strong}</strong>
              {a.bio_1_rest}
            </p>
            <p className="text-base leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
              {a.bio_2_start}
              <strong style={{ color: "var(--accent-lime)" }}>{a.bio_2_highlight}</strong>
              {a.bio_2_end}
            </p>

            {/* Highlights — professionalized */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {a.highlights.map(item => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border transition-all duration-300 hover:border-accent-lime"
                  style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-lime)"}
                  onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"}
                >
                  <p className="text-sm font-bold uppercase tracking-wide mb-1" style={{ color: "var(--accent-lime)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-meta)" }}>
                    {item.note}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div
              className="p-5 rounded-2xl border mt-2 flex items-center justify-between gap-4"
              style={{ borderColor: "var(--accent-lime)", background: "rgba(132,204,22,0.05)" }}
            >
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  ¿Tienes un proyecto en mente?
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  Estoy disponible para freelance y posiciones full-time.
                </p>
              </div>
              <a
                href="mailto:hola@ribeor.com"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--accent-lime)", color: "#0D1117" }}
              >
                Escribir <ArrowRight size={12} />
              </a>
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
          <span className="text-xs uppercase tracking-widest font-bold block mb-6" style={{ color: "var(--accent-lime)" }}>
            {p.label}
          </span>
          <h2 className="text-5xl lg:text-7xl mb-6">
            {p.heading_1}<br />{p.heading_2}
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
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
