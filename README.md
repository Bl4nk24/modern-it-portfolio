# Modern IT Administrator Portfolio

Ein modernes, zweisprachiges Portfolio fuer IT Administration, IT-Infrastruktur, Microsoft-Themen, Automatisierung, SAP Business One als wachsendes Praxisfeld, KI-Agenten und Kontakt. Die App laeuft ohne Build-Schritt als statische Website und kann spaeter per Supabase aus echten Tabellen gespeist werden.

## Inhalte

- `index.html` ist die Portfolio-Oberflaeche.
- `assets/styles.css` enthaelt das komplette visuelle System.
- `assets/app.js` steuert Filter, Projektdetail, Theme, Canvas und Kontaktflow.
- `assets/data.js` enthaelt die deutschen und englischen Portfolio-Inhalte aus dem LinkedIn-Screenshot: Be1Eye, Reos, IU, Infrastruktur, Microsoft, SAP B1, Automatisierung und Kenntnisse.
- `assets/supabase.js` laedt Supabase nur, wenn URL und Publishable Key gesetzt sind.
- `supabase/schema.sql` legt Tabellen, RLS-Policies, Grants und Seed-Daten an.

## Lokal starten

Oeffne `index.html` direkt im Browser. Die App nutzt Demo-Daten, solange Supabase nicht konfiguriert ist.

## Supabase verbinden

1. Erstelle ein Supabase-Projekt oder nutze ein bestehendes.
2. Fuehre den Inhalt von `supabase/schema.sql` im SQL Editor aus.
3. Trage in `assets/env.js` die Werte ein:

```js
window.PORTFOLIO_ENV = {
  SUPABASE_URL: "https://your-project-ref.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_..."
};
```

Nutze im Browser nur einen Publishable Key. Ein `service_role` oder Secret Key gehoert nie in Frontend-Code.

Hinweis vom 7. Mai 2026: Supabase rollt aus, dass neue Tabellen in `public` nicht mehr automatisch fuer Data API und GraphQL sichtbar sind. Das Schema enthaelt deshalb explizite `grant`-Anweisungen und RLS-Policies fuer die oeffentlich lesbaren Portfolio-Tabellen.

## Personalisieren

Wenn du ohne Datenbank arbeiten willst, ersetze die Inhalte direkt in `assets/data.js`. Mit Supabase kannst du dieselben Felder in den Tabellen `profile`, `projects` und `life_events` pflegen.

LinkedIn-Hinweis: Die Inhalte wurden anhand bereitgestellter LinkedIn-Screenshots aktualisiert. Ein Zertifikatsbereich war dort nicht sichtbar, deshalb sind keine Zertifikate eingetragen.

Fuer echte Projektlinks ersetze die `links`-Werte in `assets/data.js` oder in der `projects`-Tabelle. Der Kontaktflow speichert Nachrichten bei verbundener Datenbank in `contact_messages`, sonst lokal im Browser.

## Deployment

Die Seite ist statisch und passt zu GitHub Pages, Netlify, Vercel oder Supabase Hosting-Workflows. Als Einstieg reicht es, alle Dateien ins Repository zu committen und die Root-Datei `index.html` auszuliefern.

Fuer GitHub Pages liegt bereits `.github/workflows/pages.yml` bei. Nach einem Push auf `main` deployed der Workflow die Root-Dateien direkt als statische Seite.
