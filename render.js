/* =========================================================================
   render.js — shared rendering helpers used by the public pages and the
   admin. Kept separate from staff.js so the admin can regenerate the data
   file without touching this logic. Requires staff.js to be loaded first.
   ========================================================================= */

function initialsOf(name){
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

/* Build one staff card (returns a Bootstrap column element). */
function buildStaffCard(p){
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

  const avatar = p.photo
    ? `<img class="avatar" src="${p.photo}" alt="Portrait of ${p.name}">`
    : `<div class="avatar" aria-hidden="true">${initialsOf(p.name || "?")}</div>`;

  const badges = (p.trainings && p.trainings.length)
    ? `<div class="badges">${p.trainings.map(t => `<span class="badge-mod">${t}</span>`).join("")}</div>`
    : "";

  const footer = (p.counties && p.counties.length)
    ? `<div class="counties">${p.counties.map(c => `<span class="cty">${c}</span>`).join("")}</div>`
    : `<div class="ops">Operations — not county-assigned</div>`;

  col.innerHTML = `
    <div class="staff-card"
         data-counties="${(p.counties || []).join(",")}"
         data-roles="${(p.roles || []).join(",")}"
         data-trainings="${(p.trainings || []).join(",")}">
      ${avatar}
      <h3>${p.name || ""}</h3>
      ${p.credentials ? `<div class="creds">${p.credentials}</div>` : ""}
      <div class="role">${p.role || ""}</div>
      ${badges}
      ${footer}
    </div>`;
  return col;
}
