(function () {
  const env = window.PORTFOLIO_ENV || {};
  const cdnUrl = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  let clientPromise;

  function hasConfig() {
    return Boolean(env.SUPABASE_URL && env.SUPABASE_PUBLISHABLE_KEY);
  }

  function loadScript() {
    return new Promise((resolve, reject) => {
      if (window.supabase && window.supabase.createClient) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = cdnUrl;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Supabase client konnte nicht geladen werden."));
      document.head.appendChild(script);
    });
  }

  async function getClient() {
    if (!hasConfig()) return null;
    if (!clientPromise) {
      clientPromise = loadScript().then(() =>
        window.supabase.createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
          auth: {
            persistSession: false,
            autoRefreshToken: false
          }
        })
      );
    }
    return clientPromise;
  }

  async function loadData() {
    const client = await getClient();
    if (!client) return null;

    const [profileResult, projectsResult, lifeResult] = await Promise.all([
      client.from("profile").select("*").eq("is_public", true).limit(1).maybeSingle(),
      client.from("projects").select("*").eq("is_public", true).order("sort_order"),
      client.from("life_events").select("*").eq("is_public", true).order("sort_order")
    ]);

    const error = profileResult.error || projectsResult.error || lifeResult.error;
    if (error) throw error;

    return {
      profile: profileResult.data || window.PORTFOLIO_SEED.profile,
      projects: normalizeProjects(projectsResult.data),
      lifeEvents: normalizeLifeEvents(lifeResult.data)
    };
  }

  async function saveMessage(payload) {
    const client = await getClient();
    if (!client) {
      const messages = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
      messages.push({ ...payload, created_at: new Date().toISOString() });
      localStorage.setItem("portfolio_messages", JSON.stringify(messages));
      return { mode: "local" };
    }

    const { error } = await client.from("contact_messages").insert(payload);
    if (error) throw error;
    return { mode: "supabase" };
  }

  function normalizeProjects(rows) {
    if (!rows || !rows.length) return window.PORTFOLIO_SEED.projects;
    return rows.map((row) => ({
      title: row.title,
      category: row.category,
      year: row.year_label,
      status: row.status,
      summary: row.summary,
      impact: row.impact,
      signals: row.signals || [],
      stack: row.stack || [],
      links: row.links || {}
    }));
  }

  function normalizeLifeEvents(rows) {
    if (!rows || !rows.length) return window.PORTFOLIO_SEED.lifeEvents;
    return rows.map((row) => ({
      date: row.date_label,
      title: row.title,
      text: row.body
    }));
  }

  window.PortfolioSupabase = {
    hasConfig,
    loadData,
    saveMessage
  };
})();
