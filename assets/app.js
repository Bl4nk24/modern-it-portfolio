(function () {
  const state = {
    content: window.PORTFOLIO_CONTENT,
    data: window.PORTFOLIO_SEED,
    lang: localStorage.getItem("portfolio_lang") || "de",
    theme: localStorage.getItem("portfolio_theme_v3") || "dark",
    activeField: 0,
    activeConnectionSource: "hr",
    activeConnectionTarget: "entra",
    pointer: { x: 0.5, y: 0.5 }
  };

  const ui = {
    de: {
      metaDescription:
        "Eirik Christiansen ist IT Administrator aus Hamburg und verbindet Microsoft-Umgebungen, Infrastruktur, PowerShell-Automatisierung und KI-Agenten.",
      skipLink: "Direkt zur Arbeit",
      brandRole: "IT Administrator / Systems Integrator",
      navWork: "Arbeit",
      navConnect: "Verbindungen",
      navCases: "Cases",
      navStack: "Stack",
      navJourney: "Werdegang",
      navContact: "Kontakt",
      heroEyebrow: "Moin / Hamburg / Remote",
      heroTitle: "IT muss nicht laut sein. Sie muss funktionieren.",
      heroLede:
        "Ich verbinde Microsoft-Umgebungen, Infrastruktur, APIs und Automatisierung so, dass Menschen weniger suchen, weniger klicken und schneller arbeiten.",
      primaryCta: "Praxis ansehen",
      secondaryCta: "Kontakt",
      cvCta: "CV herunterladen",
      cvDeCta: "CV DE",
      cvEnCta: "CV EN",
      panelTitle: "Operations Board",
      panelState: "online / ruhig",
      readoutOneLabel: "Fokus",
      readoutOne: "Microsoft & Infrastruktur",
      readoutTwoLabel: "KI",
      readoutTwo: "seit 2020",
      readoutThreeLabel: "SAP B1",
      readoutThree: "seit 04/2025",
      workEyebrow: "Praxisfelder",
      workTitle: "Wo Betrieb und Automatisierung zusammenkommen.",
      workIntro:
        "Mein Profil ist kein reines Developer-Portfolio. Es ist Administration, Systemverständnis und die Fähigkeit, vorhandene Tools sauber miteinander sprechen zu lassen.",
      connectEyebrow: "System Connector",
      connectTitle: "Wähle zwei Systeme. Sieh, welche Daten sinnvoll fließen.",
      connectIntro:
        "Ein Ausschnitt aus Integrationsarbeit: Stammdaten mappen, IDs stabil halten, Fehler loggen und nur Daten bewegen, die fachlich Sinn ergeben.",
      connectorSource: "Quelle",
      connectorTarget: "Ziel",
      connectorSyncData: "Synchronisierte Daten",
      connectorMethod: "Umsetzung",
      connectorGuard: "Sauber halten",
      connectorAvoid: "Nicht synchronisieren",
      connectorDirection: "Richtung",
      stackEyebrow: "Stack",
      stackTitle: "Technik, die ich wirklich anfasse.",
      stackIntro: "Die Werte sind ein 1-bis-10-Modell aus LinkedIn-Kenntnissen, Berufserfahrung, Studium, Projekten und täglichem Betrieb.",
      casesEyebrow: "Cases",
      casesTitle: "Konkrete Verbindungen statt Buzzwords.",
      casesIntro: "Vier Beispiele, die zeigen, wie ich denke: erst den Prozess verstehen, dann Datenfelder, Rechte, Fehlerpfade und Betrieb sauber machen.",
      caseDataLabel: "Daten",
      caseResultLabel: "Wirkung",
      practiceEyebrow: "Best Practices",
      practiceTitle: "So baue ich Integrationen, die man betreiben kann.",
      practiceIntro: "Gute Automatisierung ist nicht nur ein Script. Sie hat Eigentümer, Logs, Grenzen, Wiederholbarkeit und einen Weg zurück.",
      automationTitle: "Automation-Werkzeuge",
      microsoftTitle: "Microsoft-Bezug",
      journeyEyebrow: "Werdegang",
      journeyTitle: "Vom Admin-Alltag zur Systemintegration.",
      contactEyebrow: "Kontakt",
      contactTitle: "Lass uns deine Systeme sortieren.",
      contactText:
        "Sag kurz, welche Systeme du verbinden, stabilisieren oder automatisieren willst. Ich melde mich mit einem klaren nächsten Schritt.",
      linkedinCta: "LinkedIn ansehen",
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
      privacyNote: "Wird sicher gespeichert und vertraulich behandelt.",
      formSubmit: "Senden",
      footerTop: "Nach oben",
      detailSignals: "Signale",
      detailStack: "Werkzeuge",
      sending: "Sende...",
      sent: "Danke, ist angekommen. Ich melde mich.",
      sendError: "Konnte nicht senden. Bitte versuche es erneut.",
      formInvalid: "Bitte fülle die Felder vollständig aus.",
      easterMessage: "Moin. Logs sauber, APIs wach, Kaffee optional.",
      languageButton: "EN",
      languageLabel: "Switch to English",
      themeLabel: "Theme wechseln"
    },
    en: {
      metaDescription:
        "Eirik Christiansen is a Hamburg-based IT administrator connecting Microsoft environments, infrastructure, PowerShell automation, and AI agents.",
      skipLink: "Skip to work",
      brandRole: "IT Administrator / Systems Integrator",
      navWork: "Work",
      navConnect: "Connections",
      navCases: "Cases",
      navStack: "Stack",
      navJourney: "Journey",
      navContact: "Contact",
      heroEyebrow: "Hi / Hamburg / remote",
      heroTitle: "IT does not need to be loud. It needs to work.",
      heroLede:
        "I connect Microsoft environments, infrastructure, APIs, and automation so people search less, click less, and get work done faster.",
      primaryCta: "View work",
      secondaryCta: "Contact",
      cvCta: "Download CV",
      cvDeCta: "CV DE",
      cvEnCta: "CV EN",
      panelTitle: "Operations Board",
      panelState: "online / calm",
      readoutOneLabel: "Focus",
      readoutOne: "Microsoft & infrastructure",
      readoutTwoLabel: "AI",
      readoutTwo: "since 2020",
      readoutThreeLabel: "SAP B1",
      readoutThree: "since 04/2025",
      workEyebrow: "Practice areas",
      workTitle: "Where operations and automation meet.",
      workIntro:
        "This is not a pure developer portfolio. It is administration, system understanding, and the ability to make existing tools talk to each other cleanly.",
      connectEyebrow: "System connector",
      connectTitle: "Pick two systems. See which data should move.",
      connectIntro:
        "A small slice of integration work: map master data, keep IDs stable, log failures, and move only data that makes operational sense.",
      connectorSource: "Source",
      connectorTarget: "Target",
      connectorSyncData: "Synchronized data",
      connectorMethod: "Implementation",
      connectorGuard: "Keep it clean",
      connectorAvoid: "Do not sync",
      connectorDirection: "Direction",
      stackEyebrow: "Stack",
      stackTitle: "Technology I actually work with.",
      stackIntro: "The values are a 1-to-10 model based on LinkedIn skills, work experience, education, projects, and daily operations.",
      casesEyebrow: "Cases",
      casesTitle: "Concrete connections, not buzzwords.",
      casesIntro: "Four examples that show how I think: understand the process first, then make data fields, permissions, failure paths, and operations clean.",
      caseDataLabel: "Data",
      caseResultLabel: "Impact",
      practiceEyebrow: "Best practices",
      practiceTitle: "How I build integrations you can operate.",
      practiceIntro: "Good automation is not just a script. It has owners, logs, boundaries, repeatability, and a way back.",
      automationTitle: "Automation tools",
      microsoftTitle: "Microsoft signal",
      journeyEyebrow: "Journey",
      journeyTitle: "From admin work to system integration.",
      contactEyebrow: "Contact",
      contactTitle: "Let's sort your systems.",
      contactText: "Tell me what is stuck or what you want to connect. I will get back to you with a clear next step.",
      linkedinCta: "View LinkedIn",
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
      privacyNote: "Stored securely and handled confidentially.",
      formSubmit: "Send",
      footerTop: "Back to top",
      detailSignals: "Signals",
      detailStack: "Tools",
      sending: "Sending...",
      sent: "Thanks, got it. I will get back to you.",
      sendError: "Could not send. Please try again.",
      formInvalid: "Please complete all fields.",
      easterMessage: "Moin. Clean logs, awake APIs, coffee optional.",
      languageButton: "DE",
      languageLabel: "Auf Deutsch wechseln",
      themeLabel: "Toggle theme"
    }
  };

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 16-8-5.5 16-3.2-6.2L4 12Zm7.3 1.8L20 4"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10v8M8 7.2v.1M12 18v-4.6c0-2.1 1.2-3.4 3.1-3.4 1.8 0 2.9 1.2 2.9 3.5V18M4 4.8A1.8 1.8 0 0 1 5.8 3h12.4A1.8 1.8 0 0 1 20 4.8v14.4a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 19.2V4.8Z"/></svg>',
    file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A7.4 7.4 0 0 1 8.8 4 8.2 8.2 0 1 0 20 15.2Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V3m0 18v-2m7-7h2M3 12h2m12.95-4.95 1.42-1.42M4.63 19.37l1.42-1.42m0-10.9L4.63 5.63m14.74 13.74-1.42-1.42M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg>'
  };

  const selectors = {
    fieldList: document.querySelector("[data-field-list]"),
    fieldDetail: document.querySelector("[data-field-detail]"),
    connectorSource: document.querySelector("[data-connector-source]"),
    connectorTarget: document.querySelector("[data-connector-target]"),
    connectorDetail: document.querySelector("[data-connector-detail]"),
    caseGrid: document.querySelector("[data-case-grid]"),
    practiceGrid: document.querySelector("[data-practice-grid]"),
    automationRail: document.querySelector("[data-automation-rail]"),
    microsoftMap: document.querySelector("[data-microsoft-map]"),
    skillBoard: document.querySelector("[data-skill-board]"),
    journeyTrack: document.querySelector("[data-journey-track]"),
    consoleLines: document.querySelector("[data-console-lines]"),
    languageToggle: document.querySelector("[data-language-toggle]"),
    themeToggle: document.querySelector("[data-theme-toggle]"),
    easterToast: document.querySelector("[data-easter-toast]"),
    form: document.querySelector("[data-contact-form]"),
    formNote: document.querySelector("[data-form-note]")
  };

  function init() {
    setLanguage(state.lang);
    applyTheme();
    hydrateIcons();
    renderAll();
    setupTicker();
    window.addEventListener("resize", () => requestAnimationFrame(setupTicker));
    bindLanguage();
    bindTheme();
    bindContact();
    setupHeader();
    setupReveal();
    setupCanvas();
    setupPointer();
    setupHashScroll();
    setupScrollSpy();
    setupEasterEggs();
    setupAnalytics();
  }

  function setLanguage(lang) {
    state.lang = state.content[lang] ? lang : "de";
    state.data = state.content[state.lang];
    localStorage.setItem("portfolio_lang", state.lang);
    document.documentElement.lang = state.lang;
    document.title = `${state.data.profile.name} | IT Portfolio`;
    document.querySelector('meta[name="description"]').setAttribute("content", t("metaDescription"));
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    selectors.languageToggle.textContent = t("languageButton");
    selectors.languageToggle.setAttribute("aria-label", t("languageLabel"));
    selectors.themeToggle.setAttribute("aria-label", t("themeLabel"));
  }

  function renderAll() {
    renderConsole();
    renderFields();
    renderConnector();
    renderCases();
    renderPractices();
    renderSkills();
    renderJourney();
    setupReveal();
  }

  function renderConsole() {
    selectors.consoleLines.innerHTML = state.data.consoleLines
      .map((line, index) => `<li style="--delay:${index * 140}ms"><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(line)}</li>`)
      .join("");
  }

  function renderFields() {
    selectors.fieldList.innerHTML = state.data.fields
      .map(
        (field, index) => `
          <button class="field-row ${index === state.activeField ? "is-active" : ""}" type="button" data-field-index="${index}">
            <span>${escapeHtml(field.eyebrow)}</span>
            <strong>${escapeHtml(field.title)}</strong>
            <small>${escapeHtml(field.summary)}</small>
          </button>
        `
      )
      .join("");

    selectors.fieldList.querySelectorAll("[data-field-index]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeField = Number(button.dataset.fieldIndex);
        renderFields();
      });
    });

    renderFieldDetail(state.data.fields[state.activeField]);
  }

  function renderFieldDetail(field) {
    selectors.fieldDetail.innerHTML = `
      <div class="detail-screen">
        <div class="detail-grid" aria-hidden="true">
          ${field.stack.map((item, index) => `<span style="--x:${14 + index * 15}%;--y:${22 + (index % 3) * 24}%">${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>
      <div class="detail-copy">
        <p class="detail-meta">${escapeHtml(field.year)}</p>
        <h3>${escapeHtml(field.title)}</h3>
        <p>${escapeHtml(field.detail)}</p>
        <div class="signal-list">
          <strong>${escapeHtml(t("detailSignals"))}</strong>
          ${field.signals.map((signal) => `<span>${escapeHtml(signal)}</span>`).join("")}
        </div>
        <div class="stack-tags" aria-label="${escapeAttr(t("detailStack"))}">
          ${field.stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>
    `;
  }

  function renderConnector() {
    const connector = state.data.connector;
    if (!connector || !selectors.connectorSource || !selectors.connectorTarget || !selectors.connectorDetail) return;

    const sourceIds = unique(connector.flows.map((flow) => flow.from));
    const targetIds = unique(connector.flows.map((flow) => flow.to));
    const sources = connector.systems.filter((system) => sourceIds.includes(system.id));
    const targets = connector.systems.filter((system) => targetIds.includes(system.id));

    if (!sourceIds.includes(state.activeConnectionSource)) {
      state.activeConnectionSource = sources[0].id;
    }

    const availableTargetIds = connector.flows
      .filter((flow) => flow.from === state.activeConnectionSource)
      .map((flow) => flow.to);

    if (!availableTargetIds.includes(state.activeConnectionTarget)) {
      state.activeConnectionTarget = availableTargetIds[0];
    }

    selectors.connectorSource.innerHTML = sources.map((system, index) => renderConnectorButton(system, index, "source", true)).join("");
    selectors.connectorTarget.innerHTML = targets
      .map((system, index) => renderConnectorButton(system, index, "target", availableTargetIds.includes(system.id)))
      .join("");

    selectors.connectorSource.querySelectorAll("[data-connector-source-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeConnectionSource = button.dataset.connectorSourceId;
        trackEvent("connector_select", state.activeConnectionSource, { side: "source" });
        renderConnector();
      });
    });

    selectors.connectorTarget.querySelectorAll("[data-connector-target-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeConnectionTarget = button.dataset.connectorTargetId;
        trackEvent("connector_select", state.activeConnectionTarget, { side: "target" });
        renderConnector();
      });
    });

    const flow = connector.flows.find((item) => item.from === state.activeConnectionSource && item.to === state.activeConnectionTarget);
    renderConnectorDetail(connector, flow);
  }

  function renderConnectorButton(system, index, side, isAvailable) {
    const isActive = side === "source" ? system.id === state.activeConnectionSource : system.id === state.activeConnectionTarget;
    const dataset = side === "source" ? `data-connector-source-id="${escapeAttr(system.id)}"` : `data-connector-target-id="${escapeAttr(system.id)}"`;
    const disabled = isAvailable ? "" : "disabled";
    return `
      <button
        class="connector-system ${isActive ? "is-active" : ""}"
        type="button"
        ${dataset}
        ${disabled}
        aria-pressed="${isActive ? "true" : "false"}"
        style="--delay:${index * 120}ms"
      >
        <span>${escapeHtml(system.tag)}</span>
        <strong>${escapeHtml(system.name)}</strong>
        <small>${escapeHtml(system.short)}</small>
      </button>
    `;
  }

  function renderConnectorDetail(connector, flow) {
    const source = connector.systems.find((system) => system.id === flow.from);
    const target = connector.systems.find((system) => system.id === flow.to);
    selectors.connectorDetail.innerHTML = `
      <div class="connector-flow-visual">
        <div class="connector-endpoint">
          <span>${escapeHtml(source.tag)}</span>
          <strong>${escapeHtml(source.name)}</strong>
        </div>
        <div class="connector-beam" aria-hidden="true">
          ${flow.data.slice(0, 6).map((_, index) => `<i style="--delay:${index * 0.38}s"></i>`).join("")}
        </div>
        <div class="connector-endpoint">
          <span>${escapeHtml(target.tag)}</span>
          <strong>${escapeHtml(target.name)}</strong>
        </div>
      </div>
      <div class="connector-copy">
        <p class="detail-meta">${escapeHtml(t("connectorDirection"))}</p>
        <h3>${escapeHtml(flow.title)}</h3>
        <p>${escapeHtml(flow.summary)}</p>
        <div class="sync-data">
          <strong>${escapeHtml(t("connectorSyncData"))}</strong>
          <div>
            ${flow.data.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
        <div class="connector-meta-grid">
          <div>
            <span>${escapeHtml(t("connectorMethod"))}</span>
            <p>${escapeHtml(flow.method)}</p>
          </div>
          <div>
            <span>${escapeHtml(t("connectorGuard"))}</span>
            <p>${escapeHtml(flow.guard)}</p>
          </div>
          ${
            flow.avoid
              ? `<div>
                  <span>${escapeHtml(t("connectorAvoid"))}</span>
                  <p>${escapeHtml(flow.avoid)}</p>
                </div>`
              : ""
          }
        </div>
      </div>
    `;
  }

  function renderCases() {
    if (!selectors.caseGrid || !state.data.cases) return;
    selectors.caseGrid.innerHTML = state.data.cases
      .map(
        (item, index) => `
          <article class="case-card" style="--delay:${index * 120}ms">
            <div class="case-topline">
              <span>${escapeHtml(item.label)}</span>
              <i>${String(index + 1).padStart(2, "0")}</i>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
            <div class="case-system-strip">
              ${item.systems.map((system) => `<span>${escapeHtml(system)}</span>`).join("")}
            </div>
            <div class="case-data">
              <strong>${escapeHtml(t("caseDataLabel"))}</strong>
              ${item.data.map((field) => `<em>${escapeHtml(field)}</em>`).join("")}
            </div>
            <div class="case-result">
              <strong>${escapeHtml(t("caseResultLabel"))}</strong>
              <p>${escapeHtml(item.result)}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderPractices() {
    if (selectors.practiceGrid && state.data.bestPractices) {
      selectors.practiceGrid.innerHTML = state.data.bestPractices
        .map(
          (item, index) => `
            <article class="practice-item" style="--delay:${index * 95}ms">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `
        )
        .join("");
    }

    if (selectors.automationRail && state.data.automationStack) {
      selectors.automationRail.innerHTML = state.data.automationStack
        .map((item, index) => `<span style="--delay:${index * 140}ms">${escapeHtml(item)}</span>`)
        .join("");
    }

    if (selectors.microsoftMap && state.data.microsoftMap) {
      selectors.microsoftMap.innerHTML = state.data.microsoftMap
        .map(
          (group) => `
            <article>
              <h3>${escapeHtml(group.title)}</h3>
              <div>
                ${group.items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
              </div>
            </article>
          `
        )
        .join("");
    }
  }

  function renderSkills() {
    selectors.skillBoard.innerHTML = state.data.skills
      .map((skill) => {
        const width = Math.max(6, Math.min(100, Number(skill.level) * 10));
        return `
          <article class="skill-row">
            <div>
              <strong>${escapeHtml(skill.name)}</strong>
              <span>${escapeHtml(skill.group)}</span>
            </div>
            <div class="skill-meter" aria-label="${escapeAttr(skill.name)} ${skill.level}/10">
              <span style="width:${width}%"></span>
            </div>
            <em>${Number(skill.level).toFixed(1)}</em>
          </article>
        `;
      })
      .join("");
  }

  function renderJourney() {
    selectors.journeyTrack.innerHTML = state.data.journey
      .map(
        (item, index) => `
          <article class="journey-item" style="--delay:${index * 110}ms">
            <span>${escapeHtml(item.date)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.text)}</p>
          </article>
        `
      )
      .join("");
  }

  function bindLanguage() {
    selectors.languageToggle.addEventListener("click", () => {
      state.activeField = 0;
      setLanguage(state.lang === "de" ? "en" : "de");
      renderAll();
      trackEvent("language_toggle", state.lang);
    });
  }

  function bindTheme() {
    selectors.themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio_theme_v3", state.theme);
      applyTheme();
      trackEvent("theme_toggle", state.theme);
    });
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    const iconNode = selectors.themeToggle.querySelector("[data-icon]");
    iconNode.dataset.icon = state.theme === "dark" ? "sun" : "moon";
    hydrateIcons(selectors.themeToggle);
  }

  function bindContact() {
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
        setFormState("success", t("sent"));
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
      trackEvent("contact_submit", payload.topic || "contact");
      selectors.form.querySelector("[data-contact-submit]").disabled = true;
      try {
        await window.PortfolioSupabase.saveMessage(payload);
        selectors.form.reset();
        setFormState("success", t("sent"));
        trackEvent("contact_success", payload.topic || "contact");
      } catch (error) {
        setFormState("error", t("sendError"));
        trackEvent("contact_error", payload.topic || "contact", { message: String(error && error.message ? error.message : error).slice(0, 160) });
      } finally {
        selectors.form.querySelector("[data-contact-submit]").disabled = false;
      }
    });
  }

  function setFormState(type, message) {
    selectors.form.dataset.state = type;
    selectors.formNote.textContent = message;
  }

  function setupHeader() {
    const header = document.querySelector("[data-elevate]");
    const update = () => header.classList.toggle("is-elevated", window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupScrollSpy() {
    const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const sections = links
      .map((link) => {
        const id = link.getAttribute("href").slice(1);
        return { id, link, section: document.getElementById(id) };
      })
      .filter((item) => item.section);

    if (!sections.length) return;

    const setActive = (activeId) => {
      sections.forEach(({ id, link }) => {
        const isActive = id === activeId;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const update = () => {
      const triggerLine = window.innerHeight * 0.38;
      let activeId = sections[0].id;

      sections.forEach(({ id, section }) => {
        if (section.getBoundingClientRect().top <= triggerLine) {
          activeId = id;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        activeId = sections[sections.length - 1].id;
      }

      setActive(activeId);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", () => requestAnimationFrame(update));
  }

  function setupReveal() {
    const items = document.querySelectorAll(".field-row, .field-detail, .connector-system, .connector-detail, .skill-row, .journey-item, .contact-form");
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
      { threshold: 0.14 }
    );
    items.forEach((item) => {
      item.classList.add("reveal-item");
      observer.observe(item);
    });
  }

  function setupTicker() {
    document.querySelectorAll("[data-ticker-track]").forEach((track) => {
      if (!track.dataset.seed) {
        track.dataset.seed = track.innerHTML;
      }
      const seed = track.dataset.seed;
      track.innerHTML = seed;
      let loops = 1;
      while (track.scrollWidth < window.innerWidth * 1.45 && loops < 12) {
        track.innerHTML += seed;
        loops += 1;
      }
      track.innerHTML += track.innerHTML;
    });
  }

  function setupEasterEggs() {
    const toast = selectors.easterToast;
    if (!toast) return;

    let buffer = "";
    let timer;
    const ignoredTags = new Set(["INPUT", "TEXTAREA", "SELECT"]);

    const reveal = () => {
      toast.textContent = t("easterMessage");
      toast.hidden = false;
      toast.classList.add("is-visible");
      document.documentElement.classList.add("is-easter");
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
        document.documentElement.classList.remove("is-easter");
        window.setTimeout(() => {
          toast.hidden = true;
        }, 220);
      }, 4200);
      trackEvent("easter_egg", "moin");
    };

    document.addEventListener("keydown", (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (ignoredTags.has(document.activeElement?.tagName)) return;
      const key = event.key.toLowerCase();
      if (!/^[a-z0-9]$/.test(key)) return;
      buffer = `${buffer}${key}`.slice(-12);
      if (buffer.endsWith("moin") || buffer.endsWith("eirik")) {
        reveal();
      }
    });

    document.querySelector(".brand-mark")?.addEventListener("dblclick", reveal);
  }

  function setupPointer() {
    const setPointer = (x, y) => {
      state.pointer.x = x / window.innerWidth;
      state.pointer.y = y / window.innerHeight;
      document.documentElement.style.setProperty("--mx", `${Math.round(x)}px`);
      document.documentElement.style.setProperty("--my", `${Math.round(y)}px`);
    };

    setPointer(window.innerWidth / 2, window.innerHeight / 2);

    window.addEventListener(
      "pointermove",
      (event) => {
        setPointer(event.clientX, event.clientY);
      },
      { passive: true }
    );
  }

  function setupAnalytics() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-track]");
      if (!target) return;
      trackEvent(target.dataset.track || "outbound_click", target.dataset.trackTarget || target.getAttribute("href") || "");
    });

    const sections = document.querySelectorAll("section[id]");
    if (!("IntersectionObserver" in window)) return;

    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target.id)) return;
          seen.add(entry.target.id);
          trackEvent("section_view", entry.target.id);
        });
      },
      { threshold: 0.42 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function trackEvent(eventType, eventTarget = "", metadata = {}) {
    window.PortfolioSupabase?.trackEvent?.({
      event_type: eventType,
      event_target: eventTarget,
      language: state.lang,
      path: window.location.pathname + window.location.hash,
      metadata
    }).catch(() => {});
  }

  function setupHashScroll() {
    const scrollToHash = () => {
      if (!window.location.hash) return;
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ block: "start" });
    };

    requestAnimationFrame(() => requestAnimationFrame(scrollToHash));
    window.addEventListener("hashchange", () => requestAnimationFrame(scrollToHash));
  }

  function setupCanvas() {
    const canvas = document.querySelector("#meshCanvas");
    const ctx = canvas.getContext("2d");
    let points = [];
    let frame;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: 54 }, (_, index) => ({
        x: (index % 9) * (rect.width / 8) + (Math.random() - 0.5) * 20,
        y: Math.floor(index / 9) * (rect.height / 5) + (Math.random() - 0.5) * 20,
        ox: 0,
        oy: 0,
        speed: 0.002 + Math.random() * 0.003
      }));
    }

    function draw(time) {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const dark = state.theme === "dark";
      const accent = dark ? "56, 189, 248" : "0, 120, 212";
      const muted = dark ? "255, 255, 255" : "15, 23, 42";
      points.forEach((point, index) => {
        point.ox = Math.sin(time * point.speed + index) * 8;
        point.oy = Math.cos(time * point.speed + index * 0.7) * 8;
      });
      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const ax = a.x + a.ox;
          const ay = a.y + a.oy;
          const bx = b.x + b.ox;
          const by = b.y + b.oy;
          const distance = Math.hypot(ax - bx, ay - by);
          if (distance < 170) {
            ctx.strokeStyle = `rgba(${accent}, ${0.14 - distance / 1800})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }
      points.forEach((point, index) => {
        ctx.fillStyle = index % 7 === 0 ? `rgba(${accent}, 0.9)` : `rgba(${muted}, 0.2)`;
        ctx.beginPath();
        ctx.arc(point.x + point.ox, point.y + point.oy, index % 7 === 0 ? 2.2 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }

    resize();
    draw(0);
    window.addEventListener("resize", () => {
      cancelAnimationFrame(frame);
      resize();
      draw(0);
    });
  }

  function hydrateIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = icons[node.dataset.icon] || icons.arrow;
    });
  }

  function t(key) {
    return (ui[state.lang] && ui[state.lang][key]) || ui.de[key] || key;
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

  function unique(items) {
    return Array.from(new Set(items));
  }

  init();
})();
