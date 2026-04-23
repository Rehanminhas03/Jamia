"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check, ChevronDown } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleMeta = {
  code: (typeof routing.locales)[number];
  label: string;
  native: string;
  fontClass: string;
};

const localeMeta: LocaleMeta[] = [
  { code: "en", label: "English", native: "English", fontClass: "font-sans" },
  { code: "ur", label: "Urdu", native: "اردو", fontClass: "font-urdu" },
  { code: "ar", label: "Arabic", native: "العربية", fontClass: "font-arabic" },
];

type Props = {
  variant?: "light" | "dark";
};

export function LanguageSwitcher({ variant = "light" }: Props) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const current = localeMeta.find((m) => m.code === locale) ?? localeMeta[0];

  function switchLocale(next: (typeof routing.locales)[number]) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  const triggerColor =
    variant === "dark"
      ? "text-cream hover:bg-cream/10"
      : "text-primary hover:bg-primary/5";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors",
          triggerColor,
          isPending && "opacity-60",
        )}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className={current.fontClass}>{current.native}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-lift"
        >
          {localeMeta.map((m) => {
            const active = m.code === locale;
            return (
              <li key={m.code}>
                <button
                  type="button"
                  onClick={() => switchLocale(m.code)}
                  role="option"
                  aria-selected={active}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-3 text-start text-sm transition-colors",
                    active
                      ? "bg-primary/5 text-primary"
                      : "text-ink hover:bg-cream",
                  )}
                >
                  <span className="flex flex-col">
                    <span className={cn("text-base", m.fontClass)}>
                      {m.native}
                    </span>
                    <span className="text-xs text-muted">{m.label}</span>
                  </span>
                  {active ? (
                    <Check
                      className="h-4 w-4 text-accent"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
