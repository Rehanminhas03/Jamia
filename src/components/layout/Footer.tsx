import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { navLinks } from "./nav-links";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.93.26-1.56 1.6-1.56h1.7V4.27a23 23 0 0 0-2.5-.13c-2.46 0-4.15 1.5-4.15 4.26v2.4H7.5V14h2.65v8h3.35Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2c-.23-.86-.9-1.54-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43c-.86.23-1.53.9-1.76 1.77C2 8.78 2 12 2 12s0 3.22.4 4.8c.23.86.9 1.54 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43c.86-.23 1.53-.9 1.76-1.77.4-1.58.4-4.8.4-4.8s0-3.22-.4-4.8ZM10 15.2V8.8L15.6 12 10 15.2Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tDept = useTranslations("departments.items");

  const year = new Date().getFullYear();
  const featuredDeptIds = ["quran", "hadith", "fiqh", "arabic"] as const;

  return (
    <footer className="relative overflow-hidden bg-primary-700 text-cream">
      <div className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream/70"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-cream"
                  aria-hidden="true"
                >
                  <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
                </svg>
              </span>
              <span className="font-display text-xl">{tCommon("brand")}</span>
            </div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("aboutHeading")}
            </h3>
            <p className="text-sm leading-relaxed text-cream/80">
              {t("aboutBody")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/80 transition-colors hover:text-cream"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("departmentsHeading")}
            </h3>
            <ul className="space-y-2 text-sm">
              {featuredDeptIds.map((id) => (
                <li key={id}>
                  <Link
                    href="/departments"
                    className="text-cream/80 transition-colors hover:text-cream"
                  >
                    {tDept(`${id}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("contactHeading")}
            </h3>
            <ul className="space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span dir="ltr">{t("phone")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span dir="ltr">{t("email")}</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t("followUs")}
              </p>
              <div className="flex items-center gap-3">
                <SocialLink href="#" label="Facebook">
                  <FacebookIcon className="h-4 w-4" />
                </SocialLink>
                <SocialLink href="#" label="YouTube">
                  <YoutubeIcon className="h-4 w-4" />
                </SocialLink>
                <SocialLink href="#" label="Instagram">
                  <InstagramIcon className="h-4 w-4" />
                </SocialLink>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>
            © {year} {tCommon("brand")}. {t("rights")}
          </p>
          <p>{t("builtBy")}</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
