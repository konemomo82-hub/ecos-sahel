import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECOS Sahel | Ã‰ducation, cohÃ©sion sociale et rÃ©silience",
  description: "ECOS Mali et ECOS Burkina Faso, engagÃ©s pour un Sahel plus juste.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}

