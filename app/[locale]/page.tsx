import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { content, initialPosts, gallery, antennas, about, resources, donation } from "../../data/site";
import { supabase } from "../../lib/supabase";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ContactForm from "../components/ContactForm";

type Post = { id: string; slug: string; title_fr: string; title_en: string | null; excerpt_fr: string | null; excerpt_en: string | null; scopes: ("portal" | "mali" | "burkina")[]; cover_image_path: string | null };

export function generateStaticParams() { return [{ locale: "fr" }, { locale: "en" }]; }
export const dynamic = "force-dynamic";

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

  let posts: { title: string; excerpt: string; scope: "portal" | "mali" | "burkina"; cover: string | null; slug: string | null }[] = (initialPosts as { title: string; excerpt: string; scope: "portal" | "mali" | "burkina" }[]).map((p) => ({ ...p, cover: null, slug: null }));
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("id, slug, title_fr, title_en, excerpt_fr, excerpt_en, scopes, cover_image_path")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(6);
    if (data && data.length > 0) {
      posts = (data as Post[]).flatMap((p) =>
        p.scopes.map((scope) => ({
          title: (locale === "en" && p.title_en) || p.title_fr,
          excerpt: (locale === "en" && p.excerpt_en) || p.excerpt_fr || "",
          scope,
          cover: p.cover_image_path,
          slug: p.slug,
        }))
      );
    }
  }
  return <>
    <SiteHeader locale={locale} />
    <main>
      <section className="hero"><div className="shell"><div className="eyebrow">ECOS Mali · ECOS Burkina Faso</div><h1>{copy.heroTitle}</h1><p className="lead">{copy.heroText}</p><div className="actions"><a className="button" href="#programmes">{locale === "fr" ? "Découvrir nos actions" : "Discover our work"}</a><a className="button donate" href="#don">{locale === "fr" ? "Faire un don" : "Make a donation"}</a><a className="button ghost" href="#contact">{locale === "fr" ? "Devenir partenaire" : "Become a partner"}</a></div></div></section>
      <section id="a-propos" className="section"><div className="shell">
        <h2>{locale === "fr" ? "À propos d'ECOS Sahel" : "About ECOS Sahel"}</h2>
        <p className="section-lead">{locale === "en" ? about.intro_en : about.intro_fr}</p>
        <div className="about-story">{(locale === "en" ? about.story_en : about.story_fr).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="grid about-values">{(locale === "en" ? about.values_en : about.values_fr).map(([title, text]) => <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="about-finance">{locale === "en" ? about.finance_en : about.finance_fr}</p>
      </div></section>
      <section className="section white"><div className="shell"><h2>{locale === "fr" ? "Notre impact en 2024" : "Our impact in 2024"}</h2><div className="grid">{[["50", locale === "fr" ? "enfants suivis via les bibliothèques" : "children supported through the libraries"],["52", locale === "fr" ? "jeunes formés à l'agropastoral" : "young people trained in agropastoral skills"],["48", locale === "fr" ? "séances de bibliothèque tenues" : "library sessions held"],["10", locale === "fr" ? "formateurs climat certifiés" : "certified climate trainers"]].map(([n,label])=><div className="card" key={label}><div className="stat">{n}</div><div>{label}</div></div>)}</div><p className="impact-source">{locale === "fr" ? "Chiffres ECOS Mali, rapport moral 2024." : "ECOS Mali figures, 2024 activity report."}</p></div></section>
      <section id="programmes" className="section"><div className="shell"><h2>{locale === "fr" ? "Nos programmes" : "Our programmes"}</h2><div className="grid">{copy.programs.map(([title, text])=><article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section id="actualites" className="section white"><div className="shell"><h2>{locale === "fr" ? "Actualités" : "News"}</h2><div className="post-grid">{posts.map((post, i)=>{
        const inner = <>{post.cover && <img src={post.cover} alt="" className="post-cover" />}<div className="tag">{post.scope === "portal" ? "ECOS Sahel" : post.scope === "mali" ? "ECOS Mali" : "ECOS Burkina Faso"}</div><h3>{post.title}</h3><p>{post.excerpt}</p>{post.slug && <span className="post-readmore">{locale === "fr" ? "Lire l'article →" : "Read article →"}</span>}</>;
        if (!post.slug) return <article className="card post" key={post.title + i}>{inner}</article>;
        const href = post.scope === "mali" ? `/${locale}/ecos-mali#${post.slug}`
          : post.scope === "burkina" ? `/${locale}/ecos-burkina#${post.slug}`
          : `/${locale}/actualites/${post.slug}`;
        return <Link href={href} className="card post" key={post.title + i}>{inner}</Link>;
      })}</div></div></section>
      <section id="galerie" className="section"><div className="shell"><h2>{locale === "fr" ? "Nos actions en images" : "Our work in pictures"}</h2><div className="gallery">{gallery.map((photo) => <figure className="gallery-item" key={photo.src}><Image src={photo.src} alt={locale === "fr" ? photo.alt_fr : photo.alt_en} width={480} height={360} /><figcaption>{locale === "fr" ? photo.alt_fr : photo.alt_en}</figcaption></figure>)}</div></div></section>
      <section id="ressources" className="section white"><div className="shell">
        <h2>{locale === "fr" ? "Ressources" : "Resources"}</h2>
        <p className="section-lead">{locale === "fr" ? "Les documents de référence des deux associations. Ceux qui ne sont pas encore en ligne le seront prochainement." : "Reference documents for both associations. Those not yet online will be published shortly."}</p>
        <div className="resource-list" style={{ marginTop: 32 }}>{resources.map((resource) => {
          const title = (locale === "en" && resource.title_en) || resource.title_fr;
          const inner = <><h3>{title}</h3><p>{(locale === "en" && resource.desc_en) || resource.desc_fr}</p>{resource.file
            ? <span className="resource-link">{locale === "fr" ? "Télécharger →" : "Download →"}</span>
            : <span className="resource-soon">{locale === "fr" ? "Bientôt disponible" : "Coming soon"}</span>}</>;
          return resource.file
            ? <a className="card resource-item" href={resource.file} target="_blank" rel="noopener noreferrer" key={title}>{inner}</a>
            : <div className="card resource-item" key={title}>{inner}</div>;
        })}</div>
      </div></section>
      <section id="don" className="section white"><div className="shell">
        <h2>{locale === "fr" ? "Faire un don" : "Make a donation"}</h2>
        <p className="section-lead">{locale === "fr" ? "Chaque don, quel que soit son montant, finance directement une action de terrain, jamais des frais de structure." : "Every donation, whatever the amount, funds a field action directly, never overhead costs."}</p>
        <div className="grid donation-grid">
          <article className="card donation-card">
            <h3>ECOS Mali</h3>
            <p className="donation-label">{locale === "fr" ? "Mobile money" : "Mobile money"}</p>
            <p className="donation-value">{donation.mali.mobileMoney}</p>
            <p className="donation-providers">{donation.mali.providers.join(" · ")}</p>
          </article>
          <article className="card donation-card">
            <h3>ECOS Burkina Faso</h3>
            <p className="donation-label">{locale === "fr" ? "Mobile money" : "Mobile money"}</p>
            <p className="donation-value">{donation.burkina.mobileMoney}</p>
            <p className="donation-providers">{donation.burkina.providers.join(" · ")}</p>
          </article>
          <article className="card donation-card donation-bank">
            <h3>{locale === "fr" ? "Virement bancaire (ECOS Mali)" : "Bank transfer (ECOS Mali)"}</h3>
            <p className="donation-label">{donation.mali.bank.name}, {donation.mali.bank.agency}</p>
            <table className="donation-rib">
              <tbody>
                <tr><td>{locale === "fr" ? "Code banque" : "Bank code"}</td><td>{donation.mali.bank.codeBanque}</td></tr>
                <tr><td>{locale === "fr" ? "Code guichet" : "Branch code"}</td><td>{donation.mali.bank.codeGuichet}</td></tr>
                <tr><td>{locale === "fr" ? "N° de compte" : "Account number"}</td><td>{donation.mali.bank.numeroCompte}</td></tr>
                <tr><td>{locale === "fr" ? "Clé RIB" : "RIB key"}</td><td>{donation.mali.bank.cleRib}</td></tr>
                <tr><td>BIC</td><td>{donation.mali.bank.bic}</td></tr>
              </tbody>
            </table>
            <p className="donation-address">{donation.mali.bank.address_fr}</p>
          </article>
        </div>
      </div></section>
      <section id="contact" className="section"><div className="shell"><h2>{locale === "fr" ? "Deux ancrages, une vision" : "Two anchors, one vision"}</h2><div className="grid">
        <Link href={`/${locale}/ecos-mali`} className="card anchor-card"><Image src={antennas.mali.logo} alt="ECOS Mali" width={90} height={63} /><h3>ECOS Mali</h3><p>{antennas.mali.location_fr}<br />{antennas.mali.lead_fr}</p></Link>
        <Link href={`/${locale}/ecos-burkina`} className="card anchor-card"><Image src={antennas.burkina.logo} alt="ECOS Burkina Faso" width={90} height={44} /><h3>ECOS Burkina Faso</h3><p>{antennas.burkina.location_fr}<br />{antennas.burkina.lead_fr}</p></Link>
      </div>
      <div className="contact-form-wrap">
        <h3>{locale === "fr" ? "Nous contacter" : "Get in touch"}</h3>
        <p className="section-lead">{locale === "fr" ? "Une question, un projet de partenariat, une envie de soutenir nos actions ? Écrivez-nous." : "A question, a partnership idea, or you'd like to support our work? Write to us."}</p>
        <ContactForm locale={locale} />
      </div>
      </div></section>
    </main>
    <SiteFooter locale={locale} />
  </>;
}

