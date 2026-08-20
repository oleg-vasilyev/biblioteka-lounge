import type { VenueFacts } from "#data/venue.ts";
import type { Copy } from "#visit/copy.en.ts";
import { html, raw, type TrustedHtml } from "#shared/html/html.ts";


const renderEntry = (key: string, value: TrustedHtml): TrustedHtml =>
  raw(html`<li><span class="vk">${key}</span>${value}</li>`);

const renderLink = (href: string, label: string): TrustedHtml =>
  raw(html`<a class="linklight" href="${href}">${label}</a>`);

const renderHours = (copy: Copy): TrustedHtml =>
  raw(html`${copy.hoursWeekdays}<br>${copy.hoursWeekend}`);

export const renderVisitSection = (copy: Copy, venue: VenueFacts): string =>
  html`<section class="sec night visit">
<div class="wrap">
<p class="label">${copy.label}</p>
<h2 class="title">${copy.title}</h2>
<ul class="vlist">
${renderEntry(copy.mapKey, renderLink(venue.mapsUrl, copy.mapLink))}
${renderEntry(copy.hoursKey, renderHours(copy))}
${renderEntry(copy.phoneKey, renderLink(`tel:${venue.phoneE164}`, venue.phoneDisplay))}
${renderEntry(copy.instagramKey, renderLink(venue.instagramUrl, venue.instagramHandle))}
</ul>
<div class="cta">
<a class="btn" href="${venue.telegramBookingUrl}">${copy.bookButton}</a>
</div>
</div>
</section>`;
