# Setup — self-service publishing with Sveltia CMS

One-time setup, done once by a developer (Paul). When it's finished, Carl and
Holly can add or edit staff at `https://<your-site>/admin/` and publish without
touching code, the terminal, or any files.

Everything below is free. Budget about an hour the first time.

## How the pieces fit

    Carl/Holly → /admin/ (Sveltia CMS) → commits to GitHub repo → host rebuilds → live site

- The **repo** holds the site and the staff data (`content/staff.json`).
- The **host** serves the site and rebuilds automatically on every commit.
- The **CMS** at `/admin/` is a form that writes to the repo.
- The **OAuth worker** is a tiny script that lets them click "Sign in with GitHub."
  GitHub itself handles passwords and 2FA — you never store credentials.

---

## Step 1 — Put the site in a GitHub repo

Create the repo and push these files to it. The repo root should contain
`index.html`, `admin/`, `content/`, `js/`, `css/`, `assets/`.

**Recommendation:** create it under an *Inner Journey* GitHub organization rather
than a personal account, so access to the site outlives any one person.

## Step 2 — Host it

**Netlify** is the simplest and is assumed below.

- Connect the GitHub repo in Netlify.
- Build command: **none** (leave empty). Publish directory: **`/`** (the root).
- Note the site's hostname (e.g. `innerjourneymke.netlify.app`, or the custom
  domain once it's pointed) — you'll need it in Step 5.

GitHub Pages and Cloudflare Pages also work. If you use a GitHub Pages *project*
site (served under `/repo-name/`), double-check that photo paths still resolve.

> **Note:** the site fetches `content/staff.json`, so it must be served over HTTP.
> For local preview run `python3 -m http.server` in the project folder — opening
> `index.html` directly with `file://` will leave the team list empty.

## Step 3 — Deploy the OAuth worker (Cloudflare)

Sveltia deliberately does not run a hosted auth service, so you run your own copy
of a small open-source worker.

1. Sign up at Cloudflare (free tier is far more than enough).
2. Go to https://github.com/sveltia/sveltia-cms-auth and click the
   **Deploy to Cloudflare Workers** button. (Or clone it and run `wrangler deploy`.)
3. When it finishes, open the Cloudflare Workers dashboard, select the
   `sveltia-cms-auth` service, and **copy the worker URL**. It looks like:

       https://sveltia-cms-auth.<your-subdomain>.workers.dev

   You'll use this URL in Step 4 and Step 6.

## Step 4 — Register a GitHub OAuth app

Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
(https://github.com/settings/applications/new) and fill in:

- **Application name:** `Sveltia CMS Authenticator` (or anything)
- **Homepage URL:** your site URL (or anything)
- **Authorization callback URL:** `<YOUR_WORKER_URL>/callback`

> ⚠️ The callback URL **must** end in `/callback`. Forgetting that is the single
> most common cause of a failed login.

Then click **Generate a new client secret**. Keep the **Client ID** and
**Client Secret** open for the next step (the secret is shown only once).

## Step 5 — Configure the worker

Back on the Cloudflare dashboard: `sveltia-cms-auth` service → **Settings** →
**Variables** → add these environment variables:

| Variable | Value |
| --- | --- |
| `GITHUB_CLIENT_ID` | Client ID from Step 4 |
| `GITHUB_CLIENT_SECRET` | Client Secret from Step 4 — **click Encrypt** |
| `ALLOWED_DOMAINS` | your site's hostname, e.g. `innerjourneymke.com` |

`ALLOWED_DOMAINS` is optional but worth setting — it stops anyone else from
pointing their CMS at your worker. Comma-separate multiple hosts. To cover both
the naked domain and its subdomains, use: `example.com, *.example.com`

**Save and deploy.**

## Step 6 — Point the CMS at your repo and worker

Edit `admin/config.yml` and set the repo plus the worker URL:

```yaml
backend:
  name: github
  repo: inner-journey-mke/website                              # your owner/repo
  branch: main
  base_url: https://sveltia-cms-auth.YOUR-SUBDOMAIN.workers.dev
```

Commit and push. Once the host redeploys, remote sign-in works.

## Step 7 — Give Carl and Holly access

- Add each as a repo **collaborator with write access** (not admin — least privilege).
- Have each enable **2FA** on their GitHub account.

Because repo access *is* edit access, 2FA is the one security step that genuinely
matters here. GitHub handles password storage, breach detection, and brute-force
protection; we store no credentials of our own.

## Step 8 — Test it yourself first

1. Visit `https://<your-site>/admin/`
2. Click **Sign in with GitHub** and authorize.
3. Open **Team → Team Members**, tweak something small, and **Save**.
4. Confirm a commit appears in the repo and the site rebuilds (~30–60s).
5. Undo the tweak the same way.

Do this before showing Carl, so his first look is a working system.

---

## How they'll use it day to day

Go to `/admin/`, sign in with GitHub, open **Team Members**, then:

- **Add someone:** click add, fill in name / credentials / title, tick their
  **Roles**, **Trainings**, and **Counties**, optionally upload a **photo**, set
  a display **order**, Save.
- **Edit or remove someone:** click them in the list, change or delete, Save.

Saving commits to the repo; the site republishes automatically. Uploaded photos
are committed to `assets/team/`. Every change is a Git commit, so anything can be
reverted.

## Adding a new category later

Counties, roles, and trainings are **controlled lists** defined in two files:

- `js/staff.js` — used by the site (filters, county pages, nav dropdown)
- `admin/config.yml` — the dropdown options in the CMS form

To add a county / role / training, add it to **both**. That's a deliberate code
edit: assigning existing categories to people is Carl and Holly's job, but adding
new categories stays with a developer, which is what keeps the vocabulary
controlled and the filters reliable.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Login popup fails or errors | Callback URL missing the trailing `/callback` |
| Login blocked / domain error | `ALLOWED_DOMAINS` doesn't match the actual hostname |
| "Sign in with GitHub" missing | `base_url` not set in `admin/config.yml` |
| Team list empty locally | Site opened via `file://` — serve it over HTTP instead |
| Saves don't appear on the site | Host isn't rebuilding on commit; check the host's deploy log |
| CMS won't load at all | Pin/verify the Sveltia script version in `admin/index.html` |

## Notes

- **Sveltia is pre-1.0** and moves quickly. `admin/index.html` loads it from a CDN;
  check the current script URL at https://github.com/sveltia/sveltia-cms and
  consider pinning a specific version rather than tracking latest.
- **The worker may become unnecessary.** GitHub is planning client-side PKCE
  support; once it ships, Sveltia can authenticate with GitHub directly and this
  authenticator is deprecated. That would make Step 3 a thing you delete, not
  something more to maintain.

## Reference

- Sveltia CMS: https://github.com/sveltia/sveltia-cms
- Sveltia CMS docs: https://sveltiacms.app/en/docs/backends/github
- OAuth worker: https://github.com/sveltia/sveltia-cms-auth
