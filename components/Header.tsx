"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "../lib/i18n/TranslationsProvider";

const FLAG = { es: "🇪🇸", en: "🇺🇸" } as const;

// Inline SVGs because this lucide-react version lacks social icons
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale, setLocale } = useTranslations();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.projects, href: "/proyectos" },
  ];

  const socialLinks = [
    { href: t.social.github, Icon: GithubIcon, label: "GitHub" },
    { href: t.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
  ];

  const toggleLocale = () => setLocale(locale === "es" ? "en" : "es");

  return (
    <header
      className="relative w-full sticky top-0 z-50 transition-colors duration-300"
      style={{
        borderBottom: "1px solid var(--border-color)",
        background: "var(--header-bg)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 py-3.5 w-full">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl m-0 tracking-tighter font-oswald no-underline font-bold flex overflow-visible group"
          style={{ color: "var(--text-primary)" }}
        >
          {"RIBEOR".split("").map((letter, idx) => (
            <span
              key={idx}
              className="inline-block animate-elastic-pop transition-colors duration-150 group-hover:text-accent-lime"
              style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: "both" }}
            >
              {letter}
            </span>
          ))}
        </Link>

        {/* Desktop nav — Links | Divider | Social | Divider | Lang | Hire | Theme | Auth */}
        <nav className="hidden md:flex gap-5 items-center">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest font-bold transition-colors no-underline"
                style={{ color: isActive ? "var(--accent-lime)" : "var(--text-meta)" }}
                onMouseOver={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseOut={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-meta)"; }}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="w-px h-4" style={{ background: "var(--border-color)" }} />

          {/* Social quick-links */}
          {socialLinks.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center transition-colors duration-150"
              style={{ color: "var(--text-meta)" }}
              onMouseOver={e => (e.currentTarget as HTMLElement).style.color = "var(--accent-lime)"}
              onMouseOut={e => (e.currentTarget as HTMLElement).style.color = "var(--text-meta)"}
            >
              <Icon />
            </a>
          ))}

          <div className="w-px h-4" style={{ background: "var(--border-color)" }} />

          {/* Language toggle with flag */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-200"
            style={{ borderColor: "var(--border-color)", color: "var(--text-meta)" }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-lime)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent-lime)";
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-meta)";
            }}
            title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <span className="text-sm leading-none">{FLAG[locale === "es" ? "en" : "es"]}</span>
            <span>{locale === "es" ? "EN" : "ES"}</span>
          </button>

          {/* Hire CTA */}
          <a
            href="mailto:hola@ribeor.com"
            className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border-2 transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor: "var(--accent-lime)", color: "var(--accent-lime)" }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent-lime)";
              (e.currentTarget as HTMLElement).style.color = "#0D1117";
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--accent-lime)";
            }}
          >
            {t.nav.hire}
          </a>

          <ThemeToggle />
          <div className="w-px h-4" style={{ background: "var(--border-color)" }} />
          <AuthButton />
        </nav>

        {/* Mobile row */}
        <div className="flex items-center gap-3 md:hidden relative z-50">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full border"
            style={{ borderColor: "var(--border-color)", color: "var(--text-meta)" }}
          >
            <span className="text-sm leading-none">{FLAG[locale === "es" ? "en" : "es"]}</span>
            <span>{locale === "es" ? "EN" : "ES"}</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center transition-colors focus:outline-none cursor-pointer relative z-50"
            style={{ color: "var(--text-primary)" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full border-b shadow-xl py-5 px-6 flex flex-col gap-5 animate-fade-in z-50"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base uppercase tracking-widest font-bold py-3 border-b no-underline"
                  style={{
                    borderColor: "var(--border-color)",
                    color: isActive ? "var(--accent-lime)" : "var(--text-secondary)",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile social + hire */}
          <div className="flex items-center gap-3">
            {[
              { href: t.social.github, Icon: GithubIcon, label: "GitHub" },
              { href: t.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
              { href: t.social.instagram, Icon: InstagramIcon, label: "Instagram" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl border flex items-center justify-center"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
              >
                <Icon />
              </a>
            ))}
            <a
              href="mailto:hola@ribeor.com"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: "var(--accent-lime)", color: "#0D1117" }}
            >
              {t.nav.hire}
            </a>
          </div>

          <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--border-color)" }}>
            <span className="text-xs uppercase font-bold tracking-wider" style={{ color: "var(--text-meta)" }}>
              {t.nav.admin}
            </span>
            <AuthButton />
          </div>
        </div>
      )}
    </header>
  );
}
