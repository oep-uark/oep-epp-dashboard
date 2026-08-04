import { PERFORMANCE_LEVELS, PERFORMANCE_LEVEL_COLORS } from "@/lib/constants"

function legendRange(label) {
  switch (label) {
    case "Exceeds":
      return "Avg. ≥ 2.67"
    case "Meets":
      return "2.67 > Avg. > 1.67"
    case "Approaching":
      return "1.67 ≥ Avg. > 0.67"
    case "Below":
      return "0.67 ≥ Avg."
    default:
      return ""
  }
}

export function PerformanceLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
      {PERFORMANCE_LEVELS.map(({ label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: PERFORMANCE_LEVEL_COLORS[label].bg }}
            aria-hidden="true"
          />
          <span className="font-medium text-foreground">{label}</span>
          <span>{legendRange(label)}</span>
        </div>
      ))}
    </div>
  )
}
