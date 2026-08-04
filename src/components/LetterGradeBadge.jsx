import { PERFORMANCE_LEVEL_COLORS, PERFORMANCE_LEVEL_GRADES } from "@/lib/constants"
import { MissingValue } from "@/components/MissingValue"

export function LetterGradeBadge({ level, missingReason }) {
  if (!level || !PERFORMANCE_LEVEL_COLORS[level]) {
    return <MissingValue reason={missingReason} />
  }

  const { bg, text } = PERFORMANCE_LEVEL_COLORS[level]

  return (
    <span
      className="inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold"
      style={{ backgroundColor: bg, color: text }}
      title={level}
    >
      {PERFORMANCE_LEVEL_GRADES[level]}
    </span>
  )
}
