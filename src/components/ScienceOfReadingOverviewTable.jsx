import { useMemo, useState } from "react"
import { getScienceOfReadingData } from "@/lib/data"
import { performanceLevelFromScore } from "@/lib/constants"
import { SCIENCE_OF_READING_AREAS, PROGRAM_TYPE_ABBR } from "@/lib/scienceOfReadingConfig"
import { cn } from "@/lib/utils"
import { PageIntro } from "@/components/PageIntro"
import { LetterGradeBadge } from "@/components/LetterGradeBadge"
import { PerformanceBadge } from "@/components/PerformanceBadge"
import { TABLE_HEAD_CLASS, TABLE_ROW_CLASS, TABLE_ROW_HEIGHT_CLASS } from "@/lib/tableStyles"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const HEAD_LINK_CLASS = "hover:text-primary hover:underline"

const DESCRIPTION =
  "Evaluates how EPPs prepare candidates to teach evidence-based reading instruction, " +
  "scored across three review areas."

// The sheet has no single field that already blends all three review areas, so
// the overall grade is the average of Review Area 1/2/3 (already rescaled to
// 0-3 in science_of_reading.json), run through the same thresholds as
// everything else - confirmed with Roy against a worked example (Southern
// Arkansas University: RA1 4, RA2 3, RA3 3 on the raw 1-4 scale -> avg 3.33 ->
// "Meets"/B).
function overallLevel(row) {
  const scores = [row["REVIEW AREA 1"], row["REVIEW AREA 2"], row["REVIEW AREA 3"]].filter(
    (v) => v !== null && v !== undefined
  )
  if (scores.length === 0) return null
  const avg = scores.reduce((sum, v) => sum + v, 0) / scores.length
  return performanceLevelFromScore(avg)
}

export function ScienceOfReadingOverviewTable({ onNavigateToArea }) {
  const [programType, setProgramType] = useState("Traditional")
  const typeAbbr = PROGRAM_TYPE_ABBR[programType]

  const rows = useMemo(() => {
    const all = getScienceOfReadingData()
    return all
      .filter((row) => row["Program Type"] === typeAbbr)
      .sort((a, b) =>
        (a["EPP Name"] ?? "").toLowerCase().localeCompare((b["EPP Name"] ?? "").toLowerCase())
      )
  }, [typeAbbr])

  return (
    <div>
      <PageIntro
        title="Science of Reading Score Overview"
        description={DESCRIPTION}
        programType={programType}
        onProgramTypeChange={setProgramType}
      />

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={TABLE_HEAD_CLASS}>Program</TableHead>
              <TableHead className={TABLE_HEAD_CLASS}>Letter Grade</TableHead>
              <TableHead className={TABLE_HEAD_CLASS}>Overall Performance Level</TableHead>
              {[1, 2, 3].map((n) => (
                <TableHead key={n} className={TABLE_HEAD_CLASS}>
                  <button type="button" className={HEAD_LINK_CLASS} onClick={() => onNavigateToArea(n)}>
                    {SCIENCE_OF_READING_AREAS[n].number}
                  </button>
                </TableHead>
              ))}
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
                <TableCell className="py-0">
                  <LetterGradeBadge level={overallLevel(row)} size="sm" />
                </TableCell>
                <TableCell className="py-0">
                  <PerformanceBadge level={overallLevel(row)} emphasis />
                </TableCell>
                {[1, 2, 3].map((n) => (
                  <TableCell key={n} className="py-0">
                    <PerformanceBadge
                      level={performanceLevelFromScore(row[SCIENCE_OF_READING_AREAS[n].scoreKey])}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
