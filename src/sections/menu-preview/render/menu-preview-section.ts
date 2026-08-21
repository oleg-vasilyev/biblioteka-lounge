import type { ShowcaseGroupId } from "#data/menu-showcase.ts";
import type { Copy } from "#menu-preview/copy.en.ts";
import { formatSnapshotDate } from "#shared/dates/snapshot-date.ts";
import { html, raw, type TrustedHtml } from "#shared/html/html.ts";
import { renderPriceTag } from "#shared/price/price-tag.ts";


export type ShowcaseItem = { name: string; price: number };

export type ShowcaseGroupContent = { id: ShowcaseGroupId; items: ShowcaseItem[] };

export type MenuSnapshot = {
  groups: ShowcaseGroupContent[];
  capturedOn: string;
  sourceUrl: string;
};

const groupHeading = (id: ShowcaseGroupId, copy: Copy): string => {
  switch (id) {
    case "hookah":
      return copy.groupHookah;
    case "kitchen":
      return copy.groupKitchen;
    case "bar":
      return copy.groupBar;
  }
};

const renderItemRow = (item: ShowcaseItem): TrustedHtml =>
  raw(html`<p class="row"><span class="nm">${item.name}</span><span class="dots"></span><span class="pr">${
    renderPriceTag(item.price)
  }</span></p>`);

const renderGroupCard = (group: ShowcaseGroupContent, copy: Copy): TrustedHtml =>
  raw(html`<div class="mcard"><h3>${groupHeading(group.id, copy)}</h3>
${group.items.map(renderItemRow)}</div>`);

export const renderMenuPreviewSection = (copy: Copy, snapshot: MenuSnapshot): string =>
  html`<section class="sec menu">
<div class="wrap">
<p class="label">${copy.label}</p>
<p class="msnap">${copy.snapshotNoteBefore}${formatSnapshotDate(snapshot.capturedOn)}${
    copy.snapshotNoteAfter
  }</p>
<h2 class="title">${copy.title}</h2>
${snapshot.groups.map((group) => renderGroupCard(group, copy))}
<a class="mlink" href="${snapshot.sourceUrl}">${copy.fullMenuLink}</a>
</div>
</section>`;
