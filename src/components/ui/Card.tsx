import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({
  className,
  interactive = true,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-primary-100/50 bg-white shadow-soft",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
      {...rest}
    />
  );
}
