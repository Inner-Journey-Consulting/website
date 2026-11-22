# Staff Training — Inner Journey Consulting

Inner Journey's online staff training, at **innerjourneymke.com/training/**.
That page lists every course:

| Course | Address |
|---|---|
| Cybersecurity Awareness Training | innerjourneymke.com/training/cyber/ |
| Billing Compliance Training (Jefferson County) | innerjourneymke.com/training/billing/ |

The cybersecurity course is built to satisfy the county *Cybersecurity Awareness
Training and HIPAA Security Statement of Assurance*.

Plain HTML, CSS and JavaScript with Bootstrap 5 from a CDN. No build step.

Adapted from the HCI 520 e-learning course structure: short one-idea lesson
pages, media on each page, and the same questions as a pre-test and post-test
so learners can see what changed.

## How it's organised

    index.html            The training page: lists every course.
    js/course.js          The engine, shared by every course: routing, quizzes, results, saved progress.
    css/course.css        Styling, shared by every course (Inner Journey palette).
    cyber/                Cybersecurity Awareness Training
      index.html            The course page. Every screen is drawn from the data below.
      js/config.js          Settings: course version, pass mark, completion form, contact.
      content/01-*.js ...   One file per module: objectives, lesson pages, questions.
      media/                Videos, captions, images.
      certificate/          Apps Script that emails completion certificates (see below).
    billing/              Billing Compliance Training (see below), laid out the same way.

Links from before the cybersecurity course moved to `cyber/`
(innerjourneymke.com/training/#/...) are sent on to it automatically, and
saved progress carries over.

Each module runs:

    intro -> quick check (pre-test) -> lesson pages -> end-of-module check (post-test) -> results

The pre- and post-test are the **same questions**. The results page shows each
question's before and after answers, the correct answer, and an explanation.

## Previewing

Run `python3 -m http.server` in this folder and visit http://localhost:8000/
for the training page, or http://localhost:8000/cyber/ for a course.

## Editing content

Everything a learner reads lives in each course's `content/` folder. Each
module file looks like:

```js
(window.COURSE_MODULES = window.COURSE_MODULES || []).push({
  id: "phishing",                      // must match an id in config.js moduleOrder
  short: "Phishing",                   // used in the menu
  title: "Recognizing Phishing and Social Engineering",
  minutes: 12,
  objectives: ["...", "..."],
  pages: [
    { title: "Page heading", body: `<p>HTML goes here.</p>`, media: { ... } }
  ],
  quiz: [
    { q: "Question?", options: ["A", "B", "C"], answer: 1, explain: "Why B is right." }
  ]
});
```

- **Add a page:** add an object to `pages`. Order in the list is order on screen.
- **Add a question:** add an object to `quiz`. `answer` is the position of the
  right option, counting from **0**. The same questions serve as pre- and post-test.
- **Add a module:** create a new file in `content/`, add a `<script>` line for
  it in `index.html`, and add its `id` to `moduleOrder` in `js/config.js`.

### Media

Each page can have one `media` item:

```js
{ type: "video", src: "media/mfa.mp4", captions: "media/mfa.vtt", caption: "...", transcript: "<p>...</p>" }
{ type: "embed", src: "https://www.youtube.com/embed/...", title: "...", transcript: "..." }   // hosted video
{ type: "image", src: "media/x.png", alt: "Describe the image", caption: "..." }
{ type: "audio", src: "media/x.mp3", transcript: "..." }
{ type: "todo",  kind: "Video", note: "What this video needs to show" }   // placeholder
```

Give every video captions or a transcript. It's good practice, and some staff
will watch with the sound off.

## Settings (each course's js/config.js)

| Setting | What it does |
|---|---|
| `version` | Saved progress is stored per version. **Change it each year** and everyone starts fresh. |
| `passPercent` | Score needed on the end-of-module check to complete a module. `0` accepts any score. |
| `completionFormUrl` | Link to the official completion form (below). Blank shows a notice instead. |
| `completionFormFields` | Form fields to pre-fill with each module's before/after score (as a percentage) and the course version. See below. |
| `securityContact` | Who to report incidents to. Shown in Module 4 and the footer. |
| `moduleOrder` | Which modules appear, in what order. |
| `storageKey` | Where saved progress is kept. Each course needs its own. |
| `intro`, `finishStep`, `finishLabel`, `completionHtml` | Optional wording for the home and finish pages; see `billing/js/config.js`. |

## The completion record (cybersecurity course)

Progress in the course is saved only in the learner's own browser, so it can't
serve as the record you certify to the county. The record is a **Google Form**:

1. Create it in the **Inner Journey Google Workspace** (not a personal account),
   so the responses belong to the organisation.
2. In the form's settings: restrict responses to users in the organisation, and
   turn on **verified email collection**. Google then records which account
   submitted it, so nobody can submit under someone else's name.
3. Turn on **Quiz mode** if the form includes a final graded check.
4. Put its link in `completionFormUrl`.

### Sending scores to the form

The course can fill in each learner's before and after scores when it opens the
form. Add one **Short answer** question per score you want, such as "Phishing:
before (%)", in a section headed "Your scores (filled in automatically)", and
leave them **not required** so a blank shows someone who opened the form
directly. Then, in the form editor, choose **More (⋮) > Get pre-filled link**,
type any value in each score field, press **Get link**, and copy it. Each field
appears in that link as `entry.NNNN=...`; put those IDs in
`completionFormFields`.

Scores are sent as whole-number percentages. Fractions like "3/3" would be read
by Google Sheets as a date. Pre-filled answers can still be edited before
submitting, so treat them as a convenience rather than proof.

The responses sheet (name, date, score) is the per-person record behind the
signed Statement of Assurance. Keep it for six years.

Anyone with access to client or financial information who **doesn't** have an
Inner Journey Google account needs another way to record completion.

## Completion certificates

`cyber/certificate/Certificate.gs` is an Apps Script that runs inside the completion
form's **responses sheet**. Each time someone submits the form, it builds a PDF
certificate from their response (verified email, name, role, timestamp and
module scores) and emails it to them. It never runs on the website.

Because certificates are made from the sheet, the form stays the official
record, and any certificate can be reissued at any time from its row. Each one
carries an ID built from the submission timestamp, such as `IJC-20261118-140322`,
so an auditor's copy can be matched to its row.

### Setting it up (once)

1. Open the responses sheet, signed in with the **Inner Journey account that
   should send the emails**. Certificates come from whoever does this setup.
2. **Extensions > Apps Script.**
3. Delete what's in `Code.gs` and paste in the whole of
   [`Certificate.gs`](https://raw.githubusercontent.com/Inner-Journey-Consulting/website/main/training/cyber/certificate/Certificate.gs).
   Press **Save**.
4. In the function menu at the top, choose **setUp**, then **Run**.
5. Google asks for permission. Because this is your own script rather than a
   published app, it warns that the app isn't verified: choose **Advanced**, then
   **Go to (the project name)**, then **Allow**. It asks to see and edit this one
   spreadsheet, send email as you, and run when you're not present.
6. Test it: submit the completion form, and the certificate should arrive within
   a minute or two.

It finds columns by their headers, so renaming a question is fine as long as the
score headers keep the module word and "before" or "after", for example
"Phishing: before (%)".

### Afterwards

- Reload the sheet to see a **Certificates** menu: **Resend certificate for
  selected row**, or **Email me a copy for selected row**, useful for an auditor.
- Submissions from **before** the setup don't get a certificate automatically.
  Select each row and use **Resend**.
- A **Certificate sent** column records when each one went out.
- The trigger belongs to the account that ran `setUp`. If that account is ever
  removed, certificates stop: run `setUp` again from another admin account.

## Billing compliance course

`billing/` is Jefferson County's annual **Medicaid, Medicare & Third-Party Biller
Compliance Training** in the same format, at
innerjourneymke.com/training/billing/. Its own settings, modules and the county's
documents are in `billing/js/config.js`, `billing/content/` and `billing/docs/`.

It's a **faithful adaptation**: the county's five modules, content and review
questions, made easier to get through. The county's Acknowledgment and Agreement
form is still the county's record: the last step sends people to print and sign
it, and give or mail it to Carl, who sends them on to the county. Then, as in the cybersecurity course, people submit Inner Journey's own
completion form (a Google Form in the Inner Journey Workspace), which records
their before and after scores and whether they've sent the county's form. It
doesn't send certificates; the county's signed form serves that purpose.

Changes from the county's slides:

- Duplicate slides, navigation instructions and formatting problems removed.
- Each module has a pre/post check like the cybersecurity course. The county
  had review questions only in Modules 2 and 4; the others are new, written
  from the county's own content.
- The county's review questions didn't show their answers. The answers used
  here are inferred from the slides and the Code of Conduct.
- The question "For county employees, discipline falls outside the normal
  disciplinary process?" doesn't apply to contractors and was left out. The
  "what should you do" question was reworded because two of its options
  were both partly right.
- A page quoting the Code of Conduct's billing and records standards was added,
  since the slides only linked to it.

To confirm with the county (contacts are set in `billing/js/config.js`):

- **Compliance Officer.** The slides name Nicole Singsime; the Code of Conduct,
  updated 3/12/2025, names Shauna Schulz. Both give the same phone number, so the
  course names no one and points to the Compliance Office at that number.
- **Where the form goes.** The slides say the Compliance Officer; the form says
  the Contract Administrator. Staff send their signed forms to Carl, who sends
  them to the county, so he can check which address it wants.
- **Dated content.** The penalty amounts ($5,000-$10,000 per claim) and the
  2009 and 2012 cases are copied as the county states them. Federal penalty
  amounts have since been raised for inflation.

`billing/docs/` holds copies of the county's Code of Conduct and Acknowledgment
form, downloaded from the county's website. Replace them if the county updates
either one.

## Adding a course

1. Copy the `billing/` folder and rename it, for example `onboarding/`.
2. In its `js/config.js`, change the title and give it its own `storageKey`, so
   its saved progress is kept separately.
3. Replace the files in `content/`, and update the `<script>` lines in its
   `index.html` and `moduleOrder` in `js/config.js` to match. In `index.html`,
   also change `billing` in the trailing-slash line near the top.
4. Add it to the list on the training page, `index.html` in this folder.

## Status (cybersecurity course)

The four modules have complete lesson text and three questions each, covering
the four minimum topics in the county Statement of Assurance. The incident
contact is Carl Vitense (`securityContact`). Videos are optional: a page can
take a `media` item, such as a CISA *Secure Our World* video embedded from
CISA's YouTube channel.
