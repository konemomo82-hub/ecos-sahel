-- À exécuter dans le SQL Editor de Supabase, après schema.sql et policies.sql.
-- Ajoute la table qui reçoit les messages du formulaire de contact du site.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text,
  scope public.publication_scope not null default 'portal',
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- N'importe quel visiteur du site (même non connecté) peut envoyer un message.
create policy "anyone can submit a contact message" on public.contact_messages
  for insert with check (true);

-- Seuls les comptes admin connectés peuvent lire, marquer comme lu, ou supprimer les messages.
create policy "admins read contact messages" on public.contact_messages
  for select using (public.current_user_role() is not null);

create policy "admins update contact messages" on public.contact_messages
  for update using (public.current_user_role() is not null);

create policy "admins delete contact messages" on public.contact_messages
  for delete using (public.current_user_role() is not null);
