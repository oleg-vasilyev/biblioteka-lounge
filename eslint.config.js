import unusedImports from "eslint-plugin-unused-imports";
import tsParser from "@typescript-eslint/parser";

// Lint rules that enforce the conventions in CLAUDE.md, so that a convention is
// a build error rather than something a reviewer has to remember. The inline
// rules are carried over from the FoolProof project, where each earned its
// place; the zones are this project's own layering.

const project = {
  rules: {
    // "No comments in src/ or scripts/" — naming carries the intent, and an
    // explanation that does not fit in a name belongs in PLAN.md.
    "no-comments": {
      meta: {
        type: "problem",
        schema: [],
        messages: {
          found: "No comments in src/ or scripts/ — say it in a name, or in PLAN.md.",
        },
      },
      create(context) {
        return {
          Program() {
            for (const comment of context.sourceCode.getAllComments()) {
              context.report({ loc: comment.loc, messageId: "found" });
            }
          },
        };
      },
    },
    // A number must be *named*: it may appear in a `const NAME = …` initializer
    // and nowhere else. 0 and 1 are exempt — an index or a length is not magic.
    "named-numbers": {
      meta: {
        type: "problem",
        schema: [],
        messages: {
          unnamed: "Name this number with a const — the intent has to fit in the name.",
        },
      },
      create(context) {
        const ALWAYS_CLEAR = new Set([0, 1]);

        const namesTheNumber = (node) => {
          for (let current = node.parent; current; current = current.parent) {
            switch (current.type) {
              case "VariableDeclarator":
                return current.parent.kind === "const";

              case "ArrowFunctionExpression":
              case "FunctionDeclaration":
              case "FunctionExpression":
                return false;

              default:
                break;
            }
          }

          return false;
        };

        return {
          Literal(node) {
            if (typeof node.value !== "number") {
              return;
            }

            const negated =
              node.parent.type === "UnaryExpression" && node.parent.operator === "-";
            const value = negated ? -node.value : node.value;

            if (ALWAYS_CLEAR.has(value) || namesTheNumber(node)) {
              return;
            }

            context.report({ node: negated ? node.parent : node, messageId: "unnamed" });
          },
        };
      },
    },
    // Every import belongs in the header — imports are hoisted, so one that
    // lands lower down still runs and no spacing rule can see it.
    "imports-first": {
      meta: {
        type: "problem",
        schema: [],
        messages: {
          late: "An import belongs in the header, above the first statement.",
        },
      },
      create(context) {
        return {
          Program(program) {
            const firstStatement = program.body.findIndex(
              (statement) => statement.type !== "ImportDeclaration"
            );

            if (firstStatement < 0) {
              return;
            }

            for (const statement of program.body.slice(firstStatement)) {
              if (statement.type === "ImportDeclaration") {
                context.report({ node: statement, messageId: "late" });
              }
            }
          },
        };
      },
    },
    // Exactly two blank lines after the last import, so the imports read as a
    // header rather than as the first statements.
    "blank-lines-after-imports": {
      meta: {
        type: "layout",
        fixable: "whitespace",
        schema: [],
        messages: {
          spacing: "Leave exactly two blank lines after the last import.",
        },
      },
      create(context) {
        const REQUIRED_BLANK_LINES = 2;

        return {
          Program(program) {
            const lastImportIndex = program.body.findLastIndex(
              (statement) => statement.type === "ImportDeclaration"
            );
            const lastImport = program.body[lastImportIndex];
            const firstStatement = program.body[lastImportIndex + 1];

            if (lastImport === undefined || firstStatement === undefined) {
              return;
            }

            const blankLines = firstStatement.loc.start.line - lastImport.loc.end.line - 1;

            if (blankLines !== REQUIRED_BLANK_LINES) {
              context.report({
                loc: lastImport.loc,
                messageId: "spacing",
                fix: (fixer) =>
                  fixer.replaceTextRange(
                    [lastImport.range[1], firstStatement.range[0]],
                    "\n".repeat(REQUIRED_BLANK_LINES + 1)
                  ),
              });
            }
          },
        };
      },
    },
  },
};

// The layering rules from CLAUDE.md, expressed as import bans. Zones must not
// overlap: a later flat-config block REPLACES an earlier one for a file both
// match, so each file falls in exactly one zone. A ban starting with `#` is a
// Node subpath alias, which minimatch reads as a comment — so aliases become
// regex patterns instead. Both traps inherited from FoolProof, where each was
// found by running a deliberate violation. A new zone here is not finished
// until a deliberate violation has been shown to fail the lint.
const forbid = (bans, message) => {
  const globs = bans.filter((ban) => !ban.startsWith("#"));
  const aliases = bans.filter((ban) => ban.startsWith("#"));

  return {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          ...(globs.length > 0 ? [{ group: globs, message }] : []),
          ...aliases.map((alias) => ({ regex: `^${alias.replace("**", "")}`, message })),
        ],
      },
    ],
  };
};

const IMPURE = ["node:*"];

// Every section folder under src/sections/. The add-a-section skill appends
// here and to package.json's imports in the same change.
const SECTIONS = [];

const otherSections = (self) =>
  SECTIONS.filter((name) => name !== self).flatMap((name) => [
    `#${name}/**`,
    `**/${name}/**`,
    `**/sections/${name}/**`,
  ]);

const independence = (self) =>
  `A section is independent — ${self}/ may not reach into another section.`;

const sectionZones = (self) => [
  {
    files: [`src/sections/${self}/render/**/*.ts`],
    rules: forbid(
      [...otherSections(self), ...IMPURE],
      `render/ turns data and copy into HTML strings — pure, no I/O. ${independence(self)}`
    ),
  },
  {
    files: [`src/sections/${self}/*.ts`],
    rules: forbid([...otherSections(self), ...IMPURE], independence(self)),
  },
];

export default [
  {
    ignores: ["node_modules/**", "data/**", "docs/**", "reports/**"],
  },
  {
    files: ["src/**/*.ts", "scripts/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "unused-imports": unusedImports,
      project,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "none" },
      ],
      curly: ["error", "all"],
      "prefer-const": "error",
      "no-var": "error",
      "project/no-comments": "error",
      "project/imports-first": "error",
      "project/blank-lines-after-imports": "error",
    },
  },
  {
    // src/ is pure — the console and the filesystem belong to scripts/, which
    // this block does not cover.
    files: ["src/**/*.ts"],
    ignores: ["src/**/*.spec.ts", "src/**/*.stub.ts"],
    rules: {
      "no-console": "error",
      "project/named-numbers": "error",
    },
  },
  {
    files: ["src/shared/**/*.ts"],
    rules: forbid(
      ["**/sections/**", ...IMPURE],
      "shared/ is the bottom layer — a section may import it, never the reverse; and it is pure."
    ),
  },
  ...SECTIONS.flatMap(sectionZones),
];
