import { escapeHtml } from "#shared/html/escape.ts";


const TRUSTED = Symbol("trusted-html");

export type TrustedHtml = { readonly [TRUSTED]: string };

export const raw = (trustedMarkup: string): TrustedHtml => ({ [TRUSTED]: trustedMarkup });

export type Interpolated = string | number | TrustedHtml | readonly Interpolated[];

const resolve = (value: Interpolated): string => {
  if (typeof value === "string") {
    return escapeHtml(value);
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(resolve).join("");
  }
  return (value as TrustedHtml)[TRUSTED];
};

export const html = (strings: TemplateStringsArray, ...values: readonly Interpolated[]): string =>
  strings
    .map((part, index) => (index < values.length ? part + resolve(values[index] ?? "") : part))
    .join("");
