import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { content, initialPosts, gallery } from "../../data/site";
import { supabase } from "../../lib/supabase";

type Post = { id: string; title_fr: string; title_en: string | null; excerpt_fr: string | null; excerpt_en: string | null; scopes: ("portal" | "mali" | "burkina")[] };

export function generateStaticParams() { return [{ locale: "fr" }, { locale: "en" }]; }
export const revalidate = 300;

export async function generateMetadata(
  { params }: { params: Promise<{ locale: "fr" | "en" }> }
): Promise<Metadata> {
  const { locale } = await params;
  const copy = content[locale] ?? content.fr;
  const title = "ECOS Sahel | " + copy.heroTitle;
  return {
    title,
    description: copy.heroText,
    alternates: {
      canonical: `https://ecos-sahel.org/${locale}`,
      languages: { fr: "https://ecos-sahel.org/fr", en: "https://ecos-sahel.org/en" },
    },
    openGraph: { title, description: copy.heroText, locale: locale === "fr" ? "fr_FR" : "en_US" },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: "fr" | "en" }> }) {
  const { locale } = await params;
  const copy = content[locale] ?? content.fr;

  let posts: { title: string; excerpt: string; scope: "portal" | "mali" | "burkina" }[] = initialPosts as never;
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("id, title_fr, title_en, excerpt_fr, excerpt_en, scopes")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(6);
    if (data && data.length > 0) {
      posts = (data as Post[]).flatMap((p) =>
        p.scopes.map((scope) => ({
          title: (locale === "en" && p.title_en) || p.title_fr,
          excerpt: (locale === "en" && p.excerpt_en) || p.excerpt_fr || "",
          scope,
        }))
      );
    }
  }
  return <>
    <header className="header"><div className="shell header-inner">
      <Link href={`/${locale}`} className="brand">
        <Image src="/logos/logo-ecos-sahel.png" alt="ECOS Sahel" width={44} height={31} className="brand-logo" priority />
        <span>ECOS SAHEL<small>Éducation · Cohésion sociale · Résilience</small></span>
      </Link>
      <nav className="nav">{copy.nav.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}</nav>
      <div className="locale"><Link href="/fr">FR</Link> · <Link href="/en">EN</Link></div>
    </div></header>
    <main>
      <section className="hero"><div className="shell"><div className="eyebrow">ECOS Mali · ECOS Burkina Faso</div><h1>{copy.heroTitle}</h1><p className="lead">{copy.heroText}</p><div className="actions"><a className="button" href="#programmes">{locale === "fr" ? "Découvrir nos actions" : "Discover our work"}</a><a className="button ghost" href="#contact">{locale === "fr" ? "Devenir partenaire" : "Become a partner"}</a></div></div></section>
      <section className="section white"><div className="shell"><h2>{locale === "fr" ? "Notre impact en 2024" : "Our impact in 2024"}</h2><div className="grid">{[["50", locale === "fr" ? "enfants accompagnés" : "children supported"],["52", locale === "fr" ? "jeunes formés" : "young people trained"],["48", locale === "fr" ? "bibliothèques de rue" : "street libraries"],["10", locale === "fr" ? "formateurs climat" : "climate trainers"]].map(([n,label])=><div className="card" key={label}><div className="stat">{n}</div><div>{label}</div></div>)}</div></div></section>
      <section id="programmes" className="section"><div className="shell"><h2>{locale === "fr" ? "Nos programmes" : "Our programmes"}</h2><div className="grid">{copy.programs.map(([title, text])=><article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section id="actualites" className="section white"><div className="shell"><h2>{locale === "fr" ? "Actualités" : "News"}</h2><div className="post-grid">{posts.map((post, i)=><article className="card post" key={post.title + i}><div className="tag">{post.scope === "portal" ? "ECOS Sahel" : post.scope === "mali" ? "ECOS Mali" : "ECOS Burkina Faso"}</div><h3>{post.title}</h3><p>{post.excerpt}</p></article>)}</div></div></section>
      <section id="galerie" className="section"><div className="shell"><h2>{locale === "fr" ? "Nos actions en images" : "Our work in pictures"}</h2><div className="gallery">{gallery.map((photo) => <figure className="gallery-item" key={photo.src}><Image src={photo.src} alt={locale === "fr" ? photo.alt_fr : photo.alt_en} width={480} height={360} /><figcaption>{locale === "fr" ? photo.alt_fr : photo.alt_en}</figcaption></figure>)}</div></div></section>
      <section id="contact" className="section white"><div className="shell"><h2>{locale === "fr" ? "Deux ancrages, une vision" : "Two anchors, one vision"}</h2><div className="grid"><article className="card anchor-card"><Image src="/logos/logo-ecos-mali.png" alt="ECOS Mali" width={90} height={63} /><h3>ECOS Mali</h3><p>Bamako, Mali<br />Président : Esaïe Kamaté</p></article><article className="card anchor-card"><Image src="/logos/logo-ecos-burkina.png" alt="ECOS Burkina Faso" width={90} height={44} /><h3>ECOS Burkina Faso</h3><p>Ouagadougou, Burkina Faso<br />Président : Ibrahima KONE</p></article></div></div></section>
    </main><footer className="footer"><div className="shell">© {new Date().getFullYear()} ECOS Sahel · ecos-sahel.org · <Link href={`/${locale}/admin`} style={{opacity:.6}}>{locale === "fr" ? "Espace admin" : "Admin"}</Link></div></footer>
  </>;
}

