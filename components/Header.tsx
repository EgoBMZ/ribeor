"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Proyectos", href: "/proyectos" },
  ];

  return (
    <header className="relative w-full border-b border-border-color/30 bg-bg-primary/85 backdrop-blur-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4 md:py-6 w-full">
        {/* Animated Brand Logo */}
        <Link href="/" className="text-3xl m-0 tracking-tighter font-oswald text-text-primary no-underline font-bold flex overflow-visible">
          {"RIBEOR".split("").map((letter, idx) => (
            <span
              key={idx}
              className="inline-block animate-elastic-pop"
              style={{ 
                animationDelay: `${idx * 0.05}s`,
                animationFillMode: "both"
              }}
            >
              {letter}
            </span>
          ))}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm uppercase tracking-wider font-semibold transition-colors no-underline ${
                  isActive ? "text-accent-pink font-bold" : "text-text-meta hover:text-text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <ThemeToggle />
          <div className="w-px h-6 bg-border-color mx-2"></div>
          <AuthButton />
        </nav>

        {/* Mobile Toggle & ThemeToggle */}
        <div className="flex items-center gap-4 md:hidden relative z-50">
          <ThemeToggle />
          <button 
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-primary hover:text-accent-pink transition-colors focus:outline-none cursor-pointer touch-manipulation relative z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg-card border-b border-border-color shadow-lg py-6 px-8 flex flex-col gap-6 animate-fade-in z-50">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-lg uppercase tracking-wider font-bold transition-colors no-underline py-2 border-b border-border-color/20 ${
                    isActive ? "text-accent-pink" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center justify-between border-t border-border-color/30 pt-4">
            <span className="text-xs uppercase font-bold text-text-meta tracking-wider">Acceso de Admin</span>
            <AuthButton />
          </div>
        </div>
      )}
    </header>
  );
}
