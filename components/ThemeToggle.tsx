"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        borderRadius: "50%",
        transition: "background-color 0.2s ease",
        visibility: mounted ? "visible" : "hidden"
      }}
      aria-label="Toggle theme"
      title="Toggle theme"
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--bg-secondary)"}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
    >
      {mounted && currentTheme === "dark" ? (
        <Sun size={24} />
      ) : (
        <Moon size={24} />
      )}
    </button>
  );
}
