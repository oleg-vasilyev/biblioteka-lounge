import type { ShowcaseGroupId } from "#data/menu-showcase.ts";
import type { Copy } from "#menu-preview/copy.en.ts";
import { usesForeignScript } from "#menu-preview/render/foreign-script.ts";
import { formatSnapshotDate } from "#shared/dates/snapshot-date.ts";
import { html, raw, type TrustedHtml } from "#shared/html/html.ts";
import type { Locale } from "#shared/locale/locales.ts";
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

const renderItemRow = (item: ShowcaseItem, locale: Locale): TrustedHtml =>
  raw(html`<p class="row"><span class="${
    usesForeignScript(item.name, locale) ? "nm nm-x" : "nm"
  }">${item.name}</span><span class="dots"></span><span class="pr">${
    renderPriceTag(item.price)
  }</span></p>`);

const renderGroupCard = (
  group: ShowcaseGroupContent,
  copy: Copy,
  locale: Locale,
): TrustedHtml =>
  raw(html`<div class="mcard"><h3>${groupHeading(group.id, copy)}</h3>
${group.items.map((item) => renderItemRow(item, locale))}</div>`);

export const renderMenuPreviewSection = (
  locale: Locale,
  copy: Copy,
  snapshot: MenuSnapshot,
): string =>
  html`<section class="sec menu">
<div class="wrap">
<p class="label">${copy.label}</p>
<p class="msnap">${copy.snapshotNoteBefore}${formatSnapshotDate(snapshot.capturedOn)}${
    copy.snapshotNoteAfter
  }</p>
<h2 class="title">${copy.title}</h2>
${snapshot.groups.map((group) => renderGroupCard(group, copy, locale))}
<p class="mnote">${copy.note}</p>
<a class="mlink" href="${snapshot.sourceUrl}">${copy.fullMenuLink}</a>
</div>
</section>`;
