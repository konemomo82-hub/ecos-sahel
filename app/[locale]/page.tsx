import Link from "next/link";
import { content, initialPosts } from "../../data/site";

export function generateStaticParams() { return [{ locale: "fr" }, { locale: "en" }]; }

export default async function Home({ params }: { params: Promise<{ locale: "fr" | "en" }> }) {
  const { locale } = await params;
  const copy = content[locale] ?? content.fr;
  return <>
    <header className="header"><div className="shell header-inner">
      <Link href={`/${locale}`} className="brand">ECOS SAHEL<small>Ã‰ducation Â· CohÃ©sion sociale Â· RÃ©silience</small></Link>
      <nav className="nav">{copy.nav.map((item) => <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>{item}</a>)}</nav>
      <div className="locale"><Link href="/fr">FR</Link> Â· <Link href="/en">EN</Link></div>
    </div></header>
    <main>
      <section className="hero"><div className="shell"><div className="eyebrow">ECOS Mali Â· ECOS Burkina Faso</div><h1>{copy.heroTitle}</h1><p className="lead">{copy.heroText}</p><div className="actions"><a className="button" href="#programmes">{locale === "fr" ? "DÃ©couvrir nos actions" : "Discover our work"}</a><a className="button ghost" href="#contact">{locale === "fr" ? "Devenir partenaire" : "Become a partner"}</a></div></div></section>
      <section className="section white"><div className="shell"><h2>{locale === "fr" ? "Notre impact en 2024" : "Our impact in 2024"}</h2><div className="grid">{[["50", locale === "fr" ? "enfants accompagnÃ©s" : "children supported"],["52", locale === "fr" ? "jeunes formÃ©s" : "young people trained"],["48", locale === "fr" ? "bibliothÃ¨ques de rue" : "street libraries"],["10", locale === "fr" ? "formateurs climat" : "climate trainers"]].map(([n,label])=><div className="card" key={label}><div className="stat">{n}</div><div>{label}</div></div>)}</div></div></section>
      <section id="programmes" className="section"><div className="shell"><h2>{locale === "fr" ? "Nos programmes" : "Our programmes"}</h2><div className="grid">{copy.programs.map(([title, text])=><article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section id="actualitÃ©s" className="section white"><div className="shell"><h2>{locale === "fr" ? "ActualitÃ©s" : "News"}</h2><div className="post-grid">{initialPosts.map((post)=><article className="card post" key={post.title}><div className="tag">{post.scope === "portal" ? "ECOS Sahel" : post.scope === "mali" ? "ECOS Mali" : "ECOS Burkina Faso"}</div><h3>{post.title}</h3><p>{post.excerpt}</p></article>)}</div></div></section>
      <section id="contact" className="section"><div className="shell"><h2>{locale === "fr" ? "Deux ancrages, une vision" : "Two anchors, one vision"}</h2><div className="grid"><article className="card"><h3>ECOS Mali</h3><p>Bamako, Mali<br />PrÃ©sident : EsaÃ¯e KamatÃ©</p></article><article className="card"><h3>ECOS Burkina Faso</h3><p>Ouagadougou, Burkina Faso<br />PrÃ©sident : Ibrahima KONE</p></article></div></div></section>
    </main><footer className="footer"><div className="shell">Â© {new Date().getFullYear()} ECOS Sahel Â· ecos-sahel.org</div></footer>
  </>;
}

