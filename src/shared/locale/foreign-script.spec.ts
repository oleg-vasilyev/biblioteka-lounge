import { describe, expect, it } from "vitest";
import { usesForeignScript } from "#shared/locale/foreign-script.ts";


describe("usesForeignScript", () => {
  it("flags the dish the venue only ever wrote in Russian, on the pages that never load Cyrillic", () => {
    expect(usesForeignScript("Кальян дабл ананас", "en")).toBe(true);
    expect(usesForeignScript("Кальян дабл ананас", "ka")).toBe(true);
    expect(usesForeignScript("Кальян дабл ананас", "ru")).toBe(false);
  });

  it("leaves a Latin name alone everywhere, because every page loads Latin", () => {
    expect(usesForeignScript("Gin&Tonic", "en")).toBe(false);
    expect(usesForeignScript("Gin&Tonic", "ka")).toBe(false);
    expect(usesForeignScript("Gin&Tonic", "ru")).toBe(false);
  });

  it("flags a Georgian name only where the Georgian face was not requested", () => {
    expect(usesForeignScript("კლასიკური ჩილიმი", "ka")).toBe(false);
    expect(usesForeignScript("კლასიკური ჩილიმი", "en")).toBe(true);
    expect(usesForeignScript("კლასიკური ჩილიმი", "ru")).toBe(true);
  });

  it("reads the script from the name, not from a stray digit or punctuation mark", () => {
    expect(usesForeignScript("150ml, La tordera — X-Dry", "en")).toBe(false);
    expect(usesForeignScript("Holodnikცივი", "ru")).toBe(true);
  });
});
