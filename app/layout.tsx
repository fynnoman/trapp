import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "./_components/Nav";
import { Footer } from "./_components/Footer";
import { LenisProvider } from "./_components/LenisProvider";
import { ScrollProgress } from "./_components/ScrollProgress";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efe9df" },
    { media: "(prefers-color-scheme: dark)", color: "#16130f" },
  ],
};

export const metadata: Metadata = {
  title: "GdH Stuckateurmeister & Malerbetrieb · Christoph Trapp",
  description:
    "Stuckateurmeister aus Bous. Putz, Trockenbau, Spanndecken, Malerarbeiten, Böden und Gerüstbau. Saubere Ausführung, persönliche Beratung.",
  metadataBase: new URL("https://gdh-verputz.de"),
  openGraph: {
    title: "GdH Stuckateurmeister & Malerbetrieb",
    description:
      "Stuckateurmeister aus Bous. Putz, Trockenbau, Spanndecken, Maler, Böden, Gerüst.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <LenisProvider>
          <ScrollProgress />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
