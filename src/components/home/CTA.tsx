import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IslamicPattern } from "@/components/ui/IslamicPattern";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ctaBackdrop } from "@/lib/data";

export function CTA() {
  const t = useTranslations("home.cta");
  const tCommon = useTranslations("common");

  return (
    <section className="relative isolate overflow-hidden bg-primary text-cream">
      <Image
        src={ctaBackdrop}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-900/85 via-primary/90 to-primary-700/95"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 text-cream opacity-[0.08]">
        <IslamicPattern variant="stars" />
      </div>
      <Container className="py-20 sm:py-24">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl md:text-[2.75rem]">
              {t("heading")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
              {t("body")}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button as={Link} href="/admissions" variant="white" size="lg">
                <span>{t("button")}</span>
                <ArrowRight
                  className="h-4 w-4 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Button>
              <Button as={Link} href="/contact" variant="outline" size="lg">
                {tCommon("contactUs")}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
