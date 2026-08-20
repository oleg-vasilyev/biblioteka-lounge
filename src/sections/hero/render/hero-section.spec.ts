import { describe, expect, it, vi } from "vitest";
import { copyIn } from "#hero/copy.ts";
import { renderHeroSection } from "#hero/render/hero-section.ts";


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

vi.mock("#shared/page/brand-mark.ts", () => ({ hearthMark: () => ({ trusted: "«hearth-mark»" }) }));

vi.mock("#hero/render/hearth-drawing.ts", () => ({
  hearthDrawing: () => ({ trusted: "«hearth-drawing»" }),
}));

const venue = {
  googleRating: "4.8",
  googleReviewCount: 622,
  phoneE164: "+995551766060",
  phoneDisplay: "+995 551 76 60 60",
  telegramBookingUrl: "https://t.me/Biblio_lounge_bot",
  instagramUrl: "https://www.instagram.com/lounge.ge/",
  instagramHandle: "@lounge.ge",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Biblioteka",
};

describe("hero section", () => {
  it("builds the wordmark around the hearth mark, in Latin on every language page", () => {
    for (const locale of ["en", "ka", "ru"] as const) {
      expect(renderHeroSection(copyIn(locale), venue)).toContain(
        '<h1 class="brand-big" lang="[e:en]">[e:BIBLI]«hearth-mark»[e:TEKA]</h1>',
      );
    }
  });

  it("states the street on the first screen, in each language's own spelling", () => {
    expect(renderHeroSection(copyIn("en"), venue)).toContain(
      '<span class="addr">[e:Aleksandre Abasheli St 1, Tbilisi]</span>',
    );
    expect(renderHeroSection(copyIn("ru"), venue)).toContain(
      '<span class="addr">[e:ул. Александра Абашели, 1, Тбилиси]</span>',
    );
    expect(renderHeroSection(copyIn("ka"), venue)).toContain(
      '<span class="addr">[e:ალექსანდრე აბაშელის ქ. 1, თბილისი]</span>',
    );
  });

  it("names the days that own each closing time, so no reading of it is ever false", () => {
    const hours = copyIn("en").hours;

    expect(hours).toContain("Sun–Thu till 02:00");
    expect(hours).toContain("Fri–Sat till 03:00");
    expect(hours).not.toContain("tonight");
    expect(renderHeroSection(copyIn("en"), venue)).toContain(`<span class="hrs">[e:${hours}]</span>`);
  });

  it("assembles the rating from the venue facts, never from a sentence in the copy", () => {
    expect(renderHeroSection(copyIn("en"), venue)).toContain(
      '<span class="rate">[e:4.8]<span class="sym">[e:★ · ]</span>622[e: Google reviews]</span>',
    );
  });

  it("routes the booking link and the phone fallback through the escaper", () => {
    const page = renderHeroSection(copyIn("ru"), {
      ...venue,
      telegramBookingUrl: 'https://t.me/x?a=1&b="2"<3>',
    });

    expect(page).toContain('<a class="btn" href="[e:https://t.me/x?a=1&b="2"<3>]">');
    expect(page).toContain('<a class="linklight" href="tel:[e:+995551766060]">');
    expect(page).toContain("[e:или позвоните: ][e:+995 551 76 60 60]");
  });

  it("closes the first screen with the drawn hearth and the caption that names it", () => {
    const page = renderHeroSection(copyIn("en"), venue);

    expect(page).toContain('<div class="arch">«hearth-drawing»</div>');
    expect(page).toContain(
      "<figcaption>[e:Shelves of paperbacks and the round brick hearth — the same hearth as in the logo above.]</figcaption>",
    );
  });
});
