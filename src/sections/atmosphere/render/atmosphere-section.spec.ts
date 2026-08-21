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
      .map((part, index) =>
        index < values.length ? part + mark(values[index]) : part,
      )
      .join(""),
  raw: (trusted: string) => ({ trusted }),
}));

vi.mock("#shared/price/price-tag.ts", () => ({
  renderPriceTag: (amount: number) => ({ trusted: `«price:${amount}»` }),
}));

describe("atmosphere section", () => {
  it("reaches the images from the page's own directory, one step up on a language page", () => {
    expect(renderAtmosphereSection(copyIn("en"), "", 16)).toContain(
      'src="[e:img/mural-readers-1100.jpg]"',
    );
    expect(renderAtmosphereSection(copyIn("ka"), "../", 16)).toContain(
      'src="[e:../img/mural-readers-1100.jpg]"',
    );
  });

  it("declares each photo's own pixel size, so the page never reflows around it", () => {
    const page = renderAtmosphereSection(copyIn("en"), "", 16);

    expect(page).toContain('width="1100" height="643" loading="lazy"');
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

  it("shows the mural as it was photographed, not as a drawing standing in for it", () => {
    const page = renderAtmosphereSection(copyIn("en"), "", 16);

    expect(page).toContain(
      '<div class="mat"><img src="[e:img/mural-readers-1100.jpg]" alt="" width="1100" height="643" loading="lazy"></div>',
    );
    expect(page).not.toContain("<svg");
  });

  it("opens on the hearth, cut to an arch, and keeps every frame below the fold lazy", () => {
    const page = renderAtmosphereSection(copyIn("en"), "", 16);

    expect(page).toContain(
      '<figure class="[e:ph arched]"><div class="mat"><img src="[e:img/hearth-table-800.jpg]"',
    );
    expect(page.indexOf("hearth-table")).toBeLessThan(
      page.indexOf("mural-readers"),
    );
    expect(page.match(/loading="lazy"/g)).toHaveLength(4);
  });

  it("captions the hearth with something the photo cannot show, pointing at nothing else on the page", () => {
    const page = renderAtmosphereSection(copyIn("ru"), "", 16);

    expect(page).toContain(
      "<figcaption>[e:Живой огонь на втором этаже\u00a0\u2014 зимой к нему тянет весь дом.]</figcaption>",
    );
    expect(page).not.toContain("логотип");
  });
});
