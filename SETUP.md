# Setup — self-service publishing (Sveltia CMS)

This gets Carl and Holly editing the team and publishing on their own, with no
manual file-copying. It's a one-time setup you (Paul) do once.

The pieces: the site lives in a **GitHub repo**, is **hosted** so it's served over
the web, and the **CMS at `/admin/`** commits edits back to the repo — which
re-publishes the site automatically.

---

## 1. Put the site in a GitHub repo

Create a repo (ideally under an *Inner Journey* organization, not your personal
account, so access outlives any one person) and push these files to it. The repo
root should contain `index.html`, `admin/`, `content/`, `js/`, etc.

## 2. Host it

Recommended: **Netlify** — it serves at the domain root (so asset paths stay
simple) and can auto-rebuild on every commit.
- Connect the repo in Netlify. Build command: *none*. Publish directory: `/` (root).
- Or GitHub Pages / Cloudflare Pages work too; if using a GitHub Pages *project*
  site (served under `/repo/`), test that photo paths still resolve.

The site now fetches `content/staff.json`, so it must be served over HTTP. For
local preview, run `python3 -m http.server` in the folder — don't open the files
directly with `file://` or the team list won't load.

## 3. Point the CMS at your repo

In `admin/config.yml`, set:

    repo: your-org/your-repo

## 4. Authentication — pick one

Non-technical editors want the "Sign in with GitHub" button, which needs an OAuth
client. Two supported ways:

### A) Cloudflare Worker authenticator (host-agnostic, recommended)
1. Deploy the official worker: https://github.com/sveltia/sveltia-cms-auth
   (one-click deploy to Cloudflare, free tier is far more than enough).
2. Register a GitHub OAuth app (GitHub → Settings → Developer settings → OAuth
   Apps → New). Set the callback URL to your Worker's `/callback` URL.
3. In the Worker's settings, add env vars `GITHUB_CLIENT_ID`,
   `GITHUB_CLIENT_SECRET`, and `ALLOWED_DOMAINS` (your site's hostname).
4. In `admin/config.yml`, uncomment and set:
   `base_url: https://sveltia-cms-auth.YOUR-SUBDOMAIN.workers.dev`

### B) Netlify OAuth (only if hosting on Netlify)
Register a GitHub OAuth app and link it to your Netlify site under the site's
Access control / OAuth settings. Leave `base_url` unset — this is Sveltia's
default flow. (Netlify's OAuth *provider* still works; the deprecated piece is
Netlify Identity / Git Gateway, which we are NOT using.)

## 5. Give the editors access

- Add Carl and Holly as repo collaborators (or to a team with write access).
- Have each enable **2FA** on their GitHub account. Because GitHub access equals
  edit access, that's the one security step that matters.

## 6. Done — how they use it

They go to `https://your-site/admin/`, click **Sign in with GitHub**, edit the
Team Members list (add a person, tick counties/roles/trainings, upload a photo),
and **Save**. That commits to the repo; the host rebuilds in ~30–60 seconds and
the change is live. No terminal, no file copying.

---

## Adding a new category later

Counties, roles, and trainings are controlled lists, defined in TWO files:
`js/staff.js` (used by the site) and `admin/config.yml` (the CMS dropdowns).
To add one, add it to both. Assigning existing categories to people is what
Carl and Holly do in the CMS; adding a *new* category stays a developer edit —
which is what keeps the lists controlled.
