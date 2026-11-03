/* Module 2 — DRAFT. */
(window.COURSE_MODULES = window.COURSE_MODULES || []).push({
  id: "passwords",
  short: "Passwords & MFA",
  title: "Passwords and Multi-Factor Authentication",
  minutes: 12,
  objectives: [
    "Create strong passphrases and avoid reusing passwords",
    "Explain why every person needs their own login",
    "Set up two-step verification, and refuse sign-in prompts you didn't start"
  ],
  pages: [
    {
      title: "Strong passphrases, never reused",
      body: `<p class="draft">Draft outline</p>
        <ul><li>Length beats complexity: several random words</li>
        <li>One password per account; a password manager makes that practical</li></ul>`
    },
    {
      title: "Never share a login",
      body: `<p class="draft">Draft outline</p>
        <ul><li>HIPAA requires each person to have their own login</li>
        <li>Shared logins make it impossible to tell who did what, or to remove one person's access</li></ul>`
    },
    {
      title: "What two-step verification does",
      media: { type: "todo", kind: "Video", note: "Turning on 2-Step Verification for an Inner Journey Google account, with an authenticator app." },
      body: `<p class="draft">Draft outline</p>
        <ul><li>A second proof of identity, so a stolen password alone isn't enough</li></ul>`
    },
    {
      title: "Prompts you didn't start",
      body: `<p class="draft">Draft outline</p>
        <ul><li>Attackers with your password send prompt after prompt, hoping you'll tap Approve</li>
        <li>Never approve a sign-in you didn't start. Deny it and report it</li></ul>`
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
