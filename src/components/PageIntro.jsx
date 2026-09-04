import { cn } from "@/lib/utils"
import { TOGGLE_ITEM_CLASS } from "@/lib/tableStyles"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Shared page-intro block for the EPP Review Overview and each Standard
// page: serif title, sans-serif description, Traditional/Alternative
// control pinned to the top of the block (not centered against the full
// title+description height). Toggle is omitted when the page doesn't split
// by program type (e.g. an Institution Grade Summary view) — pass no
// onProgramTypeChange.
export function PageIntro({
  title,
  description,
  programType,
  onProgramTypeChange,
  clampDescription = true,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-heading text-xl font-medium text-foreground">{title}</h1>
        {/* Fixed to exactly 2 lines (min-h floors it, line-clamp caps it) so the
            block is the same height on every page regardless of description
            length — otherwise content below jumps as you switch standards.
            Pages whose description never changes in place (it's not swapped
            via a standard/area toggle) don't need that guard and can pass
            clampDescription={false} for a full, unclamped description. */}
        <p
          className={cn(
            "mt-1.5 max-w-3xl text-sm text-muted-foreground",
            clampDescription && "line-clamp-2 min-h-10"
          )}
        >
          {description}
        </p>
        {/* Always visible, not folded into the description above - that text is
            clamped to 2 lines on most pages, and this needs to hold steady
            regardless of description length. */}
        <p className="mt-3 max-w-3xl text-xs text-muted-foreground">
          A dash (—) indicates a review has not yet been completed, or that the provider does not
          offer a program eligible for review.
        </p>
      </div>

      {onProgramTypeChange && (
        <ToggleGroup
          value={[programType]}
          onValueChange={(value) => value.length && onProgramTypeChange(value[0])}
          spacing={0}
          variant="outline"
          size="sm"
          aria-label="Program type"
          className="shrink-0"
        >
          <ToggleGroupItem value="Traditional" className={TOGGLE_ITEM_CLASS}>
            Traditional
          </ToggleGroupItem>
          <ToggleGroupItem value="Alternative" className={TOGGLE_ITEM_CLASS}>
            Alternative
          </ToggleGroupItem>
        </ToggleGroup>
      )}
    </div>
  )
}
