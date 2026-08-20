import { readFileSync } from "node:fs";


const LINE_BUDGET = 120;

const countLinesAsAnEditorWould = (content: string): number => {
  const lines = content.split("\n").length;

  return content.endsWith("\n") ? lines - 1 : lines;
};

const checkClaudeMdBudget = (): void => {
  const lineCount = countLinesAsAnEditorWould(readFileSync("CLAUDE.md", "utf8"));

  if (lineCount > LINE_BUDGET) {
    console.error(
      `CLAUDE.md is ${lineCount} lines against a budget of ${LINE_BUDGET} - move a paragraph into the skill it belongs to.`,
    );
    process.exit(1);
  }
};

checkClaudeMdBudget();
