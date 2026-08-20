---
name: finish-phase
description: Close a development phase in the Biblioteka site repository — the six gates (lint and types, coverage, docs freshness, review, the look, retrospective) and the phase-final commit. Load when ANY list of changes is accepted — a section, a refactor, closing findings, tooling — because such a list is a phase whether or not it adds anything visible, and the list somebody hands you never contains the gates. Also when a phase is being wrapped up or the user asks whether the work is deployable.
---

# Finishing a phase

> **Stages 3–6** of [how a change becomes a deploy](../../../DEVELOPMENT-FLOW.md).

A phase ends with a push to `main`, and a push is the deploy — so a phase is
done when the site is *shippable*, not when the code works. Six gates, none
advisory. **Say how big the phase is before starting it**, in one line, so it
can be argued down.

## 1. Lint and types

`npm run lint && npm run typecheck`, zero errors. A changed signature has
callers no gate can see: grep the whole repository including `.claude/skills/`
and `README.md`, where commands rot silently.

## 2. `npm run test:coverage`

70% floor on every metric. A file that dropped is a file whose new branches
nobody exercised — find the branch, not a way to reach the number.

## 3. Freshness of the generated site

From the build phase on: rebuild (`npm run build`) and `git diff --exit-code
docs/`. A dirty `docs/` means either a forgotten rebuild — rebuild and commit —
or a hand edit inside generated output, which is reverted, never kept. Until
the build script exists this gate is one sentence in the commit message saying
so.

## 4. Review — always the `phase-reviewer` subagent, never a re-read

You cannot review your own diff by reading it: you are still holding the
reasoning that made it look right. Stop editing before launching it; a tree
that moves under the reviewer produces findings against code that no longer
exists. The brief names paths, never purposes — a reviewer handed a
description judges the name against the description and passes it; handed the
path alone, it opens the file cold.

Each finding is fixed now (re-running only the affected gate) or recorded in
`TECH-DEBT.md` with the trigger that would make it worth doing. Never silently
dropped.

## 5. The look — when the phase changed anything a visitor sees

Open the built pages in a real browser viewport at phone width (375px) and
desktop (1280px), **all three languages** — the Georgian page is the one that
breaks first: longer words, different script metrics. The output is **specific
claims, not a verdict** — if you cannot name what you saw on a page, you did
not look at it. Ask of each:

- does anything overflow, wrap mid-word, or get cut where a reader cannot
  recover it?
- does the same thing carry the same name on every page and in every language?
- does the first screen still sell in five seconds on the phone width —
  `PLAN.md`'s one constraint?

Fix what is plainly wrong without asking; show a screenshot and ask about what
is taste. **Machine-drafted Georgian is named as unreviewed in the closing
message every phase it ships.**

## 6. Retrospective — before the final commit, while the transcript exists

Answer with counts, not impressions: what was built and then rebuilt, and what
moment would have settled it earlier? How many times did each gate run, and
how many runs produced information already on disk? What was re-read that was
already in context? Did a subagent pay for itself?

**A verdict that changes no default is not a conclusion.** Every lesson lands
as a durable diff — a rule in a skill, a line in `CLAUDE.md` (within its
budget), a memory file — or is dropped. A lesson that changes the flow itself
redraws `DEVELOPMENT-FLOW.md` in the same commit and says so in the closing
message with the numbers that forced it.

## The documents the phase owes

Load `write-a-doc` before touching them: one fact, one home. Search for the
sentence the phase just made false — a new section usually contradicts prose
written before it existed. Then `write-a-commit` for the final message, which
carries the Gates paragraph.
