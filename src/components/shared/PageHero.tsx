import type { ReactNode } from "react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { IslamicPattern } from "@/components/ui/IslamicPattern";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: ReactNode;
  image?: string;
  imageAlt?: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  image,
  imageAlt = "",
  className,
}: Props) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-primary text-cream",
        className,
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-900/85 via-primary-900/70 to-primary-900/90"
            aria-hidden="true"
          />
        </>
      ) : null}
      <div className="absolute inset-0 -z-10 text-cream opacity-[0.07]">
        <IslamicPattern variant="geometric" />
      </div>
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
