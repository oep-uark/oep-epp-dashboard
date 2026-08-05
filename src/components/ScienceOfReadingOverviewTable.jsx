import { useMemo, useState } from "react"
import { getScienceOfReadingData } from "@/lib/data"
import { performanceLevelFromScore } from "@/lib/constants"
import {
  SCIENCE_OF_READING_AREAS,
  PROGRAM_TYPE_ABBR,
  scienceOfReadingOverallLevel,
} from "@/lib/scienceOfReadingConfig"
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
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[20%]")}>Program</TableHead>
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[16%] whitespace-normal text-center")}>
                Letter Grade
              </TableHead>
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[16%] whitespace-normal")}>
                Overall Performance Level
              </TableHead>
              {[1, 2, 3].map((n) => (
                <TableHead
                  key={n}
                  className={cn(TABLE_HEAD_CLASS, "w-[16%] whitespace-normal")}
                >
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
                <TableCell className="py-0 text-center">
                  <LetterGradeBadge level={scienceOfReadingOverallLevel(row)} size="sm" />
                </TableCell>
                <TableCell className="py-0">
                  <PerformanceBadge level={scienceOfReadingOverallLevel(row)} emphasis />
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
