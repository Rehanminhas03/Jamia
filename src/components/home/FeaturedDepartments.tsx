import { useTranslations } from "next-intl";
import { BookOpen, Scroll, Scale, Feather, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { featuredDepartments, type DepartmentIcon } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Partial<Record<DepartmentIcon, LucideIcon>> = {
  "book-open": BookOpen,
  scroll: Scroll,
  scale: Scale,
  feather: Feather,
};

export function FeaturedDepartments() {
  const t = useTranslations("home.featuredDepts");
  const tCommon = useTranslations("common");
  const tItems = useTranslations("departments.items");

  return (
    <section className="relative bg-cream-100 py-20 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          heading={t("heading")}
          subheading={t("subheading")}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDepartments.map((dept, idx) => {
            const Icon = iconMap[dept.icon] ?? BookOpen;
            return (
              <AnimatedSection key={dept.id} delay={idx * 0.08}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100/60 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                  )}
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-cream">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl text-primary">
                    {tItems(`${dept.id}.name`)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {tItems(`${dept.id}.short`)}
                  </p>
                  <Link
                    href="/departments"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
                  >
                    <span>{tCommon("learnMore")}</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
