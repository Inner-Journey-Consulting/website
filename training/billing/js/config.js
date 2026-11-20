/* =========================================================================
   config.js — settings for the billing compliance course.

   This course is Jefferson County's "Medicaid, Medicare & Third-Party Biller
   Compliance Training" in Inner Journey's course format. The content follows
   the county's slides; see training/README.md, "Billing compliance course".
   ========================================================================= */
(function () {
  // The county's contacts, used throughout the course. Kept in one place
  // because they change: the county's slides name Nicole Singsime as
  // Compliance Officer, while its Code of Conduct (updated 3/12/2025) names
  // Shauna Schulz, at the same phone number. Confirm with the county.
  const county = {
    officerName: "Shauna Schulz",
    officerPhone: "(920) 674-7191",
    officerEmail: "",              // not given in the current Code of Conduct
    address: ["1541 Annex Road", "Jefferson, WI 53549"],
    // Where the signed Acknowledgment form goes, as printed on the form itself.
    formRecipient: "Contract Administrator",
    formRecipientEmail: ""         // the form says "email or mail" but gives no address
  };

  const mail = county.address.join("<br>");

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
    finishStep: `When all four are done, go to <strong>Certification</strong>: sign the
      county's Acknowledgment form and send it in. That's the county's record that you
      completed the training.`,

    finishLabel: "Certification",

    // Module 5 in the county's training: the Acknowledgment and Agreement form.
    completionHtml: `
      <p class="lead">Module 5: Certification. One last step: sign the county's
        <strong>Acknowledgment and Agreement</strong> form. That's the county's record that you
        completed this training.</p>
      <ol class="how">
        <li><a href="docs/acknowledgment-form.pdf" target="_blank" rel="noopener">Open the
          Acknowledgment form (PDF)</a> and print it.</li>
        <li>Fill it in and sign it. Use <strong>Inner Journey Consulting</strong> as the
          agency name.</li>
        <li>Keep a copy for your records.</li>
        <li>Send the form with your <strong>original signature</strong> to:<br>
          ${county.formRecipient}<br>${mail}
          ${county.formRecipientEmail ? `<br>or by email to <a href="mailto:${county.formRecipientEmail}">${county.formRecipientEmail}</a>` : ""}</li>
      </ol>
      <p>Questions about the training? Contact the Jefferson County Compliance Office at
        ${county.officerPhone}.</p>`,

    // Optional: an Inner Journey Google Form to record completion too, as the
    // cybersecurity course does. Blank means the county's form is the only record.
    completionFormUrl: "",
    completionFormFields: {},

    passPercent: 80,

    // Shown in the footer: who Inner Journey staff ask first.
    securityContact: "Carl Vitense",

    // Modules 1-4 of the county's training. Module 5 (Certification) is the
    // finish page above.
    moduleOrder: ["compliance", "program", "false-claims", "integrity"]
  };
})();
