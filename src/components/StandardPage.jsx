import { useState } from "react"
import { StandardSummaryTable } from "@/components/StandardSummaryTable"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const TOGGLE_ITEM_CLASS =
  "aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:font-semibold"

const STANDARD_TITLES = {
  1: "Standard 1 - Candidate Recruitment and Completion",
  2: "Standard 2 - Preparing Candidates Effectively",
  3: "Standard 3 - Supporting Workforce Needs",
}

export function StandardPage({ standardNumber }) {
  const [subView, setSubView] = useState("summary")
  const [programType, setProgramType] = useState("Traditional")

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold text-foreground">{STANDARD_TITLES[standardNumber]}</h1>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <ToggleGroup
            value={[programType]}
            onValueChange={(value) => value.length && setProgramType(value[0])}
            spacing={0}
            variant="outline"
            size="sm"
            aria-label="Program type"
          >
            <ToggleGroupItem value="Traditional" className={TOGGLE_ITEM_CLASS}>
              Traditional
            </ToggleGroupItem>
            <ToggleGroupItem value="Alternative" className={TOGGLE_ITEM_CLASS}>
              Alternative
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup
            value={[subView]}
            onValueChange={(value) => value.length && setSubView(value[0])}
            spacing={0}
            variant="outline"
            size="sm"
            aria-label="Summary or detail view"
          >
            <ToggleGroupItem value="summary" className={TOGGLE_ITEM_CLASS}>
              Summary
            </ToggleGroupItem>
            <ToggleGroupItem value="detail" className={TOGGLE_ITEM_CLASS}>
              Detail
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="mt-3">
        {subView === "summary" && (
          <StandardSummaryTable standardNumber={standardNumber} programType={programType} />
        )}
        {subView === "detail" && (
          <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <p className="text-sm text-muted-foreground">Detail view — coming next.</p>
          </div>
        )}
      </div>
    </div>
  )
}
