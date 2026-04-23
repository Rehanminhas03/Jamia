import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { IslamicArt } from "@/components/ui/IslamicArt";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function Intro() {
  const t = useTranslations("home.intro");

  return (
    <section className="relative bg-cream py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection>
            <SectionTitle
              eyebrow={t("eyebrow")}
              heading={t("heading")}
              align="start"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/85">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="relative">
            <div className="relative mx-auto aspect-[3/4] max-w-md">
              <div className="arch-frame relative h-full w-full shadow-lift ring-1 ring-primary-100">
                <IslamicArt mood="deep" icon={BookOpen} frame="arch" />
              </div>
              <div
                className="pointer-events-none absolute -bottom-6 -end-6 h-32 w-32 rounded-full border-2 border-accent/40"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -top-6 -start-6 h-24 w-24 rounded-full border-2 border-primary/30"
                aria-hidden="true"
              />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
