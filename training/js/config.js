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

  // Minimum end-of-module score, as a percentage, for a module to count as
  // complete. "Successfully completed" is what the county certification says.
  // Set to 0 to accept any score.
  passPercent: 80,

  // Who staff report incidents to. Shown in Module 4 and the footer.
  securityContact: "the Security Officer",

  // Module order. Each id must match a file in content/.
  moduleOrder: ["phishing", "passwords", "data", "reporting"]
};
