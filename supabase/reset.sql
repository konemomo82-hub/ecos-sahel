-- À exécuter EN PREMIER dans le SQL Editor pour repartir de zéro proprement.
-- Supprime tout ce qui aurait pu être créé par des tentatives précédentes.

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop function if exists public.current_user_role();

drop policy if exists "admins can upload site media" on storage.objects;
drop policy if exists "public can view site media" on storage.objects;

drop table if exists public.media cascade;
drop table if exists public.posts cascade;
drop table if exists public.profiles cascade;

drop type if exists public.publication_scope;
drop type if exists public.user_role;
