alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.settings enable row level security;
alter table public.cvs enable row level security;
alter table public.payments enable row level security;

create policy "Profiles are viewable by owner" on public.profiles
for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
for insert with check (auth.uid() = id);

create policy "Users can manage their own cvs" on public.cvs
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can read their own payments" on public.payments
for select using (auth.uid() = user_id);

create policy "Users can insert their own payments" on public.payments
for insert with check (auth.uid() = user_id);

create policy "Users can update their own payments" on public.payments
for update using (auth.uid() = user_id);

create policy "Any authenticated user can read active templates" on public.templates
for select using (auth.role() = 'authenticated');

create policy "Admins can manage templates" on public.templates
for all using (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
) with check (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Admins can read settings" on public.settings
for select using (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Admins can update settings" on public.settings
for update using (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
) with check (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Admins can read all payments" on public.payments
for select using (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);
