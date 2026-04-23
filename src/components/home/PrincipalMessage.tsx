import Image from "next/image";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { principal, principalBackdrop } from "@/lib/data";

export function PrincipalMessage() {
  const t = useTranslations("home.principal");

  return (
    <section className="relative isolate overflow-hidden bg-cream-100 py-20 sm:py-24">
      <Image
        src={principalBackdrop}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-[0.08]"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-100 via-cream-100/95 to-cream-100"
        aria-hidden="true"
      />
      <Container>
        <AnimatedSection>
          <div className="grid items-center gap-10 md:grid-cols-[280px_1fr] lg:gap-16">
            <div className="relative mx-auto md:mx-0">
              <div className="relative h-56 w-56 overflow-hidden rounded-full ring-4 ring-accent/40 ring-offset-4 ring-offset-cream-100 sm:h-64 sm:w-64">
                <Image
                  src={principal.image}
                  alt=""
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
              <span
                className="absolute -bottom-2 start-1/2 inline-flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-cream shadow-soft"
                aria-hidden="true"
              >
                <Quote className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>

            <div className="text-start">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent-700">
                {t("eyebrow")}
              </p>
              <blockquote className="border-s-2 border-accent ps-6 font-display text-2xl leading-relaxed text-primary md:text-[1.7rem]">
                “{t("quote")}”
              </blockquote>
              <div className="mt-6">
                <p className="font-display text-xl text-primary">{t("name")}</p>
                <p className="text-sm text-muted">{t("title")}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
