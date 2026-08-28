import { useMemo } from "react"
import { FileText } from "lucide-react"
import { getOverallScores, getReportLink } from "@/lib/data"
import { SHOW_LETTER_GRADES } from "@/lib/constants"
import { useProgramType } from "@/lib/ProgramTypeContext"
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
  "The Teacher Pathways Review sets a shared vision and bar for high-quality educator " +
  "preparation to ensure teacher candidates are ready to meet students' needs on day one."

export function EppOverviewTable({ onNavigateToStandard }) {
  const { programType, setProgramType } = useProgramType()

  const rows = useMemo(() => {
    const all = getOverallScores()
    return all
      .filter((row) => row.type === programType)
      .sort((a, b) =>
        (a["EPP Name"] ?? "").toLowerCase().localeCompare((b["EPP Name"] ?? "").toLowerCase())
      )
  }, [programType])

  return (
    <div>
      <PageIntro
        title="Teacher Pathways Performance Summary"
        description={DESCRIPTION}
        programType={programType}
        onProgramTypeChange={setProgramType}
      />

      <div className="mt-6">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[18%]")}>Provider</TableHead>
              {/* Widths: 18% Provider, 17% for each of the 4 score columns,
                  14% Report - sums to 100 with letter grades hidden.
                  Re-enabling SHOW_LETTER_GRADES adds a column, so these need
                  rebalancing too, not just the flag - table-fixed % widths
                  don't resize on their own. */}
              {SHOW_LETTER_GRADES && (
                <TableHead className={cn(TABLE_HEAD_CLASS, "w-[17%] whitespace-normal text-center")}>
                  Letter Grade
                </TableHead>
              )}
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[17%] whitespace-normal")}>
                Overall Performance Level
              </TableHead>
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[17%] whitespace-normal")}>
                <button
                  type="button"
                  className={HEAD_LINK_CLASS}
                  onClick={() => onNavigateToStandard(1)}
                >
                  Recruitment & Completion
                </button>
              </TableHead>
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[17%] whitespace-normal")}>
                <button
                  type="button"
                  className={HEAD_LINK_CLASS}
                  onClick={() => onNavigateToStandard(2)}
                >
                  Preparing Candidates Effectively
                </button>
              </TableHead>
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[17%] whitespace-normal")}>
                <button
                  type="button"
                  className={HEAD_LINK_CLASS}
                  onClick={() => onNavigateToStandard(3)}
                >
                  Supporting Workforce Needs
                </button>
              </TableHead>
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[14%] whitespace-normal")}>
                Report
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const reportLink = getReportLink(row["Lookup Code"], "pathwaysReport")

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
                      <LetterGradeBadge level={row["Overall Performance Level"]} size="sm" />
                    </TableCell>
                  )}
                  <TableCell className="py-0">
                    <PerformanceBadge level={row["Overall Performance Level"]} emphasis />
                  </TableCell>
                  <TableCell className="py-0">
                    <PerformanceBadge level={row["Standard 1 Performance Level"]} />
                  </TableCell>
                  <TableCell className="py-0">
                    <PerformanceBadge level={row["Standard 2 Performance Level"]} />
                  </TableCell>
                  <TableCell className="py-0">
                    <PerformanceBadge level={row["Standard 3 Performance Level"]} />
                  </TableCell>
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
