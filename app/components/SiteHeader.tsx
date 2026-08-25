import Link from "next/link";
import Image from "next/image";
import { content } from "../../data/site";

export default function SiteHeader({ locale }: { locale: "fr" | "en" }) {
  const copy = content[locale] ?? content.fr;
  return (
    <header className="header"><div className="shell header-inner">
      <Link href={`/${locale}`} className="brand">
        <Image src="/logos/logo-ecos-sahel.png" alt="ECOS Sahel" width={44} height={31} className="brand-logo" priority />
        <span>ECOS SAHEL<small>Éducation · Cohésion sociale · Résilience</small></span>
      </Link>
      <nav className="nav">{copy.nav.map((item) =>
        "path" in item && item.path
          ? <Link href={`/${locale}/${item.path}`} key={item.id}>{item.label}</Link>
          : <a href={`/${locale}#${item.id}`} key={item.id}>{item.label}</a>
      )}</nav>
      <div className="locale"><Link href="/fr">FR</Link> · <Link href="/en">EN</Link></div>
    </div></header>
  );
}
