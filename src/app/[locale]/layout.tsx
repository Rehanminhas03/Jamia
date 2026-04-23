import "../globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  Plus_Jakarta_Sans,
  Cormorant_Garamond,
  Amiri,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, isRtl } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-nastaliq",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    title: {
      default: t("metaTitle"),
      template: `%s · ${t("brand")}`,
    },
    description: t("metaDescription"),
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const dir = isRtl(locale) ? "rtl" : "ltr";
  const localeFontClass =
    locale === "ar"
      ? "font-arabic"
      : locale === "ur"
        ? "font-urdu"
        : "font-sans";

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        plusJakarta.variable,
        cormorant.variable,
        amiri.variable,
        nastaliq.variable,
      )}
    >
      <body
        className={cn(
          "min-h-screen flex flex-col bg-cream text-ink antialiased",
          localeFontClass,
        )}
      >
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
