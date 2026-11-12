/* =========================================================================
   course.js — the course engine.

   Every screen is built from the module data in content/*.js, so adding a
   page or a question is a data edit, never a new HTML file. Routing is by
   URL hash (#/m/phishing/p/2), which works when the files are opened
   straight from disk and on any static host, and keeps the browser's Back
   button working.

   Each module runs:  intro -> pre-test -> content pages -> post-test -> results
   The pre- and post-test use the SAME questions, so the results page can
   show what changed. Progress is saved in this browser only (localStorage);
   the official record is the completion Google Form (see config.js).
   ========================================================================= */
(function () {
  "use strict";

  const CFG = window.COURSE_CONFIG;
  const MODULES = CFG.moduleOrder
    .map(id => (window.COURSE_MODULES || []).find(m => m.id === id))
    .filter(Boolean);

  const root = document.getElementById("course");
  const navList = document.getElementById("module-nav");
  const STORE_KEY = `ijc-security-training:${CFG.version}`;

  /* ---------------- saved progress ---------------- */

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { modules: {} }; }
    catch (e) { return { modules: {} }; }   // private mode, blocked storage, bad JSON
  }
  function save(state) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (e) { /* the course still works; it just won't remember progress */ }
  }
  let state = load();
  const rec = id => (state.modules[id] = state.modules[id] || {});

  /* ---------------- helpers ---------------- */

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const pct = r => (r && r.total ? Math.round((100 * r.score) / r.total) : 0);
  const passed = r => !!r && pct(r) >= CFG.passPercent;

  function status(m) {
    const r = state.modules[m.id] || {};
    if (passed(r.post)) return "complete";
    if (r.pre) return "in-progress";
    return "not-started";
  }
  const STATUS_TEXT = { "complete": "Complete", "in-progress": "In progress", "not-started": "Not started" };

  // The ordered list of steps in a module; drives Next / Previous and progress.
  function steps(m) {
    return ["intro", "pre", ...m.pages.map((_, i) => `p/${i + 1}`), "post", "results"];
  }
  const href = (m, step) => `#/m/${m.id}/${step}`;

  function nextHref(m, step) {
    const s = steps(m), i = s.indexOf(step);
    if (i < s.length - 1) return href(m, s[i + 1]);
    const mi = MODULES.indexOf(m);
    return mi < MODULES.length - 1 ? href(MODULES[mi + 1], "intro") : "#/complete";
  }
  function prevHref(m, step) {
    const s = steps(m), i = s.indexOf(step);
    return i > 0 ? href(m, s[i - 1]) : "#/";
  }

  // Where a returning learner should pick up: the first unfinished module.
  function resumeHref() {
    for (const m of MODULES) {
      const r = state.modules[m.id] || {};
      if (!r.pre) return href(m, "intro");
      if (!passed(r.post)) return href(m, r.post ? "results" : "p/1");
    }
    return "#/complete";
  }

  /* ---------------- navigation bar ---------------- */

  function renderNav(activeId) {
    navList.innerHTML = MODULES.map((m, i) => {
      const st = status(m);
      const mark = st === "complete" ? `<span class="nav-mark" aria-hidden="true">✓</span>` : "";
      return `<li class="nav-item">
        <a class="nav-link${m.id === activeId ? " active" : ""}" href="${href(m, "intro")}"
           ${m.id === activeId ? 'aria-current="page"' : ""}>
          ${mark}${i + 1}. ${esc(m.short)}<span class="visually-hidden"> (${STATUS_TEXT[st]})</span>
        </a></li>`;
    }).join("") +
    `<li class="nav-item"><a class="nav-link${activeId === "complete" ? " active" : ""}" href="#/complete">Finish</a></li>`;
  }

  /* ---------------- shared pieces ---------------- */

  function stepper(m, step) {
    const s = steps(m), i = s.indexOf(step);
    return `<p class="stepper">Module ${MODULES.indexOf(m) + 1} of ${MODULES.length}
            &middot; Step ${i + 1} of ${s.length}</p>`;
  }

  function navButtons(m, step, { nextLabel = "Next", hideNext = false } = {}) {
    return `<div class="step-nav">
      <a class="btn btn-outline-woods" href="${prevHref(m, step)}">&laquo; Previous</a>
      ${hideNext ? "" : `<a class="btn btn-lantern" href="${nextHref(m, step)}">${nextLabel} &raquo;</a>`}
    </div>`;
  }

  function media(md) {
    if (!md) return "";
    const transcript = md.transcript
      ? `<details class="transcript"><summary>Transcript</summary><div>${md.transcript}</div></details>` : "";
    const cap = md.caption ? `<figcaption>${esc(md.caption)}</figcaption>` : "";
    switch (md.type) {
      case "image":
        return `<figure class="media">${`<img src="${esc(md.src)}" alt="${esc(md.alt)}">`}${cap}</figure>`;
      case "video":
        return `<figure class="media"><video controls preload="metadata" src="${esc(md.src)}">
          ${md.captions ? `<track kind="captions" src="${esc(md.captions)}" srclang="en" label="English" default>` : ""}
          </video>${cap}</figure>${transcript}`;
      case "embed":   // a hosted video, e.g. a CISA or HHS clip
        return `<figure class="media"><div class="ratio ratio-16x9">
          <iframe src="${esc(md.src)}" title="${esc(md.title || md.caption || "Video")}" allowfullscreen></iframe>
          </div>${cap}</figure>${transcript}`;
      case "audio":
        return `<figure class="media"><audio controls src="${esc(md.src)}"></audio>${cap}</figure>${transcript}`;
      case "todo":    // a placeholder for media not made yet
        return `<div class="media-todo"><strong>${esc(md.kind || "Video")} to create:</strong> ${esc(md.note)}</div>`;
      default:
        return "";
    }
  }

  /* ---------------- screens ---------------- */

  function viewHome() {
    const started = Object.keys(state.modules).length > 0;
    const minutes = MODULES.reduce((t, m) => t + (m.minutes || 0), 0);
    return {
      title: CFG.title,
      html: `
      <h1 tabindex="-1">${esc(CFG.title)}</h1>
      <p class="lead">Required annual training for everyone at ${esc(CFG.org)} who works with client
        or financial information. About ${minutes} minutes, in ${MODULES.length} short modules.</p>

      <h2 class="h4 mt-4">How it works</h2>
      <ol class="how">
        <li>Each module opens with a <strong>quick check</strong> of what you already know. It doesn't
            count, so just answer honestly.</li>
        <li>Work through the short lessons and demonstrations.</li>
        <li>Finish with the <strong>same questions again</strong>. You need ${CFG.passPercent}% to
            complete the module, and you can retake it.</li>
        <li>When all ${MODULES.length} are done, submit the <strong>completion form</strong>. That's your
            official record.</li>
      </ol>
      <p class="note">Your progress is saved in this browser on this device. To pick up where you
        left off, come back on the same device and browser.</p>

      <h2 class="h4 mt-4">Modules</h2>
      <ul class="module-list">
        ${MODULES.map((m, i) => {
          const st = status(m);
          return `<li><a href="${href(m, "intro")}">${i + 1}. ${esc(m.title)}</a>
                  <span class="status status-${st}">${STATUS_TEXT[st]}</span></li>`;
        }).join("")}
      </ul>

      <div class="step-nav">
        ${started ? `<button type="button" class="btn btn-link px-0" id="reset">Start over</button>` : "<span></span>"}
        <a class="btn btn-lantern" href="${resumeHref()}">${started ? "Continue" : "Start"} &raquo;</a>
      </div>`,
      after() {
        const b = document.getElementById("reset");
        if (b) b.addEventListener("click", () => {
          if (confirm("Clear your saved progress and start the course over?")) {
            state = { modules: {} }; save(state); render();
          }
        });
      }
    };
  }

  function viewIntro(m) {
    return {
      title: m.title,
      html: `
      ${stepper(m, "intro")}
      <h1 tabindex="-1">${esc(m.title)}</h1>
      <p class="lead">About ${m.minutes} minutes.</p>
      <h2 class="h5">By the end of this module you'll be able to:</h2>
      <ul>${m.objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
      ${navButtons(m, "intro", { nextLabel: "Start the quick check" })}`
    };
  }

  function viewQuiz(m, kind) {   // kind: "pre" | "post"
    const isPre = kind === "pre";
    return {
      title: `${m.short} — ${isPre ? "Quick check" : "End-of-module check"}`,
      html: `
      ${stepper(m, kind)}
      <h1 tabindex="-1">${isPre ? "Quick check: what do you already know?" : "End-of-module check"}</h1>
      <p>${isPre
        ? "This doesn't count toward anything. You'll see the same questions again at the end of the module, and then you can compare."
        : `These are the questions from the start of the module. You need ${CFG.passPercent}% to complete it.`}</p>
      <form id="quiz" novalidate>
        ${m.quiz.map((q, qi) => `
          <fieldset class="question" id="q${qi}">
            <legend>${qi + 1}. ${esc(q.q)}</legend>
            ${q.options.map((o, oi) => `
              <div class="form-check">
                <input class="form-check-input" type="radio" name="q${qi}" id="q${qi}o${oi}" value="${oi}">
                <label class="form-check-label" for="q${qi}o${oi}">${esc(o)}</label>
              </div>`).join("")}
          </fieldset>`).join("")}
        <div id="quiz-error" class="quiz-error" role="alert"></div>
        <button type="submit" class="btn btn-lantern">Submit answers</button>
      </form>
      <div class="step-nav"><a class="btn btn-outline-woods" href="${prevHref(m, kind)}">&laquo; Previous</a></div>`,
      after() {
        const form = document.getElementById("quiz");
        form.addEventListener("submit", e => {
          e.preventDefault();
          const answers = m.quiz.map((_, qi) => {
            const c = form.querySelector(`input[name="q${qi}"]:checked`);
            return c ? Number(c.value) : null;
          });
          const missing = answers.findIndex(a => a === null);
          if (missing !== -1) {
            document.getElementById("quiz-error").textContent =
              `Please answer every question. Question ${missing + 1} has no answer yet.`;
            form.querySelector(`input[name="q${missing}"]`).focus();
            return;
          }
          const score = answers.reduce((s, a, qi) => s + (a === m.quiz[qi].answer ? 1 : 0), 0);
          rec(m.id)[kind] = { answers, score, total: m.quiz.length, at: new Date().toISOString() };
          save(state);
          location.hash = isPre ? href(m, "p/1") : href(m, "results");
        });
      }
    };
  }

  function viewPage(m, n) {
    const p = m.pages[n - 1];
    const step = `p/${n}`;
    return {
      title: `${m.short} — ${p.title}`,
      html: `
      ${stepper(m, step)}
      <h1 tabindex="-1">${esc(p.title)}</h1>
      ${media(p.media)}
      <div class="page-body">${p.body}</div>
      ${navButtons(m, step, { nextLabel: n === m.pages.length ? "Go to the end-of-module check" : "Next" })}`
    };
  }

  function viewResults(m) {
    const r = state.modules[m.id] || {};
    const pre = r.pre, post = r.post;
    const ok = passed(post);
    const mark = (a, qi) => a === m.quiz[qi].answer
      ? `<span class="res res-ok">✓ Correct</span>` : `<span class="res res-miss">✗ Not quite</span>`;
    const ans = (a, qi) => a === null || a === undefined ? "<em>No answer</em>" : esc(m.quiz[qi].options[a]);

    let summary;
    if (!ok) summary = `You scored <strong>${pct(post)}%</strong>. You need ${CFG.passPercent}% to complete
      this module. Look over the explanations below, then try the check again.`;
    else if (pre && post.score > pre.score) summary = `You went from <strong>${pre.score} of ${pre.total}</strong>
      to <strong>${post.score} of ${post.total}</strong>. This module is complete.`;
    else summary = `You scored <strong>${post.score} of ${post.total}</strong>. This module is complete.`;

    return {
      title: `${m.short} — Results`,
      html: `
      ${stepper(m, "results")}
      <h1 tabindex="-1">Your results: ${esc(m.short)}</h1>
      <div class="result-summary ${ok ? "is-pass" : "is-retry"}" role="status">${summary}</div>
      <ol class="result-list">
        ${m.quiz.map((q, qi) => `
          <li>
            <p class="rq">${esc(q.q)}</p>
            <dl>
              ${pre ? `<dt>Before</dt><dd>${ans(pre.answers[qi], qi)} ${mark(pre.answers[qi], qi)}</dd>` : ""}
              <dt>After</dt><dd>${ans(post.answers[qi], qi)} ${mark(post.answers[qi], qi)}</dd>
              ${post.answers[qi] !== q.answer ? `<dt>Answer</dt><dd>${esc(q.options[q.answer])}</dd>` : ""}
            </dl>
            ${q.explain ? `<p class="explain">${esc(q.explain)}</p>` : ""}
          </li>`).join("")}
      </ol>
      <div class="step-nav">
        <a class="btn btn-outline-woods" href="${href(m, "p/1")}">&laquo; Review the lessons</a>
        ${ok
          ? `<a class="btn btn-lantern" href="${nextHref(m, "results")}">Continue &raquo;</a>`
          : `<button type="button" class="btn btn-lantern" id="retake">Try the check again</button>`}
      </div>`,
      after() {
        const b = document.getElementById("retake");
        if (b) b.addEventListener("click", () => {
          delete rec(m.id).post; save(state); location.hash = href(m, "post");
        });
      }
    };
  }

  // The completion form's link, with this learner's scores filled in for any
  // fields mapped in config.completionFormFields. Percentages, not "3/3":
  // Google Sheets reads "3/3" as the date March 3rd.
  function completionLink() {
    const base = CFG.completionFormUrl;
    const fields = CFG.completionFormFields || {};
    const params = new URLSearchParams();
    for (const [key, entry] of Object.entries(fields)) {
      if (!/^entry\.\d+$/.test(entry)) continue;          // ignore placeholders or typos
      if (key === "version") { params.set(entry, CFG.version); continue; }
      const [id, kind] = key.split(".");
      const r = (state.modules[id] || {})[kind];
      if (r && (kind === "pre" || kind === "post")) params.set(entry, String(pct(r)));
    }
    if (![...params.keys()].length) return base;
    return `${base}${base.includes("?") ? "&" : "?"}usp=pp_url&${params.toString()}`;
  }

  function viewComplete() {
    const remaining = MODULES.filter(m => status(m) !== "complete");
    const done = remaining.length === 0;
    const form = CFG.completionFormUrl ? completionLink() : "";
    return {
      title: "Finish",
      html: `
      <h1 tabindex="-1">${done ? "You've finished the training" : "Almost there"}</h1>
      ${done ? `
        <p class="lead">One last step: submit the completion form. That's the official record of your training.</p>
        ${form
          ? `<ol class="how">
               <li>Open the form below. It opens in a new tab.</li>
               <li>If Google asks you to sign in, use your <strong>${esc(CFG.org)} Google account</strong>,
                   not a personal one. The form records which account submitted it.</li>
               <li>Answer the questions and press Submit.</li>
             </ol>
             <p><a class="btn btn-lantern" href="${esc(form)}" target="_blank" rel="noopener">Open the completion form</a></p>`
          : `<div class="alert alert-warning">The completion form hasn't been set up yet.
             An administrator needs to add its link to <code>completionFormUrl</code> in <code>js/config.js</code>.</div>`}
      ` : `
        <p>Complete every module to unlock the completion form. Still to do:</p>
        <ul>${remaining.map(m => `<li><a href="${href(m, "intro")}">${esc(m.title)}</a>
              <span class="status status-${status(m)}">${STATUS_TEXT[status(m)]}</span></li>`).join("")}</ul>`}
      <h2 class="h5 mt-4">Your scores</h2>
      <table class="table score-table">
        <thead><tr><th scope="col">Module</th><th scope="col">Before</th><th scope="col">After</th></tr></thead>
        <tbody>${MODULES.map(m => {
          const r = state.modules[m.id] || {};
          const cell = x => x ? `${x.score} / ${x.total}` : "—";
          return `<tr><th scope="row">${esc(m.short)}</th><td>${cell(r.pre)}</td><td>${cell(r.post)}</td></tr>`;
        }).join("")}</tbody>
      </table>`
    };
  }

  /* ---------------- router ---------------- */

  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "complete") return { view: viewComplete(), active: "complete" };
    if (parts[0] === "m") {
      const m = MODULES.find(x => x.id === parts[1]);
      if (m) {
        const r = state.modules[m.id] || {};
        const step = parts.slice(2).join("/") || "intro";
        if (step === "intro") return { view: viewIntro(m), active: m.id };
        if (step === "pre") return { view: viewQuiz(m, "pre"), active: m.id };
        // The before/after comparison needs a "before": send anyone who skips
        // ahead to the post-test or results back to the quick check first.
        if (step === "post") return r.pre ? { view: viewQuiz(m, "post"), active: m.id } : { redirect: href(m, "pre") };
        if (step === "results") return r.post ? { view: viewResults(m), active: m.id } : { redirect: href(m, r.pre ? "post" : "pre") };
        const pm = step.match(/^p\/(\d+)$/);
        if (pm && +pm[1] >= 1 && +pm[1] <= m.pages.length) return { view: viewPage(m, +pm[1]), active: m.id };
      }
    }
    return { view: viewHome(), active: null };
  }

  function render() {
    const r = route();
    if (r.redirect) { location.replace(r.redirect); return; }
    root.innerHTML = r.view.html;
    document.title = `${r.view.title} — ${CFG.org}`;
    renderNav(r.active);
    if (r.view.after) r.view.after();
    // Move focus to the new heading so screen-reader and keyboard users land
    // on the new content rather than at the bottom of the old page.
    const h = root.querySelector("h1");
    if (h) h.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  document.getElementById("brand-title").textContent = CFG.title;
  document.getElementById("footer-contact").textContent = CFG.securityContact;
  window.addEventListener("hashchange", render);
  render();
})();
