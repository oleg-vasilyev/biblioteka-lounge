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
