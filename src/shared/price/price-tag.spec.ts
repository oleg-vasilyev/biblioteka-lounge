import { describe, expect, it, vi } from "vitest";
import { renderPriceTag } from "#shared/price/price-tag.ts";


vi.mock("#shared/html/html.ts", () => ({
  html: (strings: TemplateStringsArray, ...values: unknown[]) =>
    strings.map((part, index) => (index < values.length ? part + values[index] : part)).join(""),
  raw: (trusted: string) => ({ trusted }),
}));

describe("renderPriceTag", () => {
  it("prints the amount and keeps the lari sign on its own font, unbreakably joined", () => {
    expect(renderPriceTag(60)).toEqual({
      trusted: '60&nbsp;<span class="lari">₾</span>',
    });
  });

  it("prints the cheapest and the dearest item the snapshot holds without decoration", () => {
    expect(renderPriceTag(3)).toEqual({ trusted: '3&nbsp;<span class="lari">₾</span>' });
    expect(renderPriceTag(190)).toEqual({ trusted: '190&nbsp;<span class="lari">₾</span>' });
  });
});
