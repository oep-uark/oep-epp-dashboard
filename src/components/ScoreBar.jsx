import { PERFORMANCE_LEVEL_COLORS } from "@/lib/constants"

// Average Performance Score is on a 0-3 scale; bar fill mirrors the Shiny
// app's progress bar (width = score/3, colored by Overall Performance Level).
export function ScoreBar({ score, level }) {
  if (score === null || score === undefined) {
    return <span className="text-muted-foreground text-sm">—</span>
  }

  const colors = PERFORMANCE_LEVEL_COLORS[level] ?? { bg: "#C7C8C9", text: "#464648" }
  const widthPct = Math.max(0, Math.min(100, (score / 3) * 100))

  return (
    <div className="flex w-24 items-center gap-2">
      <div className="bg-secondary h-3 w-full overflow-hidden rounded-full">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${widthPct}%`, backgroundColor: colors.bg }}
        />
      </div>
      <span className="text-foreground w-9 shrink-0 text-right text-xs font-semibold tabular-nums">
        {score.toFixed(2)}
      </span>
    </div>
  )
}
