/* Module 4 — DRAFT. The contact named here comes from securityContact in js/config.js. */
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
      "Know exactly who to tell and how"
    ],
    pages: [
      {
        title: "What counts as an incident",
        body: `<p class="draft">Draft outline</p>
          <ul><li>Clicked a suspicious link or entered a password somewhere odd</li>
          <li>A lost or stolen phone or laptop</li>
          <li>Client information sent to the wrong person</li>
          <li>Anything that just seems off</li></ul>`
      },
      {
        title: "Report even if you're not sure",
        body: `<p class="draft">Draft outline</p>
          <ul><li>Speed matters more than certainty</li>
          <li>Reporting a mistake is never the problem. Not reporting it is</li></ul>`
      },
      {
        title: "Who to tell, and how",
        body: `<p class="draft">Draft outline</p>
          <p>Contact <strong>${who}</strong>. <em>To add: how to reach them, and what to tell them.</em></p>
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
