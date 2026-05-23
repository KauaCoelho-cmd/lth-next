import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

// Display / headlines — geometric, modern, slight tech feel
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Body — clean, optimized for reading, very professional
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Mono — code/tech feel for badges, prices, terminal-style elements
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hunterx.site"),
  alternates: {
    canonical: "https://hunterx.site",
  },
  title: {
    default: "Hunter X — Produtos low ticket com dias rodando no Meta",
    template: "%s | Hunter X",
  },
  description:
    "Extensão Chrome que mostra produtos low ticket com dias rodando na Biblioteca do Meta. Instale e garimpie em minutos.",
  keywords: [
    "low ticket", "dias rodando", "biblioteca de anúncios", "meta ads", "produto validado",
    "extensão chrome", "dropshipping", "produto escalando", "hunter x",
    "garimpar produto", "anúncio meta", "facebook ads", "produto low ticket",
  ],
  authors: [{ name: "Hunter X" }],
  creator: "Hunter X",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://hunterx.site",
    siteName: "Hunter X",
    title: "Hunter X — Produtos low ticket com dias rodando no Meta",
    description:
      "Extensão Chrome que mostra produtos low ticket com dias rodando na Biblioteca do Meta. Instale e garimpie em minutos.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Hunter X — Extensão Chrome para garimpar produtos low ticket no Meta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hunter X — Produtos low ticket com dias rodando no Meta",
    description:
      "Extensão Chrome que mostra produtos low ticket com dias rodando na Biblioteca do Meta. Instale e garimpie em minutos.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a14] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
