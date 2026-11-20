/* Module 2 — Jefferson County's Compliance Program.
   Content from Jefferson County's training slides, Module 2, and its Code of
   Conduct (docs/code-of-conduct.pdf). Contacts come from js/config.js. */
(function () {
  const CFG = window.COURSE_CONFIG;
  const c = CFG.county;
  const ijc = CFG.securityContact;

  (window.COURSE_MODULES = window.COURSE_MODULES || []).push({
    id: "program",
    short: "County program",
    title: "Jefferson County's Compliance Program",
    minutes: 10,
    objectives: [
      "Name the seven parts of the county's compliance program",
      "Know what the Code of Conduct expects of you, especially in documentation and billing",
      "Know how to report a concern, including anonymously, and that you're protected when you do",
      "Write a report with enough detail to be investigated"
    ],
    pages: [
      {
        title: "Seven requirements",
        body: `
          <p>Federal regulations (42 CFR 438.608) require the county's compliance program to
          have seven parts:</p>
          <ol>
            <li>Standards and procedures</li>
            <li>A Compliance Officer and Committee</li>
            <li>Training and education</li>
            <li>Communication</li>
            <li>Enforcement</li>
            <li>Internal monitoring and auditing</li>
            <li>Prompt response and corrective action</li>
          </ol>
          <p>The next pages take them one at a time. The ones that ask the most of you are
          <strong>1</strong> (the Code of Conduct) and <strong>4</strong> (reporting concerns).</p>`
      },
      {
        title: "1. Standards and procedures",
        body: `
          <p>The county's compliance mission: Jefferson County Human Services will comply with
          the laws, regulations, rules and guidelines governing mental health services.
          <strong>All employees and contractors who provide and receive payment for mental
          health services are expected to conduct themselves honestly, fairly and with a high
          degree of integrity.</strong> The program exists to prevent fraud, abuse and false
          billing to any third-party payer.</p>
          <p>The standards are set out in:</p>
          <ul>
            <li><strong>The Code of Conduct</strong>: the county's expectations for behavior, and
              the legal and ethical standards for providing, documenting, coding and billing
              mental health services. Employees and contractors must follow it.
              <a href="docs/code-of-conduct.pdf" target="_blank" rel="noopener">Read the Code of
              Conduct (PDF)</a>.</li>
            <li><strong>The Code of Ethics</strong>: set by the County Board of Supervisors. It
              applies to county employees only.</li>
          </ul>
          <p>Everyone who takes this training must also sign the <strong>Acknowledgment and
          Agreement form</strong>. That's the last step of this course.</p>
          <p>The county documents its compliance activities, including trainings, investigations,
          anonymous reports, self-disclosures, changes to the program, and audit results.</p>`
      },
      {
        title: "The Code of Conduct on billing and records",
        body: `
          <p>The Code of Conduct covers quality of care, workplace conduct, relationships with
          clients, conflicts of interest and more. These are the parts most directly about
          billing and records, in its own words. We:</p>
          <ul>
            <li>"Bill only for eligible services actually rendered, reported to the quarter hour
              and fully documented."</li>
            <li>"Take measures to ensure no false, fraudulent, inaccurate, or fictitious claims for
              payment or reimbursement of any kind are submitted. These claims include but are not
              limited to timecards/e-dals, travel and expense reports, billings, cost reports, and
              all clinical documentation."</li>
            <li>"Document all consumer service encounters [...] accurately, completely, and timely
              following established documentation guidelines."</li>
            <li>"Act promptly to investigate and correct problems if errors in claims or billings
              are discovered."</li>
            <li>"If unsure of the meaning or application of a statute, regulation, policy, or
              legality, we seek guidance from our supervisor or the Compliance Officer."</li>
          </ul>
          <p><a href="docs/code-of-conduct.pdf" target="_blank" rel="noopener">Read the full Code
          of Conduct (PDF)</a></p>`
      },
      {
        title: "2. The Compliance Officer and Committee",
        body: `
          <p>The <strong>Compliance Officer</strong> oversees the program: maintains the Code of
          Conduct and policies, chairs the Compliance Committee, runs training, sets up auditing
          and monitoring, investigates compliance concerns, and reports findings to the agency
          director.</p>
          <p>The Compliance Officer has full authority to <strong>stop any work process</strong>
          that may be causing or contributing to non-compliance until it has been reviewed and, if
          needed, corrected.</p>
          <p>The <strong>Compliance Committee</strong> supports the program: it advises the
          Compliance Officer, helps develop and review compliance policies, helps implement the
          program, monitors how well it's working, and addresses areas of concern or risk.
          Discipline isn't the committee's job; see requirement 5.</p>`
      },
      {
        title: "Your role",
        body: `
          <p>As an employee or contractor, you:</p>
          <ul>
            <li>Help the county run a successful compliance program.</li>
            <li>Follow the Code of Conduct.</li>
            <li>Follow the compliance program and all laws, rules, regulations, guidelines,
              policies and procedures that apply.</li>
            <li><strong>Report a violation or suspected violation.</strong></li>
          </ul>`
      },
      {
        title: "3. Training and education",
        body: `
          <p>Everyone covered must be trained, and retrained to keep up with changes in laws,
          rules, regulations, policies and procedures:</p>
          <ul>
            <li><strong>Within 30 days</strong> of being hired or of the contract starting</li>
            <li>Then <strong>every year</strong></li>
          </ul>
          <p>It's required for every employee and contractor who provides mental health
          services, works in a mental health program or is paid with mental health funds, or is
          responsible for billing, claiming, accounting or cost reporting for mental health
          services.</p>`
      },
      {
        title: "4. Communication: reporting concerns",
        body: `
          <p>Employees and contractors are <strong>expected to report</strong> any activity that
          may violate the compliance program's standards or any law, regulation, rule or
          guideline.</p>
          <h2 class="h5">How to report</h2>
          <ul>
            <li><strong>At Inner Journey:</strong> tell ${ijc}.</li>
            <li><strong>Directly to the county:</strong> contact the Jefferson County Compliance
              Office at ${c.officerPhone}.</li>
            <li><strong>Anonymously:</strong> by mail to the Compliance Office,
              ${c.address.join(", ")}.</li>
          </ul>
          <h2 class="h5">No retaliation</h2>
          <p>Jefferson County prohibits retaliation against anyone who makes a report. County
          employees who retaliate face discipline. <strong>A contractor who retaliates may have
          its contract terminated.</strong></p>`
      },
      {
        title: "Writing a report that can be investigated",
        body: `
          <p>An anonymous report can't be followed up with questions, so it has to stand on its
          own. Read this one:</p>
          <div class="scenario">"Steve White has falsified documentation. He documented and billed
            for services for days he wasn't even at work. His supervisor lets him get away with it.
            Someone needs to look into this."</div>
          <details class="reveal"><summary>Is that enough to start an investigation?</summary>
            <p><strong>No.</strong> It doesn't say enough about who, what, where, when, why and how
            for anyone to look into it.</p></details>
          <p>Now this one:</p>
          <div class="scenario">"Steve White, an LCSW who works for the ABC Clinic on Plaza Street,
            has falsified documentation. He documented and billed for services for 11/20, 12/7 and
            12/8, which are days he wasn't even at work. I mentioned my concern to Ron Wood, his
            supervisor, but Ron said that he's too busy to keep track of everyone and besides, he
            trusts Steve."</div>
          <details class="reveal"><summary>Is that enough?</summary>
            <p><strong>Yes.</strong> It answers who, what, where, when, why and how.</p></details>`
      },
      {
        title: "5–7. Enforcement, auditing and corrective action",
        body: `
          <h2 class="h5">5. Enforcement</h2>
          <p>Standards are fair and reasonable, but enforced. County employees are disciplined
          under the County Personnel Rules, using progressive discipline: oral warning, written
          warning, suspension without pay, salary reduction, demotion, dismissal.</p>
          <h2 class="h5">6. Internal monitoring and auditing</h2>
          <p>The county reviews compliance in billing and coding, compliance education, medical
          records, operating licenses, clinical staff licensure, and documentation corrections.
          It also screens every prospective employee, contractor, volunteer and intern against
          the federal exclusion lists (the HHS-OIG List of Excluded Individuals/Entities and the
          System for Award Management) before they start, and twice a year after that.</p>
          <h2 class="h5">7. Response and corrective action</h2>
          <p>When a problem is found: prompt investigation, corrective action, follow-up, further
          action if needed, and <strong>prompt refund of overpayments</strong>.</p>`
      }
    ],
    quiz: [
      {
        q: "You have a compliance concern, or believe fraudulent activity is happening. What should you do?",
        options: [
          "Don't report it, and see if it stops",
          `Report it: to ${ijc}, or directly to the county's Compliance Office, anonymously if you prefer`,
          "Report it only once you're certain fraud is happening",
          "Talk to the person involved and give them a chance to fix it"
        ],
        answer: 1,
        explain: "Employees and contractors are expected to report concerns. You don't need to be certain, and you can report anonymously by mail to the county's Compliance Office."
      },
      {
        q: "The purpose of the county's Code of Conduct is to:",
        options: [
          "Promote the county's commitment to compliance",
          "State the county's behavior expectations, legal standards and ethical requirements",
          "Address all county mental health employees, volunteers and contractors (including contractors' staff)",
          "All of the above"
        ],
        answer: 3,
        explain: "The Code of Conduct does all three, and it applies to contractors and their staff, including Inner Journey."
      },
      {
        q: "What is the role of the Compliance Committee?",
        options: [
          "To assist and advise the Compliance Officer",
          "To help develop or review compliance policies and procedures",
          "To rule on discipline for compliance violations",
          "To help implement the compliance program",
          "All of the above",
          "A, B and D only"
        ],
        answer: 5,
        explain: "The committee advises the Compliance Officer, helps with policies and helps implement the program. Discipline is handled separately, under requirement 5."
      },
      {
        q: "True or false: you have the right to report a compliance concern without fear of retaliation.",
        options: ["True", "False"],
        answer: 0,
        explain: "The county prohibits retaliation against anyone who makes a report. A contractor who retaliates may lose its contract."
      },
      {
        q: "An anonymous report says: \"Someone at my clinic bills for sessions that didn't happen. Please look into it.\" Is that enough to start an investigation?",
        options: [
          "Yes. The Compliance Officer can work out the details",
          "No. It needs who, what, where, when, why and how"
        ],
        answer: 1,
        explain: "An anonymous report can't be followed up with questions, so it needs names, places, dates and what happened for anyone to investigate."
      },
      {
        q: "According to the Code of Conduct, which of these must be accurate and never false?",
        options: [
          "Billings and clinical documentation only",
          "Billings, clinical documentation, timecards, and travel and expense reports",
          "Only what's sent to Medicaid or Medicare"
        ],
        answer: 1,
        explain: "The Code of Conduct covers claims of any kind, including timecards, travel and expense reports, billings, cost reports and all clinical documentation."
      }
    ]
  });
})();
