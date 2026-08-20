import { describe, expect, it } from "vitest";
import { fontsHref, serifStack } from "#shared/page/webfonts.ts";


describe("webfonts", () => {
  it("asks Google for the Georgian face only on the page whose copy is Georgian", () => {
    expect(fontsHref("ka")).toContain("Noto+Serif+Georgian");
    expect(fontsHref("en")).not.toContain("Noto+Serif+Georgian");
    expect(fontsHref("ru")).not.toContain("Noto+Serif+Georgian");
  });

  it("asks for two weights and no italic axis, on every page", () => {
    for (const href of [fontsHref("en"), fontsHref("ka"), fontsHref("ru")]) {
      expect(href).toContain("Literata:wght@400;600");
      expect(href).not.toContain("ital");
    }
  });

  it("puts the Georgian face in the stack only where it was requested", () => {
    expect(serifStack("ka")).toBe('Literata,"Noto Serif Georgian",Georgia,serif');
    expect(serifStack("en")).toBe("Literata,Georgia,serif");
    expect(serifStack("ru")).toBe("Literata,Georgia,serif");
  });
});
