import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        // CSP estrito para o site — exceto o editor do SiteScope.
        source: "/((?!sitescope-editor\\.html).*)",
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://hunterx.site https://translate.googleapis.com; frame-ancestors 'self';" },
        ],
      },
      {
        // O editor renderiza a página do cliente num iframe srcdoc, que herda
        // este CSP. Fontes, vídeos e iframes externos precisam passar, senão a
        // página abre quebrada. script-src continua preso a 'self': o JS do
        // site editado não roda — nem precisa, e não pode tocar no hunterx.site.
        source: "/sitescope-editor.html",
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https: data:; font-src 'self' https: data:; img-src 'self' https: http: data: blob:; media-src 'self' https: data: blob:; frame-src 'self' https:; connect-src 'self' https:; frame-ancestors 'self';" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/777',
        destination: '/777.html',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui.aceternity.com",
      },
    ],
  },
};

export default nextConfig;
