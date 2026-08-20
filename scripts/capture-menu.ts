import { writeFileSync } from "node:fs";
import {
  splitMultilingualName,
  type LocalizedName,
} from "#shared/locale/multilingual-name.ts";


const MENU_API_URL = "https://lounge-biblioteka.eat-me.online/api/v1/menu?language=en";
const MENU_SOURCE_URL = "https://lounge-biblioteka.eat-me.online";
const VENUE_STORE_ID = 18932;
const OUTPUT_FILE = "data/menu.ts";
const ISO_DATE_LENGTH = 10;

type SourcePrice = { price: number; storeId: number };
type SourceSize = { prices: SourcePrice[]; isDefault: boolean };
type SourceItem = { name: string; itemSizes: SourceSize[] };
type SourceCategory = { name: string; items: SourceItem[] };
type SourceMenu = { result: { itemCategories: SourceCategory[] } };

type MenuItem = { name: LocalizedName; price: number };
type MenuCategory = { name: LocalizedName; items: MenuItem[] };

const priceAtTheVenue = (item: SourceItem): number => {
  const size = item.itemSizes.find((candidate) => candidate.isDefault) ?? item.itemSizes[0];

  if (size === undefined) {
    throw new Error(`No size on menu item: ${item.name}`);
  }
  const atVenue = size.prices.find((candidate) => candidate.storeId === VENUE_STORE_ID);
  const chosen = atVenue ?? size.prices[0];

  if (chosen === undefined) {
    throw new Error(`No price on menu item: ${item.name}`);
  }
  if (!Number.isInteger(chosen.price)) {
    throw new Error(
      `Fractional price ${chosen.price} on menu item: ${item.name} - PLAN.md freezes integer GEL; update the data model sentence first`,
    );
  }
  return chosen.price;
};

const captureCategory = (category: SourceCategory): MenuCategory => ({
  name: splitMultilingualName(category.name),
  items: category.items.map((item) => ({
    name: splitMultilingualName(item.name),
    price: priceAtTheVenue(item),
  })),
});

const renderSnapshotModule = (categories: MenuCategory[], capturedOn: string): string =>
  [
    `export type LocalizedName = { ka: string; en: string; ru: string };`,
    `export type MenuItem = { name: LocalizedName; price: number };`,
    `export type MenuCategory = { name: LocalizedName; items: MenuItem[] };`,
    ``,
    `export const MENU_CAPTURED_ON = ${JSON.stringify(capturedOn)};`,
    `export const MENU_SOURCE_URL = ${JSON.stringify(MENU_SOURCE_URL)};`,
    ``,
    `export const MENU: MenuCategory[] = ${JSON.stringify(categories, null, 2)};`,
    ``,
  ].join("\n");

const captureMenu = async (): Promise<void> => {
  const response = await fetch(MENU_API_URL);

  if (!response.ok) {
    throw new Error(`Menu API answered ${response.status}`);
  }
  const source = (await response.json()) as SourceMenu;
  const categories = source.result.itemCategories.map(captureCategory);
  const capturedOn = new Date().toISOString().slice(0, ISO_DATE_LENGTH);

  writeFileSync(OUTPUT_FILE, renderSnapshotModule(categories, capturedOn));
  console.log(`${OUTPUT_FILE}: ${categories.length} categories, captured ${capturedOn}`);
};

await captureMenu();
