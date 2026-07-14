/* =========================================================================
   bio.js — single team member page, chosen via ?person=slug
   (the slug is derived from the name; see slugify() in render.js).
   Requires staff.js and render.js.
   ========================================================================= */
(function () {
  const root = document.getElementById("bio-root");
  if (!root) return;

  const slug = new URLSearchParams(window.location.search).get("person") || "";

  loadStaff().then(staff => {
    const p = staff.find(s => slugify(s.name) === slug.toLowerCase());

    if (!p) {
      root.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
          <h3>Team member not found</h3>
          <p><a href="who-we-are.html" style="color:var(--amber)">Back to the team</a></p>
        </div>`;
      return;
    }

    document.title = `${p.name} — Inner Journey Consulting`;

    const portrait = p.photo
      ? `<img class="portrait" src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}">`
      : `<div class="portrait" aria-hidden="true">${initialsOf(p.name)}</div>`;

    // Blank-line-separated paragraphs -> <p> tags.
    const bodyHtml = (p.bio || "")
      .split(/\n\s*\n/)
      .map(para => para.trim())
      .filter(Boolean)
      .map(para => `<p>${esc(para)}</p>`)
      .join("") || `<p><em>Bio coming soon.</em></p>`;

    const tags = []
      .concat((p.trainings || []).map(t => `<span class="badge-mod">${esc(t)}</span>`))
      .concat((p.counties || []).map(c => `<span class="cty">${esc(c)} County</span>`))
      .join("");

    root.innerHTML = `
      <a class="d-inline-block mb-4 fw-semibold text-decoration-none"
         href="who-we-are.html" style="color:var(--amber)">&larr; Back to the team</a>

      <div class="bio-hero mb-4">
        ${portrait}
        <div class="meta">
          <div class="eyebrow mb-2">${esc(p.role)}</div>
          <h1 style="font-size:clamp(2rem,4.5vw,2.8rem)">${esc(p.name)}</h1>
          ${p.credentials ? `<div class="creds mt-1" style="color:var(--amber);font-weight:600;
             letter-spacing:.12em;text-transform:uppercase;font-size:.8rem">${esc(p.credentials)}</div>` : ""}
          ${tags ? `<div class="bio-tags">${tags}</div>` : ""}
        </div>
      </div>

      <div class="bio-body">${bodyHtml}</div>

      <a class="btn btn-lantern mt-4" href="contact.html">Get in touch</a>`;
  });
})();
