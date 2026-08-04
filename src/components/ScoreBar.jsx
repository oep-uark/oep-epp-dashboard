import { PERFORMANCE_LEVEL_COLORS } from "@/lib/constants"
import { MissingValue } from "@/components/MissingValue"

// Average Performance Score is on a 0-3 scale. This is a static bar-chart
// cell, not a slider — flat rectangular fill, no rounded track/thumb.
export function ScoreBar({ score, level }) {
  if (score === null || score === undefined) {
    return <MissingValue />
  }

  const colors = PERFORMANCE_LEVEL_COLORS[level] ?? { bg: "#C7C8C9" }
  const widthPct = Math.max(0, Math.min(100, (score / 3) * 100))

  return (
    <div className="flex w-28 items-center gap-2">
      <div className="h-2 w-full overflow-hidden bg-secondary">
        <div className="h-full" style={{ width: `${widthPct}%`, backgroundColor: colors.bg }} />
      </div>
      <span className="w-10 shrink-0 text-right text-sm font-semibold tabular-nums text-foreground">
        {score.toFixed(2)}
      </span>
    </div>
  )
}
