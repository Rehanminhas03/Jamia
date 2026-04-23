import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { latestNews } from "@/lib/data";

export function LatestNews() {
  const t = useTranslations("home.latestNews");
  const tCommon = useTranslations("common");
  const tCats = useTranslations("news.categories");
  const tItems = useTranslations("news.items");
  const locale = useLocale();

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            subheading={t("subheading")}
            align="start"
          />
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent-700"
          >
            <span>{tCommon("viewAll")}</span>
            <ArrowRight
              className="h-4 w-4 rtl:-scale-x-100"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latestNews.map((item, idx) => (
            <AnimatedSection key={item.id} delay={idx * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute start-4 top-4 inline-flex items-center rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-soft">
                    {tCats(item.category)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-xs text-muted">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{dateFormatter.format(new Date(item.date))}</span>
                  </p>
                  <h3 className="mt-3 font-display text-xl text-primary">
                    {tItems(`${item.id}.title`)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {tItems(`${item.id}.excerpt`)}
                  </p>
                  <Link
                    href="/news"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
                  >
                    <span>{tCommon("readMore")}</span>
                    <ArrowRight
                      className="h-4 w-4 rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
