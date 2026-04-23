import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-cream shadow-soft hover:bg-primary-700 hover:shadow-lift",
  accent:
    "border border-accent text-accent hover:bg-accent hover:text-cream",
  outline:
    "border border-cream/70 text-cream hover:bg-cream hover:text-primary",
  ghost: "text-primary hover:bg-primary/5",
  white:
    "bg-cream text-primary shadow-soft hover:bg-white hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type ButtonOwnProps<E extends ElementType> = {
  as?: E;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
};

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

export function Button<E extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps<E>) {
  const Component = (as ?? "button") as ElementType;
  return (
    <Component
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
