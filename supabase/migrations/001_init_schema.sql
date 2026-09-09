create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text default '',
  preview_image text default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  cv_price integer not null default 500,
  currency text not null default 'XOF',
  updated_at timestamptz not null default now()
);

create table if not exists public.cvs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Mon CV',
  template_id text not null default 'classic',
  personal_info jsonb not null default '{}'::jsonb,
  experiences jsonb not null default '[]'::jsonb,
  education jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  languages jsonb not null default '[]'::jsonb,
  interests jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'paid', 'downloaded', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cv_id uuid references public.cvs(id) on delete set null,
  transaction_id text,
  amount integer not null default 0,
  currency text not null default 'XOF',
  status text not null default 'pending' check (status in ('pending', 'successful', 'failed', 'cancelled')),
  payment_method text default 'fedapay',
  fedapay_transaction_id text,
  metadata jsonb default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cvs_user_id on public.cvs(user_id);
create index if not exists idx_cvs_updated_at on public.cvs(updated_at desc);
create index if not exists idx_payments_user_id on public.payments(user_id);
create index if not exists idx_payments_cv_id on public.payments(cv_id);
create index if not exists idx_templates_active on public.templates(is_active);
