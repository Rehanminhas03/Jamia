import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { FatwaList } from "@/components/fatwa/FatwaList";
import { pageArt } from "@/lib/data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fatwa" });
  return { title: t("pageTitle") };
}

export default async function FatwaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "fatwa" });

  return (
    <>
      <PageHero
        eyebrow={t("pageEyebrow")}
        title={t("pageTitle")}
        description={t("pageDescription")}
        mood={pageArt.fatwa.mood}
        breadcrumb={
          <Breadcrumb
            trail={[
              { href: "/", labelKey: "home" },
              { labelKey: "fatwa" },
            ]}
          />
        }
      />
      <FatwaList />
    </>
  );
}
