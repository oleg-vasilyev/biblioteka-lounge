---
name: add-a-section
description: Add a page section to the Biblioteka site, or reshape an existing one — the folder layout, the three copy tables, the pure render layer, the import alias, the lint zone, and the wiring into the build script. Use before creating anything under src/sections/.
---

# Adding a section

> **Stage 1** of [how a change becomes a deploy](../../../DEVELOPMENT-FLOW.md)
> is where this loads — before the first file.

A section is a folder you can delete: removing it must leave the rest
compiling and passing, minus exactly one call in `scripts/build-site.ts`.
`PLAN.md` names the sections the page has and their scroll order — a section
not listed there gets a `PLAN.md` sentence first, in the same phase.

## The folder

```
src/sections/<name>/
  copy.en.ts   declares the shape: export type Copy = typeof copy
  copy.ka.ts   annotated with Copy — a missing key is a compile error
  copy.ru.ts   annotated with Copy
  copy.ts      copyIn(locale) switching between the three
  render/      (data, copy) in, HTML string out — pure
```

Name the folder after **what the visitor gets** (`menu-preview`, `visit`),
never after a process or an internal noun. Every file name must survive being
read alone in an editor tab: `menu-preview-section.ts`, not `section.ts`.

## Five places that change together

1. The folder above.
2. `package.json` `imports`: `"#<name>/*": "./src/sections/<name>/*"`.
3. `eslint.config.js` `SECTIONS`: add the name, so the independence and purity
   zones fire for it.
4. **Prove the zone**: write a deliberate violation (import another section
   from `render/`, or `node:fs`), see the lint fail, revert it. A zone that
   never fired looks exactly like one with nothing to report.
5. `scripts/build-site.ts`: one call, in the scroll order `PLAN.md` names.

## Rules that bite here

- **Copy that already exists in an approved mockup is extracted, never
  retyped.** Write a throwaway script that reads the panels and emits the
  three tables. Georgian and the non-breaking spaces before every em dash do
  not survive a human transcription: the one line typed by hand in the
  identity phase came out as `თანხპმამდე` for `თანხმობამდე`, and only a diff
  against the panel caught it. The `escaped-punctuation` lint rule now fails a
  copy table whose punctuation was typed rather than escaped — it catches the
  lost non-breaking space, and nothing at all about a misspelt Georgian word.
- **Copy is a parameter, never an import** — render functions take
  `copy: Copy`; only the build script resolves a locale.
- **Copy interpolates, never decides** — a choice between two phrasings is a
  render decision reading the data, and the table holds both phrasings.
- **All markup goes through `shared/html/`** — a render file concatenating
  `"<div>"` by hand is the escaping bug waiting for its first Georgian quote
  mark.
- **Prices and venue facts are data, not copy** — they come from `data/`, so
  the three languages cannot disagree about a number.
- Georgian copy drafted by machine is flagged unreviewed in the phase's
  closing message, every time, until a native reader has confirmed it —
  `PLAN.md` says why this is the costliest string on the page.

Specs for the new files are the `write-a-spec` skill's business; load it
before writing them.
