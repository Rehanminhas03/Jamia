import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: ReactNode;
  heading: ReactNode;
  subheading?: ReactNode;
  align?: "start" | "center";
  invert?: boolean;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  heading,
  subheading,
  align = "center",
  invert = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.25em]",
            invert ? "text-accent" : "text-accent-700",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem]",
          invert ? "text-cream" : "text-primary",
        )}
      >
        {heading}
      </h2>
      <Ornament align={align} invert={invert} />
      {subheading ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            invert ? "text-cream/80" : "text-muted",
          )}
        >
          {subheading}
        </p>
      ) : null}
    </div>
  );
}

function Ornament({
  align,
  invert,
}: {
  align: "start" | "center";
  invert: boolean;
}) {
  const color = invert ? "text-accent" : "text-accent";
  return (
    <div
      className={cn(
        "mt-5 flex items-center gap-2",
        align === "center" ? "justify-center" : "justify-start",
        color,
      )}
      aria-hidden="true"
    >
      <span className="block h-px w-8 bg-current opacity-60" />
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3 fill-current"
        aria-hidden="true"
      >
        <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
      </svg>
      <span className="block h-px w-8 bg-current opacity-60" />
    </div>
  );
}
