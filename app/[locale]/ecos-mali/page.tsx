import type { Metadata } from "next";
import { renderAntennaPage } from "../../components/AntennaPage";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: "fr" | "en" }> }
): Promise<Metadata> {
  const { locale } = await params;
  return { title: "ECOS Mali | ECOS Sahel", description: locale === "en" ? "News and work from ECOS Mali." : "Actualités et actions d'ECOS Mali." };
}

export default async function EcosMaliPage({ params }: { params: Promise<{ locale: "fr" | "en" }> }) {
  const { locale } = await params;
  return renderAntennaPage("mali", locale);
}
