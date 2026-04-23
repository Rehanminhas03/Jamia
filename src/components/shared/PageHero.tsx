import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { IslamicArt, type IslamicArtMood } from "@/components/ui/IslamicArt";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: ReactNode;
  mood?: IslamicArtMood;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  mood = "deep",
  className,
}: Props) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-primary text-cream",
        className,
      )}
    >
      <div className="absolute inset-0 -z-20">
        <IslamicArt mood={mood} />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-900/70 via-primary-900/55 to-primary-900/80"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-primary-700/60 to-transparent" />
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-[3.25rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
              {description}
            </p>
          ) : null}
          {breadcrumb ? (
            <div className="mt-8 text-sm text-cream/70">{breadcrumb}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
