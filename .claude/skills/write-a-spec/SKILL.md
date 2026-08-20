---
name: write-a-spec
description: Write or change a spec in the Biblioteka site repository — what a unit is here, what stays real, what is stubbed, and what a spec must assert to be worth running. Use before writing or editing any *.spec.ts file.
---

# Writing a spec here

> **Stage 2** of [how a change becomes a deploy](../../../DEVELOPMENT-FLOW.md).

Specs sit next to the code as `*.spec.ts`, run by vitest, counted by coverage
with a 70% floor on every metric. Stubs sit beside their subject as
`*.stub.ts`; a stub for someone else's code sits beside its only consumer.

## The unit rule

**A spec tests one file, and everything that file imports is mocked** — with
one deliberate exception: **copy tables stay real.** A spec that stubs the
copy compares the render against a fixture nobody ships, so a broken table
key or a decision smuggled into a copy value passes every test. Assert
against what `copy.en.ts` actually says, and when a case differs by language,
run it per locale through `copyIn`.

## What a spec must assert

- Something that **fails if the code breaks**, not merely that the code ran.
  An assertion on the exact HTML substring a visitor's browser will parse
  beats an assertion that the result is a non-empty string.
- The **hostile input, constructed** — the longest Georgian item name, a
  quote mark in a dish name, an empty category — never just the plausible
  one. A sample passes a broken limit as easily as a working one.
- **Escaping at the boundary**: any spec of a render that takes data must
  include a value carrying `<`, `&` and a quote, and assert it arrives
  entity-encoded.

## Shape

- `describe` names the unit, cases name behaviour in plain words — the case
  list should read as the file's contract.
- No logic in a spec: a loop that computes the expectation re-implements the
  subject and passes when both are wrong. Write the expected string.
- A spec file's basename matches its subject's: `menu-preview-section.ts` →
  `menu-preview-section.spec.ts`.
