import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";

export function Header() {
  return (
    <header className="flex justify-between items-center mb-16 pt-8 max-w-7xl mx-auto px-8 w-full">
      <Link href="/" className="text-3xl m-0 tracking-tighter font-oswald text-text-primary no-underline font-bold">
        RIBEOR
      </Link>
      <nav className="flex gap-6 items-center">
        <Link href="/" className="text-sm text-text-meta uppercase tracking-wider font-semibold hover:text-accent-pink transition-colors no-underline">
          Inicio
        </Link>
        <Link href="/proyectos" className="text-sm text-text-meta uppercase tracking-wider font-semibold hover:text-accent-pink transition-colors no-underline">
          Proyectos
        </Link>
        <Link href="/blog" className="text-sm text-text-meta uppercase tracking-wider font-semibold hover:text-accent-pink transition-colors no-underline">
          Blog
        </Link>
        <ThemeToggle />
        <div className="w-px h-6 bg-border-color mx-2"></div>
        <AuthButton />
      </nav>
    </header>
  );
}
