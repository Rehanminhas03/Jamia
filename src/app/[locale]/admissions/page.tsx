import { setRequestLocale, getTranslations } from "next-intl/server";
import { CheckCircle2, FileText } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ApplicationForm } from "@/components/admissions/ApplicationForm";
import { admissionSteps, eligibilityIds, documentIds, pageArt } from "@/lib/data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions" });
  return { title: t("pageTitle") };
}

export default async function AdmissionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "admissions" });

  return (
    <>
      <PageHero
        eyebrow={t("pageEyebrow")}
        title={t("pageTitle")}
        description={t("pageDescription")}
        mood={pageArt.admissions.mood}
        breadcrumb={
          <Breadcrumb
            trail={[
              { href: "/", labelKey: "home" },
              { labelKey: "admissions" },
            ]}
          />
        }
      />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <SectionTitle
            eyebrow=""
            heading={t("process.heading")}
            subheading={t("process.subheading")}
          />

          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {admissionSteps.map((step, idx) => (
              <AnimatedSection key={step.id} delay={idx * 0.08}>
                <li className="relative flex h-full flex-col rounded-2xl border border-primary-100/60 bg-white p-7 shadow-soft">
                  <span className="font-display text-5xl text-accent/40">
                    {step.number}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-primary">
                    {t(`process.steps.${step.id}.title`)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {t(`process.steps.${step.id}.desc`)}
                  </p>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-cream-100 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection>
              <h3 className="font-display text-2xl text-primary sm:text-3xl">
                {t("eligibility.heading")}
              </h3>
              <ul className="mt-6 space-y-3">
                {eligibilityIds.map((id) => (
                  <li key={id} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-ink/85">
                      {t(`eligibility.items.${id}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h3 className="font-display text-2xl text-primary sm:text-3xl">
                {t("documents.heading")}
              </h3>
              <ul className="mt-6 space-y-3">
                {documentIds.map((id) => (
                  <li key={id} className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-ink/85">
                      {t(`documents.items.${id}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <ApplicationForm />
    </>
  );
}
