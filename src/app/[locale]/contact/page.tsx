import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactInfo, pageArt } from "@/lib/data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("pageTitle") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  return (
    <>
      <PageHero
        eyebrow={t("pageEyebrow")}
        title={t("pageTitle")}
        description={t("pageDescription")}
        mood={pageArt.contact.mood}
        breadcrumb={
          <Breadcrumb
            trail={[
              { href: "/", labelKey: "home" },
              { labelKey: "contact" },
            ]}
          />
        }
      />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <AnimatedSection>
              <h2 className="font-display text-2xl text-primary sm:text-3xl">
                {t("info.heading")}
              </h2>
              <ul className="mt-8 space-y-6">
                <InfoItem icon={MapPin} label={t("info.addressLabel")}>
                  {tFooter("address")}
                </InfoItem>
                <InfoItem icon={Phone} label={t("info.phoneLabel")} dir="ltr">
                  {tFooter("phone")}
                </InfoItem>
                <InfoItem icon={Mail} label={t("info.emailLabel")} dir="ltr">
                  {tFooter("email")}
                </InfoItem>
                <InfoItem icon={Clock} label={t("info.hoursLabel")}>
                  <span className="block">{t("info.weekday")}</span>
                  <span className="block">{t("info.weekend")}</span>
                </InfoItem>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <section className="bg-cream-100 pb-20 sm:pb-24">
        <Container>
          <AnimatedSection>
            <div className="overflow-hidden rounded-3xl border border-primary-100 shadow-soft">
              <iframe
                src={contactInfo.mapEmbedUrl}
                title="Jamia Uloom Islamia — Map"
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}

function InfoItem({
  icon: Icon,
  label,
  children,
  dir,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  dir?: "ltr" | "rtl";
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
          {label}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-ink/85" dir={dir}>
          {children}
        </div>
      </div>
    </li>
  );
}
