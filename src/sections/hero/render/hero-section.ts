import type { VenueFacts } from "#data/venue.ts";
import type { Copy } from "#hero/copy.en.ts";
import { brandLockup } from "#shared/brand/brand-lockup.ts";
import { html, raw, type TrustedHtml } from "#shared/html/html.ts";


const LATIN = "en";

const renderLogo = (copy: Copy): TrustedHtml =>
  raw(html`<h1 class="brand-big" lang="${LATIN}">${brandLockup(copy.brandName)}</h1>`);

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

export const renderHeroSection = (copy: Copy, venue: VenueFacts): string =>
  html`<section class="hero night">
<div class="wrap">
${renderLogo(copy)}
<p class="tagline">${copy.tagline}</p>
${renderMeta(copy, venue)}
${renderCallToAction(copy, venue)}
</div>
</section>`;
