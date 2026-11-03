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

The responses sheet (name, date, score) is the per-person record behind the
signed Statement of Assurance. Keep it for six years.

Anyone with access to client or financial information who **doesn't** have an
Inner Journey Google account needs another way to record completion.

## Status

The four modules are **drafts**: lesson pages are outlines, video slots are
placeholders, and each module has three sample questions to be reviewed and
expanded.
