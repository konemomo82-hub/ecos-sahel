-- Run this script in the Supabase SQL Editor before enabling the editorial dashboard.
create type public.user_role as enum ('super_admin', 'mali_admin', 'burkina_admin');
create type public.publication_scope as enum ('portal', 'mali', 'burkina');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null default 'mali_admin',
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_fr text not null,
  title_en text,
  excerpt_fr text,
  excerpt_en text,
  content_fr text not null,
  content_en text,
  scopes public.publication_scope[] not null default array['portal']::public.publication_scope[],
  status text not null check (status in ('draft','published')) default 'draft',
  featured boolean not null default false,
  cover_image_path text,
  published_at timestamptz,
  author_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  alt_fr text,
  alt_en text,
  scope public.publication_scope not null default 'portal',
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
alter table public.profiles enable row level security;
alter table public.media enable row level security;

create policy "published posts are public" on public.posts for select using (status = 'published');
create policy "admins read profiles" on public.profiles for select using (auth.uid() = id);
-- Add role-aware insert/update policies with a security-definer helper before launching /admin.

