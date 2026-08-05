import { PERFORMANCE_LEVEL_COLORS, PERFORMANCE_LEVEL_GRADES } from "@/lib/constants"
import { MissingValue } from "@/components/MissingValue"
import { cn } from "@/lib/utils"

// `size="sm"` is for dense data-table rows (e.g. the EPP Review overview
// table) — a true 24px circle rather than the default's 32px. Row height
// no longer depends on this badge fitting inside a padding-derived box
// (see TABLE_ROW_HEIGHT_CLASS in tableStyles.js): the row is a fixed
// height and align-middle centers the circle within it, so the circle can
// stay round without dictating row height itself.
const SIZE_CLASSES = {
  default: "size-8 text-sm",
  sm: "size-6 text-[10px] leading-none tracking-tight",
}

export function LetterGradeBadge({ level, missingReason, size = "default" }) {
  if (!level || !PERFORMANCE_LEVEL_COLORS[level]) {
    return <MissingValue reason={missingReason} />
  }

  const { bg, text } = PERFORMANCE_LEVEL_COLORS[level]

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold",
        SIZE_CLASSES[size]
      )}
      style={{ backgroundColor: bg, color: text }}
      title={level}
    >
      {PERFORMANCE_LEVEL_GRADES[level]}
    </span>
  )
}
