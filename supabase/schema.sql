create extension if not exists pgcrypto;

create table if not exists public.profile (
  profile_key text primary key default 'main' check (profile_key = 'main'),
  name text not null,
  focus text not null,
  mode text not null,
  location text not null,
  email text,
  is_public boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  slug text primary key,
  sort_order integer not null default 0,
  title text not null,
  category text not null check (category in ('microsoft', 'automation', 'ai', 'erp')),
  year_label text not null,
  status text not null,
  summary text not null,
  impact text not null,
  stack text[] not null default '{}',
  links jsonb not null default '{}',
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.life_events (
  slug text primary key,
  sort_order integer not null default 0,
  date_label text not null,
  title text not null,
  body text not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.life_events enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Public can read profile" on public.profile;
create policy "Public can read profile"
  on public.profile
  for select
  to anon, authenticated
  using (is_public);

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
  on public.projects
  for select
  to anon, authenticated
  using (is_public);

drop policy if exists "Public can read life events" on public.life_events;
create policy "Public can read life events"
  on public.life_events
  for select
  to anon, authenticated
  using (is_public);

drop policy if exists "Public can submit contact messages" on public.contact_messages;
create policy "Public can submit contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (
    length(btrim(name)) between 1 and 120
    and position('@' in email) > 1
    and length(btrim(message)) between 1 and 4000
  );

grant usage on schema public to anon, authenticated;
grant select on public.profile, public.projects, public.life_events to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;

insert into public.profile (profile_key, name, focus, mode, location, email, is_public)
values (
  'main',
  'Eirik',
  'Microsoft, PowerShell, Automation',
  'Admin, Integrator, AI Builder',
  'Germany / Remote',
  'hello@example.dev',
  true
)
on conflict (profile_key) do update
set
  name = excluded.name,
  focus = excluded.focus,
  mode = excluded.mode,
  location = excluded.location,
  email = excluded.email,
  is_public = excluded.is_public,
  updated_at = now();

insert into public.projects
  (slug, sort_order, title, category, year_label, status, summary, impact, stack, links, is_public)
values
  (
    'microsoft-365-administration',
    10,
    'Microsoft 365 Administration',
    'microsoft',
    '2026',
    'Admin core',
    'Tenant, Benutzer, Gruppen, Lizenzen, Teams, SharePoint, Exchange und Entra so betreuen, dass der Alltag sauber funktioniert.',
    'Ich denke Microsoft nicht als einzelne Apps, sondern als zusammenhaengendes Arbeits- und Berechtigungssystem.',
    array['Microsoft 365', 'Entra ID', 'Intune', 'Teams', 'SharePoint', 'Exchange'],
    '{"live":"#contact","code":"#contact"}'::jsonb,
    true
  ),
  (
    'powershell-automation',
    20,
    'PowerShell Automation',
    'automation',
    '2025',
    'Daily operations',
    'Wiederkehrende Admin-Aufgaben, Auswertungen, Benutzerprozesse und Systemverbindungen mit PowerShell und APIs automatisieren.',
    'Weniger Klickarbeit, weniger Fehlerquellen und mehr Zeit fuer die Aufgaben, bei denen Menschen wirklich gebraucht werden.',
    array['PowerShell', 'Graph API', 'Power Automate', 'REST APIs', 'Reporting'],
    '{"live":"#contact","code":"#contact"}'::jsonb,
    true
  ),
  (
    'ki-agenten-prozesse',
    30,
    'KI-Agenten fuer Prozesse',
    'ai',
    '2025',
    'AI enablement',
    'KI-Agenten konzipieren, trainieren und in bestehende Ablaeufe einbetten, ohne Governance, Rollen und Datenzugriff zu vergessen.',
    'KI ist fuer mich kein Showpiece, sondern ein Werkzeug fuer Support, Wissen, Automatisierung und bessere Entscheidungen.',
    array['Copilot', 'Agent Builder', 'Prompting', 'Knowledge Sources', 'Governance'],
    '{"live":"#contact","code":"#contact"}'::jsonb,
    true
  ),
  (
    'sap-business-one-technik',
    40,
    'SAP Business One Technik',
    'erp',
    '2024',
    'ERP backbone',
    'Technische Seite von SAP B1 verstehen: Datenbank, Schnittstellen, Add-ons, Systembetrieb und Verbindungen zu anderen Tools.',
    'Ich kann Fachsysteme so einordnen, dass IT, Prozesse und Business-Anforderungen zusammenkommen.',
    array['SAP B1', 'SQL Server', 'HANA', 'B1if', 'Service Layer', 'Windows Server'],
    '{"live":"#contact","code":"#contact"}'::jsonb,
    true
  )
on conflict (slug) do update
set
  sort_order = excluded.sort_order,
  title = excluded.title,
  category = excluded.category,
  year_label = excluded.year_label,
  status = excluded.status,
  summary = excluded.summary,
  impact = excluded.impact,
  stack = excluded.stack,
  links = excluded.links,
  is_public = excluded.is_public,
  updated_at = now();

insert into public.life_events
  (slug, sort_order, date_label, title, body, is_public)
values
  (
    'admin-mindset',
    10,
    'Basis',
    'IT Administration',
    'Systeme betreiben, Nutzer unterstuetzen, Berechtigungen verstehen und Verantwortung fuer stabile Umgebungen uebernehmen.',
    true
  ),
  (
    'modern-workplace',
    20,
    'Microsoft',
    'Modern Workplace',
    'Microsoft 365, Teams, SharePoint, Exchange, Entra und Intune als zusammenhaengende Arbeitsplattform denken.',
    true
  ),
  (
    'ai-tooling',
    30,
    'Automation',
    'PowerShell statt Klickarbeit',
    'Wiederkehrende Aufgaben automatisieren, Systeme verbinden und Reports aus Daten bauen, die sonst liegen bleiben.',
    true
  ),
  (
    'portfolio-os',
    40,
    'Jetzt',
    'KI-Agenten mit Kontrolle',
    'Agenten und KI-Workflows so aufbauen, dass sie helfen, aber Rollen, Rechte, Datenquellen und Nachvollziehbarkeit respektieren.',
    true
  )
on conflict (slug) do update
set
  sort_order = excluded.sort_order,
  date_label = excluded.date_label,
  title = excluded.title,
  body = excluded.body,
  is_public = excluded.is_public;
