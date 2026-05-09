(function () {
  const state = {
    content: window.PORTFOLIO_CONTENT,
    data: window.PORTFOLIO_SEED,
    lang: localStorage.getItem("portfolio_lang") || "de",
    theme: localStorage.getItem("portfolio_theme_v3") || "dark",
    activeField: 0,
    pointer: { x: 0.5, y: 0.5 }
  };

  const ui = {
    de: {
      metaDescription:
        "Eirik Christiansen ist IT Administrator und Systems Integrator aus Hamburg mit Fokus auf Microsoft, Infrastruktur, PowerShell-Automatisierung und KI-Agenten.",
      skipLink: "Direkt zur Arbeit",
      brandRole: "IT Administrator / Systems Integrator",
      navWork: "Arbeit",
      navStack: "Stack",
      navJourney: "Werdegang",
      navContact: "Kontakt",
      heroEyebrow: "Hamburg / Remote / Microsoft-first",
      heroTitle: "Ich mache IT ruhig, verbunden und bedienbar.",
      heroLede:
        "IT Administrator mit Schwerpunkt Microsoft, Infrastruktur, PowerShell-Automatisierung und KI-Agenten, die echte Abläufe unterstützen.",
      primaryCta: "Praxis ansehen",
      secondaryCta: "Kontakt",
      panelTitle: "Operations Board",
      panelState: "stabil / verbunden",
      readoutOneLabel: "Fokus",
      readoutOne: "Microsoft & Infrastruktur",
      readoutTwoLabel: "KI",
      readoutTwo: "seit 2020",
      readoutThreeLabel: "SAP B1",
      readoutThree: "seit 04/2025",
      workEyebrow: "Praxisfelder",
      workTitle: "Keine Showcases. Systeme, die Alltag aushalten.",
      workIntro:
        "Ein Portfolio für operative IT: Rechte, Geräte, Datenflüsse, Automatisierung und Assistenzsysteme.",
      stackEyebrow: "Stack",
      stackTitle: "Breit genug für Betrieb. Tief genug für Lösungen.",
      stackIntro: "Die Werte sind eine 1-bis-10-Einordnung aus LinkedIn, Berufserfahrung, Projekten und Ausbildung.",
      journeyEyebrow: "Werdegang",
      journeyTitle: "Von Support und Betrieb zu Systemintegration.",
      contactEyebrow: "Kontakt",
      contactTitle: "Schreib mir, wenn Systeme sprechen sollen.",
      contactText:
        "Microsoft, Infrastruktur, Automatisierung, SAP B1 oder KI-Agenten: kurz beschreiben, worum es geht.",
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
      privacyNote: "Deine Anfrage kommt direkt bei mir an.",
      formSubmit: "Senden",
      footerTop: "Nach oben",
      detailSignals: "Signale",
      detailStack: "Werkzeuge",
      sending: "Sende...",
      sent: "Danke, deine Nachricht ist angekommen.",
      sendError: "Konnte nicht senden. Bitte versuche es erneut.",
      formInvalid: "Bitte fülle die Felder vollständig aus.",
      languageButton: "EN",
      languageLabel: "Switch to English",
      themeLabel: "Theme wechseln"
    },
    en: {
      metaDescription:
        "Eirik Christiansen is a Hamburg-based IT administrator and systems integrator focused on Microsoft, infrastructure, PowerShell automation, and AI agents.",
      skipLink: "Skip to work",
      brandRole: "IT Administrator / Systems Integrator",
      navWork: "Work",
      navStack: "Stack",
      navJourney: "Journey",
      navContact: "Contact",
      heroEyebrow: "Hamburg / remote / Microsoft-first",
      heroTitle: "I make IT calm, connected and usable.",
      heroLede:
        "IT administrator focused on Microsoft, infrastructure, PowerShell automation, and AI agents that support real workflows.",
      primaryCta: "View work",
      secondaryCta: "Contact",
      panelTitle: "Operations Board",
      panelState: "stable / connected",
      readoutOneLabel: "Focus",
      readoutOne: "Microsoft & infrastructure",
      readoutTwoLabel: "AI",
      readoutTwo: "since 2020",
      readoutThreeLabel: "SAP B1",
      readoutThree: "since 04/2025",
      workEyebrow: "Practice areas",
      workTitle: "No showcases. Systems that survive daily operations.",
      workIntro: "A portfolio for operational IT: permissions, devices, data flows, automation, and assistance systems.",
      stackEyebrow: "Stack",
      stackTitle: "Broad enough for operations. Deep enough for solutions.",
      stackIntro: "The values use a 1-to-10 framing from LinkedIn, work experience, projects, and education.",
      journeyEyebrow: "Journey",
      journeyTitle: "From support and operations to systems integration.",
      contactEyebrow: "Contact",
      contactTitle: "Message me when systems need to talk.",
      contactText: "Microsoft, infrastructure, automation, SAP B1, or AI agents: send a short note about the topic.",
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
      privacyNote: "Your request goes directly to me.",
      formSubmit: "Send",
      footerTop: "Back to top",
      detailSignals: "Signals",
      detailStack: "Tools",
      sending: "Sending...",
      sent: "Thanks, your message came through.",
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
    const items = document.querySelectorAll(".field-row, .field-detail, .skill-row, .journey-item, .contact-form");
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
    window.addEventListener(
      "pointermove",
      (event) => {
        state.pointer.x = event.clientX / window.innerWidth;
        state.pointer.y = event.clientY / window.innerHeight;
        document.documentElement.style.setProperty("--mx", `${state.pointer.x * 100}%`);
        document.documentElement.style.setProperty("--my", `${state.pointer.y * 100}%`);
      },
      { passive: true }
    );
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

  init();
})();
