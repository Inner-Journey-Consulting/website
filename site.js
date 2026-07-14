/* =========================================================================
   site.js — injects the shared navbar and footer into every page, so the
   nav and footer are defined once here instead of copied into each HTML file.
   Requires staff.js (for COUNTIES) to be loaded before this file.

   Each page sets <body data-page="home|team|ccs|contact"> to mark the
   active nav item.
   ========================================================================= */
(function () {
  const page = document.body.dataset.page || "";

  // ---- county links for the CCS dropdown, built from COUNTIES ----
  const countyItems = (typeof COUNTIES !== "undefined" ? COUNTIES : [])
    .map(c => `<li><a class="dropdown-item" href="ccs-county.html?county=${encodeURIComponent(c)}">${c} County</a></li>`)
    .join("");

  const nav = `
  <nav class="navbar navbar-expand-lg navbar-woods">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
        <img src="assets/logo-cream.png" alt="" width="34" height="34">
        <span class="brand-name">Inner Journey Consulting</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#mainNav" aria-controls="mainNav"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li class="nav-item"><a class="nav-link ${page === "home" ? "active" : ""}" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link ${page === "team" ? "active" : ""}" href="who-we-are.html">Who We Are</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle ${page === "ccs" ? "active" : ""}" href="#" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">CCS</a>
            <ul class="dropdown-menu dropdown-menu-lg-end">
              <li><a class="dropdown-item" href="ccs.html">CCS Overview</a></li>
              <li><hr class="dropdown-divider"></li>
              ${countyItems}
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link ${page === "contact" ? "active" : ""}" href="contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>`;

  const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="row gy-4 py-5">
        <div class="col-12 col-md-3">
          <div class="brandcol">
            <img src="assets/logo-cream.png" alt="Inner Journey Consulting">
            <span>Inner Journey<br>Consulting</span>
          </div>
        </div>
        <div class="col-6 col-md-3"><h4>Location</h4>1505 N. 60th Street<br>Wauwatosa, WI 53208</div>
        <div class="col-6 col-md-3"><h4>Hours</h4>Monday &ndash; Friday<br>9am &ndash; 5pm</div>
        <div class="col-12 col-md-3"><h4>Contact</h4>
          <a href="mailto:contact@innerjourneymke.com">contact@innerjourneymke.com</a><br>(414) 526-0982</div>
      </div>
    </div>
    <div class="copy">&copy; <span id="year"></span> Inner Journey Consulting</div>
  </footer>`;

  const navMount = document.getElementById("site-nav");
  const footMount = document.getElementById("site-footer");
  if (navMount) navMount.innerHTML = nav;
  if (footMount) footMount.outerHTML = footer;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
