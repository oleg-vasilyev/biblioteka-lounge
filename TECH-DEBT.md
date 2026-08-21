# Biblioteka — what is owed

Deliberately unfinished work. **An entry names a trigger, not a wish** —
"improve the CSS" is a wish; "when X happens, do Y" is an entry. Delete an
entry when its trigger fires and the work is done, rather than ticking it.

## Mutation testing is not a gate here yet

The reference workflow runs Stryker over every phase's diff. This project
starts without it: the render layer is small, the specs are cheap to keep
honest by review, and the demo has a Friday deadline. **Trigger:** the first
regression that a green suite lets through, or the first paid phase after the
demo — whichever comes first. Adopt the reference's config (diff-only runs,
85% threshold, reports under `reports/`).

## Nothing exercises the built page in a browser

Render specs prove strings; nothing proves the page works — links resolve, the
language switcher points where it says, nothing overflows a phone screen. Until
there is JavaScript on the page this is covered by the look gate (a person, a
phone-width viewport, all three languages). **Trigger:** the first script tag
shipped in `docs/` — from that day the look gate is not enough and a browser
test is owed.

## The site counts nothing

No analytics, so "does anyone arrive" is unanswerable — fine for a demo that
is pitched in person. **Trigger:** the owner says yes to finishing the site.
Then add a cookie-less beacon (GoatCounter, as in the reference project) and a
Search Console property, and record both dashboards in README.

## The opening times are written out nine times

`14:00`, `02:00` and `03:00` are venue facts, but they sit inside sentences —
hero's one-line summary and visit's two rows, in three languages each. Only a
human diff keeps the nine agreeing, and the compiler cannot help: a changed
closing hour is nine hand edits. Splitting them out means four copy fragments
per sentence in every language, which reads worse than it protects while the
hours are a fixed snapshot. **Trigger:** the venue changes its hours, or the
first phase that makes them conditional (a holiday note, a seasonal garden).
Then the times move into `data/venue.ts` and the copy interpolates them, as
the price and the snapshot date already do.

## The favicon carries the palette as literals

An inline SVG can be painted from `--paper` and `--ink`, and the logo on the
page is; `assets/favicon.svg` is a file a browser fetches on its own, with no
stylesheet behind it, so its two hex values are baked in — and they are baked
into `design/logo-trace/trace-the-logo.py`, not next to the palette that
defines them. Change the palette and the tab icon keeps the old one, silently.
**Trigger:** the first palette change after the pitch. Then the generator's
`FAVICON` constant takes the new values and the file is regenerated.

## Every page downloads whole Google font subsets

The copy on these pages is fixed and small — a few hundred distinct
characters — yet each page fetches Google's full subsets: 78 KB of Literata
in English, and the Georgian page another 130 KB of Noto Serif Georgian. A
subset built from the characters the page actually sets would be a fraction of
that, and it is the reason the first screen has room for words but not for a
photograph. **Trigger:** the owner says yes and the first screen wants an
image, or a real phone on Georgian mobile data makes the wait visible. Then
self-host woff2 subsets built from the copy tables, and the build owes a step
that rebuilds them when copy changes.
