/* =========================================================================
   staff.js — vocabularies + the staff loader.

   • The controlled category lists live HERE (edited by a developer, rarely).
     They must stay in sync with the same lists in admin/config.yml, which is
     what powers the dropdowns in the CMS form.
   • The staff RECORDS live in content/staff.json, which the CMS edits and
     commits. This file just fetches them.

   Because records are fetched, the site must be served over HTTP (Netlify,
   GitHub Pages, or `python3 -m http.server` locally) — not opened via file://.
   ========================================================================= */

const COUNTIES = ["Waukesha", "Ozaukee", "Dodge", "Jefferson", "Washington", "Walworth"];

const ROLES = [
  "Psychotherapist",
  "Youth/Peer Support",
  "Family Engagement/Psycho-Education",
  "Program Support"
];

const TRAININGS = [
  "EMDR",
  "Brainspotting",
  "Sensory-motor",
  "Jungian/Analytical"
];

async function loadStaff(){
  try {
    const res = await fetch("content/staff.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return Array.isArray(data.staff) ? data.staff : [];
  } catch (err) {
    console.warn("Could not load content/staff.json. Serve the site over HTTP, not file://.", err);
    return [];
  }
}
