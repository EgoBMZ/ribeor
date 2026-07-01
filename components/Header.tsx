"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations, type Locale } from "../lib/i18n/TranslationsProvider";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale, setLocale } = useTranslations();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.projects, href: "/proyectos" },
  ];

  const toggleLocale = () => setLocale(locale === "es" ? "en" : "es");

  return (
    <header
      className="relative w-full sticky top-0 z-50"
      style={{
        borderBottom: "1px solid var(--border-color)",
        background: "rgba(13,17,23,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 py-4 w-full">

        {/* Brand logo — animated letters with lime hover */}
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

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
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

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-200"
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
            {locale === "es" ? "EN" : "ES"}
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
          <div className="w-px h-5" style={{ background: "var(--border-color)" }} />
          <AuthButton />
        </nav>

        {/* Mobile row */}
        <div className="flex items-center gap-3 md:hidden relative z-50">
          {/* Compact locale toggle */}
          <button
            onClick={toggleLocale}
            className="text-xs font-bold px-2 py-1 rounded border"
            style={{ borderColor: "var(--border-color)", color: "var(--text-meta)" }}
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 transition-colors focus:outline-none cursor-pointer touch-manipulation relative z-50"
            style={{ color: "var(--text-primary)" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full border-b shadow-xl py-6 px-6 flex flex-col gap-6 animate-fade-in z-50"
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
            <a
              href="mailto:hola@ribeor.com"
              className="mt-3 inline-flex items-center justify-center px-4 py-3 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: "var(--accent-lime)", color: "#0D1117" }}
            >
              {t.nav.hire}
            </a>
          </nav>
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
