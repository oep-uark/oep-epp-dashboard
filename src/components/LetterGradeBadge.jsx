import { PERFORMANCE_LEVEL_COLORS, PERFORMANCE_LEVEL_GRADES } from "@/lib/constants"
import { MissingValue } from "@/components/MissingValue"
import { cn } from "@/lib/utils"

// `size="sm"` is for dense data-table rows (e.g. the EPP Review overview
// table) — a true 32px circle rather than the default's 40px. Row height
// no longer depends on this badge fitting inside a padding-derived box
// (see TABLE_ROW_HEIGHT_CLASS in tableStyles.js): the row is a fixed
// height and align-middle centers the circle within it, so the circle can
// stay round without dictating row height itself.
// Sized up from size-6/size-8 per Josh so "D/F" is legible rather than
// cramped.
const SIZE_CLASSES = {
  default: "size-10 text-base",
  sm: "size-8 text-sm leading-none tracking-tight",
}

// "D/F" is the only multi-character grade — at the single-letter sizes
// above it doesn't fit the circle cleanly, so it drops a step smaller and
// tightens tracking further rather than changing the circle's shape.
const COMPOUND_GRADE_CLASSES = {
  default: "text-sm tracking-tighter",
  sm: "text-[11px] tracking-tighter",
}

export function LetterGradeBadge({ level, missingReason, size = "default" }) {
  if (!level || !PERFORMANCE_LEVEL_COLORS[level]) {
    return <MissingValue reason={missingReason} />
  }

  const { bg, text } = PERFORMANCE_LEVEL_COLORS[level]
  const grade = PERFORMANCE_LEVEL_GRADES[level]
  const isCompoundGrade = grade.length > 1

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold",
        SIZE_CLASSES[size],
        isCompoundGrade && COMPOUND_GRADE_CLASSES[size]
      )}
      style={{ backgroundColor: bg, color: text }}
      title={level}
    >
      {grade}
    </span>
  )
}
