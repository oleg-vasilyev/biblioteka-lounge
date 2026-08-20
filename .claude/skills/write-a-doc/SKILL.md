---
name: write-a-doc
description: Decide which Biblioteka document a fact belongs in, and how to add it without duplicating what another file already says. Use before editing README.md, PLAN.md, CLAUDE.md, TECH-DEBT.md or DEVELOPMENT-FLOW.md, and at the end of any phase that changed behaviour.
---

# Writing a document here

> **Stage 6** of [how a change becomes a deploy](../../../DEVELOPMENT-FLOW.md).

**One fact, one home, and every other file links to it with an anchor.** A
summary of what another document says in full is duplication wearing a hat —
it creates two things that must change together, and one of them will not.

## Which home

| The fact is | Home | The test |
|---|---|---|
| What a person does to run or deploy this | `README.md` | someone who will never read the code needs it |
| What the site is: content, languages, data, constraints, a decision paid for | `PLAN.md` | it would survive a rebuild in another stack |
| How code here must be written | `CLAUDE.md` | a violation is possible in a file nobody is thinking about |
| A procedure with an obvious trigger | a **skill** | you would know to ask for it by name |
| Deliberately unfinished, plus its trigger | `TECH-DEBT.md` | it names a trigger, not a wish |
| Why a non-obvious line of config exists | a comment in that config file | configs are exempt from no-comments |

A lesson from one phase does not automatically belong in `CLAUDE.md`: if it
only matters while doing one job, it goes in that job's skill. `CLAUDE.md` is
paid for by every session that never needed the paragraph, which is why it has
a **120-line budget** — going over means moving an old paragraph out, not
raising the number.

## The four steps, in order

1. **Search before writing.** Grep the other documents for the nouns in what
   you are about to add; if it is there, link and write nothing.
2. **Search for what it makes false.** A new feature contradicts sentences
   written before it existed; deleting them is part of the change. When a rule
   is *narrowed*, grep for its **old** wording — the new phrasing exists only
   where you have already been. **Grep skill frontmatter first**: a stale
   `description:` is worse than stale prose, because it decides whether the
   corrected body is ever loaded.
3. **Write it once, in the home the table names.** Explaining the same thing
   "briefly" in a second file is the duplication being born.
4. **Check the seams by hand** until `docs:check` exists ([TECH-DEBT.md](../../../TECH-DEBT.md)
   holds that debt): links resolve, README's script table matches
   `package.json`, CLAUDE.md is under budget.

One overlap is allowed, deliberately: `README.md` must be readable without
opening another file, so the product's central constraint — the demo is shown
on a phone, across a table — opens both `README.md` and `PLAN.md`. Everything
else that appears twice is a bug.
