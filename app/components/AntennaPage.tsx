import Link from "next/link";
import Image from "next/image";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { antennas, gallery } from "../../data/site";
import { supabase } from "../../lib/supabase";

type Scope = "portal" | "mali" | "burkina";
type Post = { id: string; slug: string; title_fr: string; title_en: string | null; excerpt_fr: string | null; excerpt_en: string | null; cover_image_path: string | null };

export async function renderAntennaPage(scopeKey: "mali" | "burkina", locale: "fr" | "en") {
  const antenna = antennas[scopeKey];
  const missions = locale === "en" ? antenna.missions_en : antenna.missions_fr;
  const plaquette = locale === "en" ? antenna.plaquette_en : antenna.plaquette_fr;
  const photos = gallery.filter((photo) => photo.antenna === scopeKey);

  let posts: Post[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("id, slug, title_fr, title_en, excerpt_fr, excerpt_en, cover_image_path")
      .eq("status", "published")
      .contains("scopes", [scopeKey] as Scope[])
      .order("published_at", { ascending: false });
    posts = (data as Post[]) ?? [];
  }

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="hero antenna-hero"><div className="shell">
          <Image src={antenna.logo} alt={antenna.name} width={110} height={78} className="antenna-hero-logo" />
          <h1>{antenna.name}</h1>
          <p className="lead">{locale === "en" ? antenna.intro_en : antenna.intro_fr}</p>
          <p className="antenna-meta">{locale === "en" ? antenna.location_en : antenna.location_fr} · {locale === "en" ? antenna.lead_en : antenna.lead_fr}</p>
        </div></section>
        <section className="section white"><div className="shell">
          <h2>{locale === "fr" ? "L'association en quelques mots" : "The association in brief"}</h2>
          {/* lang explicite : la césure automatique du texte justifié dépend de la
              langue, et le <html> racine est figé sur fr pour les deux locales. */}
          <div className="plaquette" lang={locale}>
            {plaquette.map((paragraphe) => <p key={paragraphe.slice(0, 48)}>{paragraphe}</p>)}
          </div>
        </div></section>
        <section className="section"><div className="shell">
          <h2>{locale === "fr" ? "Nos actions sur le terrain" : "Our work on the ground"}</h2>
          <div className="antenna-missions">{missions.map((m) => (
            <article className="card mission-card" key={m.title}>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <ul className="mission-points">{m.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}</div>
        </div></section>
        <section className="section white"><div className="shell">
          <h2>{locale === "fr" ? "Toutes les actualités" : "All news"}</h2>
          {posts.length === 0 && <p>{locale === "fr" ? "Aucun article publié pour le moment." : "No published articles yet."}</p>}
          <div className="post-grid">
            {posts.map((post) => {
              const title = (locale === "en" && post.title_en) || post.title_fr;
              const excerpt = (locale === "en" && post.excerpt_en) || post.excerpt_fr || "";
              return (
                <Link href={`/${locale}/actualites/${post.slug}`} className="card post" id={post.slug} key={post.id}>
                  {post.cover_image_path && <img src={post.cover_image_path} alt="" className="post-cover" />}
                  <h3>{title}</h3>
                  <p>{excerpt}</p>
                  <span className="post-readmore">{locale === "fr" ? "Lire l'article →" : "Read article →"}</span>
                </Link>
              );
            })}
          </div>
        </div></section>
        {photos.length > 0 && (
          <section className="section"><div className="shell">
            <h2>{locale === "fr" ? `${antenna.name} en images` : `${antenna.name} in pictures`}</h2>
            <div className="gallery">{photos.map((photo) => (
              <figure className="gallery-item" key={photo.src}>
                <Image src={photo.src} alt={locale === "en" ? photo.alt_en : photo.alt_fr} width={480} height={360} />
                <figcaption>{locale === "en" ? photo.alt_en : photo.alt_fr}</figcaption>
              </figure>
            ))}</div>
          </div></section>
        )}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
