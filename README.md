# Biblioteka

A static website for **Biblioteka Lounge** — a hookah lounge in Tbilisi that
currently has no site at all: an Instagram, a Telegram bot, and a menu page
rented from its POS vendor. This repository is the demo slice built to change
that, to be shown to the owner on a phone, across a table —
[PLAN.md](PLAN.md) says what the site is and why, starting with that
constraint.

One page, three languages — `/` English, `/ka/` Georgian, `/ru/` Russian —
rendered by a TypeScript build script into `docs/`, which is committed and
served by GitHub Pages straight off `main`. A push is the whole deploy: no
workflow, no second branch, no server.

## Running it

Node ≥ 24 (the scripts are TypeScript that Node runs directly).

| Script | What it does |
|---|---|
| `npm run check` | lint, types, tests with coverage, docs freshness — the everything command |
| `npm run build` | render every locale's page into `docs/` |
| `npm run docs:check` | rebuild, prove `docs/` matches, hold CLAUDE.md to its line budget |
| `npm run lint` | ESLint over `src/` and `scripts/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | vitest, specs beside the code |
| `npm run test:coverage` | the suite under a 70% floor |

## Layout

```
src/sections/   one deletable folder per page section, copy in three languages
src/shared/     html assembly, locale plumbing, the page shell
scripts/        the build and every other thing that touches a file
data/           committed data snapshots (the menu)
docs/           the built site — generated, committed, served
```

## The other three documents

- [PLAN.md](PLAN.md) — what the site is and why; the decisions already paid for.
- [CLAUDE.md](CLAUDE.md) — how code is written here; the AI developer reads it
  before every session, and [DEVELOPMENT-FLOW.md](DEVELOPMENT-FLOW.md) draws
  how a change becomes a deploy.
- [TECH-DEBT.md](TECH-DEBT.md) — what is deliberately unfinished, and what
  would make each item worth doing.
