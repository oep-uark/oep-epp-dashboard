import { PERFORMANCE_LEVEL_COLORS } from "@/lib/constants"
import { MissingValue } from "@/components/MissingValue"

// Performance level is an ordinal scale (Exceeds > Meets > Approaching > Below),
// so this reads as a small marker + label rather than a generic status pill.
export function PerformanceBadge({ level }) {
  if (!level || !PERFORMANCE_LEVEL_COLORS[level]) {
    return <MissingValue />
  }

  const { bg } = PERFORMANCE_LEVEL_COLORS[level]

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
      <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: bg }} aria-hidden="true" />
      {level}
    </span>
  )
}
