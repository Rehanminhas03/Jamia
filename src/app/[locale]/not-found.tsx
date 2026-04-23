import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("common.notFound");

  return (
    <section className="flex min-h-[70vh] items-center bg-cream py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-7xl text-accent">404</p>
          <h1 className="mt-4 font-display text-3xl text-primary sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {t("message")}
          </p>
          <div className="mt-8">
            <Button as={Link} href="/" size="lg">
              {t("cta")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
