import { describe, expect, it, vi } from "vitest";
import { muralDrawing } from "#atmosphere/render/mural-drawing.ts";


vi.mock("#shared/html/html.ts", () => ({ raw: (trusted: string) => ({ trusted }) }));

const drawing = (): string => (muralDrawing() as unknown as { trusted: string }).trusted;

describe("muralDrawing", () => {
  it("draws in oxblood on paper, the ink the light sections use", () => {
    expect(drawing()).toContain('stroke="#8F2430"');
  });

  it("holds the two readers and the hookah the caption names between them", () => {
    expect(drawing().match(/<circle /g)?.length).toBe(3);
  });

  it("scales to whatever column it lands in, rather than to a fixed pixel width", () => {
    expect(drawing()).toContain('viewBox="0 0 320 200"');
    expect(drawing()).not.toContain('width="320"');
  });

  it("stays out of the accessibility tree, because the caption says what it shows", () => {
    expect(drawing()).toContain('aria-hidden="true"');
  });
});
