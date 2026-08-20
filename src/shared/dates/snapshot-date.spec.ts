import { describe, expect, it } from "vitest";
import { formatSnapshotDate } from "#shared/dates/snapshot-date.ts";


describe("formatSnapshotDate", () => {
  it("turns the stored ISO date into the day-first form the page prints", () => {
    expect(formatSnapshotDate("2026-08-20")).toBe("20.08.2026");
  });

  it("keeps the zero padding the source wrote, so the width never jumps", () => {
    expect(formatSnapshotDate("2026-01-05")).toBe("05.01.2026");
  });

  it("refuses a date that is not ISO, rather than printing a half-formed one", () => {
    expect(() => formatSnapshotDate("20.08.2026")).toThrow("20.08.2026");
    expect(() => formatSnapshotDate("2026-08")).toThrow("2026-08");
  });
});
