# Biblioteka — a website slice for a lounge that has none

Biblioteka Lounge is a hookah lounge in Tbilisi with three years of Friday
regulars and no website: an Instagram, a Telegram bot for calling a waiter, and
a menu page rented from its POS vendor
([lounge-biblioteka.eat-me.online](https://lounge-biblioteka.eat-me.online/)) —
slow, unstyled, three languages crammed into every line. This repository builds
a **demo slice** of the site they should have, to be shown to the owner in
person: enough of the real thing that "could you finish it?" is the natural
next sentence.

This file is the authority on **what the site is and why** — content, languages,
data, constraints, and the decisions already paid for. How the code is written
is [CLAUDE.md](CLAUDE.md); how to run what exists is [README.md](README.md);
what is deliberately unfinished is [TECH-DEBT.md](TECH-DEBT.md).

## The one constraint that shapes everything

**The demo will be shown on a phone, handed across a table, in a dim and noisy
lounge.** The owner gives it five seconds before deciding whether to keep
listening. So the first screen has to look like the venue's own aesthetic —
dark, warm, book-lined — and load instantly on cellular; everything else on the
page exists to survive the scroll that follows those five seconds. Desktop is
the secondary reading, checked but never designed for first.

The pitch the demo serves: the author is a three-year Friday regular offering
to finish the site for a symbolic price, payable as a bar deposit. The demo is
the argument, so it must *look finished* even where it is shallow — a beautiful
slice beats a complete skeleton.

## Pages and languages

One page, three languages, each a full static copy:

| URL | Language | Why it is there |
|---|---|---|
| `/` | English | the default: Google Maps sends tourists, and neutral ground for the pitch |
| `/ka/` | Georgian | the venue's own city; respect, and local search |
| `/ru/` | Russian | the regulars' language, and the owner's likely first read |

Every page links the other two from a switcher in the header, and carries
`hreflang` links to both siblings. **Georgian copy is drafted by machine and
must be flagged as unreviewed until a native reader has confirmed it** — the
owner will spot bad Georgian in one glance, and one bad line costs more than a
missing language.

The alternative — Georgian at `/` — was considered and rejected: the measurable
traffic a lounge site gets is "website" taps on Google Maps, and in Tbilisi's
center those are mostly visitors. The switcher is one tap away for everyone
else.

## The sections, in scroll order

Each section is a deletable folder under `src/sections/` (the shape is
[CLAUDE.md](CLAUDE.md#architecture)'s subject). Content sources are named here
because they are decisions, not details:

1. **hero** — name, one line of identity, one full-bleed photo, hours-tonight
   and a booking button. Photo from the venue's own Instagram.
2. **atmosphere** — three to five photos with one sentence each: the books, the
   hookah, the beer taps. Also from their Instagram.
3. **menu-preview** — a handful of signature items per category group (hookah,
   kitchen, bar) with prices in GEL, and one link to the full live menu on
   eat-me.online. **The preview is a dated snapshot, and says so on the page.**
   The data is a committed file under `data/`, captured from the public
   eat-me.online menu in its own phase; nothing fetches at build time and
   nothing promises to stay in sync.
4. **visit** — address, a map link, opening hours, phone, Instagram, and the
   booking call-to-action repeated: a deep link into their existing Telegram
   bot, with the phone number as the fallback.

No section requires JavaScript to read. The page must be complete with scripts
off; anything interactive later is an enhancement on top of working HTML.

## What the demo deliberately does not do

- **No live menu.** Syncing with the POS is the finished product's selling
  point, not the demo's risk. The demo links out and labels its snapshot.
- **No backend.** Booking is a link to their Telegram bot or a phone call.
  GitHub Pages serves static files, and that is the whole hosting story.
- **No accounts, no analytics, no cookies, no consent banner.** A beacon like
  GoatCounter is worth adding the day the owner says yes
  ([TECH-DEBT.md](TECH-DEBT.md) holds the trigger).

## Stack, and the dead end already priced

No framework and no runtime dependencies. TypeScript that Node ≥ 24 runs
directly (type stripping — no build step for the *tooling*), rendering static
HTML into `docs/`, which is committed and served by GitHub Pages straight off
`main`. A push is the whole deploy. CSS is hand-written, one file, committed.

Astro/Vite were considered and rejected: a static one-pager in three languages
is a for-loop over locales writing three HTML files, and a framework would add
a build pipeline, a dependency tree and a dev server to a project whose whole
output a person can read. The reference project this repo's workflow is adapted
from ships its site the same way, and its first screen is 44 KB. **Budget: the
first screen under 150 KB before photos, photos lazy below the fold.**

## Data model — frozen in the menu phase, sketched here

The menu snapshot is one committed file, `data/menu.ts`: category groups, each
with items carrying `{ name: { ka, en, ru }, price }`, prices in GEL as
integers (the source menu has no fractional prices; if one appears, this
sentence is the thing to update). The snapshot records the date it was taken,
and the page prints that date next to the link to the live menu.

## Invariants

- Every string a visitor can read lives in a section's copy table, in all three
  languages — a missing key in one language is a compile error, not a fallback.
- Prices appear only in `data/menu.ts`, never in copy or markup.
- The three language pages are the same page: same sections, same order, same
  data. A section cannot be present in one language and absent in another.
- `docs/` is generated. Editing it by hand is editing a build artifact; the
  freshness gate (`npm run check`, from the build phase on) fails on a stale or
  hand-touched `docs/`.

## The road to Friday

Shown to the owner **Friday 2026-08-22**. Phases, each closed by the gates in
the `finish-phase` skill:

1. **Shell** — this repository: documents, configs, workflow. *(done)*
2. **Build pipeline and page skeleton** — `scripts/build-site.ts`, the shared
   page shell, the language switcher, a complete but deliberately unstyled
   page deploying to GitHub Pages. The freshness gate lands here. Unstyled is
   the point: the look is decided in the identity phase, on a mockup, not
   improvised in a build script.
3. **Menu snapshot and menu-preview** — capture the eat-me.online data into
   `data/menu.ts`, render the preview.
4. **Identity, hero and atmosphere** — the design phase: the `page-designer`
   agent drafts the identity as a contact sheet, the owner approves it, the
   approved artboards become a Claude Design canvas (its id recorded in the
   agent file), and only then the render code for the five-second screen is
   written against the approved picture.
5. **Visit and booking** — hours, map, Telegram deep link, phone.
6. **Meta and launch** — OG tags, hreflang, favicon, sitemap, the GitHub
   repository and Pages switch, a full three-language look pass on a real
   phone.

## Open questions, to be answered before or at the pitch

- Exact opening hours and phone — read off the Google Maps listing, confirmed
  with staff on Friday.
- Which photos the owner is happy to see used — the demo borrows from their
  public Instagram; the finished site should get originals.
- A native reader for the Georgian copy.
- Domain: `.ge` registration is the owner's purchase (~30–50 GEL/year); until
  then the site lives at a `github.io` address.
