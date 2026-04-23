"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  CalendarDays,
  Plus,
  Calendar,
  Megaphone,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IslamicArt } from "@/components/ui/IslamicArt";
import { allNews, type NewsItem, type NewsCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = "all" | NewsItem["category"];

const categories: Filter[] = ["all", "event", "announcement", "academic"];

const categoryIcon: Record<NewsCategory, LucideIcon> = {
  event: Calendar,
  announcement: Megaphone,
  academic: GraduationCap,
};

const PAGE_SIZE = 3;

export function NewsGrid() {
  const t = useTranslations("news");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => (filter === "all" ? allNews : allNews.filter((n) => n.category === filter)),
    [filter],
  );

  const items = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 rounded-full border border-primary-100/60 bg-white p-1.5 shadow-soft mx-auto w-fit">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFilter(cat);
                  setVisible(PAGE_SIZE);
                }}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  active
                    ? "bg-primary text-cream shadow-soft"
                    : "text-ink/70 hover:bg-primary/5 hover:text-primary",
                )}
              >
                {t(`categories.${cat}`)}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => {
              const Icon = categoryIcon[item.category];
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: (idx % PAGE_SIZE) * 0.07,
                  }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <IslamicArt mood={item.mood} icon={Icon} />
                    <span className="absolute start-4 top-4 inline-flex items-center rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-soft">
                      {t(`categories.${item.category}`)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-xs text-muted">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{dateFormatter.format(new Date(item.date))}</span>
                    </p>
                    <h3 className="mt-3 font-display text-xl text-primary">
                      {t(`items.${item.id}.title`)}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {t(`items.${item.id}.excerpt`)}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {canLoadMore ? (
          <div className="mt-12 flex justify-center">
            <Button
              variant="accent"
              size="lg"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>{tCommon("loadMore")}</span>
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
