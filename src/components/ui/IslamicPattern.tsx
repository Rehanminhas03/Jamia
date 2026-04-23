import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "stars" | "geometric";
};

export function IslamicPattern({
  className,
  variant = "geometric",
}: Props) {
  if (variant === "stars") {
    return (
      <svg
        className={cn("pointer-events-none select-none", className)}
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="star-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.7"
            >
              <path d="M40 8 L48 32 L72 32 L52 48 L60 72 L40 56 L20 72 L28 48 L8 32 L32 32 Z" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#star-pattern)" />
      </svg>
    );
  }

  return (
    <svg
      className={cn("pointer-events-none select-none", className)}
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="geo-pattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.6"
          >
            <circle cx="30" cy="30" r="20" />
            <circle cx="30" cy="30" r="12" />
            <path d="M30 10 L50 30 L30 50 L10 30 Z" />
            <line x1="0" y1="30" x2="60" y2="30" />
            <line x1="30" y1="0" x2="30" y2="60" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo-pattern)" />
    </svg>
  );
}
