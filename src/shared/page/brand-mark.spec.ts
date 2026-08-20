import { describe, expect, it, vi } from "vitest";
import { hearthMark } from "#shared/page/brand-mark.ts";


vi.mock("#shared/html/html.ts", () => ({ raw: (trusted: string) => ({ trusted }) }));

describe("hearthMark", () => {
  it("hands back trusted markup, so the wordmark is never entity-encoded into text", () => {
    expect(hearthMark()).toHaveProperty("trusted");
  });

  it("draws the brick ring in the text colour and the flame in ember", () => {
    const { trusted } = hearthMark() as unknown as { trusted: string };

    expect(trusted).toContain('stroke="currentColor"');
    expect(trusted).toContain('fill="#C75B54"');
    expect(trusted).toContain('class="oh"');
  });

  it("hides itself from a screen reader, which reads the wordmark's letters instead", () => {
    const { trusted } = hearthMark() as unknown as { trusted: string };

    expect(trusted).toContain('aria-hidden="true"');
  });
});
