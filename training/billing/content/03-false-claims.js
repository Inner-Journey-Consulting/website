/* Module 3 — False Claims Act.
   Content from Jefferson County's training slides, Module 3. The penalty
   amounts and cases are as the county states them; see training/README.md. */
(window.COURSE_MODULES = window.COURSE_MODULES || []).push({
  id: "false-claims",
  short: "False Claims Act",
  title: "The False Claims Act",
  minutes: 7,
  objectives: [
    "Explain why accuracy matters even when no one means to defraud",
    "Describe the penalties for false claims under federal and Wisconsin law",
    "Know the protections for people who report false claims"
  ],
  pages: [
    {
      title: "Accuracy is critical",
      body: `
        <p class="lead">Under the federal and Wisconsin False Claims Acts, <strong>specific intent
        to defraud is not required.</strong></p>
        <p>That's why accuracy is critical in every billing and claim document. Repeated errors
        can create liability on their own, even when no one meant to cheat anyone.</p>`
    },
    {
      title: "The federal False Claims Act",
      body: `
        <h2 class="h5">Civil false claims (31 U.S.C. § 3729(a))</h2>
        <p>Anyone who knowingly presents, or causes to be presented, a false claim to the federal
        government is liable for a civil penalty <strong>for each claim</strong> of $5,000 to
        $10,000, plus three times the amount of the damages.</p>
        <p class="scenario">For example: erroneous billing of 120 claims for $12,000 could result in
        a penalty of over $1.2 million.</p>
        <h2 class="h5">Qui tam actions (31 U.S.C. § 3730)</h2>
        <p>A private citizen (a "relator") can file suit alleging false claims, on behalf of
        themselves and the government. This is called a <strong>qui tam</strong> action.</p>
        <h2 class="h5">Whistleblower protection (31 U.S.C. § 3730(h))</h2>
        <p>Employees are protected against discharge, demotion, suspension, threats, harassment
        or discrimination by their employer for cooperating with or starting a False Claims Act
        investigation.</p>
        <h2 class="h5">Criminal false claims (18 U.S.C. § 1035)</h2>
        <p>False or fictitious statements involving a federal healthcare program are a crime,
        with penalties of up to 5 years in prison and/or a $25,000 fine.</p>`
    },
    {
      title: "The Wisconsin False Claims Act",
      body: `
        <p>Wisconsin's False Claims Act (2007 Wisconsin Act 20, section 20.931 of the Wisconsin
        Statutes) applies to claims made to the state. The federal Deficit Reduction Act of 2005
        gave states a financial incentive to pursue more civil fraud cases against Medical
        Assistance providers. The Wisconsin Act:</p>
        <ul>
          <li>Makes individuals and organizations that submit false or fraudulent claims to the
            Medical Assistance program civilly liable.</li>
          <li>Requires penalties of three times the damages to the state, plus $5,000 to $10,000
            for each violation.</li>
          <li>Lets a private citizen bring a civil action as a "qui tam plaintiff", and rewards
            them with 15% to 30% of what's recovered.</li>
        </ul>
        <h2 class="h5">Wisconsin whistleblower protections</h2>
        <p>An employer may not discharge, discipline, retaliate against or discriminate against an
        employee for exercising their rights, filing a complaint, or testifying or assisting in an
        enforcement action. Government workers are also protected when they publicly disclose
        information about violations of law, mismanagement, waste of public funds, or dangers to
        public health or safety. Workers may sue their employer for damages, court costs and
        attorney fees. (Wisconsin Statutes sections 46.90, 50.07, 111.322, 230.80–230.89 and
        895.65.)</p>`
    },
    {
      title: "Real cases",
      body: `
        <div class="scenario">
          <p><strong>Milwaukee, 2009.</strong> The owner of Quality Life Care Management, a
          Medicaid-funded business meant to help Medicaid recipients get the services they need,
          pleaded guilty to felony Medical Assistance fraud. The company billed Medicaid for
          5,617 more hours than its employees actually worked, between June and November 2005,
          causing $141,275 in overpayments. The owner was sentenced to 12 months in the House of
          Correction and ordered to repay the $141,275 plus $14,474 in court costs.</p>
        </div>
        <div class="scenario">
          <p><strong>Milwaukee, 2012.</strong> One of the nation's largest hospice providers agreed
          to pay $25 million to settle a Medicare fraud case brought by a former nurse in Milwaukee
          as a whistleblower suit. It was the company's second such settlement in six years. The
          whistleblowers shared about $4.6 million.</p>
        </div>`
    },
    {
      title: "Summary",
      body: `
        <ul>
          <li>Government investigations draw on the federal False Claims Act, the federal criminal
            false claims law, and the Wisconsin False Claims Act.</li>
          <li><strong>Intent is not necessary</strong> for false claims liability.</li>
          <li>Penalties can include civil fines for each claim, criminal prosecution and
            prison.</li>
          <li>Both federal and Wisconsin law protect whistleblowers.</li>
        </ul>`
    }
  ],
  quiz: [
    {
      q: "Can billing errors create liability under the False Claims Act even if no one meant to defraud anyone?",
      options: [
        "No. There has to be intent to defraud",
        "Yes. Specific intent to defraud is not required"
      ],
      answer: 1,
      explain: "Specific intent to defraud is not required under the federal and Wisconsin False Claims Acts. That's why accuracy matters on every claim."
    },
    {
      q: "Civil penalties under the federal False Claims Act are charged:",
      options: [
        "Once per audit",
        "For each false claim, plus three times the damages",
        "Only if the money isn't repaid"
      ],
      answer: 1,
      explain: "The penalty applies to each claim. That's how 120 erroneous claims worth $12,000 can lead to penalties of over $1.2 million."
    },
    {
      q: "What is a \"qui tam\" action?",
      options: [
        "A lawsuit by a private citizen alleging false claims, on behalf of themselves and the government",
        "A government audit of a provider's billing",
        "An agreement to repay an overpayment"
      ],
      answer: 0,
      explain: "Qui tam lets a private citizen (a relator) sue over false claims. Under the Wisconsin Act they can receive 15% to 30% of what's recovered."
    },
    {
      q: "An employee reports false billing and helps with the investigation. Can their employer demote them for it?",
      options: [
        "Yes, if the report turns out to be wrong",
        "No. Federal and Wisconsin law protect whistleblowers from retaliation",
        "Only if they're a government employee"
      ],
      answer: 1,
      explain: "Both federal and Wisconsin law protect employees from discharge, demotion, suspension, threats, harassment or discrimination for reporting or helping an investigation."
    },
    {
      q: "A business bills Medicaid for more hours than its employees actually worked. What can happen?",
      options: [
        "Repaying the overpayment settles it",
        "Repayment, plus criminal charges and jail time",
        "A warning the first time"
      ],
      answer: 1,
      explain: "In the Milwaukee case, a business billed Medicaid for 5,617 more hours than were worked. The owner was sentenced to 12 months in the House of Correction and still had to repay the $141,275."
    }
  ]
});
