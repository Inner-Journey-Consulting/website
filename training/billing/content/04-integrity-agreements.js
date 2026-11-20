/* Module 4 — Integrity Agreements.
   Content from Jefferson County's training slides, Module 4. */
(window.COURSE_MODULES = window.COURSE_MODULES || []).push({
  id: "integrity",
  short: "Integrity Agreements",
  title: "Integrity Agreements",
  minutes: 4,
  objectives: [
    "Explain what an Integrity Agreement is and when one is imposed",
    "Recognize the documentation and billing problems that lead to one"
  ],
  pages: [
    {
      title: "What is an Integrity Agreement?",
      body: `
        <p><em>Integrity:</em> adherence to moral and ethical principles; honesty. Also, the state
        of being whole and undiminished.</p>
        <p>An <strong>Integrity Agreement</strong> is a set of compliance obligations negotiated
        between the federal Office of Inspector General (OIG) and a healthcare provider:</p>
        <ul>
          <li>The provider agrees to them as part of a civil settlement. In exchange, the OIG
            agrees not to <strong>exclude</strong> the provider from federal healthcare programs
            (Medicare and Medicaid).</li>
          <li>The OIG has authority to exclude providers under the False Claims Act or the Civil
            Monetary Penalties Law.</li>
          <li>A typical agreement lasts <strong>5 years</strong>.</li>
          <li>Its compliance measures aim to ensure the provider's federal healthcare claims are
            accurate.</li>
        </ul>`
    },
    {
      title: "How providers end up with one",
      body: `
        <p>Integrity Agreements follow a Medicare or Medicaid fraud investigation that finds
        problems such as:</p>
        <ul>
          <li>Billing for services that aren't covered</li>
          <li>Billing incorrect units of service</li>
          <li>Billing for services that weren't provided</li>
          <li>Missing documentation</li>
        </ul>
        <p>The results:</p>
        <ul>
          <li>Repaying the erroneous billings</li>
          <li>Paying penalties and attorney fees</li>
          <li>An Integrity Agreement, for 5 years</li>
        </ul>
        <p>An organization that has completed one can be subject to another in the future, and
        one that fails to meet documentation and billing standards in a federal or state review
        could be excluded from federal healthcare programs.</p>`
    }
  ],
  quiz: [
    {
      q: "True or false: if Jefferson County is ever subject to an Integrity Agreement, once it ends the county can never be subject to another.",
      options: ["True", "False"],
      answer: 1,
      explain: "Completing one Integrity Agreement doesn't protect an organization from another if new problems are found."
    },
    {
      q: "True or false: Jefferson County could be excluded from federal healthcare programs for failing to meet documentation and billing standards during a federal or state review.",
      options: ["True", "False"],
      answer: 0,
      explain: "Exclusion from Medicare and Medicaid is the risk that Integrity Agreements exist to avoid."
    },
    {
      q: "An Integrity Agreement is:",
      options: [
        "A pledge every employee signs each year",
        "Compliance obligations a provider accepts in a settlement with the OIG, in exchange for not being excluded from Medicare and Medicaid",
        "A contract between the county and its providers"
      ],
      answer: 1,
      explain: "It's negotiated with the federal Office of Inspector General as part of a civil settlement."
    },
    {
      q: "How long does an Integrity Agreement typically last?",
      options: ["1 year", "5 years", "For as long as the provider takes part in Medicaid"],
      answer: 1,
      explain: "A typical term is 5 years."
    },
    {
      q: "Which of these problems can lead to an Integrity Agreement?",
      options: [
        "Billing incorrect units of service",
        "Missing documentation",
        "Billing for services that weren't provided",
        "All of these"
      ],
      answer: 3,
      explain: "All of them, along with billing for services that aren't covered."
    }
  ]
});
