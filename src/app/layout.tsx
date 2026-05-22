import type { Metadata } from "next";
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
  title: "Low Ticket Hunter — Veja, analise e lucre com produtos validados no Meta",
  description:
    "Extensão Chrome que escaneia em tempo real a Biblioteca de Anúncios do Meta e destaca os produtos low ticket validados. R$29,90 · Pagamento único · Acesso vitalício.",
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
