import { describe, expect, it, vi } from "vitest";
import { hearthDrawing } from "#hero/render/hearth-drawing.ts";


vi.mock("#shared/html/html.ts", () => ({ raw: (trusted: string) => ({ trusted }) }));

const drawing = (): string => (hearthDrawing() as unknown as { trusted: string }).trusted;

describe("hearthDrawing", () => {
  it("carries a shelf of book spines above the hearth, as the caption names", () => {
    expect(drawing()).toContain('<line x1="22" y1="50" x2="298" y2="50"/>');
    expect(drawing().match(/<rect /g)?.length).toBe(15);
  });

  it("draws the brick ring as its own circle, not as the wordmark's dashed mark", () => {
    expect(drawing()).toContain('<circle cx="160" cy="210" r="92"/>');
    expect(drawing()).not.toContain("stroke-dasharray");
  });

  it("burns in ember, the one warm colour the palette allows on the dark ground", () => {
    expect(drawing()).toContain('stroke="#C75B54"');
    expect(drawing()).toContain('fill="#C75B54"');
  });

  it("stays out of the accessibility tree, because the caption says what it shows", () => {
    expect(drawing()).toContain('aria-hidden="true"');
  });
});
