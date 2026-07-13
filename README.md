# Inner Journey Consulting — website

Plain static site: HTML + CSS + vanilla JavaScript, laid out with Bootstrap 5
(from a CDN). No build step. Content is edited through a Git-based CMS at
`/admin/` (Sveltia CMS), so non-technical staff can publish on their own.

## Run / preview it

The site fetches `content/staff.json`, so serve it over HTTP — don't open the
files directly with `file://`. Locally:

    python3 -m http.server        # then visit http://localhost:8000

Hosted (Netlify/GitHub Pages/Cloudflare Pages), it just works. See **SETUP.md**
for the one-time hosting + CMS wiring.

## Structure

    index.html          Home
    who-we-are.html     Team directory with County / Role / Training filters
    ccs.html            CCS overview — grid of the six counties
    ccs-county.html     One county's roster; chosen via ?county=NAME
    contact.html        Contact form + details
    admin/              Sveltia CMS (index.html loads it; config.yml is the schema)
    content/staff.json  *** The staff records — edited by the CMS, read by the site ***
    css/styles.css      All custom styling (palette tokens live at the top)
    js/staff.js         Category lists (COUNTIES/ROLES/TRAININGS) + staff loader
    js/render.js        Card-rendering helpers (shared)
    js/site.js          Injects the shared navbar + footer into every page
    js/team.js          Who-We-Are filtering logic
    js/ccs.js           CCS overview + per-county roster logic
    assets/             Logo; assets/team/ holds CMS-uploaded photos

## Editing content

- **Staff (Carl / Holly):** go to `/admin/`, sign in with GitHub, edit the Team
  Members list, and Save. It commits to the repo and the site republishes. No
  code, no file copying. Setup is in **SETUP.md**.
- **Categories (developer):** counties, roles, and trainings are controlled lists
  defined in BOTH `js/staff.js` (site) and `admin/config.yml` (CMS dropdowns).
  Add a new one to both files. This is deliberately a code edit, so the lists
  stay controlled.
- **Retheme:** change the color tokens in the `:root` block of `css/styles.css`.
- **Nav / footer:** edit `js/site.js` (defined once, shown on every page).

## To make the contact form send

The contact form is static markup; point its `<form action>` at a handler
(Formspree, or Netlify Forms if you host on Netlify) to actually send.

## Notes

- Staff records and category wording are provisional sample data pending review.
- The logo is a cleaned raster (PNG). If the original vector turns up, drop the
  `.svg` into `assets/` and swap the two `<img src>` references.
