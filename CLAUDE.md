# Biblioteka — how the code here is written

This file is loaded before every session, so it holds only what has to be known
*before* the first edit. Procedures live in skills:

| Doing this | Read |
|---|---|
| Adding or reshaping a page section | `add-a-section` skill |
| Writing or changing any spec | `write-a-spec` skill |
| Taking on a list of changes, and closing it | `finish-phase` skill |
| Writing or changing any document | `write-a-doc` skill |
| Writing a commit message | `write-a-commit` skill |
| Reviewing a phase's diff | `phase-reviewer` agent |
| A mockup for anything a visitor will see, before render code | `page-designer` agent |

Four documents, one job each: **README.md** — what this is and how to run it.
**PLAN.md** — what the site is and why: content, languages, data, constraints.
**CLAUDE.md** — this file: style, layering, testing, gates. **TECH-DEBT.md** —
what is deliberately unfinished, each entry with the trigger that would make it
worth doing; entries are deleted when done, never ticked.

The dividing question: *would this still be true if the site were rebuilt in
another stack?* If yes it belongs in `PLAN.md`. **A fact lives where its reason
lives; the other file gets a pointer, never a retelling.** This file has a line
budget of **120 lines** — when a new rule pushes it over, move an old paragraph
into the skill it belongs to instead of raising the number. (`docs:check` enforces the budget.)

## Code style

Anything a machine can check is a lint rule in `eslint.config.js`, not a
paragraph here. What is left needs judgement:

- **A file must read as a skeleton, not an implementation** — the exported
  function names the steps and delegates; steps are module-level functions
  taking explicit arguments, not closures.
- **A file name has to survive being read on its own** in an editor tab:
  `menu-preview-section.ts`, not `section.ts`. Shown only the basename, a
  reader should guess the exports. `index.ts` promises a re-export; logic never
  goes in one.
- **Dispatch on a closed union with `switch`**, never a chain of `if`, so the
  compiler checks exhaustiveness. Keep `if` for guards.
- **Keep functions pure where you can** — arguments in, new value out, no
  module state, no mutation. Wiring belongs in the build script, not the logic.
- **No comments in `src/` and `scripts/`** — naming carries the intent; a magic
  number gets a named `const`; an explanation that will not fit in a name
  belongs in `PLAN.md`. Config files are exempt.

`strict: true`, no `any`, no build step: `tsconfig.json` mirrors how Node runs
the code (`erasableSyntaxOnly`, `verbatimModuleSyntax`, explicit `.ts` imports).

## Everything a visitor can read lives in a copy table

Code, identifiers, commits and documents are English. What the *site says* is
Georgian, English or Russian, so every section carries `copy.en.ts`,
`copy.ka.ts`, `copy.ru.ts` and a `copy.ts` whose `copyIn(locale)` switches
between them. `copy.en.ts` declares the shape (`export type Copy = typeof
copy`) and the other two are annotated with it, so a key missing from one
language is a compile error.

**No string literal a visitor can read may appear anywhere else** — not in a
render function, not in the page shell, not as a separator two copy values are
joined with. **Copy is a parameter, never an import**: a render function takes
`copy: Copy`; only the build script resolves one per locale. **A copy value
interpolates; it never decides** — choices belong in render. Prices are data
(`data/menu.ts`), not copy.

## Architecture

**A section is a folder you can delete.** Removing `src/sections/<name>/` must
leave the rest compiling and passing, minus one call in the build script.
Sections may not import each other; `shared/` may not import a section — both
are lint zones, and **a zone is not finished until a deliberate violation has
been shown to fail the lint**.

```
src/
  sections/<name>/
    copy.en.ts  copy.ka.ts  copy.ru.ts  copy.ts
    render/     data + copy in, HTML string out; pure — no node:*, no I/O
  shared/       one folder per subject: html escaping, locale, the page shell
scripts/        the impure edge: build-site, data capture, checks — the only
                place that reads or writes files
data/           committed snapshots the site renders (the menu)
docs/           the built site, committed; GitHub Pages serves it from main
```

**HTML is a string; `shared/html/` is the only place markup is assembled and
escaped**, so user-visible data cannot reach the output unescaped. Render
functions return strings; only `scripts/` touch the filesystem.

There are no relative imports in `src/` — every specifier is a `#` alias
declared in `package.json` (Node subpath imports), added per section by the
`add-a-section` skill.

## Tests

Specs sit next to the code as `*.spec.ts`; stubs sit beside their subject. **A
spec tests one file, and everything that file imports is mocked** — except copy
tables, which stay real so a spec cannot pass against copy that never renders.
Coverage floor is 70% on every metric (`vitest.config.ts`). Mutation testing
and browser tests are deliberate debt — [TECH-DEBT.md](TECH-DEBT.md) holds the
triggers.

## Checks

`npm run check` = lint, types, tests with coverage. From the build phase on it
also proves `docs/` fresh: rebuild and `git diff --exit-code docs/`. A
`PostToolUse` hook lints each file as it is written. **Any list of changes is a
phase**, and a phase closes through the `finish-phase` skill's gates — the list
somebody hands you never contains the gates.
