# How a change becomes a deploy

The site is developed by an AI agent — Claude Code, driven by the skills in
[`.claude/skills/`](.claude/skills/). This drawing is the map, not the
authority: each stage's rules live in the skill it names, and on any
disagreement the skill wins, then the drawing is fixed. A lesson from the
retrospective that changes a default redraws the step it touches in the same
commit, and the redraw is reported in the closing message with the numbers
that forced it — never made quietly. The colours are pinned so the forced dark
text stays readable in both of GitHub's themes.

Adapted from the FoolProof project's flow; what was dropped and why is at the
bottom, so a stage that returns can return deliberately.

```mermaid
%%{init: {"theme": "base", "themeVariables": {
  "textColor": "#111111",
  "signalTextColor": "#111111",
  "signalColor": "#334155",
  "actorTextColor": "#111111",
  "actorBkg": "#e0f2fe",
  "actorBorder": "#0369a1",
  "actorLineColor": "#94a3b8",
  "noteTextColor": "#111111",
  "noteBkgColor": "#fef3c7",
  "noteBorderColor": "#b45309",
  "labelTextColor": "#111111",
  "loopTextColor": "#111111",
  "labelBoxBkgColor": "#f1f5f9",
  "labelBoxBorderColor": "#334155",
  "sequenceNumberColor": "#ffffff"
}}}%%
sequenceDiagram
    autonumber
    actor U as Owner of the pitch
    participant C as Claude Code, the AI developer
    participant P as page-designer, the design agent
    participant V as design-reviewer, fresh eyes on every sheet
    participant D as Claude Design, the canvas
    participant K as Project skills, .claude/skills
    participant H as Auto-linter, fires on its own
    participant R as phase-reviewer, a second AI agent
    participant G as GitHub — repository, Pages

    rect rgb(254, 249, 231)
    note over U,K: Stage 1. Framing
    U->>C: the change, in the owner's own words
    C->>C: CLAUDE.md is in context — PLAN.md and TECH-DEBT.md are one link away
    C->>C: a task that trips a debt entry's trigger takes that entry into scope
    opt the description leaves questions
        C->>U: every question at once, before any work
        U-->>C: answers
    end
    C->>U: the size of the phase in one line
    U-->>C: agreed, or cut it down
    opt the change affects what a visitor sees
        C->>P: the page-designer agent — the requirements, in words
        P->>D: read the design canvas, once the identity phase has created it
        P->>P: name the cases the design must survive, then draw every one, then look
        P-->>C: the contact sheet, the committed cases, the decisions with numbers
        C->>V: the sheet and panels, paths only — the designer's note withheld
        V-->>C: the measured checklist and findings, most severe first
        loop while findings remain
            C->>P: the findings, verbatim
            P-->>C: the sheet redrawn, every fix carrying its measurement
        end
        C->>U: the contact sheet for approval — everything to compare, in one view
        U-->>C: approved, or changes
    end
    C->>K: add-a-section and write-a-spec, before the first file
    K-->>C: the folder shape, the copy rules, the spec standard
    C->>C: freeze the signatures that cross a layer, in one short note
    end

    rect rgb(245, 245, 245)
    note over C,H: Stage 2. Writing the code and the tests
    loop one file at a time
        C->>C: write the file
        H--)C: lint findings for exactly that file, at the save
        C->>C: fix now, then write the spec against stubs
    end
    end

    rect rgb(240, 253, 244)
    note over C,H: Stage 3. Gates
    loop while any gate is red — fix, re-run only the one that fell
        C->>C: npm run check — lint, types, the suite under coverage
        C->>C: rebuild docs/ and prove it fresh (from the build phase on)
    end
    end

    rect rgb(240, 249, 255)
    note over C,R: Stage 4. Review
    C->>R: the phase's whole diff, paths only — no purposes retold
    R-->>C: promises checked, then findings, most severe first
    loop for each finding
        alt worth fixing now
            C->>C: fix, re-run the affected gate
        else not now
            C->>C: TECH-DEBT.md, with the trigger that would make it worth doing
        end
    end
    end

    rect rgb(255, 247, 237)
    note over C,U: Stage 5. The look
    opt the phase changed anything a visitor sees
        C->>C: open the built pages at phone and desktop width, all three languages
        C->>C: specific claims, not a verdict — name what was seen on each
        C->>U: a screenshot of anything that is taste rather than defect
        U-->>C: decided
        C->>D: push what actually shipped back onto the canvas, so it never lies
    end
    end

    rect rgb(253, 242, 248)
    note over C,K: Stage 6. Retrospective and documents
    C->>K: the retrospective questions from finish-phase
    C->>C: count the rework and the repeated runs, land each lesson as a rule
    C->>K: write-a-doc — every fact one home, CLAUDE.md under its budget
    C->>C: update README, PLAN, TECH-DEBT — whatever the phase owes
    end

    rect rgb(237, 233, 254)
    note over C,G: Stage 7. Deploy
    C->>K: write-a-commit
    K-->>C: prose title and body, the Gates paragraph
    C->>G: commit and push to main
    G->>G: GitHub Pages serves docs/ — the push was the deploy
    C->>U: what is now live, in one message
    end
```

## What the reference flow has that this one deliberately does not

- **Mutation and e2e gates, and the release tag with its pre-push battery** —
  a static demo deploys from `main` on every push; versioning the site would
  version nothing a visitor can name. [TECH-DEBT.md](TECH-DEBT.md) holds the
  triggers that would bring the missing gates back.
- **CI** — the local gates are the gate, as the reference's server deploy also
  trusts the local hook first. CI returns when the repository goes public on
  GitHub, in the launch phase.
