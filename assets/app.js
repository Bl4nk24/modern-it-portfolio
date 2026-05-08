(function () {
  const state = {
    content: window.PORTFOLIO_CONTENT || { de: window.PORTFOLIO_SEED, en: window.PORTFOLIO_SEED },
    data: window.PORTFOLIO_SEED,
    lang: localStorage.getItem("portfolio_lang") || "de",
    filter: "all",
    activeProject: 0,
    theme: localStorage.getItem("portfolio_theme_v2") || "light"
  };

  const ui = {
    de: {
      metaDescription:
        "IT Administrator und Systems Integrator Portfolio mit Microsoft, Infrastruktur, PowerShell-Automatisierung, SAP Business One Technik und KI-Agenten seit 2020.",
      titleSuffix: "IT Portfolio",
      skipLink: "Direkt zu den Praxisfeldern",
      brandRole: "IT Administrator & Systems Integrator",
      navOverview: "Überblick",
      navOps: "Expertise",
      navProjects: "Praxis",
      navLife: "Werdegang",
      navSkills: "Kenntnisse",
      navContact: "Kontakt",
      heroTitle: "IT verbinden, automatisieren, stabil betreiben.",
      heroLede:
        "IT Administrator aus Hamburg mit Fokus auf Microsoft-Umgebungen, Infrastruktur, PowerShell-Automatisierung und Systeme, die im Alltag wirklich zusammenarbeiten.",
      chipMicrosoft: "Microsoft",
      chipIdentity: "Identity",
      chipAutomation: "PowerShell",
      chipLocation: "Hamburg & Remote",
      chipAi: "KI-Agenten seit 2020",
      chipSap: "SAP B1 seit 04/2025",
      primaryCta: "Praxisfelder ansehen",
      secondaryCta: "Kontakt aufnehmen",
      linkedinCta: "LinkedIn ansehen",
      mapTitle: "Microsoft System Orbit",
      mapStatus: "Microsoft Stack",
      mapCenter: "Monitor · Automate · Secure",
      mapFooter: "Microsoft, Infrastruktur und Automation als ein System.",
      mapLink: "Praxis ansehen",
      opsKicker: "Expertise",
      opsTitle: "Kompetenzen mit operativer Substanz.",
      projectsKicker: "Praxis",
      projectsTitle: "Systeme, die arbeiten.",
      projectsIntro:
        "Fünf Schwerpunkte aus Administration, Microsoft-Infrastruktur, Automatisierung und KI-Assistenz.",
      filterAll: "Alle",
      filterInfra: "Infrastruktur",
      filterMicrosoft: "Microsoft",
      filterAutomation: "Automation",
      filterSap: "SAP B1",
      filterAi: "KI-Agenten",
      lifeKicker: "Werdegang",
      lifeTitle: "Von Betrieb zu Integration.",
      skillsKicker: "Kenntnisse",
      skillsTitle: "Kompetenzkarte.",
      skillsNote: "Skala 1 bis 10: eingeordnet aus LinkedIn-Profil, Berufserfahrung, Projekten und Ausbildung.",
      playbookKicker: "Arbeitsweise",
      playbookTitle: "Wie ich Systeme sauber bekomme.",
      contactKicker: "Kontakt",
      contactTitle: "Lass uns über IT sprechen.",
      contactText:
        "Infrastruktur, Microsoft-Umgebung, Automatisierung, SAP-B1-Thema oder KI-Agent: Schreib mir kurz, worum es geht.",
      contactLinkedIn: "Profil auf LinkedIn öffnen",
      formName: "Name",
      formEmail: "E-Mail",
      formTopic: "Thema",
      topicPlaceholder: "Thema wählen",
      topicMicrosoft: "Microsoft & Workplace",
      topicInfra: "Infrastruktur",
      topicAutomation: "Automation",
      topicSap: "SAP B1",
      topicAi: "KI-Agenten",
      formLanguage: "Sprache",
      formMessage: "Nachricht",
      formSubmit: "Senden",
      privacyNote: "Deine Anfrage kommt direkt bei mir an und wird nicht öffentlich angezeigt.",
      footerText: "IT Administration, Microsoft-Infrastruktur, Automation und KI-Agenten.",
      footerTop: "Nach oben",
      liveLabel: "Kontakt",
      codeLabel: "LinkedIn",
      detailSignals: "Schwerpunkte",
      sending: "Sende...",
      sentSupabase: "Danke, deine Nachricht ist angekommen.",
      sentLocal: "Danke, deine Nachricht ist angekommen.",
      sendError: "Konnte nicht senden. Bitte versuche es erneut.",
      formInvalid: "Bitte fülle die Felder vollständig aus.",
      languageButton: "EN",
      languageLabel: "Switch to English",
      themeLabel: "Theme wechseln"
    },
    en: {
      metaDescription:
        "IT administrator and systems integrator portfolio focused on Microsoft, infrastructure, PowerShell automation, SAP Business One technology, and AI agents since 2020.",
      titleSuffix: "IT Portfolio",
      skipLink: "Skip to practice areas",
      brandRole: "IT Administrator & Systems Integrator",
      navOverview: "Overview",
      navOps: "Expertise",
      navProjects: "Work",
      navLife: "Journey",
      navSkills: "Skills",
      navContact: "Contact",
      heroTitle: "Connect, automate and operate reliable IT.",
      heroLede:
        "Hamburg-based IT administrator focused on Microsoft environments, infrastructure, PowerShell automation, and systems that actually work together in daily operations.",
      chipMicrosoft: "Microsoft",
      chipIdentity: "Identity",
      chipAutomation: "PowerShell",
      chipLocation: "Hamburg & remote",
      chipAi: "AI agents since 2020",
      chipSap: "SAP B1 since 04/2025",
      primaryCta: "View practice areas",
      secondaryCta: "Get in touch",
      linkedinCta: "View LinkedIn",
      mapTitle: "Microsoft System Orbit",
      mapStatus: "Microsoft Stack",
      mapCenter: "Monitor · Automate · Secure",
      mapFooter: "Microsoft, infrastructure and automation as one system.",
      mapLink: "View work",
      opsKicker: "Expertise",
      opsTitle: "Capabilities with operational impact.",
      projectsKicker: "Work",
      projectsTitle: "Practice areas.",
      projectsIntro:
        "Selected focus areas across administration, Microsoft infrastructure, automation, and AI assistance.",
      filterAll: "All",
      filterInfra: "Infrastructure",
      filterMicrosoft: "Microsoft",
      filterAutomation: "Automation",
      filterSap: "SAP B1",
      filterAi: "AI agents",
      lifeKicker: "Journey",
      lifeTitle: "From operations to integration.",
      skillsKicker: "Skills",
      skillsTitle: "Skill map.",
      skillsNote: "Scale 1 to 10: framed from LinkedIn profile, work experience, projects, and education.",
      playbookKicker: "Operating Method",
      playbookTitle: "How I make systems clean.",
      contactKicker: "Contact",
      contactTitle: "Let's talk about IT.",
      contactText:
        "Infrastructure, Microsoft environments, automation, SAP B1 topics, or AI agents: send me a short note.",
      contactLinkedIn: "Open LinkedIn profile",
      formName: "Name",
      formEmail: "Email",
      formTopic: "Topic",
      topicPlaceholder: "Choose topic",
      topicMicrosoft: "Microsoft & Workplace",
      topicInfra: "Infrastructure",
      topicAutomation: "Automation",
      topicSap: "SAP B1",
      topicAi: "AI agents",
      formLanguage: "Language",
      formMessage: "Message",
      formSubmit: "Send",
      privacyNote: "Your request goes directly to me and is not shown publicly.",
      footerText: "IT administration, Microsoft infrastructure, automation and AI agents.",
      footerTop: "Back to top",
      liveLabel: "Contact",
      codeLabel: "LinkedIn",
      detailSignals: "Focus areas",
      sending: "Sending...",
      sentSupabase: "Thanks, your message came through.",
      sentLocal: "Thanks, your message came through.",
      sendError: "Could not send. Please try again.",
      formInvalid: "Please complete all fields.",
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
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 9.8 9.8 3 12l6.8 2.2L12 21l2.2-6.8L21 12l-6.8-2.2L12 3Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10v8M8 7.2v.1M12 18v-4.6c0-2.1 1.2-3.4 3.1-3.4 1.8 0 2.9 1.2 2.9 3.5V18M12 10.4V18M4 4.8A1.8 1.8 0 0 1 5.8 3h12.4A1.8 1.8 0 0 1 20 4.8v14.4a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 19.2V4.8Z"/></svg>',
    lock:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V8a5 5 0 0 1 10 0v2M6.5 10h11A1.5 1.5 0 0 1 19 11.5v7A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-7A1.5 1.5 0 0 1 6.5 10Z"/></svg>',
    server:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v6H5V4Zm0 10h14v6H5v-6Zm3-7h.1M8 17h.1"/></svg>',
    terminal:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 7 5 5-5 5m7 0h7"/></svg>',
    brain:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5.5A3 3 0 0 0 6 8.5v7A3.5 3.5 0 0 0 9.5 19H10V5.5H9Zm6 0a3 3 0 0 1 3 3v7a3.5 3.5 0 0 1-3.5 3.5H14V5.5h1ZM10 9H8m2 4H7.5M14 9h2m-2 4h2.5"/></svg>'
  };

  const selectors = {
    projectList: document.querySelector("[data-project-list]"),
    projectDetail: document.querySelector("[data-project-detail]"),
    opsMetrics: document.querySelector("[data-ops-metrics]"),
    capabilityRail: document.querySelector("[data-capability-rail]"),
    playbookGrid: document.querySelector("[data-playbook-grid]"),
    lifeGrid: document.querySelector("[data-life-grid]"),
    stackBoard: document.querySelector("[data-stack-board]"),
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
    setupScrollReveal();
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
      localStorage.setItem("portfolio_theme_v2", state.theme);
      applyTheme();
    });
  }

  function bindLanguageToggle() {
    selectors.languageToggle.addEventListener("click", () => {
      setLanguage(state.lang === "de" ? "en" : "de");
      renderAll();
      setupScrollReveal();
    });
  }

  function setLanguage(lang) {
    state.lang = state.content[lang] ? lang : "de";
    state.data = state.content[state.lang];
    state.filter = "all";
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
      if (!selectors.form.checkValidity()) {
        setFormState("error", t("formInvalid"));
        selectors.form.reportValidity();
        return;
      }

      if (String(formData.get("website") || "").trim()) {
        selectors.form.reset();
        setFormState("success", t("sentSupabase"));
        return;
      }

      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        topic: String(formData.get("topic") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        language: String(formData.get("preferred_language") || state.lang).trim() || state.lang,
        source_url: window.location.href,
        user_agent: navigator.userAgent.slice(0, 500)
      };

      setFormState("loading", t("sending"));
      selectors.form.querySelector("[data-contact-submit]").disabled = true;

      try {
        const result = await window.PortfolioSupabase.saveMessage(payload);
        selectors.form.reset();
        setFormState("success", result.mode === "supabase" ? t("sentSupabase") : t("sentLocal"));
      } catch (error) {
        setFormState("error", t("sendError"));
      } finally {
        selectors.form.querySelector("[data-contact-submit]").disabled = false;
      }
    });
  }

  function setFormState(type, message) {
    selectors.form.dataset.state = type;
    selectors.formNote.textContent = message;
  }

  function renderAll() {
    renderProfile();
    renderOps();
    renderProjects();
    renderLife();
    renderStack();
    renderPlaybooks();
  }

  function renderProfile() {
    const profile = state.data.profile;
    document.title = `${profile.name} | ${t("titleSuffix")}`;
    document.querySelector(".brand-copy strong").textContent = profile.name;
  }

  function visibleProjects() {
    return state.data.projects;
  }

  function renderOps() {
    selectors.opsMetrics.innerHTML = state.data.metrics
      .map(
        (metric) => `
          <article class="ops-metric" data-tone="${escapeAttr(metric.tone || "blue")}">
            <span>${escapeHtml(metric.label)}</span>
            <strong>${escapeHtml(metric.value)}</strong>
            <div class="metric-graph" aria-hidden="true">${renderSparkline(metric.trend || [4, 5, 6, 7])}</div>
            <p>${escapeHtml(metric.text)}</p>
          </article>
        `
      )
      .join("");

    selectors.capabilityRail.innerHTML = state.data.capabilities
      .map(
        (capability, index) => `
          <article class="capability-item">
            <span class="capability-index">${String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>${escapeHtml(capability.title)}</h3>
              <p>${escapeHtml(capability.text)}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderProjects() {
    const projects = visibleProjects();
    selectors.projectList.innerHTML = projects
      .map(
        (project, index) => `
          <button class="project-card ${index === state.activeProject ? "is-active" : ""}"
            type="button" data-project-index="${index}" data-visual="${escapeAttr(project.category)}">
            <div class="project-visual" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <span class="project-card-year">${escapeHtml(project.year)}</span>
            <strong>${escapeHtml(project.title)}</strong>
            <small>${escapeHtml(project.card || project.summary)}</small>
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

    const liveHref = project.links.live || "#contact";
    const codeHref = project.links.code || "#contact";
    const signals = (project.signals || []).slice(0, 3);

    selectors.projectDetail.innerHTML = `
      <div class="project-detail-body">
        <div class="detail-visual" data-visual="${escapeAttr(project.category)}" aria-hidden="true">
          ${renderArchitecture(project.category)}
        </div>
        <div class="detail-shell">
          <div class="detail-meta">
            <span>${escapeHtml(project.status)}</span>
            <span>${escapeHtml(project.year)}</span>
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.summary)}</p>
          ${
            signals.length
              ? `<div class="detail-proof">
                  <span>${escapeHtml(t("detailSignals"))}</span>
                  <ul>${signals.map((signal) => `<li>${escapeHtml(signal)}</li>`).join("")}</ul>
                </div>`
              : ""
          }
          <div class="stack-tags">
            ${project.stack.slice(0, 6).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
          <div class="detail-actions">
            <a class="button button-secondary" ${linkAttributes(liveHref)}>
              <span data-icon="arrow" aria-hidden="true"></span>
              ${escapeHtml(t("liveLabel"))}
            </a>
            <a class="button button-ghost" ${linkAttributes(codeHref)}>
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
      .map((item) => {
        const level = Math.max(0, Math.min(10, Number(item.level) || 0));
        return `
          <article class="stack-row" data-tone="${escapeAttr(item.tone)}">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${formatLevel(level)}/10</span>
            </div>
            <div class="skill-dots" aria-hidden="true">${renderDots(level)}</div>
            <div class="stack-sparkline" aria-hidden="true">${renderSparkline(item.trend || [3, 4, 5, 6, 7])}</div>
          </article>
        `;
      })
      .join("");
  }

  function renderPlaybooks() {
    selectors.playbookGrid.innerHTML = state.data.playbooks
      .map(
        (playbook) => `
          <article class="playbook-card">
            <span>${escapeHtml(playbook.step)}</span>
            <h3>${escapeHtml(playbook.title)}</h3>
            <p>${escapeHtml(playbook.text)}</p>
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
      points = Array.from({ length: 34 }, (_, index) => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: index % 7 === 0 ? 2 : 1.25
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
          if (distance < 145) {
            const lineColor = state.theme === "dark" ? "56, 189, 248" : "14, 165, 233";
            ctx.strokeStyle = `rgba(${lineColor}, ${0.18 - distance / 1100})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((point, index) => {
        ctx.fillStyle = index % 5 === 0 ? "#f59e0b" : index % 3 === 0 ? "#0ea5e9" : "#60a5fa";
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

  function setupScrollReveal() {
    const items = document.querySelectorAll(
      ".ops-metric, .capability-item, .project-card, .project-detail, .stack-row, .life-card, .playbook-card, .contact-form"
    );
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((item) => {
      item.classList.add("reveal-item");
      observer.observe(item);
    });
  }

  function renderSparkline(values) {
    const source = values.length > 1 ? values : [0, 1];
    const min = Math.min(...source);
    const max = Math.max(...source);
    const range = max - min || 1;
    const points = source
      .map((value, index) => {
        const x = (index / (source.length - 1)) * 120;
        const y = 34 - ((value - min) / range) * 26;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
    const last = points.split(" ").at(-1);
    const [cx, cy] = last.split(",");
    return `
      <svg viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="${points}" />
        <circle cx="${cx}" cy="${cy}" r="2.8" />
      </svg>
    `;
  }

  function renderArchitecture(category) {
    const labels = {
      microsoft: ["M365", "Entra", "AD", "Device"],
      infra: ["Server", "LAN", "Backup", "Client"],
      automation: ["PowerShell", "SQL", "API", "Report"],
      ai: ["Agent", "Knowledge", "Prompt", "Workflow"],
      sap: ["SAP B1", "HANA", "SQL", "Interface"]
    };
    const items = labels[category] || labels.infra;
    return `
      <svg viewBox="0 0 520 230" aria-hidden="true">
        <path class="arch-line" d="M92 116 C180 32 336 32 428 116 C336 198 180 198 92 116Z" />
        <path class="arch-line arch-line-soft" d="M138 116 H382" />
        <g class="arch-core">
          <rect x="226" y="82" width="68" height="68" rx="12" />
          <path d="M242 98h18v18h-18zM264 98h18v18h-18zM242 120h18v18h-18zM264 120h18v18h-18z" />
        </g>
        ${items
          .map((label, index) => {
            const coords = [
              [68, 92],
              [176, 28],
              [344, 28],
              [360, 92]
            ][index];
            return `<g class="arch-node"><rect x="${coords[0]}" y="${coords[1]}" width="92" height="44" rx="10" /><text x="${coords[0] + 46}" y="${coords[1] + 28}">${escapeHtml(label)}</text></g>`;
          })
          .join("")}
      </svg>
    `;
  }

  function linkAttributes(href) {
    const safeHref = escapeAttr(href);
    if (/^https?:\/\//i.test(href)) {
      return `href="${safeHref}" target="_blank" rel="noreferrer"`;
    }
    return `href="${safeHref}"`;
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

  function formatLevel(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function renderDots(level) {
    const rounded = Math.round(level);
    return Array.from({ length: 10 }, (_, index) => {
      const filled = index < rounded ? " is-filled" : "";
      return `<span class="skill-dot${filled}"></span>`;
    }).join("");
  }

  function t(key) {
    return (ui[state.lang] && ui[state.lang][key]) || ui.de[key] || key;
  }

  init();
})();
