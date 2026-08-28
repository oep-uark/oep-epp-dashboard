import { useMemo } from "react"
import { FileText } from "lucide-react"
import { getScienceOfReadingData, getReportLink } from "@/lib/data"
import { performanceLevelFromScore, SHOW_LETTER_GRADES } from "@/lib/constants"
import { useProgramType } from "@/lib/ProgramTypeContext"
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

const HEAD_LINK_CLASS = "text-left hover:text-primary hover:underline"

// The state has yet to decide how it wants to aggregate an overall Science
// of Reading score, so that column is hidden here for now - separate from
// SHOW_LETTER_GRADES since it's specific to this page, not part of the
// broader letter-grade rollout.
const SHOW_OVERALL_PERFORMANCE_LEVEL = false

const AREA_HEAD_LABELS = {
  1: "Quality of Literacy Coursework",
  2: "Field-Based Experiences",
  3: "Continuous Improvement",
}

const DESCRIPTION =
  "Evaluates how EPPs prepare candidates to teach evidence-based reading instruction, " +
  "scored across three review areas."

export function ScienceOfReadingOverviewTable({ onNavigateToArea }) {
  const { programType, setProgramType } = useProgramType()
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
        title="Science of Reading Performance Summary"
        description={DESCRIPTION}
        programType={programType}
        onProgramTypeChange={setProgramType}
      />

      <div className="mt-6">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[20%]")}>Provider</TableHead>
              {/* Widths are all 20% for the 5 columns visible with letter
                  grades and the overall performance level hidden. Turning
                  either flag back on adds a column, so these widths need
                  rebalancing too - table-fixed % widths don't resize on
                  their own. */}
              {SHOW_LETTER_GRADES && (
                <TableHead className={cn(TABLE_HEAD_CLASS, "w-[20%] whitespace-normal text-center")}>
                  Letter Grade
                </TableHead>
              )}
              {SHOW_OVERALL_PERFORMANCE_LEVEL && (
                <TableHead className={cn(TABLE_HEAD_CLASS, "w-[20%] whitespace-normal")}>
                  Overall Performance Level
                </TableHead>
              )}
              {[1, 2, 3].map((n) => (
                <TableHead
                  key={n}
                  className={cn(TABLE_HEAD_CLASS, "w-[20%] whitespace-normal")}
                >
                  <button type="button" className={HEAD_LINK_CLASS} onClick={() => onNavigateToArea(n)}>
                    {AREA_HEAD_LABELS[n]}
                  </button>
                </TableHead>
              ))}
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[20%] whitespace-normal")}>
                Download Latest Report
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const reportLink = getReportLink(row["Lookup Code"], "sorReport")

              return (
                <TableRow
                  key={row["Lookup Code"]}
                  className={cn(TABLE_ROW_HEIGHT_CLASS, TABLE_ROW_CLASS)}
                >
                  <TableCell className="py-0 whitespace-nowrap text-foreground">
                    {row["EPP Name"]}
                  </TableCell>
                  {SHOW_LETTER_GRADES && (
                    <TableCell className="py-0 text-center">
                      <LetterGradeBadge level={scienceOfReadingOverallLevel(row)} size="sm" />
                    </TableCell>
                  )}
                  {SHOW_OVERALL_PERFORMANCE_LEVEL && (
                    <TableCell className="py-0">
                      <PerformanceBadge level={scienceOfReadingOverallLevel(row)} emphasis />
                    </TableCell>
                  )}
                  {[1, 2, 3].map((n) => (
                    <TableCell key={n} className="py-0">
                      <PerformanceBadge
                        level={performanceLevelFromScore(row[SCIENCE_OF_READING_AREAS[n].scoreKey])}
                      />
                    </TableCell>
                  ))}
                  <TableCell className="py-0">
                    {reportLink ? (
                      <a
                        href={`${import.meta.env.BASE_URL}${reportLink}`}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1 text-foreground",
                          HEAD_LINK_CLASS
                        )}
                      >
                        <FileText className="size-3.5" aria-hidden="true" />
                        Report
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
