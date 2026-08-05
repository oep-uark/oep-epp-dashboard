import { useState } from "react"
import { StandardSummaryTable } from "@/components/StandardSummaryTable"
import { TOGGLE_ITEM_CLASS } from "@/lib/tableStyles"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const STANDARD_TITLES = {
  1: "Standard 1 - Candidate Recruitment and Completion",
  2: "Standard 2 - Preparing Candidates Effectively",
  3: "Standard 3 - Supporting Workforce Needs",
}

export function StandardPage({ standardNumber }) {
  const [programType, setProgramType] = useState("Traditional")

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold text-foreground">{STANDARD_TITLES[standardNumber]}</h1>

        <ToggleGroup
          value={[programType]}
          onValueChange={(value) => value.length && setProgramType(value[0])}
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
      </div>

      <div className="mt-1.5">
        <StandardSummaryTable standardNumber={standardNumber} programType={programType} />
      </div>
    </div>
  )
}
