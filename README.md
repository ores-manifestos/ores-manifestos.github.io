# ores-manifestos.github.io

The ORES Manifestos — the engineering principles the ORESoftware workspace is built on,
published as a static Astro site at <https://ores-manifestos.github.io>.

## Why this repo exists

Per the workspace convention, every GitHub organization has an Astro marketing/documentation site
at `https://<org>.github.io/`, in a repository named `<org>.github.io`. This is that repository for
`github.com/ores-manifestos`.

## Content

Each manifesto is a markdown file under `src/pages/manifestos/`, using the `Manifesto` layout and
carrying `number`, `slug`, `title` and `tagline` frontmatter. The index page and the prev/next
pager are both derived from that frontmatter, so adding a manifesto is a single file — no
registration step, nothing to keep in sync.

| # | Manifesto | Position |
|---|---|---|
| 01 | Peer Authorities | Two human-authored sources of truth; neither generates the other |
| 02 | Fail Closed | A check that cannot run is not a check that passed |
| 03 | Evidence Over Assertion | A claim without a reproducible receipt is not a claim |
| 04 | One Contract, One Parser | The option surface is a contract file, not parser behaviour |
| 05 | Work Does Not Sit Locally | A draft PR beats finished code on one laptop |
| 06 | Merge, Don't Pick Sides | Conflicts are resolved conceptually, from real history |
| 07 | The Secondary Copy | A vendored submodule checkout is never the source of truth |
| 08 | One-to-One All the Way Down | One product boundary, seven identical projections |
| 09 | Test Orgs Are Real Users | The only honest integration test has no special access |
| 10 | Secrets Have One Home | A credential seen outside its store is an incident |

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the built site
```

Requires Node 20+.

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to
`main`. Enable Pages for this repository with **Source: GitHub Actions**.

## License

Site source: MIT. Manifesto text: CC BY 4.0.
