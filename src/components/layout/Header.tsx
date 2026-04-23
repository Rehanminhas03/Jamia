"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { navLinks } from "./nav-links";

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;
  const variant = transparent ? "dark" : "light";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        transparent
          ? "bg-transparent"
          : "bg-cream/95 shadow-soft backdrop-blur",
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={tCommon("brand")}
          >
            <span
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                transparent
                  ? "border-cream/70 text-cream"
                  : "border-primary/70 text-primary",
              )}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span
                className={cn(
                  "font-display text-lg sm:text-xl",
                  transparent ? "text-cream" : "text-primary",
                )}
              >
                {tCommon("brand")}
              </span>
              <span
                className={cn(
                  "hidden text-[11px] uppercase tracking-[0.2em] sm:block",
                  transparent ? "text-cream/70" : "text-accent-700",
                )}
              >
                {tCommon("tagline")}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    transparent
                      ? "text-cream/85 hover:text-cream"
                      : "text-ink/80 hover:text-primary",
                    active &&
                      (transparent ? "text-cream" : "text-primary"),
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(link.labelKey)}
                  {active ? (
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px",
                        transparent ? "bg-accent" : "bg-accent",
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden md:block">
              <LanguageSwitcher variant={variant} />
            </div>
            <MobileMenu links={navLinks} variant={variant} />
          </div>
        </div>
      </Container>
    </header>
  );
}
