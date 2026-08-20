import { defineConfig } from "vitest/config";

// Every artefact a check produces goes under reports/, which is gitignored
// whole. passWithNoTests carries the shell phase, where the suite is empty;
// the first spec makes it inert and it stays only because removing it would
// re-break an empty branch of a future refactor.
export default defineConfig({
  test: {
    include: ["src/**/*.spec.ts"],
    environment: "node",
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "reports/coverage",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.spec.ts", "src/**/*.stub.ts"],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
