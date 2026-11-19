import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import { ParticleBg } from "@/components/ui/particle-bg";
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
    default: "SiteScope — Recupere seu site que saiu do ar",
    template: "%s | Hunter X",
  },
  description:
    "SiteScope recupera o seu site que saiu do ar: cole o endereço, ajuste textos e imagens no editor e baixe o HTML pronto para publicar de novo.",
  keywords: ["recuperar site", "site fora do ar", "recuperar página", "restaurar site", "baixar html do site", "editor visual de site", "sitescope"],
  authors: [{ name: "Hunter X" }],
  creator: "Hunter X",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://hunterx.site",
    siteName: "Hunter X",
    title: "Hunter X — Veja o que os outros não veem",
    description:
      "Existe um grupo pequeno que encontra produtos validados antes de todo mundo. As vagas abrem por fase — e fecham sem aviso. Descubra o que está por trás da porta.",
    images: [
      {
        url: "https://hunterx.site/og-image.png",
        width: 1376,
        height: 768,
        alt: "Hunter X — Veja o que os outros não veem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hunter X — Veja o que os outros não veem",
    description:
      "Existe um grupo pequeno que encontra produtos validados antes de todo mundo. As vagas abrem por fase — e fecham sem aviso.",
    images: ["https://hunterx.site/og-image.png"],
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
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
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
        <ParticleBg />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JQCKWHSXVR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JQCKWHSXVR');
          `}
        </Script>
        <Script id="schema-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "name": "Hunter X",
              "applicationCategory": "WebApplication",
              "operatingSystem": "Navegador",
              "description": "SiteScope recupera o seu site que saiu do ar: cole o endereço, ajuste textos e imagens no editor e baixe o HTML pronto para publicar de novo.",
              "url": "https://hunterx.site",
              "offers": {
                "@type": "Offer",
                "price": "12.90",
                "priceCurrency": "BRL",
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/LimitedAvailability"
              },
              "featureList": ["Recupera páginas que saíram do ar", "Editor visual de textos, imagens e cores", "Preview de celular e computador", "Download do HTML pronto para publicar"],
              "screenshot": "https://hunterx.site/og-image.png"
            },
            {
              "@type": "Organization",
              "name": "Hunter X",
              "url": "https://hunterx.site",
              "logo": "https://hunterx.site/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "suporte@hunterx.site",
                "contactType": "customer support",
                "availableLanguage": "Portuguese"
              }
            }
          ]
        }) }} />
        {children}
      </body>
    </html>
  );
}
