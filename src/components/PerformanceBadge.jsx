import { PERFORMANCE_LEVEL_COLORS } from "@/lib/constants"
import { MissingValue } from "@/components/MissingValue"

// Performance level is an ordinal scale (Exceeds > Meets > Approaching > Below),
// so this reads as a small marker + label rather than a generic status pill.
// `variant="plain"` drops the color dot for tables that already encode the
// level visually elsewhere (e.g. a score bar in an adjacent column).
export function PerformanceBadge({ level, variant = "dot" }) {
  if (!level || !PERFORMANCE_LEVEL_COLORS[level]) {
    return <MissingValue />
  }

  if (variant === "plain") {
    return <span className="text-sm text-muted-foreground">{level}</span>
  }

  const { bg } = PERFORMANCE_LEVEL_COLORS[level]

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
      <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: bg }} aria-hidden="true" />
      {level}
    </span>
  )
}
