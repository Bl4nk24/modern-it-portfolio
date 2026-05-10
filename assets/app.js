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
      navStack: "Stack",
      navJourney: "Werdegang",
      navContact: "Kontakt",
      heroEyebrow: "Moin / Hamburg / Remote",
      heroTitle: "Ich bin Eirik. Ich halte IT ruhig, verbunden und nutzbar.",
      heroLede:
        "Ich arbeite dort, wo Microsoft, Infrastruktur, Automatisierung und Support zusammenkommen: Rechte, Geräte, Datenflüsse, Agenten und Systeme, die im Alltag einfach funktionieren.",
      primaryCta: "Praxis ansehen",
      secondaryCta: "Kontakt",
      panelTitle: "Operations Board",
      panelState: "online / ruhig",
      readoutOneLabel: "Fokus",
      readoutOne: "Microsoft & Infrastruktur",
      readoutTwoLabel: "KI",
      readoutTwo: "seit 2020",
      readoutThreeLabel: "SAP B1",
      readoutThree: "seit 04/2025",
      workEyebrow: "Praxisfelder",
      workTitle: "Betrieb, Verbindung, Automatisierung.",
      workIntro:
        "Meine Arbeit beginnt meist dort, wo Systeme schon da sind: Microsoft, Server, Netzwerk, Daten und Menschen. Ich bringe Struktur rein, automatisiere Wiederholung und mache Übergänge verlässlich.",
      connectEyebrow: "System Connector",
      connectTitle: "Wähle zwei Systeme. Sieh, welche Daten fließen.",
      connectIntro:
        "Ein Ausschnitt aus Integrationsarbeit: Stammdaten mappen, IDs stabil halten, Fehler loggen und nur Daten bewegen, die fachlich Sinn ergeben.",
      connectorSource: "Quelle",
      connectorTarget: "Ziel",
      connectorSyncData: "Synchronisierte Daten",
      connectorMethod: "Umsetzung",
      connectorGuard: "Sauber halten",
      connectorDirection: "Richtung",
      stackEyebrow: "Stack",
      stackTitle: "Technik, die ich wirklich anfasse.",
      stackIntro: "Die Skala orientiert sich an LinkedIn-Kenntnissen, Berufserfahrung, Studium, Projekten und täglichem Betrieb.",
      journeyEyebrow: "Werdegang",
      journeyTitle: "Vom Admin-Alltag zur Systemintegration.",
      contactEyebrow: "Kontakt",
      contactTitle: "Lass uns deine Systeme sortieren.",
      contactText:
        "Sag kurz, was nicht rund läuft oder was du verbinden willst. Ich melde mich mit einem klaren nächsten Schritt.",
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
      privacyNote: "Kommt direkt bei mir an. Diskret, kurz, ohne Umwege.",
      formSubmit: "Senden",
      footerTop: "Nach oben",
      detailSignals: "Signale",
      detailStack: "Werkzeuge",
      sending: "Sende...",
      sent: "Danke, ist angekommen. Ich melde mich.",
      sendError: "Konnte nicht senden. Bitte versuche es erneut.",
      formInvalid: "Bitte fülle die Felder vollständig aus.",
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
      navStack: "Stack",
      navJourney: "Journey",
      navContact: "Contact",
      heroEyebrow: "Hi / Hamburg / remote",
      heroTitle: "I'm Eirik. I keep IT calm, connected, and usable.",
      heroLede:
        "I work where Microsoft, infrastructure, automation, and support meet: permissions, devices, data flows, agents, and systems that hold up in daily work.",
      primaryCta: "View work",
      secondaryCta: "Contact",
      panelTitle: "Operations Board",
      panelState: "online / calm",
      readoutOneLabel: "Focus",
      readoutOne: "Microsoft & infrastructure",
      readoutTwoLabel: "AI",
      readoutTwo: "since 2020",
      readoutThreeLabel: "SAP B1",
      readoutThree: "since 04/2025",
      workEyebrow: "Practice areas",
      workTitle: "Operations, integration, automation.",
      workIntro:
        "Most of my work starts with systems that already exist: Microsoft, servers, networks, data, and people. I bring structure, remove repetition, and make handovers reliable.",
      connectEyebrow: "System connector",
      connectTitle: "Pick two systems. See which data moves.",
      connectIntro:
        "A small slice of integration work: map master data, keep IDs stable, log failures, and move only data that makes operational sense.",
      connectorSource: "Source",
      connectorTarget: "Target",
      connectorSyncData: "Synchronized data",
      connectorMethod: "Implementation",
      connectorGuard: "Keep it clean",
      connectorDirection: "Direction",
      stackEyebrow: "Stack",
      stackTitle: "Technology I actually work with.",
      stackIntro: "The scale is based on LinkedIn skills, work experience, education, projects, and daily operations.",
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
      privacyNote: "Goes directly to me. Private, short, no detours.",
      formSubmit: "Send",
      footerTop: "Back to top",
      detailSignals: "Signals",
      detailStack: "Tools",
      sending: "Sending...",
      sent: "Thanks, got it. I will get back to you.",
      sendError: "Could not send. Please try again.",
      formInvalid: "Please complete all fields.",
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
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A7.4 7.4 0 0 1 8.8 4 8.2 8.2 0 1 0 20 15.2Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V3m0 18v-2m7-7h2M3 12h2m12.95-4.95 1.42-1.42M4.63 19.37l1.42-1.42m0-10.9L4.63 5.63m14.74 13.74-1.42-1.42M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg>'
  };

  const selectors = {
    fieldList: document.querySelector("[data-field-list]"),
    fieldDetail: document.querySelector("[data-field-detail]"),
    connectorSource: document.querySelector("[data-connector-source]"),
    connectorTarget: document.querySelector("[data-connector-target]"),
    connectorDetail: document.querySelector("[data-connector-detail]"),
    skillBoard: document.querySelector("[data-skill-board]"),
    journeyTrack: document.querySelector("[data-journey-track]"),
    consoleLines: document.querySelector("[data-console-lines]"),
    languageToggle: document.querySelector("[data-language-toggle]"),
    themeToggle: document.querySelector("[data-theme-toggle]"),
    form: document.querySelector("[data-contact-form]"),
    formNote: document.querySelector("[data-form-note]")
  };

  function init() {
    setLanguage(state.lang);
    applyTheme();
    hydrateIcons();
    renderAll();
    setupTicker();
    bindLanguage();
    bindTheme();
    bindContact();
    setupHeader();
    setupReveal();
    setupCanvas();
    setupPointer();
    setupHashScroll();
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
        renderConnector();
      });
    });

    selectors.connectorTarget.querySelectorAll("[data-connector-target-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeConnectionTarget = button.dataset.connectorTargetId;
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
        </div>
      </div>
    `;
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
    });
  }

  function bindTheme() {
    selectors.themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio_theme_v3", state.theme);
      applyTheme();
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
      selectors.form.querySelector("[data-contact-submit]").disabled = true;
      try {
        await window.PortfolioSupabase.saveMessage(payload);
        selectors.form.reset();
        setFormState("success", t("sent"));
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

  function setupHeader() {
    const header = document.querySelector("[data-elevate]");
    const update = () => header.classList.toggle("is-elevated", window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
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
      if (!track.dataset.ready) {
        track.innerHTML += track.innerHTML;
        track.dataset.ready = "true";
      }
    });
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
