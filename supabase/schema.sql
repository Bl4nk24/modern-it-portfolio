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
  signals text[] not null default '{}',
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
  topic text,
  message text not null,
  language text,
  source_url text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.projects
  add column if not exists signals text[] not null default '{}';

alter table public.contact_messages
  add column if not exists topic text,
  add column if not exists language text,
  add column if not exists source_url text,
  add column if not exists user_agent text;

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages
  drop constraint if exists contact_messages_name_length,
  drop constraint if exists contact_messages_email_shape,
  drop constraint if exists contact_messages_message_length,
  drop constraint if exists contact_messages_topic_length,
  drop constraint if exists contact_messages_language_value,
  drop constraint if exists contact_messages_source_url_length,
  drop constraint if exists contact_messages_user_agent_length;

alter table public.contact_messages
  add constraint contact_messages_name_length
    check (length(btrim(name)) between 2 and 120) not valid,
  add constraint contact_messages_email_shape
    check (
      length(btrim(email)) between 5 and 180
      and btrim(email) !~ '[[:space:]]'
      and position('@' in btrim(email)) > 1
      and position('.' in split_part(btrim(email), '@', 2)) > 1
    ) not valid,
  add constraint contact_messages_message_length
    check (length(btrim(message)) between 10 and 4000) not valid,
  add constraint contact_messages_topic_length
    check (topic is null or length(btrim(topic)) between 1 and 120) not valid,
  add constraint contact_messages_language_value
    check (language is null or language in ('de', 'en')) not valid,
  add constraint contact_messages_source_url_length
    check (source_url is null or length(source_url) <= 500) not valid,
  add constraint contact_messages_user_agent_length
    check (user_agent is null or length(user_agent) <= 500) not valid;

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
    length(btrim(name)) between 2 and 120
    and length(btrim(email)) between 5 and 180
    and btrim(email) !~ '[[:space:]]'
    and position('@' in btrim(email)) > 1
    and position('.' in split_part(btrim(email), '@', 2)) > 1
    and length(btrim(message)) between 10 and 4000
    and (topic is null or length(btrim(topic)) between 1 and 120)
    and (language is null or language in ('de', 'en'))
    and (source_url is null or length(source_url) <= 500)
    and (user_agent is null or length(user_agent) <= 500)
  );

grant usage on schema public to anon, authenticated;
grant select on public.profile, public.projects, public.life_events to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;

insert into public.profile (profile_key, name, focus, mode, location, email, is_public)
values (
  'main',
  'Eirik Christiansen',
  'Microsoft, Infrastruktur, Automation',
  'IT Admin, Integrator, KI-Agenten seit 2020',
  'Hamburg & Remote',
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
  (slug, sort_order, title, category, year_label, status, summary, impact, signals, stack, links, is_public)
values
  (
    'it-infrastruktur-administration',
    10,
    'IT-Infrastruktur & Administration',
    'infra',
    '2021 - heute',
    'Operations backbone',
    'Windows Server, Active Directory, Netzwerke, Hardware, Betriebssysteme, Helpdesk und Arbeitsplatzumgebungen im realen Betrieb betreuen.',
    'Mein Kern ist klassische IT: Systeme stabil halten, Nutzer unterstützen, Berechtigungen sauber denken und technische Probleme so lösen, dass der Betrieb weiterlaufen kann.',
    array['Active Directory, Windows Server, Netzwerk und Endgeräte aus dem Admin-Alltag', 'Fehlersuche zwischen Nutzer, Gerät, Berechtigung, Netzwerk und Backend', 'Support und Infrastruktur nicht getrennt denken, sondern als zusammenhängenden Betrieb'],
    array['Windows Server', 'Active Directory', 'Netzwerkadministration', 'LAN/WAN', 'Helpdesk', 'Hardware'],
    '{"live":"#contact","code":"https://www.linkedin.com/in/eirik-christiansen/"}'::jsonb,
    true
  ),
  (
    'microsoft-workplace',
    20,
    'Microsoft & Workplace',
    'microsoft',
    'laufend',
    'Modern workplace',
    'Microsoft Outlook, Office, Windows-Arbeitsplätze, Benutzerprozesse, Rechte, Policies und typische Admin-Aufgaben sicher in den Alltag einordnen.',
    'Microsoft ist für mich kein einzelnes Tool, sondern die Schicht, in der Nutzer, Geräte, Berechtigungen, Kommunikation und Prozesse täglich zusammenkommen.',
    array['Outlook, Office und Windows aus Support- und Administrationssicht', 'Benutzer, Gruppen, Rechte und Arbeitsabläufe so strukturieren, dass sie nachvollziehbar bleiben', 'Technische Sprache in verständliche Lösungen für Fachbereiche übersetzen'],
    array['Microsoft Outlook', 'Microsoft Office', 'Windows', 'Active Directory', 'User Support', 'Policies'],
    '{"live":"#contact","code":"https://www.linkedin.com/in/eirik-christiansen/"}'::jsonb,
    true
  ),
  (
    'prozessautomatisierung',
    30,
    'Automation & Systemverbindungen',
    'automation',
    'laufend',
    'Systems connected',
    'Wiederkehrende Aufgaben, Datenflüsse und Übergänge zwischen Systemen mit PowerShell, SQL, MySQL, APIs und Microsoft-Werkzeugen vereinfachen.',
    'Ich schreibe nicht am liebsten große Softwareprodukte. Meine Stärke ist eher, technische Brücken zu bauen, Klickarbeit zu reduzieren und Systeme miteinander sprechen zu lassen.',
    array['PowerShell und kleine Skripte für wiederkehrende Admin-Aufgaben', 'SQL/MySQL, Reports und Datenübergaben zwischen Fachsystemen', 'Prozessverständnis: erst manuelle Reibung sehen, dann sinnvoll automatisieren'],
    array['PowerShell', 'SQL', 'MySQL', 'APIs', 'Reporting', 'Prozesse'],
    '{"live":"#contact","code":"https://www.linkedin.com/in/eirik-christiansen/"}'::jsonb,
    true
  ),
  (
    'sap-business-one-technik',
    40,
    'SAP Business One Technik',
    'sap',
    'seit Apr. 2025',
    'ERP learning curve',
    'Seit 2025 baue ich technisches SAP-Business-One-Verständnis rund um ERP-Betrieb, Daten, HANA, SQL, Schnittstellen und Kundenanforderungen auf.',
    'SAP B1 ist ein wachsender Bereich in meinem Profil, nicht der Mittelpunkt. Ich ordne ERP-Themen mit meinem IT-Admin- und Infrastruktur-Hintergrund ein.',
    array['Technische Einordnung von SAP B1 in bestehende IT-Landschaften', 'Datenbank-, HANA- und SQL-Verständnis als Brücke in ERP-Themen', 'Bewusst als Aufbaugebiet dargestellt, weil die Praxis erst seit 2025 läuft'],
    array['SAP Business One', 'HANA', 'SQL', 'ERP-Technik', 'Support'],
    '{"live":"#contact","code":"https://www.linkedin.com/in/eirik-christiansen/"}'::jsonb,
    true
  ),
  (
    'ki-agenten-assistenzsysteme',
    50,
    'KI-Agenten & Assistenzsysteme',
    'ai',
    'seit 2020',
    'AI builder',
    'Seit 2020 beschäftige ich mich mit KI-Workflows, Agenten, Prompting, Wissensquellen und Assistenzsystemen für Support, Prozesse und Automatisierung.',
    'KI bedeutet für mich nicht Hype, sondern kontrollierte Assistenz: klare Rollen, saubere Datenquellen, nachvollziehbare Anweisungen und sinnvolle Verbindung mit bestehenden Systemen.',
    array['KI-Agenten für Wissen, Support, Prozesshilfe und interne Assistenz aufbauen', 'Datenquellen, Rollen, Prompts und Grenzen bewusst definieren', 'Automatisierung, APIs und Systemverständnis als Grundlage für brauchbare Agenten'],
    array['KI-Agenten', 'Prompting', 'Knowledge Sources', 'Automatisierung', 'Governance'],
    '{"live":"#contact","code":"https://www.linkedin.com/in/eirik-christiansen/"}'::jsonb,
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
  signals = excluded.signals,
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
    'Hamburg/Remote. SAP Business One Technik, IT-Infrastruktur, Security, Prozessautomatisierung und technische Einordnung von ERP-Themen.',
    true
  ),
  (
    'reos-it-systemadministrator',
    20,
    'Okt. 2021 - Apr. 2025',
    'IT-Systemadministrator, Reos GmbH',
    'Hamburg/Remote im dualen Studium. Active Directory, Microsoft Outlook, Windows Server, Netzwerk, Hardware, Betriebssysteme und Helpdesk-Support.',
    true
  ),
  (
    'ki-workflows-agenten',
    25,
    '2020 - heute',
    'KI-Workflows & Agenten',
    'Eigene Praxis mit KI-Systemen, Prompting, Assistenzlogik, Wissensquellen und Automatisierungsideen für IT- und Prozessaufgaben.',
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
