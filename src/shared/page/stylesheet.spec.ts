import { describe, expect, it, vi } from "vitest";
import { stylesheetFor } from "#shared/page/stylesheet.ts";


vi.mock("#shared/page/webfonts.ts", () => ({ serifStack: (locale: string) => `stack-${locale}` }));

describe("stylesheetFor", () => {
  it("declares the locale's own serif stack as the page's type", () => {
    expect(stylesheetFor("ka")).toContain("--serif:stack-ka;");
    expect(stylesheetFor("en")).toContain("--serif:stack-en;");
  });

  it("keeps the lari sign and the switcher labels off the webfont", () => {
    const css = stylesheetFor("en");

    expect(css).toContain("--serif-sys:Georgia,serif");
    expect(css).toContain(".lari{font-family:var(--serif-sys)}");
    expect(css).toContain("font-family:var(--serif-sys)}\n.switch a[aria-current]");
  });

  it("holds every touch target at the floor the review measured", () => {
    const css = stylesheetFor("en");

    expect(css).toContain("min-width:44px;min-height:44px");
    expect(css).toContain("min-height:52px");
  });

  it("narrows the Georgian title below 360px, after the rule it has to beat", () => {
    const css = stylesheetFor("ka");

    expect(css.indexOf(":lang(ka) .title{font-size:22px}")).toBeLessThan(
      css.indexOf("@media(max-width:359px)"),
    );
    expect(css).toContain(":lang(ka) .title{font-size:19px}");
  });
});
