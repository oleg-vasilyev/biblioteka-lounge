import type { VenueFacts } from "#data/venue.ts";
import { hearthDrawing } from "#hero/render/hearth-drawing.ts";
import type { Copy } from "#hero/copy.en.ts";
import { html, raw, type TrustedHtml } from "#shared/html/html.ts";
import { hearthMark } from "#shared/page/brand-mark.ts";


const LATIN = "en";

const renderWordmark = (copy: Copy): TrustedHtml =>
  raw(html`<h1 class="brand-big" lang="${LATIN}">${copy.wordmarkBeforeMark}${hearthMark()}${
    copy.wordmarkAfterMark
  }</h1>
<div class="lounge" lang="${LATIN}">${copy.loungeWord}</div>`);

const renderMeta = (copy: Copy, venue: VenueFacts): TrustedHtml =>
  raw(html`<p class="meta"><span class="addr">${copy.address}</span><span class="hrs">${
    copy.hours
  }</span><span class="rate">${venue.googleRating}<span class="sym">${copy.ratingSuffix}</span>${
    venue.googleReviewCount
  }${copy.reviewsWord}</span></p>`);

const renderCallToAction = (copy: Copy, venue: VenueFacts): TrustedHtml =>
  raw(html`<div class="cta">
<a class="btn" href="${venue.telegramBookingUrl}">${copy.bookButton}</a>
<a class="linklight" href="tel:${venue.phoneE164}">${copy.callPrefix}${venue.phoneDisplay}</a>
</div>`);

const renderHearthFigure = (copy: Copy): TrustedHtml =>
  raw(html`<figure class="arch-fig"><div class="arch">${hearthDrawing()}</div>
<figcaption>${copy.hearthCaption}</figcaption></figure>`);

export const renderHeroSection = (copy: Copy, venue: VenueFacts): string =>
  html`<section class="hero night">
<div class="wrap">
${renderWordmark(copy)}
<p class="tagline">${copy.tagline}</p>
${renderMeta(copy, venue)}
${renderCallToAction(copy, venue)}
${renderHearthFigure(copy)}
</div>
</section>`;
