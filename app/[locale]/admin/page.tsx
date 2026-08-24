"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../../../lib/supabase";
import type { Session } from "@supabase/supabase-js";

type Scope = "portal" | "mali" | "burkina";
type Role = "super_admin" | "mali_admin" | "burkina_admin";

type Post = {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string | null;
  excerpt_fr: string | null;
  excerpt_en: string | null;
  content_fr: string;
  content_en: string | null;
  scopes: Scope[];
  status: "draft" | "published";
  featured: boolean;
  cover_image_path: string | null;
  created_at: string;
};

const emptyDraft = {
  title_fr: "", title_en: "", excerpt_fr: "", excerpt_en: "",
  content_fr: "", content_en: "", scopes: ["portal"] as Scope[], status: "draft" as const,
  cover_image_path: "" as string,
};

const scopeLabel: Record<Scope, string> = { portal: "ECOS Sahel (portail)", mali: "ECOS Mali", burkina: "ECOS Burkina Faso" };

type MediaFile = { name: string; url: string; created_at?: string | null };

export default function AdminPage() {
  if (!supabase) {
    return <div className="admin-shell"><div className="admin-card">
      <h1>Configuration requise</h1>
      <p>Les variables NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY ne sont pas définies. Ajoutez-les dans les variables d&apos;environnement de l&apos;hébergement, puis redéployez.</p>
    </div></div>;
  }
  return <AdminInner />;
}

function AdminInner() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<typeof emptyDraft>(emptyDraft);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState<"posts" | "media">("posts");
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const contentFrRef = useRef<HTMLTextAreaElement>(null);
  const contentEnRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    supabase!.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase!.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setRole(null); return; }
    supabase!.from("profiles").select("role").eq("id", session.user.id).single()
      .then(({ data }) => setRole((data?.role as Role) ?? null));
  }, [session]);

  const loadPosts = useCallback(() => {
    if (!session) return;
    setLoadingPosts(true);
    supabase!.from("posts").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setPosts((data as Post[]) ?? []); setLoadingPosts(false); });
  }, [session]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const loadMedia = useCallback(() => {
    if (!session) return;
    setLoadingMedia(true);
    supabase!.storage.from("site-media").list("covers", { sortBy: { column: "created_at", order: "desc" } })
      .then(({ data }) => {
        const files = (data ?? []).filter((f) => f.name !== ".emptyFolderPlaceholder").map((f) => ({
          name: `covers/${f.name}`,
          url: supabase!.storage.from("site-media").getPublicUrl(`covers/${f.name}`).data.publicUrl,
          created_at: f.created_at,
        }));
        setMedia(files);
        setLoadingMedia(false);
      });
  }, [session]);

  useEffect(() => { if (view === "media") loadMedia(); }, [view, loadMedia]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  async function handleLogout() { await supabase!.auth.signOut(); }

  function startEdit(post?: Post) {
    if (post) {
      setEditingId(post.id);
      setDraft({
        title_fr: post.title_fr, title_en: post.title_en ?? "",
        excerpt_fr: post.excerpt_fr ?? "", excerpt_en: post.excerpt_en ?? "",
        content_fr: post.content_fr, content_en: post.content_en ?? "",
        scopes: post.scopes, status: post.status as "draft",
        cover_image_path: post.cover_image_path ?? "",
      });
    } else {
      setEditingId("new");
      setDraft(emptyDraft);
    }
    setSaveError("");
  }

  function toggleScope(scope: Scope) {
    setDraft((d) => ({
      ...d,
      scopes: d.scopes.includes(scope) ? d.scopes.filter((s) => s !== scope) : [...d.scopes, scope],
    }));
  }

  function slugify(s: string) {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleCoverUpload(file: File) {
    setUploading(true); setSaveError("");
    const path = `covers/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()}`;
    const { error } = await supabase!.storage.from("site-media").upload(path, file);
    setUploading(false);
    if (error) { setSaveError("Échec de l'envoi de l'image : " + error.message); return; }
    const { data } = supabase!.storage.from("site-media").getPublicUrl(path);
    setDraft((d) => ({ ...d, cover_image_path: data.publicUrl }));
  }

  async function handleInsertImage(file: File, lang: "fr" | "en") {
    setUploading(true); setSaveError("");
    const path = `covers/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()}`;
    const { error } = await supabase!.storage.from("site-media").upload(path, file);
    setUploading(false);
    if (error) { setSaveError("Échec de l'envoi de l'image : " + error.message); return; }
    const { data } = supabase!.storage.from("site-media").getPublicUrl(path);
    const markdown = `\n\n![](${data.publicUrl})\n\n`;
    const field = lang === "fr" ? "content_fr" : "content_en";
    const ref = lang === "fr" ? contentFrRef.current : contentEnRef.current;
    setDraft((d) => {
      const current = d[field] ?? "";
      const pos = ref?.selectionStart ?? current.length;
      const next = current.slice(0, pos) + markdown + current.slice(pos);
      return { ...d, [field]: next };
    });
  }

  async function handleDeleteMedia(name: string) {
    if (!confirm("Supprimer définitivement cette image ? Elle disparaîtra de tous les articles qui l'utilisent.")) return;
    await supabase!.storage.from("site-media").remove([name]);
    loadMedia();
  }

  async function notifyRevalidate() {
    try { await fetch("/api/revalidate", { method: "POST" }); } catch { /* non bloquant */ }
  }

  async function handleSave(publish: boolean) {
    if (!draft.title_fr.trim() || !draft.content_fr.trim()) { setSaveError("Le titre et le contenu (français) sont obligatoires."); return; }
    if (draft.scopes.length === 0) { setSaveError("Choisissez au moins un périmètre de publication."); return; }
    setSaving(true); setSaveError("");
    const status = publish ? "published" : "draft";
    const payload: Record<string, unknown> = {
      title_fr: draft.title_fr, title_en: draft.title_en || null,
      excerpt_fr: draft.excerpt_fr || null, excerpt_en: draft.excerpt_en || null,
      content_fr: draft.content_fr, content_en: draft.content_en || null,
      scopes: draft.scopes, status,
      cover_image_path: draft.cover_image_path || null,
      published_at: publish ? new Date().toISOString() : null,
    };
    let error;
    if (editingId === "new") {
      payload.slug = slugify(draft.title_fr) + "-" + Date.now().toString(36);
      payload.author_id = session!.user.id;
      ({ error } = await supabase!.from("posts").insert(payload));
    } else {
      ({ error } = await supabase!.from("posts").update(payload).eq("id", editingId));
    }
    setSaving(false);
    if (error) { setSaveError(error.message); return; }
    setEditingId(null);
    loadPosts();
    if (publish) notifyRevalidate();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer définitivement cet article ?")) return;
    await supabase!.from("posts").delete().eq("id", id);
    loadPosts();
    notifyRevalidate();
  }

  if (session === undefined) return <div className="admin-shell"><p>Chargement…</p></div>;

  if (!session) {
    return (
      <div className="admin-shell">
        <form className="admin-card" onSubmit={handleLogin}>
          <h1>Espace admin ECOS Sahel</h1>
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label>Mot de passe<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          {authError && <p className="admin-error">{authError}</p>}
          <button className="button" type="submit">Se connecter</button>
        </form>
      </div>
    );
  }

  const allowedScopes: Scope[] = role === "super_admin" ? ["portal", "mali", "burkina"] : role === "mali_admin" ? ["portal", "mali"] : role === "burkina_admin" ? ["portal", "burkina"] : [];

  return (
    <div className="admin-shell admin-wide">
      <div className="admin-topbar">
        <div><strong>{session.user.email}</strong> — {role ?? "rôle en cours de chargement…"}</div>
        <button className="button ghost" onClick={handleLogout}>Se déconnecter</button>
      </div>

      {!editingId && (
        <div className="admin-tabs">
          <button className={`admin-tab ${view === "posts" ? "active" : ""}`} onClick={() => setView("posts")}>Articles</button>
          <button className={`admin-tab ${view === "media" ? "active" : ""}`} onClick={() => setView("media")}>Médiathèque</button>
        </div>
      )}

      {editingId ? (
        <div className="admin-card">
          <h2>{editingId === "new" ? "Nouvel article" : "Modifier l'article"}</h2>
          <p className="admin-hint">Pour retirer une image du texte, supprimez simplement sa ligne <code>![...]</code> dans la zone de contenu.</p>
          <label>Titre (français)*<input value={draft.title_fr} onChange={(e) => setDraft({ ...draft, title_fr: e.target.value })} /></label>
          <label>Titre (anglais)<input value={draft.title_en} onChange={(e) => setDraft({ ...draft, title_en: e.target.value })} /></label>
          <label>Image de couverture
            {draft.cover_image_path && <img src={draft.cover_image_path} alt="" className="admin-cover-preview" />}
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); }} disabled={uploading} />
            {draft.cover_image_path && <button type="button" className="button ghost admin-danger admin-inline-btn" onClick={() => setDraft((d) => ({ ...d, cover_image_path: "" }))}>Retirer l&apos;image</button>}
            {uploading && <span>Envoi en cours…</span>}
          </label>
          <label>Extrait (français)<textarea rows={2} value={draft.excerpt_fr} onChange={(e) => setDraft({ ...draft, excerpt_fr: e.target.value })} /></label>
          <label>Extrait (anglais)<textarea rows={2} value={draft.excerpt_en} onChange={(e) => setDraft({ ...draft, excerpt_en: e.target.value })} /></label>
          <label>Contenu (français)*
            <textarea rows={10} ref={contentFrRef} value={draft.content_fr} onChange={(e) => setDraft({ ...draft, content_fr: e.target.value })} />
            <span className="admin-insert-image">📷 Insérer une image ici<input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleInsertImage(f, "fr"); e.target.value = ""; }} disabled={uploading} /></span>
          </label>
          <label>Contenu (anglais)
            <textarea rows={10} ref={contentEnRef} value={draft.content_en} onChange={(e) => setDraft({ ...draft, content_en: e.target.value })} />
            <span className="admin-insert-image">📷 Insérer une image ici<input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleInsertImage(f, "en"); e.target.value = ""; }} disabled={uploading} /></span>
          </label>
          <fieldset className="admin-scopes">
            <legend>Périmètre de publication</legend>
            {allowedScopes.map((scope) => (
              <label key={scope} className="admin-checkbox">
                <input type="checkbox" checked={draft.scopes.includes(scope)} onChange={() => toggleScope(scope)} /> {scopeLabel[scope]}
              </label>
            ))}
          </fieldset>
          {saveError && <p className="admin-error">{saveError}</p>}
          <div className="admin-actions">
            <button className="button ghost" onClick={() => setEditingId(null)} disabled={saving}>Annuler</button>
            <button className="button ghost" onClick={() => handleSave(false)} disabled={saving}>Enregistrer le brouillon</button>
            <button className="button" onClick={() => handleSave(true)} disabled={saving}>Publier</button>
          </div>
        </div>
      ) : view === "posts" ? (
        <>
          <div className="admin-actions"><button className="button" onClick={() => startEdit()}>+ Nouvel article</button></div>
          {loadingPosts ? <p>Chargement des articles…</p> : (
            <div className="admin-list">
              {posts.length === 0 && <p>Aucun article pour le moment.</p>}
              {posts.map((post) => (
                <div className="admin-list-item" key={post.id}>
                  <div>
                    <span className={`admin-status admin-status-${post.status}`}>{post.status === "published" ? "Publié" : "Brouillon"}</span>
                    <strong>{post.title_fr}</strong>
                    <div className="admin-scopes-tags">{post.scopes.map((s) => <span key={s} className="admin-tag">{scopeLabel[s]}</span>)}</div>
                  </div>
                  <div className="admin-actions">
                    <button className="button ghost" onClick={() => startEdit(post)}>Modifier</button>
                    <button className="button ghost admin-danger" onClick={() => handleDelete(post.id)}>Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <p className="admin-hint">Images envoyées via les articles. Supprimer une image ici la retire aussi de tout article qui l&apos;utilise encore.</p>
          {loadingMedia ? <p>Chargement…</p> : (
            <div className="admin-media-grid">
              {media.length === 0 && <p>Aucune image envoyée pour le moment.</p>}
              {media.map((m) => (
                <div className="admin-media-item" key={m.name}>
                  <img src={m.url} alt="" />
                  <button className="button ghost admin-danger" onClick={() => handleDeleteMedia(m.name)}>Supprimer</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
