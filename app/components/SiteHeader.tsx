"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { content } from "../../data/site";

export default function SiteHeader({ locale }: { locale: "fr" | "en" }) {
  const copy = content[locale] ?? content.fr;
  const [open, setOpen] = useState(false);

  const navLinks = copy.nav.map((item) =>
    "path" in item && item.path
      ? <Link href={`/${locale}/${item.path}`} key={item.id} onClick={() => setOpen(false)}>{item.label}</Link>
      : <a href={`/${locale}#${item.id}`} key={item.id} onClick={() => setOpen(false)}>{item.label}</a>
  );

  return (
    <header className="header"><div className="shell header-inner">
      <Link href={`/${locale}`} className="brand" onClick={() => setOpen(false)}>
        <Image src="/logos/logo-ecos-sahel.png" alt="ECOS Sahel" width={44} height={31} className="brand-logo" priority />
        <span>ECOS SAHEL<small>Éducation · Cohésion sociale · Résilience</small></span>
      </Link>

      <nav className="nav nav-desktop">{navLinks}</nav>
      <div className="locale locale-desktop"><Link href="/fr">FR</Link> · <Link href="/en">EN</Link></div>

      <button
        className={`menu-toggle ${open ? "is-open" : ""}`}
        aria-label={open ? (locale === "fr" ? "Fermer le menu" : "Close menu") : (locale === "fr" ? "Ouvrir le menu" : "Open menu")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
    </div>

    <div className={`mobile-menu ${open ? "is-open" : ""}`}>
      <nav className="mobile-nav">{navLinks}</nav>
      <div className="locale mobile-locale"><Link href="/fr" onClick={() => setOpen(false)}>FR</Link> · <Link href="/en" onClick={() => setOpen(false)}>EN</Link></div>
    </div>
    </header>
  );
}
