/* Module 4 — Reporting Incidents Immediately.
   The contact named here comes from securityContact in js/config.js. */
(function () {
  const who = window.COURSE_CONFIG.securityContact;
  (window.COURSE_MODULES = window.COURSE_MODULES || []).push({
    id: "reporting",
    short: "Reporting",
    title: "Reporting Incidents Immediately",
    minutes: 8,
    objectives: [
      "Recognize what counts as a security incident",
      "Report right away, even when you're not sure",
      "Know exactly who to tell and what to tell them"
    ],
    pages: [
      {
        title: "What counts as an incident",
        body: `
          <p>An incident is anything that might put client information or our accounts at
          risk. For example:</p>
          <ul>
            <li>You clicked a suspicious link, or entered your password somewhere that didn't
              look right</li>
            <li>A phone, laptop, or paper records were lost or stolen</li>
            <li>Client information went to the wrong person</li>
            <li>A sign-in prompt you didn't start, or account activity you don't recognize</li>
            <li>Anything that just seems off</li>
          </ul>`
      },
      {
        title: "Report even if you're not sure",
        body: `
          <p><strong>Speed matters more than certainty.</strong> The first hours after a problem
          are when it's easiest to stop. A false alarm costs a few minutes; a real problem left
          unreported can cost far more.</p>
          <p>Mistakes happen to everyone. Reporting one is never the problem. Not reporting it
          is.</p>`
      },
      {
        title: "Who to tell, and what to tell them",
        body: `
          <p><strong>Tell ${who} right away</strong>, by phone or by email from your Inner Journey
          account. If you can't reach them right away, keep trying, and don't wait until the
          next workday.</p>
          <p>Say what happened, when, and which account, device, or client information may be
          involved. Don't try to investigate or fix it yourself, and don't delete anything
          related to it.</p>
          <p>If a password may be exposed, change it right away, then report.</p>
          <p>What happens next is the practice's job, not yours.</p>`
      }
    ],
    quiz: [
      {
        q: "You clicked a link and typed your password before realizing the page looked wrong. What now?",
        options: [
          "Nothing seems to have happened, so say nothing",
          `Change your password and report it to ${who} right away`,
          "Wait a few days to see whether anything goes wrong"
        ],
        answer: 1,
        explain: "The first hours matter most. Changing the password and reporting it quickly can stop a problem before it starts."
      },
      {
        q: "You emailed a client note to the wrong person. What's the first thing to do?",
        options: [
          `Report it to ${who} right away`,
          "Ask the person to delete it, then move on",
          "Wait to see whether they mention it"
        ],
        answer: 0,
        explain: "Asking the recipient to delete it is reasonable, but it doesn't replace reporting. The practice may have legal steps it has to take, and it can only take them if it knows."
      },
      {
        q: "You're not sure whether something is a real problem. Should you report it?",
        options: [
          "Only once you're certain",
          "Yes. Report it, and let the practice decide",
          "Only if it involves client information"
        ],
        answer: 1,
        explain: "A false alarm costs a few minutes. A real problem left unreported can cost far more."
      }
    ]
  });
})();
