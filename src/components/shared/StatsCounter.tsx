"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Users, BookOpenCheck, History, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { stats, type Stat } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<Stat["id"], LucideIcon> = {
  students: Users,
  teachers: BookOpenCheck,
  years: History,
  graduates: GraduationCap,
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useCountUp(target: number, durationMs = 1800) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(prefersReducedMotion());

  useEffect(() => {
    const node = ref.current;
    if (!node || startedRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - startTime) / durationMs);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(target * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [target, durationMs]);

  return { value, ref };
}

function StatCard({ stat, locale }: { stat: Stat; locale: string }) {
  const t = useTranslations("about.stats");
  const { value, ref } = useCountUp(stat.value);
  const Icon = iconMap[stat.id];
  const formatter = new Intl.NumberFormat(locale);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center rounded-2xl border border-cream/15 bg-primary-700/40 p-8 text-center backdrop-blur"
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="font-display text-5xl text-cream">
        {formatter.format(value)}
        {stat.suffix ? (
          <span className="text-accent">{stat.suffix}</span>
        ) : null}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cream/70">
        {t(stat.id)}
      </p>
    </div>
  );
}

type Props = {
  className?: string;
};

export function StatsCounter({ className }: Props) {
  const t = useTranslations("about.stats");
  const locale = useLocale();

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-primary text-cream",
        className,
      )}
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary to-primary-700"
        aria-hidden="true"
      />
      <Container className="py-20 sm:py-24">
        <SectionTitle
          eyebrow=""
          heading={t("heading")}
          subheading={t("subheading")}
          invert
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
