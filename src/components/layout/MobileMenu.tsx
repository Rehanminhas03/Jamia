"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { NavLink } from "./nav-links";

type Props = {
  links: NavLink[];
  variant?: "light" | "dark";
};

export function MobileMenu({ links, variant = "light" }: Props) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const triggerColor =
    variant === "dark"
      ? "text-cream hover:bg-cream/10"
      : "text-primary hover:bg-primary/5";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("openMenu")}
        className={cn(
          "inline-flex items-center justify-center rounded-full p-2.5 transition-colors md:hidden",
          triggerColor,
        )}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 end-0 z-50 flex w-[85vw] max-w-sm flex-col bg-cream shadow-lift rtl:[transform-origin:left] md:hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between border-b border-primary-100/60 px-5 py-4">
                <span className="font-display text-xl text-primary">
                  {tCommon("brandShort")}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("closeMenu")}
                  className="inline-flex items-center justify-center rounded-full p-2 text-primary transition-colors hover:bg-primary/5"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="flex flex-col gap-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-primary/5 hover:text-primary"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-primary-100/60 px-5 py-4">
                <LanguageSwitcher variant="light" />
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
