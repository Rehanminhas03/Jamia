import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Heart, Compass, Shield, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { StatsCounter } from "@/components/shared/StatsCounter";
import {
  aboutImages,
  coreValues,
  pageHeroImages,
  type CoreValue,
} from "@/lib/data";

const valueIcons: Record<CoreValue["icon"], LucideIcon> = {
  heart: Heart,
  compass: Compass,
  shield: Shield,
  lightbulb: Lightbulb,
};

type SectionKey = "vision" | "mission" | "history";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("pageTitle") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const sections: { key: SectionKey; image: string; reverse: boolean }[] = [
    { key: "vision", image: aboutImages.vision, reverse: false },
    { key: "mission", image: aboutImages.mission, reverse: true },
    { key: "history", image: aboutImages.history, reverse: false },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("pageEyebrow")}
        title={t("pageTitle")}
        description={t("pageDescription")}
        image={pageHeroImages.about}
        breadcrumb={
          <Breadcrumb
            trail={[
              { href: "/", labelKey: "home" },
              { labelKey: "about" },
            ]}
          />
        }
      />

      {sections.map((section) => (
        <section
          key={section.key}
          className={`py-20 sm:py-24 ${
            section.key === "mission" ? "bg-cream-100" : "bg-cream"
          }`}
        >
          <Container>
            <div
              className={`grid items-center gap-12 lg:gap-16 ${
                section.reverse
                  ? "lg:grid-cols-[1fr_1.05fr]"
                  : "lg:grid-cols-[1.05fr_1fr]"
              }`}
            >
              <AnimatedSection
                className={section.reverse ? "lg:order-2" : "lg:order-1"}
              >
                <SectionTitle
                  eyebrow={t(`${section.key}.eyebrow`)}
                  heading={t(`${section.key}.heading`)}
                  align="start"
                />
                <p className="mt-6 text-base leading-relaxed text-ink/85">
                  {t(`${section.key}.body`)}
                </p>
              </AnimatedSection>

              <AnimatedSection
                delay={0.15}
                className={section.reverse ? "lg:order-1" : "lg:order-2"}
              >
                <div className="relative mx-auto aspect-[4/5] max-w-md">
                  <div className="arch-frame relative h-full w-full shadow-lift ring-1 ring-primary-100">
                    <Image
                      src={section.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 480px, 90vw"
                      className="object-cover"
                    />
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
      ))}

      <StatsCounter />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <SectionTitle
            eyebrow=""
            heading={t("values.heading")}
            subheading={t("values.subheading")}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, idx) => {
              const Icon = valueIcons[value.icon];
              return (
                <AnimatedSection key={value.id} delay={idx * 0.08}>
                  <div className="group flex h-full flex-col items-center rounded-2xl border border-primary-100/60 bg-white p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent-700 transition-colors group-hover:bg-accent group-hover:text-cream">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl text-primary">
                      {t(`values.items.${value.id}.title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {t(`values.items.${value.id}.desc`)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
