-- À exécuter APRÈS schema.sql, dans l'éditeur SQL de Supabase.
-- Ajoute : la création automatique du profil à l'inscription,
-- et les règles d'accès (qui peut lire/écrire quoi selon son rôle).

-- 1. Fonction utilitaire : le rôle de l'utilisateur connecté (évite la récursion RLS)
create or replace function public.current_user_role()
returns public.user_role
language sql security definer stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- 2. Création automatique du profil à l'inscription d'un compte
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'mali_admin')
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Règles d'accès sur les articles (posts)
create policy "admins read all posts" on public.posts
  for select using (public.current_user_role() is not null);

create policy "admins insert posts within their scope" on public.posts
  for insert with check (
    public.current_user_role() = 'super_admin'
    or (public.current_user_role() = 'mali_admin' and scopes && array['mali','portal']::public.publication_scope[])
    or (public.current_user_role() = 'burkina_admin' and scopes && array['burkina','portal']::public.publication_scope[])
  );

create policy "admins update posts within their scope" on public.posts
  for update using (
    public.current_user_role() = 'super_admin'
    or (public.current_user_role() = 'mali_admin' and scopes && array['mali','portal']::public.publication_scope[])
    or (public.current_user_role() = 'burkina_admin' and scopes && array['burkina','portal']::public.publication_scope[])
  );

create policy "admins delete posts within their scope" on public.posts
  for delete using (
    public.current_user_role() = 'super_admin'
    or (public.current_user_role() = 'mali_admin' and scopes && array['mali','portal']::public.publication_scope[])
    or (public.current_user_role() = 'burkina_admin' and scopes && array['burkina','portal']::public.publication_scope[])
  );

-- 4. Médias : tout admin connecté peut gérer les fichiers
create policy "admins manage media" on public.media
  for all using (public.current_user_role() is not null)
  with check (public.current_user_role() is not null);

-- 5. Storage : bucket public pour les images du site
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "public can view site media" on storage.objects
  for select using (bucket_id = 'site-media');

create policy "admins can upload site media" on storage.objects
  for insert with check (bucket_id = 'site-media' and public.current_user_role() is not null);
