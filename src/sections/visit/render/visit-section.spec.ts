import { describe, expect, it, vi } from "vitest";
import { copyIn } from "#visit/copy.ts";
import { renderVisitSection } from "#visit/render/visit-section.ts";


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

const venue = {
  googleRating: "4.8",
  googleReviewCount: 622,
  phoneE164: "+995551766060",
  phoneDisplay: "+995 551 76 60 60",
  telegramBookingUrl: "https://t.me/Biblio_lounge_bot",
  instagramUrl: "https://www.instagram.com/lounge.ge/",
  instagramHandle: "@lounge.ge",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Biblioteka%20Lounge",
};

describe("visit section", () => {
  it("points the map at a documented Google Maps search, escaped as one query", () => {
    expect(renderVisitSection(copyIn("en"), venue)).toContain(
      '<a class="linklight" href="[e:https://www.google.com/maps/search/?api=1&query=Biblioteka%20Lounge]">[e:Open in Google Maps]</a>',
    );
  });

  it("gives both opening regimes their own line, so neither claims the other's days", () => {
    expect(renderVisitSection(copyIn("en"), venue)).toContain(
      "[e:Sun–Thu — 14:00–02:00]<br>[e:Fri–Sat — 14:00–03:00]",
    );
  });

  it("dials the machine-readable number while showing the readable one", () => {
    expect(renderVisitSection(copyIn("ru"), venue)).toContain(
      '<a class="linklight" href="[e:tel:+995551766060]">[e:+995 551 76 60 60]</a>',
    );
  });

  it("labels every row in the language of the page it sits on", () => {
    const georgian = renderVisitSection(copyIn("ka"), venue);

    expect(georgian).toContain('<span class="vk">[e:რუკა]</span>');
    expect(georgian).toContain('<span class="vk">[e:სამუშაო საათები]</span>');
    expect(georgian).toContain('<span class="vk">[e:ტელეფონი]</span>');
  });

  it("repeats the booking call to action at the foot of the page", () => {
    expect(renderVisitSection(copyIn("ru"), venue)).toContain(
      '<a class="btn" href="[e:https://t.me/Biblio_lounge_bot]">[e:Забронировать стол — Telegram]</a>',
    );
  });
});
