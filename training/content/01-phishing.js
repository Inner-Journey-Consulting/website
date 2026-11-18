/* Module 1 — Recognizing Phishing and Social Engineering */
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
      body: `
        <p>Phishing is a message that pretends to be from someone you trust so that you'll
        hand over information, sign in on a fake page, or open something harmful. Most
        break-ins at small organizations start this way.</p>
        <p>Watch for these warning signs:</p>
        <ul>
          <li><strong>The sender's address doesn't match the name.</strong> A message signed
            "Jefferson County" that comes from a Gmail address isn't from the county. On a
            computer, the address appears next to the name; on a phone, tap the name to see it.</li>
          <li><strong>Pressure to act now:</strong> "today," "immediately," "your account will
            be closed." Urgency is there to stop you from thinking it over.</li>
          <li><strong>A request to sign in, "verify," pay, or open an attachment you weren't
            expecting.</strong></li>
        </ul>
        <p>One warning sign is enough reason to slow down and check.</p>`
    },
    {
      title: "Scams aimed at a practice like ours",
      body: `
        <p>Scammers tailor their messages to the people they target. For us, that usually
        looks like:</p>
        <ul>
          <li>A caller or email claiming to be a <strong>county caseworker</strong> who needs a
            client's details right away</li>
          <li>Fake notices from <strong>Medicaid, a county, or a records system</strong> asking
            you to sign in</li>
          <li>A message that seems to come from <strong>someone at Inner Journey</strong>, often
            Carl, asking you to buy gift cards or make a quick payment</li>
        </ul>
        <p>Real colleagues and county staff will never mind you checking. When a request
        involves client information or money, confirm it first.</p>`
    },
    {
      title: "Texts and phone calls",
      body: `
        <p>Scam texts and calls work just like scam emails, and they can be harder to spot
        because we read texts quickly and on the go.</p>
        <p>The rule is the same for all of them: <strong>verify through a different
        channel.</strong> Don't reply to the message, and don't call a number it gives you.
        Contact the person using a phone number or email address you already have.</p>`
    },
    {
      title: "Messages written by AI",
      body: `
        <p>More and more email is now written by AI, both by legitimate companies and by
        scammers. Some insurance companies, for example, use AI agents to recruit providers.</p>
        <p>You often can't tell from the writing, and AI-detection tools can't reliably tell
        either. A polished, friendly, well-informed message isn't proof that it's genuine.</p>
        <p>So judge a message by <strong>how it reached you and what it asks for</strong>, not
        by how it's written. The same rules apply whoever, or whatever, wrote it. Never send
        client information to anyone you haven't verified, and if a decision matters, it's fine
        to ask to speak to a person.</p>`
    },
    {
      title: "Check a link before you click it",
      body: `
        <p>A link can say one thing and go somewhere else. Before you open one:</p>
        <ul>
          <li><strong>On a computer:</strong> rest the mouse over the link without clicking.
            The real address appears at the bottom of the window.</li>
          <li><strong>On a phone:</strong> press and hold the link to see where it goes.</li>
        </ul>
        <p>If the address isn't the website you'd expect, don't open it.</p>
        <p><strong>To report a suspicious email</strong> in Gmail, open it, click the three
        dots (⋮) at the top right, and choose <em>Report phishing</em>. If you've already
        clicked a link or entered a password, Module 4 covers what to do next.</p>`
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
