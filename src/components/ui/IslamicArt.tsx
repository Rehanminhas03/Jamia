import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IslamicArtMood =
  | "deep"
  | "warm"
  | "gold"
  | "cream"
  | "night"
  | "sage";

export type IslamicArtFrame = "plain" | "arch" | "band";

type Props = {
  icon?: LucideIcon;
  mood?: IslamicArtMood;
  frame?: IslamicArtFrame;
  className?: string;
  label?: string;
  dense?: boolean;
};

const moodClasses: Record<
  IslamicArtMood,
  { bg: string; pattern: string; icon: string; ornament: string; ring: string }
> = {
  deep: {
    bg: "bg-gradient-to-br from-primary-700 via-primary to-primary-600",
    pattern: "text-accent",
    icon: "text-accent/75",
    ornament: "text-accent/70",
    ring: "ring-accent/25",
  },
  warm: {
    bg: "bg-gradient-to-br from-primary via-primary-600 to-accent-700",
    pattern: "text-cream",
    icon: "text-cream/85",
    ornament: "text-accent/80",
    ring: "ring-accent/30",
  },
  gold: {
    bg: "bg-gradient-to-br from-accent-700 via-accent to-accent-600",
    pattern: "text-primary-900",
    icon: "text-primary-900/75",
    ornament: "text-primary-900/70",
    ring: "ring-primary-900/20",
  },
  cream: {
    bg: "bg-gradient-to-br from-cream via-cream-100 to-cream",
    pattern: "text-primary",
    icon: "text-primary/75",
    ornament: "text-accent/80",
    ring: "ring-primary/15",
  },
  night: {
    bg: "bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900",
    pattern: "text-accent",
    icon: "text-accent/80",
    ornament: "text-accent/80",
    ring: "ring-accent/30",
  },
  sage: {
    bg: "bg-gradient-to-br from-primary-50 via-cream to-primary-100",
    pattern: "text-primary-700",
    icon: "text-primary-700/80",
    ornament: "text-accent",
    ring: "ring-primary/15",
  },
};

export function IslamicArt({
  icon: Icon,
  mood = "deep",
  frame = "plain",
  className,
  label,
  dense = false,
}: Props) {
  const m = moodClasses[mood];
  const iconSize = dense ? "h-12 w-12" : "h-20 w-20 sm:h-24 sm:w-24";

  return (
    <div
      role={label ? "img" : "presentation"}
      aria-label={label}
      className={cn(
        "relative isolate h-full w-full overflow-hidden",
        m.bg,
        className,
      )}
    >
      <GeometricPattern className={cn("absolute inset-0", m.pattern)} />

      {frame === "arch" ? (
        <ArchFrame className={cn("absolute inset-0", m.ornament)} />
      ) : null}
      {frame === "band" ? (
        <BandFrame className={cn("absolute inset-x-0 top-1/2 -translate-y-1/2", m.ornament)} />
      ) : null}

      {Icon ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "flex items-center justify-center rounded-full ring-1 ring-inset",
              m.ring,
              dense ? "h-20 w-20" : "h-32 w-32 sm:h-40 sm:w-40",
            )}
          >
            <Icon className={cn(iconSize, m.icon)} aria-hidden="true" />
          </div>
        </div>
      ) : null}

      <CornerOrnaments className={cn("absolute inset-0", m.ornament)} />
    </div>
  );
}

function GeometricPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="ia-geo-pat"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            opacity="0.18"
          >
            <circle cx="30" cy="30" r="22" />
            <circle cx="30" cy="30" r="13" />
            <path d="M30 8 L52 30 L30 52 L8 30 Z" />
            <path d="M30 0 L35 25 L60 30 L35 35 L30 60 L25 35 L0 30 L25 25 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ia-geo-pat)" />
    </svg>
  );
}

function ArchFrame({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 300"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55">
        <path d="M40 280 L40 120 C40 70 80 40 120 40 C160 40 200 70 200 120 L200 280" />
        <path d="M56 280 L56 128 C56 86 88 58 120 58 C152 58 184 86 184 128 L184 280" />
      </g>
    </svg>
  );
}

function BandFrame({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45">
        <line x1="0" y1="10" x2="600" y2="10" />
        <line x1="0" y1="50" x2="600" y2="50" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <path d="M300 18 L304 28 L314 30 L304 32 L300 42 L296 32 L286 30 L296 28 Z" />
      </g>
    </svg>
  );
}

function CornerOrnaments({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="currentColor" opacity="0.5">
        <path d="M12 12 L18 20 L26 22 L18 24 L12 32 L6 24 L-2 22 L6 20 Z" />
        <path
          d="M12 12 L18 20 L26 22 L18 24 L12 32 L6 24 L-2 22 L6 20 Z"
          transform="translate(228 0) scale(-1 1)"
        />
        <path
          d="M12 12 L18 20 L26 22 L18 24 L12 32 L6 24 L-2 22 L6 20 Z"
          transform="translate(0 228)"
        />
        <path
          d="M12 12 L18 20 L26 22 L18 24 L12 32 L6 24 L-2 22 L6 20 Z"
          transform="translate(228 228) scale(-1 -1)"
        />
      </g>
    </svg>
  );
}
