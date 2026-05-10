(function () {
  const env = window.PORTFOLIO_ENV || {};
  const cdnUrl = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  const contactFunctionName = "contact-notify";

  let clientPromise;

  function clean(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function isRealValue(value) {
    return Boolean(clean(value)) && !clean(value).includes("${");
  }

  function hasConfig() {
    return isRealValue(env.SUPABASE_URL) && isRealValue(env.SUPABASE_PUBLISHABLE_KEY);
  }

  function analyticsEnabled() {
    return String(env.ANALYTICS_ENABLED ?? "true").toLowerCase() !== "false";
  }

  function respectsDoNotTrack() {
    return navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.msDoNotTrack === "1";
  }

  function getFunctionUrl() {
    if (isRealValue(env.CONTACT_FUNCTION_URL)) return clean(env.CONTACT_FUNCTION_URL);
    if (!hasConfig()) return "";
    return `${clean(env.SUPABASE_URL).replace(/\/+$/, "")}/functions/v1/${contactFunctionName}`;
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
    const preparedPayload = {
      ...payload,
      language: payload.language === "en" ? "en" : "de",
      source_url: clean(payload.source_url).slice(0, 500),
      user_agent: clean(payload.user_agent).slice(0, 500)
    };

    const client = await getClient();
    if (!client) {
      const messages = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
      messages.push({ ...preparedPayload, created_at: new Date().toISOString() });
      localStorage.setItem("portfolio_messages", JSON.stringify(messages));
      return { mode: "local" };
    }

    const functionUrl = getFunctionUrl();
    if (functionUrl) {
      try {
        const response = await fetch(functionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: clean(env.SUPABASE_PUBLISHABLE_KEY),
            Authorization: `Bearer ${clean(env.SUPABASE_PUBLISHABLE_KEY)}`
          },
          body: JSON.stringify(preparedPayload)
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok) return data;
        if (response.status !== 404) {
          throw new Error(data.error || "Contact notification failed.");
        }
      } catch (error) {
        console.warn("Contact notification function unavailable, falling back to direct insert.", error);
      }
    }

    const { error } = await client.from("contact_messages").insert(preparedPayload);
    if (error) throw error;
    return { mode: "supabase" };
  }

  async function trackEvent(event) {
    if (!hasConfig() || !analyticsEnabled() || respectsDoNotTrack()) return { mode: "off" };
    const client = await getClient();
    if (!client) return { mode: "off" };

    const row = {
      event_type: clean(event.event_type).slice(0, 80),
      event_target: clean(event.event_target).slice(0, 120) || null,
      language: event.language === "en" ? "en" : "de",
      path: clean(event.path || window.location.pathname + window.location.hash).slice(0, 500),
      metadata: event.metadata && typeof event.metadata === "object" ? event.metadata : {}
    };

    if (!row.event_type) return { mode: "off" };
    const { error } = await client.from("portfolio_events").insert(row);
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
    saveMessage,
    trackEvent
  };
})();
