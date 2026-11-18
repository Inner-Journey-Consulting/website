# Cybersecurity Awareness Training — Inner Journey Consulting

Annual cybersecurity and HIPAA security training, built to satisfy the county
*Cybersecurity Awareness Training and HIPAA Security Statement of Assurance*.
Plain HTML, CSS and JavaScript with Bootstrap 5 from a CDN. No build step.

Adapted from the HCI 520 e-learning course structure: short one-idea lesson
pages, media on each page, and the same questions as a pre-test and post-test
so learners can see what changed.

## How it's organised

    index.html            The only page. Every screen is drawn from the data below.
    js/config.js          Settings: course version, pass mark, completion form, contact.
    js/course.js          The engine: routing, quizzes, results, saved progress.
    content/01-*.js ...   One file per module: objectives, lesson pages, questions.
    css/course.css        Styling (Inner Journey palette).
    certificate/          Apps Script that emails completion certificates (see below).
    media/                Videos, captions, images.

Each module runs:

    intro -> quick check (pre-test) -> lesson pages -> end-of-module check (post-test) -> results

The pre- and post-test are the **same questions**. The results page shows each
question's before and after answers, the correct answer, and an explanation.

## Previewing

Open `index.html` in a browser, or run `python3 -m http.server` in this folder
and visit http://localhost:8000.

## Editing content

Everything a learner reads lives in `content/`. Each module file looks like:

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

## Settings (js/config.js)

| Setting | What it does |
|---|---|
| `version` | Saved progress is stored per version. **Change it each year** and everyone starts fresh. |
| `passPercent` | Score needed on the end-of-module check to complete a module. `0` accepts any score. |
| `completionFormUrl` | Link to the official completion form (below). Blank shows a notice instead. |
| `completionFormFields` | Form fields to pre-fill with each module's before/after score (as a percentage) and the course version. See below. |
| `securityContact` | Who to report incidents to. Shown in Module 4 and the footer. |
| `moduleOrder` | Which modules appear, in what order. |

## The completion record

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

`certificate/Certificate.gs` is an Apps Script that runs inside the completion
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
   [`Certificate.gs`](https://raw.githubusercontent.com/Inner-Journey-Consulting/website/main/training/certificate/Certificate.gs).
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

## Status

The four modules have complete lesson text and three questions each, covering
the four minimum topics in the county Statement of Assurance. The incident
contact is Carl Vitense (`securityContact`). Videos are optional: a page can
take a `media` item, such as a CISA *Secure Our World* video embedded from
CISA's YouTube channel.
