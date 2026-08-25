import Link from "next/link";
import Image from "next/image";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { antennas } from "../../data/site";
import { supabase } from "../../lib/supabase";

type Scope = "portal" | "mali" | "burkina";
type Post = { id: string; slug: string; title_fr: string; title_en: string | null; excerpt_fr: string | null; excerpt_en: string | null; cover_image_path: string | null };

export async function renderAntennaPage(scopeKey: "mali" | "burkina", locale: "fr" | "en") {
  const antenna = antennas[scopeKey];

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
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
