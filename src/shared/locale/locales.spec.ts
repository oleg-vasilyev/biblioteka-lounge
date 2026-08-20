import { describe, expect, it } from "vitest";
import { LOCALES } from "#shared/locale/locales.ts";


describe("locales", () => {
  it("serves the three languages PLAN.md names, default first", () => {
    expect(LOCALES).toEqual(["en", "ka", "ru"]);
  });
});
