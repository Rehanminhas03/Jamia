import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedDepartments } from "@/components/home/FeaturedDepartments";
import { LatestNews } from "@/components/home/LatestNews";
import { PrincipalMessage } from "@/components/home/PrincipalMessage";
import { CTA } from "@/components/home/CTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Intro />
      <FeaturedDepartments />
      <LatestNews />
      <PrincipalMessage />
      <CTA />
    </>
  );
}
