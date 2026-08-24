import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { content } from "../../../../data/site";
import { supabase } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

const scopeLabel = { portal: "ECOS Sahel", mali: "ECOS Mali", burkina: "ECOS Burkina Faso" } as const;

async function getPost(slug: string) {
  if (!supabase) return null;
  const { data } = await supabase.from("posts").select("*").eq("slug", slug).eq("status", "published").single();
  return data;
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
  const copy = content[locale] ?? content.fr;
  const post = await getPost(slug);
  if (!post) notFound();

  const title = (locale === "en" && post.title_en) || post.title_fr;
  const body = (locale === "en" && post.content_en) || post.content_fr;
  const scope = post.scopes.includes("portal") ? "portal" : post.scopes[0];

  return <>
    <header className="header"><div className="shell header-inner">
      <Link href={`/${locale}`} className="brand">
        <Image src="/logos/logo-ecos-sahel.png" alt="ECOS Sahel" width={44} height={31} className="brand-logo" priority />
        <span>ECOS SAHEL<small>Éducation · Cohésion sociale · Résilience</small></span>
      </Link>
      <nav className="nav">{copy.nav.map((item) => <a href={`/${locale}#${item.id}`} key={item.id}>{item.label}</a>)}</nav>
      <div className="locale"><Link href="/fr">FR</Link> · <Link href="/en">EN</Link></div>
    </div></header>
    <main>
      <article className="section white"><div className="shell article-shell">
        <Link href={`/${locale}#actualites`} className="article-back">{locale === "fr" ? "← Retour aux actualités" : "← Back to news"}</Link>
        <div className="tag">{scopeLabel[scope as keyof typeof scopeLabel]}</div>
        <h1>{title}</h1>
        {post.cover_image_path && <img src={post.cover_image_path} alt="" className="article-cover" />}
        <div className="article-body"><ReactMarkdown>{body}</ReactMarkdown></div>
      </div></article>
    </main>
    <footer className="footer"><div className="shell">© {new Date().getFullYear()} ECOS Sahel · ecos-sahel.org</div></footer>
  </>;
}
