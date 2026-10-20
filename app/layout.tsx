import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "./_components/Nav";
import { Footer } from "./_components/Footer";

const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    {
      path: "./_fonts/LibreBaskerville-Variable.ttf",
      style: "normal",
      weight: "400 700",
    },
    {
      path: "./_fonts/LibreBaskerville-Italic-Variable.ttf",
      style: "italic",
      weight: "400 700",
    },
  ],
});

const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "./_fonts/Manrope-Variable.ttf",
      style: "normal",
      weight: "200 800",
    },
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F3EC" },
    { media: "(prefers-color-scheme: dark)", color: "#252421" },
  ],
};

export const metadata: Metadata = {
  title: "GDH Christoph Trapp · Stuckateurmeisterbetrieb",
  description:
    "Stuckateurmeisterbetrieb aus Bous. Innen- und Außenputz, Trockenbau, Spanndecken, Maler, Böden und Gerüst. Qualität, die bleibt.",
  metadataBase: new URL("https://gdh-verputz.de"),
  openGraph: {
    title: "GDH Christoph Trapp · Stuckateurmeisterbetrieb",
    description:
      "Handwerkliche Präzision, saubere Ausführung und fachkundige Beratung für Ihr Zuhause.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
