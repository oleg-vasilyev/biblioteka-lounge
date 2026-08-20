import { html, raw, type TrustedHtml } from "#shared/html/html.ts";


export const renderPriceTag = (amountInLari: number): TrustedHtml =>
  raw(html`${amountInLari}&nbsp;<span class="lari">₾</span>`);
