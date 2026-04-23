import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  BookOpen,
  Scroll,
  Scale,
  Feather,
  Sun,
  Star,
  GraduationCap,
  Library,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { IslamicArt } from "@/components/ui/IslamicArt";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { allDepartments, pageArt, type DepartmentIcon } from "@/lib/data";

const iconMap: Record<DepartmentIcon, LucideIcon> = {
  "book-open": BookOpen,
  scroll: Scroll,
  scale: Scale,
  feather: Feather,
  sun: Sun,
  star: Star,
  "graduation-cap": GraduationCap,
  library: Library,
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "departments" });
  return { title: t("pageTitle") };
}

export default async function DepartmentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "departments" });

  return (
    <>
      <PageHero
        eyebrow={t("pageEyebrow")}
        title={t("pageTitle")}
        description={t("pageDescription")}
        mood={pageArt.departments.mood}
        breadcrumb={
          <Breadcrumb
            trail={[
              { href: "/", labelKey: "home" },
              { labelKey: "departments" },
            ]}
          />
        }
      />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {allDepartments.map((dept, idx) => {
              const Icon = iconMap[dept.icon];
              return (
                <AnimatedSection key={dept.id} delay={(idx % 3) * 0.08}>
                  <article
                    id={dept.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <IslamicArt mood={dept.mood} icon={Icon} />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-display text-xl text-primary">
                        {t(`items.${dept.id}.name`)}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {t(`items.${dept.id}.long`)}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-700">
                        <span>{t(`items.${dept.id}.short`)}</span>
                        <ArrowRight
                          className="h-4 w-4 rtl:-scale-x-100"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
