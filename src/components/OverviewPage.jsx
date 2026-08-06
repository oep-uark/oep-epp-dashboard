import { useMemo } from "react"
import { getOverallScores, getScienceOfReadingData } from "@/lib/data"
import { averageLevels } from "@/lib/constants"
import { scienceOfReadingOverallLevel } from "@/lib/scienceOfReadingConfig"
import { cn } from "@/lib/utils"
import { LetterGradeBadge } from "@/components/LetterGradeBadge"
import { TABLE_HEAD_CLASS, TABLE_ROW_CLASS, TABLE_ROW_HEIGHT_CLASS } from "@/lib/tableStyles"
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
// missing-value dash all share this) so the columns read as precise
// vertical rails. Overall Grade's header gets one step more weight than the
// others so it stays visually primary without any shading or divider.
const GRADE_HEAD_CLASS = cn(TABLE_HEAD_CLASS, "w-[20%] text-center")
const GRADE_CELL_CLASS = "py-0 text-center"

export function OverviewPage() {
  const rows = useMemo(() => {
    // Institution-level: Traditional and Alternative are no longer separate
    // rows here, so each review's grade is first averaged across a given
    // institution's two program types (same GPA-average logic as the
    // Overall column below), then those per-review grades are averaged
    // again into one Overall Grade per institution.
    const byEppCode = new Map()

    for (const row of getOverallScores()) {
      const code = row["EPP Code"]
      const institution = byEppCode.get(code) ?? { key: code, eppName: row["EPP Name"] }
      if (row.type === "Traditional") institution.eppTraditionalLevel = row["Overall Performance Level"]
      if (row.type === "Alternative") institution.eppAlternativeLevel = row["Overall Performance Level"]
      byEppCode.set(code, institution)
    }

    for (const row of getScienceOfReadingData()) {
      const code = row["EPP Code"]
      const institution = byEppCode.get(code) ?? { key: code, eppName: row["EPP Name"] }
      const level = scienceOfReadingOverallLevel(row)
      if (row["Program Type"] === "Tra") institution.sorTraditionalLevel = level
      if (row["Program Type"] === "Alt") institution.sorAlternativeLevel = level
      byEppCode.set(code, institution)
    }

    return Array.from(byEppCode.values())
      .map((institution) => {
        const eppLevel = averageLevels(institution.eppTraditionalLevel, institution.eppAlternativeLevel)
        const sorLevel = averageLevels(institution.sorTraditionalLevel, institution.sorAlternativeLevel)
        return {
          ...institution,
          eppLevel,
          sorLevel,
          overallLevel: averageLevels(eppLevel, sorLevel),
        }
      })
      .sort((a, b) => (a.eppName ?? "").toLowerCase().localeCompare((b.eppName ?? "").toLowerCase()))
  }, [])

  return (
    <div>
      <div>
        <h1 className="font-heading text-xl font-medium text-foreground">Grade Summary</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          This dashboard provides a comprehensive look at educator preparation quality through
          multiple state reviews. Use the tabs above to see the details behind each review grade.
        </p>
      </div>

      <div className="mt-6">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[20%]")}>Program</TableHead>
              <TableHead className={cn(GRADE_HEAD_CLASS, "font-bold")}>Overall Grade</TableHead>
              <TableHead className={GRADE_HEAD_CLASS}>Teacher Program Review</TableHead>
              <TableHead className={GRADE_HEAD_CLASS}>Science of Reading Review</TableHead>
              <TableHead className={GRADE_HEAD_CLASS}>Leadership Program Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key} className={cn(TABLE_ROW_HEIGHT_CLASS, TABLE_ROW_CLASS)}>
                <TableCell className="py-0 whitespace-nowrap text-foreground">
                  {row.eppName}
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge level={row.overallLevel} size="sm" />
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge level={row.eppLevel} size="sm" />
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge
                    level={row.sorLevel}
                    missingReason={SOR_MISSING_REASON}
                    size="sm"
                  />
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <span className="text-sm text-muted-foreground">-</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
