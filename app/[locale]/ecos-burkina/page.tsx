import type { Metadata } from "next";
import { renderAntennaPage } from "../../components/AntennaPage";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: "fr" | "en" }> }
): Promise<Metadata> {
  const { locale } = await params;
  return { title: "ECOS Burkina Faso | ECOS Sahel", description: locale === "en" ? "News and work from ECOS Burkina Faso." : "Actualités et actions d'ECOS Burkina Faso." };
}

export default async function EcosBurkinaPage({ params }: { params: Promise<{ locale: "fr" | "en" }> }) {
  const { locale } = await params;
  return renderAntennaPage("burkina", locale);
}
