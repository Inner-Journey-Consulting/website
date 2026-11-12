/* =========================================================================
   config.js — the settings an editor is most likely to change.
   ========================================================================= */
window.COURSE_CONFIG = {
  title: "Cybersecurity Awareness Training",
  org: "Inner Journey Consulting",

  // Bump this for each annual edition. Saved progress is stored per version,
  // so a new version starts everyone fresh without anyone clearing anything.
  version: "2026.1",

  // The official completion record: a Google Form owned by the Inner Journey
  // Workspace, restricted to the organization, with verified email collection
  // and Quiz mode on. Leave blank until it exists — the completion page will
  // say so instead of linking nowhere.
  completionFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeyipg7poQXuJmWtJiMjxyy-JjgUA4M_CSkl-ejSOqvk2f_hw/viewform",

  // Score fields on the completion form, filled in automatically from this
  // browser's results. Keys are "<module id>.pre" or "<module id>.post" for a
  // module's before / after score, sent as a percentage (a whole number, e.g.
  // 67). "version" sends the course version above. Values are the form's
  // entry IDs: in the form editor, More (⋮) > Get pre-filled link, fill in
  // each field, Get link, and read the entry.NNNN parts of that link.
  // Anything left out is simply not filled in.
  //
  // Pre-filled answers stay editable in Google Forms, so these are a
  // convenience, not tamper-proof. The record's authority comes from the
  // verified email and the attestation.
  completionFormFields: {
    "phishing.pre":   "entry.825778880",
    "phishing.post":  "entry.1840946672",
    "passwords.pre":  "entry.1885067235",
    "passwords.post": "entry.312807455",
    "data.pre":       "entry.1528542073",
    "data.post":      "entry.1727010128",
    "reporting.pre":  "entry.1863488691",
    "reporting.post": "entry.1695759295"
  },

  // Minimum end-of-module score, as a percentage, for a module to count as
  // complete. "Successfully completed" is what the county certification says.
  // Set to 0 to accept any score.
  passPercent: 80,

  // Who staff report incidents to. Shown in Module 4 and the footer.
  securityContact: "the Security Officer",

  // Module order. Each id must match a file in content/.
  moduleOrder: ["phishing", "passwords", "data", "reporting"]
};
