import { describe, expect, it, vi } from "vitest";
import { copyIn } from "#atmosphere/copy.ts";
import { renderAtmosphereSection } from "#atmosphere/render/atmosphere-section.ts";


const mark = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.map(mark).join("");
  }
  if (typeof value === "string") {
    return `[e:${value}]`;
  }
  if (typeof value === "number") {
    return String(value);
  }

  return (value as { trusted: string }).trusted;
};

vi.mock("#shared/html/html.ts", () => ({
  html: (strings: TemplateStringsArray, ...values: unknown[]) =>
    strings
      .map((part, index) => (index < values.length ? part + mark(values[index]) : part))
      .join(""),
  raw: (trusted: string) => ({ trusted }),
}));

vi.mock("#atmosphere/render/mural-drawing.ts", () => ({
  muralDrawing: () => ({ trusted: "«mural-drawing»" }),
}));

vi.mock("#shared/price/price-tag.ts", () => ({
  renderPriceTag: (amount: number) => ({ trusted: `«price:${amount}»` }),
}));

describe("atmosphere section", () => {
  it("reaches the images from the page's own directory, one step up on a language page", () => {
    expect(renderAtmosphereSection(copyIn("en"), "", 16)).toContain(
      'src="[e:img/fireplace-hearth-wide-900.jpg]"',
    );
    expect(renderAtmosphereSection(copyIn("ka"), "../", 16)).toContain(
      'src="[e:../img/fireplace-hearth-wide-900.jpg]"',
    );
  });

  it("declares each photo's own pixel size, so the page never reflows around it", () => {
    const page = renderAtmosphereSection(copyIn("en"), "", 16);

    expect(page).toContain('width="900" height="525" loading="lazy"');
    expect(page).toContain('width="800" height="800" loading="lazy"');
  });

  it("takes the borscht price from the snapshot rather than from the sentence", () => {
    const page = renderAtmosphereSection(copyIn("en"), "", 16);

    expect(page).toContain("«price:16»");
    expect(page).not.toContain("[e:16]");
  });

  it("wraps the same sentence around the price in every language", () => {
    expect(renderAtmosphereSection(copyIn("ru"), "", 16)).toContain(
      `[e:${copyIn("ru").borschtCaptionBefore}]«price:16»[e:${copyIn("ru").borschtCaptionAfter}]`,
    );
    expect(renderAtmosphereSection(copyIn("ka"), "../", 16)).toContain(
      `[e:${copyIn("ka").borschtCaptionBefore}]«price:16»[e:${copyIn("ka").borschtCaptionAfter}]`,
    );
  });

  it("draws the mural rather than showing the soft photograph it replaced", () => {
    const page = renderAtmosphereSection(copyIn("en"), "", 16);

    expect(page).toContain('<div class="mat">«mural-drawing»</div>');
    expect(page).not.toContain("mural-readers");
  });
});
