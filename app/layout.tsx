import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { AuthProvider } from "../components/AuthProvider";
import { Header } from "../components/Header";
import { VisitTracker } from "../components/VisitTracker";
import { TranslationsProvider } from "../lib/i18n/TranslationsProvider";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diego Berríos — Ribeor | Digital Artisan",
  description: "Software Engineer con 7+ años de experiencia construyendo apps web y móviles. Founder @ Ribeor. React, React Native, TypeScript, Expo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${oswald.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TranslationsProvider>
            <AuthProvider>
              <VisitTracker />
              <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1">
                  {children}
                </div>
              </div>
            </AuthProvider>
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
