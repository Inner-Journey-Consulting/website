/* Module 1 — DRAFT. Page bodies are outlines to be written; questions are samples. */
(window.COURSE_MODULES = window.COURSE_MODULES || []).push({
  id: "phishing",
  short: "Phishing",
  title: "Recognizing Phishing and Social Engineering",
  minutes: 12,
  objectives: [
    "Spot the warning signs of a scam in email, text messages, and phone calls",
    "Recognize scams aimed at a practice like ours",
    "Check where a link really goes before you open it, and report a suspicious message"
  ],
  pages: [
    {
      title: "What a phishing message looks like",
      media: { type: "todo", kind: "Video", note: "Checking the real sender address in Gmail, on a computer and on a phone." },
      body: `<p class="draft">Draft outline</p>
        <ul><li>Sender address doesn't match the name it shows</li>
        <li>Urgency or pressure: "today," "immediately," "your account will be closed"</li>
        <li>Requests to sign in, "verify," or open an unexpected attachment</li></ul>`
    },
    {
      title: "Scams aimed at a practice like ours",
      body: `<p class="draft">Draft outline</p>
        <ul><li>A caller claiming to be a county caseworker who needs client details</li>
        <li>Fake Medicaid, county, or records-system notices</li>
        <li>A message that seems to come from a leader at Inner Journey asking for gift cards or a quick payment</li></ul>`
    },
    {
      title: "Texts and phone calls",
      body: `<p class="draft">Draft outline</p>
        <ul><li>Scam texts work the same way as scam emails, and most of us read texts on the go</li>
        <li>Verify by contacting the person a different way, using a number you already have</li></ul>`
    },
    {
      title: "Check a link before you click it",
      media: { type: "todo", kind: "Video", note: "Previewing a link (hover on a computer, long-press on a phone) and using Gmail's Report phishing." },
      body: `<p class="draft">Draft outline</p>
        <ul><li>Preview where a link goes before opening it</li><li>How to report a suspicious email</li></ul>`
    }
  ],
  quiz: [
    {
      q: "An email signed \"Jefferson County Human Services\" comes from jeffco.humanservices@gmail.com and asks you to confirm a client's date of birth. What should you do?",
      options: [
        "Reply with the date of birth, since the county needs it",
        "Don't reply. Check by calling the county at a number you already have, and report the email",
        "Forward it to a coworker to ask whether it looks real"
      ],
      answer: 1,
      explain: "A county agency won't write from a free Gmail address. Confirm through a contact you already trust, never through the message itself, and report it so others are warned."
    },
    {
      q: "A text says: \"It's Carl, I'm stuck in a meeting. Can you buy three gift cards for a client? I'll pay you back.\" What's the best response?",
      options: [
        "Buy the cards. It's urgent and he said he'd pay you back",
        "Reply to the text and ask what the cards are for",
        "Check with Carl a different way, such as calling the number you already have for him"
      ],
      answer: 2,
      explain: "Gift-card requests that seem to come from a leader are among the most common scams. Replying reaches the scammer, so verify through a channel you already know."
    },
    {
      q: "Before opening a link in an email, the safest first step is to:",
      options: [
        "Open it in a private browser window",
        "Preview where it really goes: hover over it on a computer, or press and hold on a phone",
        "Open it only if the email has the Inner Journey logo"
      ],
      answer: 1,
      explain: "Logos are easy to copy, and private browsing doesn't protect you. Previewing shows the real destination before anything loads."
    }
  ]
});
