/* Module 3 — DRAFT. The email page depends on how Inner Journey's Workspace is set up. */
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
      body: `<p class="draft">Draft outline</p>
        <ul><li>Names, dates, notes, diagnoses, and anything that could identify a client</li>
        <li>"Minimum necessary": share only what the task needs</li></ul>`
    },
    {
      title: "Your devices, out in the field",
      media: { type: "todo", kind: "Video", note: "Setting a passcode and auto-lock on a phone." },
      body: `<p class="draft">Draft outline</p>
        <ul><li>Lock screens on your phone and laptop</li>
        <li>Devices in the car, and computers shared with family</li>
        <li>Public Wi-Fi</li></ul>`
    },
    {
      title: "Email and texting",
      body: `<p class="draft">Draft outline: depends on the Workspace setup</p>
        <ul><li>Use your Inner Journey account, never personal email</li>
        <li>No client information in ordinary text messages</li></ul>`
    },
    {
      title: "Paper",
      body: `<p class="draft">Draft outline</p><ul><li>Printing, carrying, and shredding</li></ul>`
    },
    {
      title: "AI tools",
      body: `<p class="draft">Draft outline</p>
        <ul><li>Don't paste client information into ChatGPT or other AI tools Inner Journey hasn't approved</li></ul>`
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
