(function () {
  const state = {
    content: window.PORTFOLIO_CONTENT || { de: window.PORTFOLIO_SEED, en: window.PORTFOLIO_SEED },
    data: window.PORTFOLIO_SEED,
    lang: localStorage.getItem("portfolio_lang") || "de",
    filter: "all",
    activeProject: 0,
    theme: localStorage.getItem("portfolio_theme") || "dark"
  };

  const ui = {
    de: {
      metaDescription:
        "IT Administrator Portfolio mit Infrastruktur, Microsoft, Automatisierung, SAP Business One und KI-Agenten.",
      titleSuffix: "IT Portfolio",
      skipLink: "Direkt zu den Praxisfeldern",
      navProjects: "Praxisfelder",
      navLife: "Lebenslauf",
      navSkills: "Kenntnisse",
      navContact: "Kontakt",
      heroLede:
        "IT Administrator mit Fokus auf Infrastruktur, Microsoft-Umgebungen, Automatisierung und Systeme, die im Alltag wirklich zusammenarbeiten.",
      primaryCta: "Praxisfelder ansehen",
      secondaryCta: "Kontakt aufnehmen",
      consoleLabel: "now.running",
      consoleFocus: "Fokus",
      consoleMode: "Modus",
      consoleBase: "Basis",
      projectsKicker: "Praxisfelder",
      projectsTitle: "IT, die im Alltag funktioniert",
      filterAll: "Alle",
      filterInfra: "Infrastruktur",
      filterMicrosoft: "Microsoft",
      filterAutomation: "Automation",
      filterSap: "SAP B1",
      filterAi: "KI-Agenten",
      lifeKicker: "Lebenslauf",
      lifeTitle: "Erfahrung und Ausbildung",
      skillsKicker: "Kenntnisse",
      skillsTitle: "Was ich laut Profil mitbringe",
      contactKicker: "Open channel",
      contactTitle: "Lass uns IT einfacher machen",
      contactText:
        "Infrastruktur, Microsoft-Umgebung, Automatisierung, SAP-B1-Thema oder KI-Agent: Schreib mir ein Signal und ich melde mich mit Kontext zurück.",
      formName: "Name",
      formEmail: "E-Mail",
      formMessage: "Nachricht",
      formSubmit: "Senden",
      footerText: "IT Administration, Infrastruktur, Automation and AI agents.",
      footerTop: "Nach oben",
      liveLabel: "Kontakt",
      codeLabel: "Details",
      sending: "Sende...",
      sentSupabase: "Gespeichert. Ich melde mich.",
      sentLocal: "Lokal gespeichert. Supabase ist noch nicht verbunden.",
      sendError: "Konnte nicht senden. Bitte prüfe Supabase.",
      languageButton: "EN",
      languageLabel: "Switch to English",
      themeLabel: "Theme wechseln"
    },
    en: {
      metaDescription:
        "IT administrator portfolio focused on infrastructure, Microsoft, automation, SAP Business One, and AI agents.",
      titleSuffix: "IT Portfolio",
      skipLink: "Skip to practice areas",
      navProjects: "Practice",
      navLife: "Resume",
      navSkills: "Skills",
      navContact: "Contact",
      heroLede:
        "IT administrator focused on infrastructure, Microsoft environments, automation, and systems that actually work together in daily operations.",
      primaryCta: "View practice areas",
      secondaryCta: "Get in touch",
      consoleLabel: "now.running",
      consoleFocus: "Focus",
      consoleMode: "Mode",
      consoleBase: "Base",
      projectsKicker: "Practice areas",
      projectsTitle: "IT that works in real operations",
      filterAll: "All",
      filterInfra: "Infrastructure",
      filterMicrosoft: "Microsoft",
      filterAutomation: "Automation",
      filterSap: "SAP B1",
      filterAi: "AI agents",
      lifeKicker: "Resume",
      lifeTitle: "Experience and education",
      skillsKicker: "Skills",
      skillsTitle: "What my profile brings together",
      contactKicker: "Open channel",
      contactTitle: "Let's make IT simpler",
      contactText:
        "Infrastructure, Microsoft environments, automation, SAP B1 topics, or AI agents: send me a signal and I will get back to you with context.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Send",
      footerText: "IT administration, infrastructure, automation and AI agents.",
      footerTop: "Back to top",
      liveLabel: "Contact",
      codeLabel: "Details",
      sending: "Sending...",
      sentSupabase: "Saved. I will get back to you.",
      sentLocal: "Saved locally. Supabase is not connected yet.",
      sendError: "Could not send. Please check Supabase.",
      languageButton: "DE",
      languageLabel: "Auf Deutsch wechseln",
      themeLabel: "Toggle theme"
    }
  };

  const icons = {
    folder:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h4.2l2 2H18.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"/></svg>',
    send:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 16-8-5.5 16-3.2-6.2L4 12Zm7.3 1.8L20 4"/></svg>',
    moon:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A7.4 7.4 0 0 1 8.8 4 8.2 8.2 0 1 0 20 15.2Z"/></svg>',
    sun:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V3m0 18v-2m7-7h2M3 12h2m12.95-4.95 1.42-1.42M4.63 19.37l1.42-1.42m0-10.9L4.63 5.63m14.74 13.74-1.42-1.42M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    spark:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 9.8 9.8 3 12l6.8 2.2L12 21l2.2-6.8L21 12l-6.8-2.2L12 3Z"/></svg>'
  };

  const selectors = {
    projectList: document.querySelector("[data-project-list]"),
    projectDetail: document.querySelector("[data-project-detail]"),
    lifeGrid: document.querySelector("[data-life-grid]"),
    stackBoard: document.querySelector("[data-stack-board]"),
    status: document.querySelector("[data-profile-status]"),
    focus: document.querySelector("[data-profile-focus]"),
    mode: document.querySelector("[data-profile-mode]"),
    location: document.querySelector("[data-profile-location]"),
    form: document.querySelector("[data-contact-form]"),
    formNote: document.querySelector("[data-form-note]"),
    themeToggle: document.querySelector("[data-theme-toggle]"),
    languageToggle: document.querySelector("[data-language-toggle]")
  };

  function init() {
    setLanguage(state.lang);
    hydrateIcons();
    applyTheme();
    bindThemeToggle();
    bindLanguageToggle();
    bindFilters();
    bindContactForm();
    renderAll();
    setupHeaderElevation();
    setupCanvas();
    loadSupabaseData();
  }

  function hydrateIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = icons[node.dataset.icon] || icons.spark;
    });
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    const icon = state.theme === "dark" ? "sun" : "moon";
    selectors.themeToggle.querySelector("[data-icon]").dataset.icon = icon;
    selectors.themeToggle.setAttribute("aria-label", t("themeLabel"));
    hydrateIcons(selectors.themeToggle);
  }

  function bindThemeToggle() {
    selectors.themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio_theme", state.theme);
      applyTheme();
    });
  }

  function bindLanguageToggle() {
    selectors.languageToggle.addEventListener("click", () => {
      setLanguage(state.lang === "de" ? "en" : "de");
      renderAll();
    });
  }

  function setLanguage(lang) {
    state.lang = state.content[lang] ? lang : "de";
    state.data = state.content[state.lang];
    state.filter = state.filter === "all" ? "all" : state.filter;
    state.activeProject = 0;
    localStorage.setItem("portfolio_lang", state.lang);
    document.documentElement.lang = state.lang;
    document.querySelector('meta[name="description"]').setAttribute("content", t("metaDescription"));
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    selectors.languageToggle.textContent = t("languageButton");
    selectors.languageToggle.setAttribute("aria-label", t("languageLabel"));
  }

  function bindFilters() {
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.filter = button.dataset.filter;
        state.activeProject = 0;
        document.querySelectorAll("[data-filter]").forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });
        renderProjects();
      });
    });
  }

  function bindContactForm() {
    selectors.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(selectors.form);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        message: String(formData.get("message") || "").trim()
      };

      selectors.formNote.textContent = t("sending");
      selectors.form.querySelector("button").disabled = true;

      try {
        const result = await window.PortfolioSupabase.saveMessage(payload);
        selectors.form.reset();
        selectors.formNote.textContent =
          result.mode === "supabase"
            ? t("sentSupabase")
            : t("sentLocal");
      } catch (error) {
        selectors.formNote.textContent = t("sendError");
      } finally {
        selectors.form.querySelector("button").disabled = false;
      }
    });
  }

  async function loadSupabaseData() {
    try {
      const remoteData = await window.PortfolioSupabase.loadData();
      if (!remoteData) return;
      if (state.lang === "de") {
        state.data = {
          ...state.data,
          ...remoteData,
          stack: state.data.stack
        };
      }
      selectors.status.textContent = "Supabase Live";
      renderAll();
    } catch (error) {
      selectors.status.textContent = "Demo Data";
    }
  }

  function renderAll() {
    renderProfile();
    renderProjects();
    renderLife();
    renderStack();
  }

  function renderProfile() {
    const profile = state.data.profile;
    document.title = `${profile.name} | ${t("titleSuffix")}`;
    document.querySelector(".brand span:last-child").textContent = profile.name;
    document.querySelector(".brand-mark").textContent = profile.name.slice(0, 1);
    document.querySelector(".console-portrait span").textContent = profile.name.slice(0, 1);
    document.querySelector("#hero-title").textContent = profile.name;
    selectors.focus.textContent = profile.focus;
    selectors.mode.textContent = profile.mode;
    selectors.location.textContent = profile.location;
  }

  function visibleProjects() {
    const projects = state.data.projects;
    return state.filter === "all"
      ? projects
      : projects.filter((project) => project.category === state.filter);
  }

  function renderProjects() {
    const projects = visibleProjects();
    selectors.projectList.innerHTML = projects
      .map(
        (project, index) => `
          <button class="project-card ${index === state.activeProject ? "is-active" : ""}"
            type="button" data-project-index="${index}">
            <span class="project-card-year">${escapeHtml(project.year)}</span>
            <strong>${escapeHtml(project.title)}</strong>
            <span>${escapeHtml(project.summary)}</span>
          </button>
        `
      )
      .join("");

    selectors.projectList.querySelectorAll("[data-project-index]").forEach((card) => {
      card.addEventListener("click", () => {
        state.activeProject = Number(card.dataset.projectIndex);
        renderProjects();
      });
    });

    renderProjectDetail(projects[state.activeProject] || projects[0]);
  }

  function renderProjectDetail(project) {
    if (!project) {
      selectors.projectDetail.innerHTML = "";
      return;
    }

    selectors.projectDetail.innerHTML = `
      <div class="project-detail-body">
        <div class="detail-shell">
          <div class="detail-meta">
            <span>${escapeHtml(project.status)}</span>
            <span>${escapeHtml(project.year)}</span>
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.summary)}</p>
          <blockquote>${escapeHtml(project.impact)}</blockquote>
          <div class="stack-tags">
            ${project.stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
          <div class="detail-actions">
            <a class="button button-secondary" href="${escapeAttr(project.links.live || "#contact")}">
              <span data-icon="arrow" aria-hidden="true"></span>
              ${escapeHtml(t("liveLabel"))}
            </a>
            <a class="button button-ghost" href="${escapeAttr(project.links.code || "#contact")}">
              <span data-icon="folder" aria-hidden="true"></span>
              ${escapeHtml(t("codeLabel"))}
            </a>
          </div>
        </div>
      </div>
    `;
    hydrateIcons(selectors.projectDetail);
  }

  function renderLife() {
    selectors.lifeGrid.innerHTML = state.data.lifeEvents
      .map(
        (event, index) => `
          <article class="life-card" style="--delay:${index * 80}ms">
            <span>${escapeHtml(event.date)}</span>
            <h3>${escapeHtml(event.title)}</h3>
            <p>${escapeHtml(event.text)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderStack() {
    selectors.stackBoard.innerHTML = state.data.stack
      .map(
        (item) => `
          <article class="stack-row" data-tone="${escapeAttr(item.tone)}">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${item.level}%</span>
            </div>
            <div class="meter" aria-hidden="true">
              <span style="width:${item.level}%"></span>
            </div>
          </article>
        `
      )
      .join("");
  }

  function setupHeaderElevation() {
    const header = document.querySelector("[data-elevate]");
    const setState = () => header.classList.toggle("is-elevated", window.scrollY > 12);
    setState();
    window.addEventListener("scroll", setState, { passive: true });
  }

  function setupCanvas() {
    const canvas = document.querySelector("#signalCanvas");
    const ctx = canvas.getContext("2d");
    let points = [];
    let animationFrame;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: 42 }, (_, index) => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: index % 7 === 0 ? 2.2 : 1.4
      }));
    }

    function draw() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > rect.width) point.vx *= -1;
        if (point.y < 0 || point.y > rect.height) point.vy *= -1;
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 135) {
            ctx.strokeStyle = `rgba(108, 240, 207, ${0.22 - distance / 700})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((point, index) => {
        ctx.fillStyle = index % 5 === 0 ? "#ff7a59" : index % 3 === 0 ? "#d8ff63" : "#6cf0cf";
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", () => {
      cancelAnimationFrame(animationFrame);
      resize();
      draw();
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll("`", "&#096;");
  }

  function t(key) {
    return (ui[state.lang] && ui[state.lang][key]) || ui.de[key] || key;
  }

  init();
})();
