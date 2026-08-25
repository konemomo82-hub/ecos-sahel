import Link from "next/link";

export default function SiteFooter({ locale }: { locale: "fr" | "en" }) {
  return (
    <footer className="footer"><div className="shell">
      © {new Date().getFullYear()} ECOS Sahel · ecos-sahel.org · <Link href={`/${locale}/admin`} style={{ opacity: .6 }}>{locale === "fr" ? "Espace admin" : "Admin"}</Link>
    </div></footer>
  );
}
