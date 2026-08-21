import { describe, expect, it, vi } from "vitest";
import { brandLockup } from "#shared/brand/brand-lockup.ts";


vi.mock("#shared/html/html.ts", () => ({
  html: (strings: TemplateStringsArray, ...values: unknown[]) =>
    strings
      .map((part, index) => (index < values.length ? part + `[e:${String(values[index])}]` : part))
      .join(""),
  raw: (trusted: string) => ({ trusted }),
}));

const markup = (name: string): string => (brandLockup(name) as unknown as { trusted: string }).trusted;

describe("brand lockup", () => {
  it("names itself for a screen reader, through the escaper", () => {
    expect(markup('Biblioteka & "Lounge" <ge>')).toContain(
      'role="img" aria-label="[e:Biblioteka & "Lounge" <ge>]"',
    );
  });

  it("hands the three pieces to the stylesheet by name, so nothing hard-codes a colour", () => {
    const svg = markup("Biblioteka Lounge");

    expect(svg).toContain('<circle class="coin"');
    expect(svg).toContain('<path class="emblem"');
    expect(svg).toContain('<path class="letters"');
    expect(svg).not.toContain("#");
  });

  it("fills both paths by the even-odd rule, which is what makes the counters holes", () => {
    expect(markup("Biblioteka Lounge").match(/fill-rule="evenodd"/g)).toHaveLength(2);
  });

  it("stacks the coin under the emblem and the emblem under the letters", () => {
    const svg = markup("Biblioteka Lounge");

    expect(svg.indexOf('class="coin"')).toBeLessThan(svg.indexOf('class="emblem"'));
    expect(svg.indexOf('class="emblem"')).toBeLessThan(svg.indexOf('class="letters"'));
  });

  it("scales from a viewBox rather than a pixel size, and closes the tag", () => {
    const svg = markup("Biblioteka Lounge");

    expect(svg).toContain('viewBox="[e:0 0 1000 279.2]"');
    expect(svg).not.toContain("width=");
    expect(svg.endsWith("</svg>")).toBe(true);
  });
});
