"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Feather,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { isRtl } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IslamicArt } from "@/components/ui/IslamicArt";
import { heroSlides } from "@/lib/data";
import { cn } from "@/lib/utils";

const slideIds = heroSlides.map((s) => s.id);

const slideIcons: Record<string, LucideIcon> = {
  knowledge: BookOpen,
  calligraphy: Feather,
  students: Users,
};

export function Hero() {
  const t = useTranslations("home.hero.slides");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const direction: "rtl" | "ltr" = isRtl(locale) ? "rtl" : "ltr";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction,
      align: "start",
      duration: 32,
    },
    [Autoplay({ delay: 5500, stopOnInteraction: false })],
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative -mt-20 overflow-hidden bg-primary text-cream">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {heroSlides.map((slide, idx) => {
            const Icon = slideIcons[slide.id] ?? BookOpen;
            return (
              <div
                key={slide.id}
                className="relative h-[88vh] min-h-[560px] w-full shrink-0 grow-0 basis-full"
              >
                <IslamicArt
                  mood={slide.mood}
                  icon={Icon}
                  className="absolute inset-0 -z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary-900/75 via-primary-900/55 to-primary-900/80" />
                <div className="absolute inset-0 flex items-center">
                  <Container>
                    <AnimatePresence mode="wait">
                      {selected === idx ? (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -24 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="max-w-2xl"
                        >
                          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                            {t(`${slideIds[idx]}.eyebrow`)}
                          </p>
                          <h1 className="font-display text-4xl leading-tight text-cream sm:text-5xl md:text-6xl lg:text-[4rem]">
                            {t(`${slideIds[idx]}.title`)}
                          </h1>
                          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
                            {t(`${slideIds[idx]}.subtitle`)}
                          </p>
                          <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Button as={Link} href="/admissions" size="lg">
                              {tCommon("apply")}
                            </Button>
                            <Button
                              as={Link}
                              href="/courses"
                              size="lg"
                              variant="outline"
                            >
                              {tCommon("exploreCourses")}
                            </Button>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </Container>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Container className="absolute inset-x-0 bottom-8 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  selected === idx
                    ? "w-10 bg-accent"
                    : "w-6 bg-cream/40 hover:bg-cream/60",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4 rtl:hidden" aria-hidden="true" />
              <ChevronRight
                className="hidden h-4 w-4 rtl:block"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-primary"
            >
              <ChevronRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
              <ChevronLeft
                className="hidden h-4 w-4 rtl:block"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
