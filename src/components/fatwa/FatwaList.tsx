"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Search, Plus, Minus, CalendarDays } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { fatwaItems, fatwaCategories, type FatwaCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = "all" | FatwaCategory;

export function FatwaList() {
  const t = useTranslations("fatwa");
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return fatwaItems.filter((item) => {
      const matchesCategory = filter === "all" || item.category === filter;
      // Visual-only search: if user types, do a no-op match on id strings
      const matchesQuery =
        query.trim().length === 0 || item.id.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <div className="mb-10">
          <div className="relative max-w-xl">
            <Search
              className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              dir="auto"
              className="w-full rounded-full border border-primary-100 bg-white py-3 ps-12 pe-5 text-sm text-ink shadow-soft placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-700">
              {t("categories.heading")}
            </h3>
            <ul className="space-y-1.5">
              <li>
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={cn(
                    "w-full rounded-xl px-4 py-2.5 text-start text-sm font-medium transition-colors",
                    filter === "all"
                      ? "bg-primary text-cream shadow-soft"
                      : "text-ink/80 hover:bg-primary/5 hover:text-primary",
                  )}
                >
                  {t("categories.all")}
                </button>
              </li>
              {fatwaCategories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "w-full rounded-xl px-4 py-2.5 text-start text-sm font-medium transition-colors",
                      filter === cat
                        ? "bg-primary text-cream shadow-soft"
                        : "text-ink/80 hover:bg-primary/5 hover:text-primary",
                    )}
                  >
                    {t(`categories.${cat}`)}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            {filtered.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-primary-100 bg-white p-10 text-center text-muted">
                {t("noResults")}
              </p>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence initial={false}>
                  {filtered.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden rounded-2xl border border-primary-100/60 bg-white shadow-soft"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenId((cur) => (cur === item.id ? null : item.id))
                          }
                          aria-expanded={isOpen}
                          className="flex w-full items-start justify-between gap-4 px-6 py-5 text-start transition-colors hover:bg-cream/60"
                        >
                          <div className="flex-1">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-700">
                              {t(`categories.${item.category}`)}
                              <span className="mx-2 text-muted/50">·</span>
                              <span className="inline-flex items-center gap-1 text-muted">
                                <CalendarDays className="h-3 w-3" aria-hidden="true" />
                                {dateFormatter.format(new Date(item.date))}
                              </span>
                            </p>
                            <h4 className="mt-1.5 font-display text-lg text-primary">
                              {t(`items.${item.id}.question`)}
                            </h4>
                          </div>
                          <span
                            className={cn(
                              "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary-100 text-primary transition-colors",
                              isOpen && "bg-primary text-cream",
                            )}
                            aria-hidden="true"
                          >
                            {isOpen ? (
                              <Minus className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-primary-100/50 px-6 py-5 text-sm leading-relaxed text-ink/80">
                                {t(`items.${item.id}.answer`)}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
