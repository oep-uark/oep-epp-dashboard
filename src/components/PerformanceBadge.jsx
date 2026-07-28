import { PERFORMANCE_LEVEL_COLORS } from "@/lib/constants"

export function PerformanceBadge({ level }) {
  if (!level || !PERFORMANCE_LEVEL_COLORS[level]) {
    return <span className="text-muted-foreground text-sm">—</span>
  }

  const { bg, text } = PERFORMANCE_LEVEL_COLORS[level]

  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: bg, color: text }}
    >
      {level}
    </span>
  )
}
