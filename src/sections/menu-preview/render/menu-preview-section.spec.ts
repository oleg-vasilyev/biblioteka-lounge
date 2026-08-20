import { describe, expect, it, vi } from "vitest";
import { copyIn } from "#menu-preview/copy.ts";
import {
  renderMenuPreviewSection,
  type MenuSnapshot,
} from "#menu-preview/render/menu-preview-section.ts";


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

vi.mock("#shared/dates/snapshot-date.ts", () => ({
  formatSnapshotDate: (iso: string) => `«date:${iso}»`,
}));

vi.mock("#shared/price/price-tag.ts", () => ({
  renderPriceTag: (amount: number) => ({ trusted: `«price:${amount}»` }),
}));

vi.mock("#menu-preview/render/foreign-script.ts", () => ({
  usesForeignScript: (name: string) => name.startsWith("!"),
}));

const snapshot: MenuSnapshot = {
  groups: [
    { id: "hookah", items: [{ name: "Classic Hookah", price: 60 }] },
    { id: "kitchen", items: [{ name: "Borsch", price: 16 }] },
    { id: "bar", items: [{ name: 'Tea "Biblioteka"', price: 21 }] },
  ],
  capturedOn: "2026-08-20",
  sourceUrl: "https://lounge-biblioteka.eat-me.online",
};

describe("menu preview section", () => {
  it("heads each card with the group name from the copy table, in scroll order", () => {
    const page = renderMenuPreviewSection("en", copyIn("en"), snapshot);

    expect(page.indexOf("[e:Hookah]")).toBeLessThan(page.indexOf("[e:The Belarusian kitchen]"));
    expect(page.indexOf("[e:The Belarusian kitchen]")).toBeLessThan(page.indexOf("[e:The bar]"));
  });

  it("prints the price through the price tag, never as a number in the sentence", () => {
    expect(renderMenuPreviewSection("en", copyIn("en"), snapshot)).toContain(
      '<span class="pr">«price:60»</span>',
    );
  });

  it("dates the snapshot from the data, wrapped in each language's own sentence", () => {
    expect(renderMenuPreviewSection("ru", copyIn("ru"), snapshot)).toContain(
      '<p class="msnap">[e:Снимок от ][e:«date:2026-08-20»][e:\u00a0— цены в лари]</p>',
    );
    expect(renderMenuPreviewSection("en", copyIn("en"), snapshot)).toContain(
      '<p class="msnap">[e:Snapshot of ][e:«date:2026-08-20»][e:\u00a0— prices in lari]</p>',
    );
  });

  it("marks a name written in a script this page does not load, and leaves the rest alone", () => {
    const page = renderMenuPreviewSection("en", copyIn("en"), {
      ...snapshot,
      groups: [
        {
          id: "hookah",
          items: [
            { name: "!Кальян дабл ананас", price: 190 },
            { name: "Classic Hookah", price: 60 },
          ],
        },
      ],
    });

    expect(page).toContain('<span class="[e:nm nm-x]">[e:!Кальян дабл ананас]</span>');
    expect(page).toContain('<span class="[e:nm]">[e:Classic Hookah]</span>');
  });

  it("routes a dish name carrying markup characters through the escaper", () => {
    const page = renderMenuPreviewSection("en", copyIn("en"), {
      ...snapshot,
      groups: [{ id: "bar", items: [{ name: 'Gin & "Tonic" <house>', price: 16 }] }],
    });

    expect(page).toContain('<span class="[e:nm]">[e:Gin & "Tonic" <house>]</span>');
  });

  it("survives a group the venue emptied, without printing a headless card", () => {
    const page = renderMenuPreviewSection("en", copyIn("en"), {
      ...snapshot,
      groups: [{ id: "kitchen", items: [] }],
    });

    expect(page).toContain('<div class="mcard"><h3>[e:The Belarusian kitchen]</h3>\n</div>');
    expect(page).not.toContain('class="row"');
  });

  it("links the live menu at the address the snapshot was taken from", () => {
    expect(renderMenuPreviewSection("ka", copyIn("ka"), snapshot)).toContain(
      '<a class="mlink" href="[e:https://lounge-biblioteka.eat-me.online]">[e:სრული მენიუ მიმდინარე ფასებით →]</a>',
    );
  });
});
