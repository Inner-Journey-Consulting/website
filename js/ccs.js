/* =========================================================================
   ccs.js — CCS overview (ccs.html) and per-county roster (ccs-county.html,
   chosen via ?county=NAME) with a graceful empty state.
   Reads records via loadStaff() (staff.js).
   ========================================================================= */
(function () {
  const overview = document.getElementById("ccs-overview");
  const roster = document.getElementById("county-roster");
  if (!overview && !roster) return;

  const inCounty = (staff, c) => staff
    .filter(p => (p.counties || []).includes(c))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  loadStaff().then(staff => {
    if (overview) {
      COUNTIES.forEach(c => {
        const n = inCounty(staff, c).length;
        const meta = n > 0 ? `${n} team member${n === 1 ? "" : "s"}` : "Contracted — accepting referrals";
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-lg-4";
        col.innerHTML = `
          <a class="county-card" href="ccs-county.html?county=${encodeURIComponent(c)}">
            <h3>${c} County</h3>
            <div class="meta">${meta}</div>
            <span class="arrow">View team &rarr;</span>
          </a>`;
        overview.appendChild(col);
      });
    }

    if (roster) {
      const raw = new URLSearchParams(window.location.search).get("county") || "";
      const county = COUNTIES.find(c => c.toLowerCase() === raw.toLowerCase());
      const titleEl = document.getElementById("county-title");
      const subEl = document.getElementById("county-sub");

      if (!county) {
        titleEl.textContent = "County not found";
        subEl.textContent = "Choose a county from the CCS menu above.";
        return;
      }
      document.title = `CCS in ${county} County — Inner Journey Consulting`;
      titleEl.textContent = `CCS in ${county} County`;

      const people = inCounty(staff, county);
      if (people.length === 0) {
        subEl.textContent = "";
        roster.innerHTML = `
          <div class="col-12"><div class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <path d="M12 3l9 6v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"/><path d="M9 21v-6h6v6"/></svg>
            <h3>Inner Journey serves ${county} County</h3>
            <p>We provide Comprehensive Community Services here and are accepting referrals. To make a
               referral or ask about availability, <a href="contact.html">get in touch</a>.</p>
          </div></div>`;
        return;
      }
      subEl.textContent = `${people.length} team member${people.length === 1 ? "" : "s"} serving ${county} County.`;
      people.forEach(p => roster.appendChild(buildStaffCard(p)));
    }
  });
})();
