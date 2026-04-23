"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Clock, Layers } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { courses, courseLevels, type CourseLevel } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = "all" | CourseLevel;

const levelStyles: Record<CourseLevel, string> = {
  beginner: "bg-primary-50 text-primary-700",
  intermediate: "bg-accent/15 text-accent-700",
  advanced: "bg-primary text-cream",
};

export function CoursesFilter() {
  const t = useTranslations("courses");
  const tCommon = useTranslations("common");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? courses : courses.filter((c) => c.level === filter)),
    [filter],
  );

  const tabs: { value: Filter; label: string }[] = [
    { value: "all", label: t("filters.all") },
    ...courseLevels.map((l) => ({
      value: l,
      label: t(`filters.${l}`),
    })),
  ];

  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-primary-100/60 bg-white p-1.5 shadow-soft mx-auto w-fit">
          {tabs.map((tab) => {
            const active = filter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilter(tab.value)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  active
                    ? "bg-primary text-cream shadow-soft"
                    : "text-ink/70 hover:bg-primary/5 hover:text-primary",
                )}
                aria-pressed={active}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, idx) => (
              <motion.article
                key={course.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.05,
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100/60 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  className={cn(
                    "inline-flex items-center self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]",
                    levelStyles[course.level],
                  )}
                >
                  {t(`filters.${course.level}`)}
                </span>
                <h3 className="mt-4 font-display text-xl text-primary">
                  {t(`items.${course.id}.name`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {t(`items.${course.id}.short`)}
                </p>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-primary-100/50 pt-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {course.durationWeeks} {tCommon("weeks")}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    {tCommon("level")}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-muted">{t("noResults")}</p>
        ) : null}
      </Container>
    </section>
  );
}
