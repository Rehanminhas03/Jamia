import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
};

const sizeMap = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-[88rem]",
} as const;

export function Container({
  className,
  size = "default",
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
      {...rest}
    />
  );
}
