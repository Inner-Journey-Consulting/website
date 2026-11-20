/* Module 3 — Safe Handling of Client Information */
(window.COURSE_MODULES = window.COURSE_MODULES || []).push({
  id: "data",
  short: "Safe handling",
  title: "Safe Handling of Client Information",
  minutes: 15,
  objectives: [
    "Recognize what counts as protected client information",
    "Keep client information safe on your own devices and out in the field",
    "Send client information only through approved channels, and keep it out of AI tools"
  ],
  pages: [
    {
      title: "What counts as client information",
      body: `
        <p>Client information is anything that could identify a client together with their
        care: names, dates of birth, addresses, phone numbers, notes, diagnoses, and invoices
        or supervision logs that name a client. Even the fact that someone is a client is
        private.</p>
        <p>Share only the <strong>minimum necessary</strong>: what a particular task actually
        needs, and only with people who need it for their work.</p>`
    },
    {
      title: "Your devices, out in the field",
      body: `
        <p>Most of us use our own phones and computers for Inner Journey work, so keeping those
        devices secure protects our clients too.</p>
        <ul>
          <li><strong>Lock your phone</strong> with a passcode, and set it to lock itself after
            a minute or two. On modern phones, a passcode also turns on the phone's built-in
            encryption.</li>
          <li><strong>Lock your computer</strong> with a password, and turn on its built-in disk
            encryption: <em>FileVault</em> on a Mac, or <em>Device Encryption</em> or
            <em>BitLocker</em> on Windows.</li>
          <li><strong>Don't share a work login on a family computer.</strong> If others use the
            computer, give them their own user account.</li>
          <li><strong>In the car,</strong> take your laptop with you, or put it out of sight
            before you arrive, so no one watches you hide it.</li>
          <li><strong>On public Wi-Fi,</strong> avoid opening client information. Your phone's
            hotspot is safer.</li>
        </ul>`
    },
    {
      title: "Email and texting",
      body: `
        <ul>
          <li><strong>Use your Inner Journey account for all client information.</strong>
            Email between Inner Journey accounts stays within our Google Workspace, which is
            covered by a HIPAA agreement with Google.</li>
          <li><strong>Never use personal email</strong> for anything about a client, even to
            forward something to yourself.</li>
          <li><strong>No client information in ordinary text messages</strong> or in photos sent
            by text.</li>
          <li><strong>Sending to a county or anyone outside Inner Journey</strong> needs that
            organization's secure process. Ozaukee County, for example, sends you an encrypted
            message to reply inside. If you're not sure how a recipient wants to receive client
            information, ask ${window.COURSE_CONFIG.securityContact} before you send it.</li>
        </ul>`
    },
    {
      title: "Paper",
      body: `
        <p>Print client information only when you need to. Keep paper with you or locked away,
        never left in a car or on a desk where others can see it, and shred it when you're
        done. Don't put it in the regular trash or recycling.</p>`
    },
    {
      title: "AI tools",
      body: `
        <p>Don't paste client information into ChatGPT or any other AI tool Inner Journey hasn't
        approved, even just to tidy up a note's wording.</p>
        <p>Anything you paste leaves our control, and deleting the conversation afterward
        doesn't undo that. Removing a name isn't enough either: the details in a note can still
        identify someone.</p>`
    }
  ],
  quiz: [
    {
      q: "You'd like an AI chatbot to tidy up the wording of a progress note. What's the right approach?",
      options: [
        "Paste the note into a free chatbot, then delete the conversation",
        "Don't paste client information into AI tools that Inner Journey hasn't approved",
        "It's fine as long as you remove the client's last name"
      ],
      answer: 1,
      explain: "Text pasted into a chatbot leaves your control, and deleting the conversation afterward doesn't change that. Removing a last name rarely makes a note anonymous: details in a note can still identify someone."
    },
    {
      q: "After a home visit you're stopping at a store, with your laptop holding client notes. What should you do?",
      options: [
        "Leave it on the seat. You'll only be a few minutes",
        "Take it with you, or lock it out of sight before you arrive so no one sees you put it away",
        "Cover it with a jacket on the back seat"
      ],
      answer: 1,
      explain: "Laptops are stolen from cars constantly. Putting it away before you park means no one watches you hide it."
    },
    {
      q: "Which is the right way to send a client note for review?",
      options: [
        "From your Inner Journey account, the way the practice has set up",
        "From your personal email if it's quicker",
        "As a photo in a text message"
      ],
      answer: 0,
      explain: "Personal email and ordinary texts aren't covered by the protections Inner Journey has in place, and copies end up in places the practice can't control."
    }
  ]
});
