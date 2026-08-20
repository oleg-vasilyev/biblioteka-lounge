import type { Copy } from "#atmosphere/copy.en.ts";
import { muralDrawing } from "#atmosphere/render/mural-drawing.ts";
import { html, raw, type TrustedHtml } from "#shared/html/html.ts";
import { renderPriceTag } from "#shared/price/price-tag.ts";


type Photo = { file: string; width: number; height: number };

const HEARTH_PHOTO: Photo = { file: "fireplace-hearth-wide-900.jpg", width: 900, height: 525 };
const BORSCHT_PHOTO: Photo = { file: "borscht-croutons-800.jpg", width: 800, height: 800 };
const GAMES_PHOTO: Photo = { file: "games-shelf-800.jpg", width: 800, height: 800 };

const IMAGE_DIRECTORY = "img/";

const renderPhoto = (photo: Photo, assetPrefix: string): TrustedHtml =>
  raw(html`<img src="${assetPrefix + IMAGE_DIRECTORY + photo.file}" alt="" width="${
    photo.width
  }" height="${photo.height}" loading="lazy">`);

const renderFigure = (subject: TrustedHtml, caption: TrustedHtml): TrustedHtml =>
  raw(html`<figure class="ph"><div class="mat">${subject}</div>
<figcaption>${caption}</figcaption></figure>`);

const renderBorschtCaption = (copy: Copy, borschtPrice: number): TrustedHtml =>
  raw(html`${copy.borschtCaptionBefore}${renderPriceTag(borschtPrice)}${copy.borschtCaptionAfter}`);

export const renderAtmosphereSection = (
  copy: Copy,
  assetPrefix: string,
  borschtPrice: number,
): string =>
  html`<section class="sec">
<div class="wrap">
<p class="label">${copy.label}</p>
<h2 class="title">${copy.title}</h2>
${renderFigure(renderPhoto(HEARTH_PHOTO, assetPrefix), raw(html`${copy.hearthPhotoCaption}`))}
<div class="grid2">
${renderFigure(renderPhoto(BORSCHT_PHOTO, assetPrefix), renderBorschtCaption(copy, borschtPrice))}
${renderFigure(renderPhoto(GAMES_PHOTO, assetPrefix), raw(html`${copy.gamesCaption}`))}
</div>
${renderFigure(muralDrawing(), raw(html`${copy.muralCaption}`))}
</div>
</section>`;
