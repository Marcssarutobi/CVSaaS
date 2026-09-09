# CV SaaS + Supabase + FedaPay

Ce projet est une application SaaS de création et téléchargement de CV en React + TypeScript + Vite, avec Supabase comme backend, auth et base de données, ainsi que FedaPay pour le paiement.

## 1. Prérequis

- Node.js 18+
- npm ou pnpm
- Un projet Supabase actif
- Un compte FedaPay avec accès au mode test puis production
- Un terminal Git

## 2. Créer un projet Supabase

1. Connectez-vous à https://supabase.com
2. Créez un nouveau projet
3. Notez les informations suivantes dans les paramètres du projet :
   - Project URL
   - Anon Key
   - Service Role Key (à conserver uniquement côté serveur)
4. Activez l'authentification dans Supabase Dashboard > Authentication

## 3. Récupérer les clés Supabase

Dans le tableau de bord Supabase :

- Allez dans Project settings > API
- Copiez :
  - Project URL
  - anon public key

Placez-les dans le fichier `.env` local de votre frontend :

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Ne jamais mettre la clé Service Role dans le frontend.

## 4. Fichier .env

Créez un fichier `.env` à la racine du projet en vous basant sur `.env.example` :

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
FEDAPAY_PUBLIC_KEY=your-fedapay-public-key
FEDAPAY_ENVIRONMENT=sandbox
```

Les valeurs sensibles côté serveur (Edge Functions, backend) doivent être placées dans les secrets Supabase ou votre environnement d'exécution, par exemple :

```env
FEDAPAY_SECRET_KEY=your-fedapay-secret-key
```

> La clé FedaPay secrète ne doit jamais être exposée dans le frontend.

## 5. Variables de configuration du projet

Le fichier `.env.example` contient les variables minimales attendues :

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
FEDAPAY_PUBLIC_KEY=
FEDAPAY_ENVIRONMENT=
```

## 6. Base de données Supabase

Créez les tables suivantes dans SQL Editor de Supabase.

```sql
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
```

### Index et contraintes

```sql
create index if not exists idx_cvs_user_id on public.cvs(user_id);
create index if not exists idx_cvs_updated_at on public.cvs(updated_at desc);
create index if not exists idx_payments_user_id on public.payments(user_id);
create index if not exists idx_payments_cv_id on public.payments(cv_id);
create index if not exists idx_templates_active on public.templates(is_active);
```

## 7. Exécuter les migrations SQL

Placez les scripts sous un dossier `supabase/migrations/` puis exécutez-les dans Supabase SQL Editor.

Exemple de structure :

```text
supabase/
  migrations/
    001_init_schema.sql
    002_rls_policies.sql
```

## 8. Configurer Supabase Auth

1. Ouvrez Supabase Dashboard > Authentication > Providers
2. Activez Email
3. Configurez le site d'URL de redirection si nécessaire
4. Pour les comptes admin, créez un utilisateur via Auth puis mettez son profil dans `profiles` avec `role = 'admin'`

## 9. Supabase Storage

Si vous décidez d'ajouter des uploads d'images, activez Storage dans Supabase Dashboard puis créez un bucket, par exemple `cv-assets`.

RLS typical :

```sql
create policy "Users can upload own files"
on storage.objects for insert
with check (bucket_id = 'cv-assets' and auth.uid()::text = owner);
```

Dans cette application, les images de preview de templates et les profil photos peuvent être gérées via URL externe ou storage si besoin.

## 10. Edge Functions

Les opérations sensibles FedaPay doivent se faire côté serveur avec une Edge Function.

### Exemple d'architecture

- `POST /functions/v1/create-fedapay-payment`
- `POST /functions/v1/verify-fedapay-payment`
- `POST /functions/v1/fedapay-webhook`

Ces fonctions doivent utiliser les secrets Supabase :

```bash
supabase secrets set FEDAPAY_SECRET_KEY=your_secret_key
supabase secrets set FEDAPAY_PUBLIC_KEY=your_public_key
supabase secrets set FEDAPAY_ENVIRONMENT=sandbox
```

## 11. Configurer FedaPay

1. Créez un compte FedaPay
2. Activez le mode Sandbox pour tester
3. Récupérez :
   - publique key
   - secret key
4. Configurez les webhooks si l'environnement FedaPay le permet
5. En production, remplacez `sandbox` par `production`

Les clés doivent être stockées côté serveur uniquement.

## 12. Passer en production

- Remplacez `FEDAPAY_ENVIRONMENT=sandbox` par `production`
- Vérifiez les URLs de redirection / webhook
- Activez les règles RLS et sécurisez les politiques
- Vérifiez les valeurs de `cv_price` dans `settings`

## 13. Lancer le projet localement

```bash
npm install
cp .env.example .env
# remplissez les valeurs
npm run dev
```

Le projet démarre sur le port 3000 par défaut.

## 14. Construire pour la production

```bash
npm run build
```

## 15. Déployer le frontend

Vous pouvez déployer le front sur :

- Vercel
- Netlify
- Cloudflare Pages
- une VM / Docker / serveur frontal statique

### Déploiement Vercel

1. Connectez votre dépôt GitHub à Vercel
2. Sélectionnez le repo `CVSaaS`
3. Dans les variables d'environnement, ajoutez :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_NAME`
   - `FEDAPAY_PUBLIC_KEY`
   - `FEDAPAY_ENVIRONMENT`
4. Gardez `FEDAPAY_SECRET_KEY` côté serveur uniquement (Supabase Edge Function, backend ou secret Vercel si nécessaire)
5. Déployez

Le projet contient déjà un fichier `vercel.json` compatible avec Vite et la redirection SPA.

## 16. Déployer les Edge Functions

```bash
supabase functions deploy create-fedapay-payment
supabase functions deploy verify-fedapay-payment
supabase functions deploy fedapay-webhook
```

## 17. RLS / sécurité

Il est recommandé de créer des politiques RLS sur les tables :

```sql
alter table public.profiles enable row level security;
alter table public.cvs enable row level security;
alter table public.payments enable row level security;
alter table public.templates enable row level security;
alter table public.settings enable row level security;
```

Exemple :

```sql
create policy "Users can read own profiles" on public.profiles
for select using (auth.uid() = id);

create policy "Users can create own cvs" on public.cvs
for insert with check (auth.uid() = user_id);

create policy "Users can update own cvs" on public.cvs
for update using (auth.uid() = user_id);

create policy "Users can delete own cvs" on public.cvs
for delete using (auth.uid() = user_id);

create policy "Admins can read all templates" on public.templates
for select using (auth.uid() is not null);
```

Le projet frontend est prêt pour cette configuration, mais les règles exactes doivent être ajoutées dans le dashboard Supabase selon votre environnement précis.

## 18. Notes importantes

- Aucun mock backend ne doit être utilisé en production.
- Les paiements ne sont considérés comme validés que côté serveur après vérification.
- Le prix est global pour tous les CV et la devise officielle est XOF/FCFA.
- Le téléchargement ne doit être autorisé que si un paiement validé existe pour le CV associé.

## 19. Développement du projet

```bash
npm install
npm run dev
npm run build
```

## 20. Bonnes pratiques

- Gardez les clés sensibles hors du repository Git.
- Vérifiez toujours les politiques RLS avant mise en production.
- Validez les transactions serveur côté FedaPay plutôt que du frontend.
- Ne faites pas confiance aux états de paiement côté client.
