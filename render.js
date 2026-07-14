/* =========================================================================
   render.js — shared rendering helpers. Requires staff.js to load first.
   ========================================================================= */

function initialsOf(name){
  return (name || "?").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

/* Turn a name into a URL-safe slug:
   "Michelle Townsend de López" -> "michelle-townsend-de-lopez"
   Derived from the name, so CMS editors never type or maintain a slug. */
function slugify(name){
  return (name || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")   // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* Escape values before injecting into HTML. */
function esc(str){
  return String(str ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

/* Build one staff card (returns a Bootstrap column element). */
function buildStaffCard(p){
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

  const avatar = p.photo
    ? `<img class="avatar" src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}" loading="lazy">`
    : `<div class="avatar" aria-hidden="true">${initialsOf(p.name)}</div>`;

  const badges = (p.trainings && p.trainings.length)
    ? `<div class="badges">${p.trainings.map(t => `<span class="badge-mod">${esc(t)}</span>`).join("")}</div>`
    : "";

  const footer = (p.counties && p.counties.length)
    ? `<div class="counties">${p.counties.map(c => `<span class="cty">${esc(c)}</span>`).join("")}</div>`
    : `<div class="ops">Operations — not county-assigned</div>`;

  // Only show the button when there's actually a bio to read.
  const bioBtn = (p.bio && p.bio.trim())
    ? `<a class="bio-btn" href="bio.html?person=${encodeURIComponent(slugify(p.name))}">Read Bio</a>`
    : "";

  col.innerHTML = `
    <div class="staff-card"
         data-counties="${esc((p.counties || []).join(","))}"
         data-roles="${esc((p.roles || []).join(","))}"
         data-trainings="${esc((p.trainings || []).join(","))}">
      ${avatar}
      <h3>${esc(p.name)}</h3>
      ${p.credentials ? `<div class="creds">${esc(p.credentials)}</div>` : ""}
      <div class="role">${esc(p.role)}</div>
      ${badges}
      ${footer}
      <div class="spacer"></div>
      ${bioBtn}
    </div>`;
  return col;
}
