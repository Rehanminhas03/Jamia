import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const rtlLocales: Locale[] = ["ur", "ar"];

export function isRtl(locale: string): boolean {
  return (rtlLocales as string[]).includes(locale);
}
