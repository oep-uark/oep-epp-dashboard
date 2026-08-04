import { PERFORMANCE_LEVEL_COLORS } from "@/lib/constants"
import { MissingValue } from "@/components/MissingValue"
import { cn } from "@/lib/utils"

// Performance level is an ordinal scale (Exceeds > Meets > Approaching > Below),
// so this reads as a small marker + label rather than a generic status pill.
// `variant="plain"` drops the color dot for tables that already encode the
// level visually elsewhere (e.g. a score bar in an adjacent column).
// `emphasis` bumps the label to semibold for columns that are a rollup of
// others in the same table (e.g. an indicator's "Overall" column).
export function PerformanceBadge({ level, variant = "dot", emphasis = false }) {
  if (!level || !PERFORMANCE_LEVEL_COLORS[level]) {
    return <MissingValue />
  }

  const weightClass = emphasis ? "font-semibold" : "font-medium"

  if (variant === "plain") {
    return <span className={cn("text-sm text-muted-foreground", weightClass)}>{level}</span>
  }

  const { bg } = PERFORMANCE_LEVEL_COLORS[level]

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm text-foreground", weightClass)}>
      <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: bg }} aria-hidden="true" />
      {level}
    </span>
  )
}
