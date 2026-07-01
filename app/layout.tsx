import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { AuthProvider } from "../components/AuthProvider";
import { Header } from "../components/Header";
import { VisitTracker } from "../components/VisitTracker";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ribeor | Diego Berrío",
  description: "Portafolio y Blog de Diego Berrío (egobmz), Desarrollador Frontend y Mobile.",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <VisitTracker />
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex-1">
                {children}
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
