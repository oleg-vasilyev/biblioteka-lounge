---
name: write-a-commit
description: Write a commit message in the Biblioteka repository's voice — the prose title, the body that says why the previous shape was wrong, and the Gates paragraph a phase-final commit carries. Use before any commit.
---

# Writing a commit message

> **Stage 7** of [how a change becomes a deploy](../../../DEVELOPMENT-FLOW.md).

Prose in the project's voice — no conventional-commit prefixes, no scopes, no
bullet-list changelogs, no file lists. The diff already says *what* changed; a
message that repeats it has wasted the reader's one visit. There are no
release tags here: a push to `main` is the deploy, so the phase-final commit
is the release and carries the whole record.

**Title:** one imperative sentence about what the site (or the workflow) now
does differently, readable alone in `git log --oneline`, written for the
person the change serves — a visitor, the owner, a future reader. Not
`Update hero section`; rather `Show tonight's hours on the first screen`.

**Body:** paragraphs, not bullets. Its one obligation is the thing a diff
cannot show — why the previous shape was wrong, the alternative rejected, the
constraint that forced the shape, the number measured rather than guessed.

**A phase-final commit ends with the Gates paragraph**, every gate named even
when skipped — a skipped gate carries its reason, never silence:

```
Gates: check green — <N> tests in <M> files, coverage <st>/<br>/<fn>/<ln>.
Docs freshness: <rebuilt and clean | no build script yet>.
Review: <N> findings, <their fate in a clause>.
Look: <one specific claim about what was seen, or why the gate stayed shut>.
Retro: <the default that changed, or plainly that none did>.
Georgian: <native-reviewed | machine-drafted, unreviewed>.
```

**Trailer, always the last line:**

```
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

The model name is whichever Claude actually wrote the commit.

Judging one before it lands: could the title be read aloud to the lounge's
owner as a claim about their site? Does the body say anything the diff does
not? Would the numbers let a reader two months out notice a regression?
