/* =========================================================================
   team.js — Who We Are directory: three filter rows (County / Role /
   Training) combined with AND logic, plus an empty state.
   Reads records via loadStaff() (staff.js) and renders with buildStaffCard()
   (render.js).
   ========================================================================= */
(function () {
  const grid = document.getElementById("staff-grid");
  if (!grid) return;

  const filtersEl = document.getElementById("filters");
  const countEl = document.getElementById("count");
  const emptyEl = document.getElementById("empty");
  const active = { county: "all", role: "all", training: "all" };
  const facetToData = { county: "counties", role: "roles", training: "trainings" };

  function buildRow(facet, label, values) {
    const buttons = ['<button class="chip-btn active" data-value="all">All</button>']
      .concat(values.map(v => `<button class="chip-btn" data-value="${v}">${v}</button>`))
      .join("");
    return `<div class="frow" data-facet="${facet}"><span class="flabel">${label}</span>${buttons}</div>`;
  }
  filtersEl.innerHTML =
    buildRow("county", "County", COUNTIES) +
    buildRow("role", "Role", ROLES) +
    buildRow("training", "Training", TRAININGS);

  let cards = [];
  let total = 0;

  function matches(card, facet, val) {
    if (val === "all") return true;
    return (card.dataset[facetToData[facet]] || "").split(",").includes(val);
  }
  function update() {
    let shown = 0;
    cards.forEach(card => {
      const ok = matches(card, "county", active.county)
              && matches(card, "role", active.role)
              && matches(card, "training", active.training);
      const col = card.closest("[class*='col-']");
      if (col) col.classList.toggle("d-none", !ok);
      if (ok) shown++;
    });
    emptyEl.classList.toggle("d-none", shown !== 0);
    const parts = [];
    if (active.county !== "all") parts.push(active.county + " County");
    if (active.role !== "all") parts.push(active.role);
    if (active.training !== "all") parts.push(active.training);
    if (shown === 0) countEl.textContent = "";
    else if (parts.length) countEl.textContent = `Showing ${shown} of ${total} — ${parts.join(" · ")}`;
    else countEl.textContent = `Showing all ${total} team members`;
  }
  filtersEl.addEventListener("click", e => {
    const btn = e.target.closest(".chip-btn");
    if (!btn) return;
    const row = btn.closest(".frow");
    row.querySelectorAll(".chip-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    active[row.dataset.facet] = btn.dataset.value;
    update();
  });

  loadStaff().then(staff => {
    staff.slice().sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .forEach(p => grid.appendChild(buildStaffCard(p)));
    cards = Array.from(grid.querySelectorAll(".staff-card"));
    total = cards.length;
    update();
  });
})();
