import { useMemo, useState } from "react"
import { getOverallScores, getScienceOfReadingData } from "@/lib/data"
import { averagePerformanceLevels } from "@/lib/constants"
import { scienceOfReadingOverallLevel } from "@/lib/scienceOfReadingConfig"
import { cn } from "@/lib/utils"
import { LetterGradeBadge } from "@/components/LetterGradeBadge"
import {
  TABLE_HEAD_CLASS,
  TABLE_ROW_CLASS,
  TABLE_ROW_HEIGHT_CLASS,
  TOGGLE_ITEM_CLASS,
} from "@/lib/tableStyles"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SOR_MISSING_REASON = "No Science of Reading data for this program yet."

// Grade columns hold a single small circle each, so left-alignment left them
// looking stranded — centered top-to-bottom (header label, badge, and
// missing-value dash all share this) so the three columns read as precise
// vertical rails. Overall Grade's header gets one step more weight than the
// other two so it stays visually primary without any shading or divider.
const GRADE_HEAD_CLASS = cn(TABLE_HEAD_CLASS, "w-[26.6%] text-center")
const GRADE_CELL_CLASS = "py-0 text-center"

export function OverviewPage() {
  const [programType, setProgramType] = useState("Traditional")

  const rows = useMemo(() => {
    const sorByLookupCode = new Map(
      getScienceOfReadingData().map((row) => [row["Lookup Code"], row])
    )

    return getOverallScores()
      .filter((row) => row.type === programType)
      .map((row) => {
        const sorRow = sorByLookupCode.get(row["Lookup Code"])
        const eppLevel = row["Overall Performance Level"]
        const sorLevel = sorRow ? scienceOfReadingOverallLevel(sorRow) : null
        // Overall grade is a GPA average of the two component grades. If a
        // program is missing one side (e.g. Alt1247 has no Science of
        // Reading data; Tra6208/Alt6321/Alt6866 have no EPP Review grade),
        // fall back to whichever grade it does have rather than showing
        // missing — per Roy.
        let overallLevel
        if (eppLevel && sorLevel) {
          overallLevel = averagePerformanceLevels(eppLevel, sorLevel)
        } else {
          overallLevel = eppLevel ?? sorLevel
        }
        return { ...row, sorLevel, overallLevel }
      })
      .sort((a, b) =>
        (a["EPP Name"] ?? "").toLowerCase().localeCompare((b["EPP Name"] ?? "").toLowerCase())
      )
  }, [programType])

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-xl font-medium text-foreground">Overview</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            A combined look at each program's EPP State Review and Science of Reading results.
            See the EPP State Review and Science of Reading tabs for the full breakdown behind
            each grade.
          </p>
        </div>

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

      <div className="mt-6">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[20%]")}>Program</TableHead>
              <TableHead className={cn(GRADE_HEAD_CLASS, "font-bold")}>Overall Grade</TableHead>
              <TableHead className={GRADE_HEAD_CLASS}>EPP Review Grade</TableHead>
              <TableHead className={GRADE_HEAD_CLASS}>Science of Reading Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row["Lookup Code"]}
                className={cn(TABLE_ROW_HEIGHT_CLASS, TABLE_ROW_CLASS)}
              >
                <TableCell className="py-0 whitespace-nowrap text-foreground">
                  {row["EPP Name"]}
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge level={row.overallLevel} size="sm" />
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge level={row["Overall Performance Level"]} size="sm" />
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge
                    level={row.sorLevel}
                    missingReason={SOR_MISSING_REASON}
                    size="sm"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
