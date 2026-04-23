import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { NewsGrid } from "@/components/news/NewsGrid";
import { pageArt } from "@/lib/data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("pageTitle") };
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news" });

  return (
    <>
      <PageHero
        eyebrow={t("pageEyebrow")}
        title={t("pageTitle")}
        description={t("pageDescription")}
        mood={pageArt.news.mood}
        breadcrumb={
          <Breadcrumb
            trail={[
              { href: "/", labelKey: "home" },
              { labelKey: "news" },
            ]}
          />
        }
      />
      <NewsGrid />
    </>
  );
}
