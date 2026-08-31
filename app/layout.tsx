import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ecos-sahel.org"),
  title: {
    default: "ECOS Sahel | Éducation, cohésion sociale et résilience",
    template: "%s | ECOS Sahel",
  },
  description: "ECOS Mali et ECOS Burkina Faso, engagés pour un Sahel plus juste.",
  // Aperçu affiché quand un lien du site est partagé (WhatsApp, Facebook, LinkedIn, X).
  // Régénérer l'image avec `npm run og:image` après un changement de logo ou de photo.
  openGraph: {
    type: "website",
    siteName: "ECOS Sahel",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ECOS Sahel — Éducation, cohésion sociale et résilience" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#176b4d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}

