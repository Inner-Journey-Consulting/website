/* Module 2 — Passwords and Multi-Factor Authentication */
(window.COURSE_MODULES = window.COURSE_MODULES || []).push({
  id: "passwords",
  short: "Passwords & MFA",
  title: "Passwords and Multi-Factor Authentication",
  minutes: 12,
  objectives: [
    "Create strong passphrases and avoid reusing passwords",
    "Explain why every person needs their own login",
    "Turn on 2-Step Verification, and refuse sign-in prompts you didn't start"
  ],
  pages: [
    {
      title: "Strong passphrases, never reused",
      body: `
        <p><strong>Length matters more than complexity.</strong> A phrase of four or more
        random words, like <em>lantern-river-blue-thirty</em>, is far harder to crack than a
        short password full of symbols, and easier to remember.</p>
        <p>Avoid anything personal or predictable: names, birthdays, pets, seasons, or
        "Password1!". Those are the first things attackers try.</p>
        <p><strong>Use a different password for every account.</strong> When one website is
        breached, attackers try the same password everywhere else. A password manager, such as
        the one built into your phone or browser, remembers them for you.</p>`
    },
    {
      title: "Never share a login",
      body: `
        <p>Everything done under your login is recorded as you. That's why HIPAA requires each
        person to have their own login, and why we never share them, even briefly or with
        someone we trust.</p>
        <p>If a coworker is locked out, the answer is to get their own access restored, not to
        lend them yours.</p>`
    },
    {
      title: "Turn on 2-Step Verification",
      media: { type: "embed", src: "https://www.youtube-nocookie.com/embed/QNBxLIUXcaQ",
        title: "Turn on multi-factor authentication (CISA)", caption: "From CISA's Secure Our World campaign." },
      body: `
        <p>2-Step Verification, also called multi-factor authentication or MFA, asks for a
        second proof that it's really you, usually a prompt on your phone. A stolen password
        on its own is then no longer enough to get into your account.</p>
        <p><strong>To turn it on for your Inner Journey Google account:</strong></p>
        <ol>
          <li>Go to <strong>myaccount.google.com</strong>, signed in with your Inner Journey
            account.</li>
          <li>Choose <strong>Security</strong>, then <strong>2-Step Verification</strong>.</li>
          <li>Follow the steps. Using the Google prompt on your phone or an authenticator app is
            safer than text-message codes.</li>
        </ol>`
    },
    {
      title: "Prompts you didn't start",
      body: `
        <p>If someone has your password, they can trigger sign-in prompts on your phone and
        hope you tap <em>Approve</em>, sometimes again and again until you give in.</p>
        <p><strong>Never approve a sign-in you didn't start yourself.</strong> Deny it, change
        your password, and report it to ${window.COURSE_CONFIG.securityContact}. An unexpected
        prompt means your password is probably already known.</p>`
    }
  ],
  quiz: [
    {
      q: "Your phone shows a prompt asking you to approve a sign-in, but you aren't signing in to anything. What should you do?",
      options: [
        "Approve it so the prompts stop",
        "Deny it, and report it. Someone may have your password",
        "Ignore it and carry on"
      ],
      answer: 1,
      explain: "A prompt you didn't start usually means someone has your password and is trying to get past the second step. Denying it stops them; reporting it means your password gets changed."
    },
    {
      q: "Which of these is the strongest password?",
      options: [
        "Summer2026!",
        "A long phrase of random words, such as lantern-river-blue-thirty, used only for this account",
        "Your pet's name followed by your birth year"
      ],
      answer: 1,
      explain: "Length and uniqueness matter most. Seasons, pets, and birth years are among the first guesses attackers try."
    },
    {
      q: "A coworker is locked out and asks to borrow your login just for today. You should:",
      options: [
        "Lend it, since it's only for one day",
        "Decline, and help them get their own access restored",
        "Lend it, then change your password tomorrow"
      ],
      answer: 1,
      explain: "Everything done under your login is recorded as yours, and HIPAA requires each person to have their own. The fix is restoring their access, not sharing yours."
    }
  ]
});
