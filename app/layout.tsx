import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { AuthProvider } from "../components/AuthProvider";
import { Header } from "../components/Header";
import { VisitTracker } from "../components/VisitTracker";
import { TranslationsProvider } from "../lib/i18n/TranslationsProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ribeor.com"),
  title: {
    default: "Diego Berrio — Ribeor | Digital Artisan",
    template: "%s | Diego Berrio"
  },
  description: "Ingeniero de software con más de 7 años de experiencia construyendo aplicaciones web y móviles de alto rendimiento. Especializado en React, React Native, TypeScript y Expo. Founder @ Ribeor.",
  keywords: [
    "Diego Berrio",
    "EgoBMZ",
    "Ribeor",
    "Software Engineer",
    "React Native",
    "React",
    "TypeScript",
    "Expo",
    "Next.js",
    "Desarrollador Web",
    "Mobile Developer",
    "AI Integration",
    "UI UX"
  ],
  authors: [{ name: "Diego Berrio", url: "https://ribeor.com" }],
  creator: "Diego Berrio",
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: "https://ribeor.com",
    siteName: "Diego Berrio — Ribeor",
    title: "Diego Berrio — Ribeor | Digital Artisan",
    description: "Ingeniero de software con más de 7 años de experiencia construyendo aplicaciones web y móviles de alto rendimiento. Especializado en React, React Native, TypeScript y Expo. Founder @ Ribeor.",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/297014950?v=4",
        width: 460,
        height: 460,
        alt: "Diego Berrio — Ribeor"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Diego Berrio — Ribeor | Digital Artisan",
    description: "Ingeniero de software con más de 7 años de experiencia construyendo aplicaciones web y móviles de alto rendimiento. Especializado en React, React Native, TypeScript y Expo. Founder @ Ribeor.",
    creator: "@EgoBMZ",
    images: ["https://avatars.githubusercontent.com/u/297014950?v=4"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
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
