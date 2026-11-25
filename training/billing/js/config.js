/* =========================================================================
   config.js — settings for the billing compliance course.

   This course is Jefferson County's "Medicaid, Medicare & Third-Party Biller
   Compliance Training" in Inner Journey's course format. The content follows
   the county's slides; see training/README.md, "Billing compliance course".
   ========================================================================= */
(function () {
  // The county's contacts, used throughout the course. Kept in one place
  // because they change. No one is named: the county's slides and its Code of
  // Conduct name different Compliance Officers, so the course refers to the
  // Compliance Office and its phone number, which both agree on.
  const county = {
    officerPhone: "(920) 674-7191",
    address: ["1541 Annex Road", "Jefferson, WI 53549"]
  };

  // Who sends staff the county's Acknowledgment form, by email, and collects
  // the signed forms to send on to the county.
  const formFrom = "Carl Vitense";

  window.COURSE_CONFIG = {
    title: "Billing Compliance Training",
    org: "Inner Journey Consulting",
    county: county,

    // Saved progress is kept separately from the cybersecurity course.
    storageKey: "ijc-billing-compliance",
    // Bump each year so everyone starts fresh.
    version: "2026.1",

    intro: `Jefferson County's annual <strong>Medicaid, Medicare &amp; Third-Party Biller
      Compliance Training</strong>, required within 30 days of starting and every year after
      for everyone who provides or bills for mental health services under the county's
      contract.`,
    finishStep: `When all four are done, go to <strong>Certification</strong>: submit
      Inner Journey's <strong>completion form</strong>, then sign the county's
      Acknowledgment form, which ${formFrom} will email you.`,

    finishLabel: "Certification",

    // Module 5 in the county's training. Staff first submit Inner Journey's
    // completion form (below); then Carl emails them the county's Acknowledgment
    // and Agreement form to sign and return to him.
    completionHtml: `
      <p class="lead">Module 5: Certification. Two last steps: record your completion with
        Inner Journey, then sign the county's <strong>Acknowledgment and Agreement</strong>
        form.</p>`,
    completionFormHeading: "First, record your completion with Inner Journey",
    completionAfterHtml: `
      <h2 class="h5 mt-4">Then sign the county's form</h2>
      <p>${formFrom} will email the county's <strong>Acknowledgment and Agreement</strong>
        form to your <strong>Inner Journey email address</strong>. Fill it in, sign it, and
        return it to him as the email explains. He sends everyone's forms to the county,
        and it's the county's record that you completed this training.</p>
      <p>Questions about the training? Contact the Jefferson County Compliance Office at
        ${county.officerPhone}.</p>`,

    // Inner Journey's own completion record: a Google Form in the Inner Journey
    // Workspace, restricted to the organization, with verified email collection.
    // Blank would leave the county's form as the only record.
    completionFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeUlNy8Fg0TMZlo4RJqOr-6diuxYCQsfw9EoG2xXb93hK-11A/viewform",

    // Score fields on that form, filled in from this browser's results as
    // percentages. See completionFormFields in ../cyber/js/config.js for how to
    // find the entry IDs. (The form was copied from the cybersecurity one, so
    // some IDs happen to match its.)
    completionFormFields: {
      "compliance.pre":    "entry.825778880",
      "compliance.post":   "entry.1840946672",
      "program.pre":       "entry.1885067235",
      "program.post":      "entry.312807455",
      "false-claims.pre":  "entry.1863488691",
      "false-claims.post": "entry.1695759295",
      "integrity.pre":     "entry.245729207",
      "integrity.post":    "entry.1141366136"
    },

    passPercent: 80,

    // Shown in the footer: who Inner Journey staff ask first.
    securityContact: "Carl Vitense",

    // Modules 1-4 of the county's training. Module 5 (Certification) is the
    // finish page above.
    moduleOrder: ["compliance", "program", "false-claims", "integrity"]
  };
})();
