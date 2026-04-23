import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type Crumb = {
  href?: "/" | "/about" | "/departments" | "/courses" | "/admissions" | "/news" | "/fatwa" | "/contact";
  labelKey: "home" | "about" | "departments" | "courses" | "admissions" | "news" | "fatwa" | "contact";
};

type Props = {
  trail: Crumb[];
};

export function Breadcrumb({ trail }: Props) {
  const t = useTranslations("nav");

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-cream/70">
        {trail.map((crumb, idx) => {
          const isLast = idx === trail.length - 1;
          return (
            <li key={`${crumb.labelKey}-${idx}`} className="flex items-center gap-2">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-accent"
                >
                  {t(crumb.labelKey)}
                </Link>
              ) : (
                <span className="text-cream" aria-current={isLast ? "page" : undefined}>
                  {t(crumb.labelKey)}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  className="h-3.5 w-3.5 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
