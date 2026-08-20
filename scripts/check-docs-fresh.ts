import { execSync } from "node:child_process";


const git = (command: string): string => execSync(command, { encoding: "utf8" }).trim();

const findStaleness = (): string => {
  const driftedFromIndex = git("git diff --name-only -- docs");
  const unknownToGit = git("git ls-files --others --exclude-standard docs");

  return [driftedFromIndex, unknownToGit].filter((found) => found !== "").join("\n");
};

const checkDocsFresh = (): void => {
  const staleness = findStaleness();

  if (staleness !== "") {
    console.error(`docs/ does not match a fresh build - stage the rebuilt output:\n${staleness}`);
    process.exit(1);
  }
};

checkDocsFresh();
