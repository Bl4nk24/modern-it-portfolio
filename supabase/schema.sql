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
  category text not null check (category in ('infra', 'microsoft', 'automation', 'sap', 'ai')),
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
  'Eirik Christiansen',
  'IT-Infrastruktur, Microsoft, Automation',
  'IT Admin, Integrator, KI Builder',
  'Hamburg / Lüneburg / Hybrid',
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
    'it-infrastruktur-administration',
    10,
    'IT-Infrastruktur & Administration',
    'infra',
    '2021 - heute',
    'Admin backbone',
    'Windows Server, Active Directory, Netzwerke, Hardware, Betriebssysteme, Helpdesk und Microsoft-Umgebungen im Alltag betreuen.',
    'Mein Kern ist klassische IT: Systeme stabil halten, Nutzer unterstützen, Berechtigungen sauber denken und technische Probleme pragmatisch lösen.',
    array['Windows Server', 'Active Directory', 'Netzwerkadministration', 'LAN/WAN', 'Helpdesk', 'Hardware'],
    '{"live":"#contact","code":"#contact"}'::jsonb,
    true
  ),
  (
    'microsoft-workplace',
    20,
    'Microsoft & Workplace',
    'microsoft',
    'laufend',
    'Modern workplace',
    'Microsoft Outlook, Office, Benutzerprozesse, Arbeitsplatzsysteme und typische Admin-Aufgaben sicher in den Betrieb einordnen.',
    'Ich verstehe Microsoft-Themen vor allem aus Sicht der Administration: Was Nutzer brauchen, wo Rechte sitzen und wie Abläufe weniger chaotisch werden.',
    array['Microsoft Outlook', 'Microsoft Office', 'Windows', 'User Support', 'Policies'],
    '{"live":"#contact","code":"#contact"}'::jsonb,
    true
  ),
  (
    'prozessautomatisierung',
    30,
    'Prozessautomatisierung',
    'automation',
    'laufend',
    'Systems connected',
    'Wiederkehrende Aufgaben, Datenflüsse und Übergänge zwischen Systemen mit PowerShell, SQL, MySQL, APIs und Microsoft-Werkzeugen vereinfachen.',
    'Ich schreibe nicht am liebsten große Softwareprodukte, aber ich kann technische Brücken bauen, Prozesse automatisieren und Systeme miteinander sprechen lassen.',
    array['PowerShell', 'SQL', 'MySQL', 'APIs', 'Reporting', 'Prozesse'],
    '{"live":"#contact","code":"#contact"}'::jsonb,
    true
  ),
  (
    'sap-business-one-technik',
    40,
    'SAP Business One Technik',
    'sap',
    'seit 2025',
    'ERP learning curve',
    'Seit 2025 arbeite ich mit SAP Business One und lerne die technische Seite rund um ERP-Betrieb, Daten, Schnittstellen und Kundenanforderungen kennen.',
    'SAP B1 ist ein wachsender Bereich in meinem Profil, aber nicht mein einziger Schwerpunkt. Ich verbinde ERP-Themen mit meinem IT-Admin- und Infrastruktur-Verständnis.',
    array['SAP Business One', 'HANA', 'SQL', 'ERP-Technik', 'Support'],
    '{"live":"#contact","code":"#contact"}'::jsonb,
    true
  ),
  (
    'ki-agenten-assistenzsysteme',
    50,
    'KI-Agenten & Assistenzsysteme',
    'ai',
    '2026',
    'AI builder',
    'KI-Agenten für Support, Wissen, Prozesshilfe und Automatisierung aufbauen, trainieren und mit bestehenden Datenquellen verbinden.',
    'Der Fokus liegt nicht auf Hype, sondern auf kontrollierter Nutzung: Rollen, Datenzugriff, Anweisungen, Wissen und nachvollziehbare Ergebnisse.',
    array['KI-Agenten', 'Prompting', 'Knowledge Sources', 'Automatisierung', 'Governance'],
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
    'be1eye-sap-it-consultant',
    10,
    'Apr. 2025 - heute',
    'SAP IT-Consultant, Be1Eye GmbH',
    'Vollzeit in Lüneburg/Hybrid. SAP Business One Consulting, IT-Infrastruktur, Security, Prozessautomatisierung und HANA-Optimierung.',
    true
  ),
  (
    'reos-it-systemadministrator',
    20,
    'Okt. 2021 - Apr. 2025',
    'IT-Systemadministrator, Reos GmbH',
    'Duales Studium in Hamburg/Hybrid. Active Directory, Microsoft Outlook, Windows Server, Netzwerk, Hardware, Betriebssysteme und Helpdesk-Support.',
    true
  ),
  (
    'iu-computer-science',
    30,
    'Okt. 2021 - März 2025',
    'B.Sc. Computer Science, IU Internationale Hochschule',
    'Bachelorabschluss mit Note 2.2. Schwerpunkte aus dem Profil: SQL, MySQL, OOP, JavaScript, HTML/CSS und Java.',
    true
  ),
  (
    'schloss-torgelow-abitur',
    40,
    'Sept. 2012 - Juni 2021',
    'Abitur, Schloss Torgelow Privates Internatsgymnasium',
    'Abitur mit Note 2.4. Grundlagen aus dem Profil: SQL, MySQL, Python, Hardware und technische Arbeitsweise.',
    true
  )
on conflict (slug) do update
set
  sort_order = excluded.sort_order,
  date_label = excluded.date_label,
  title = excluded.title,
  body = excluded.body,
  is_public = excluded.is_public;
