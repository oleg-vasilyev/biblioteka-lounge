export type ShowcaseGroupId = "hookah" | "kitchen" | "bar";

export type ShowcaseGroup = { id: ShowcaseGroupId; itemNames: string[] };

export const MENU_SHOWCASE: ShowcaseGroup[] = [
  {
    id: "hookah",
    itemNames: ["Classic Hookah", "Hookah on grapefruit", "Hookah on wine", "Кальян дабл ананас"],
  },
  {
    id: "kitchen",
    itemNames: ["Borsch", "Draniki with bacon", "Pork neck BBQ", "Lyulya Kebab (Beef)"],
  },
  {
    id: "bar",
    itemNames: ["Natakhtari Draft", "Red mulled wines", "Gin&Tonic", 'Tea "Biblioteka"'],
  },
];
