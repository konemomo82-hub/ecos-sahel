import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { antennas } from "../../../../data/site";
import { supabase } from "../../../../lib/supabase";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";

export const dynamic = "force-dynamic";

const scopeLabel = { portal: "ECOS Sahel", mali: "ECOS Mali", burkina: "ECOS Burkina Faso" } as const;

async function getPost(slug: string) {
  if (!supabase) return null;
  const { data } = await supabase.from("posts").select("*").eq("slug", slug).eq("status", "published").single();
  return data;
}

async function getRelated(slug: string, scopes: string[]) {
  if (!supabase) return null;
  const antennaScope = scopes.find((s) => s === "mali" || s === "burkina");
  if (!antennaScope) return null;
  const { data } = await supabase
    .from("posts")
    .select("id, slug, title_fr, title_en")
    .eq("status", "published")
    .contains("scopes", [antennaScope])
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(4);
  return { antennaScope: antennaScope as "mali" | "burkina", items: data ?? [] };
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: "fr" | "en"; slug: string }> }
): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = (locale === "en" && post.title_en) || post.title_fr;
  const description = (locale === "en" && post.excerpt_en) || post.excerpt_fr || undefined;
  return { title: `${title} | ECOS Sahel`, description };
}

export default async function ArticlePage(
  { params }: { params: Promise<{ locale: "fr" | "en"; slug: string }> }
) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const title = (locale === "en" && post.title_en) || post.title_fr;
  const body = (locale === "en" && post.content_en) || post.content_fr;
  const scope = post.scopes.includes("portal") ? "portal" : post.scopes[0];
  const related = await getRelated(slug, post.scopes);

  return <>
    <SiteHeader locale={locale} />
    <main>
      <article className="section white"><div className="shell article-shell">
        <Link href={`/${locale}#actualites`} className="article-back">{locale === "fr" ? "← Retour aux actualités" : "← Back to news"}</Link>
        <div className="tag">{scopeLabel[scope as keyof typeof scopeLabel]}</div>
        <h1>{title}</h1>
        {post.cover_image_path && <img src={post.cover_image_path} alt="" className="article-cover" />}
        <div className="article-body"><ReactMarkdown>{body}</ReactMarkdown></div>
      </div></article>
      {related && related.items.length > 0 && (
        <section className="section"><div className="shell article-shell">
          <h2>{locale === "fr" ? `Autres articles ${antennas[related.antennaScope].name}` : `More from ${antennas[related.antennaScope].name}`}</h2>
          <ul className="related-list">
            {related.items.map((item) => (
              <li key={item.id}><Link href={`/${locale}/actualites/${item.slug}`}>{(locale === "en" && item.title_en) || item.title_fr}</Link></li>
            ))}
          </ul>
          <Link href={`/${locale}/${related.antennaScope === "mali" ? "ecos-mali" : "ecos-burkina"}`} className="article-back">
            {locale === "fr" ? `Voir tous les articles ${antennas[related.antennaScope].name} →` : `See all ${antennas[related.antennaScope].name} articles →`}
          </Link>
        </div></section>
      )}
    </main>
    <SiteFooter locale={locale} />
  </>;
}
