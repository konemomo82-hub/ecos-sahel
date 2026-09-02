import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ecos-sahel.org"),
  title: {
    default: "ECOS Sahel | Éducation, cohésion sociale et résilience",
    template: "%s | ECOS Sahel",
  },
  description: "ECOS Mali et ECOS Burkina Faso, engagés pour un Sahel plus juste.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#176b4d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}

