import { useMemo, useState } from "react"
import { getScienceOfReadingData } from "@/lib/data"
import { performanceLevelFromScore } from "@/lib/constants"
import { SCIENCE_OF_READING_AREAS, PROGRAM_TYPE_ABBR } from "@/lib/scienceOfReadingConfig"
import { TABLE_ROW_HEIGHT_CLASS } from "@/lib/tableStyles"
import { cn } from "@/lib/utils"
import { PerformanceBadge } from "@/components/PerformanceBadge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const LEAF_HEAD_CLASS =
  "h-8 border-b border-border pb-1.5 text-sm font-semibold text-foreground align-bottom whitespace-nowrap"
const CRITERION_MIN_WIDTH = "min-w-[140px]"
const STICKY_HEAD_CLASS = "sticky left-0 z-20 bg-background"
const STICKY_CELL_CLASS = "sticky left-0 z-10 bg-background transition-colors group-hover:bg-muted"
const PROGRAM_COL_WIDTH = "w-[340px] min-w-[340px] max-w-[340px]"
const PROGRAM_COL_OFFSET = "left-[340px]"
const PERF_LEVEL_COL_WIDTH = "w-44 min-w-44 max-w-44"

// Single-group version of StandardSummaryTable's two-tier header - each
// Science of Reading review area is its own page, so there's only ever one
// group of criteria on screen and no need for the group-label row.
export function ScienceOfReadingAreaTable({ areaNumber, programType }) {
  const [scrolled, setScrolled] = useState(false)
  const area = SCIENCE_OF_READING_AREAS[areaNumber]
  const typeAbbr = PROGRAM_TYPE_ABBR[programType]

  const rows = useMemo(() => {
    const all = getScienceOfReadingData()
    return all
      .filter((row) => row["Program Type"] === typeAbbr)
      .sort((a, b) =>
        (a["EPP Name"] ?? "").toLowerCase().localeCompare((b["EPP Name"] ?? "").toLowerCase())
      )
  }, [typeAbbr])

  const perfLevelStickyClass = cn(
    PROGRAM_COL_OFFSET,
    scrolled && "border-r border-border shadow-[6px_0_8px_-6px_rgba(0,0,0,0.18)]"
  )

  return (
    <Table onScroll={(e) => setScrolled(e.currentTarget.scrollLeft > 4)}>
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow className="hover:bg-transparent">
          <TableHead className={cn(LEAF_HEAD_CLASS, STICKY_HEAD_CLASS, PROGRAM_COL_WIDTH)}>
            Provider
          </TableHead>
          <TableHead
            className={cn(
              LEAF_HEAD_CLASS,
              STICKY_HEAD_CLASS,
              perfLevelStickyClass,
              PERF_LEVEL_COL_WIDTH,
              "pr-4"
            )}
          >
            Performance Level
          </TableHead>
          {area.criteria.map((c) => (
            <TableHead key={c.key} className={cn(LEAF_HEAD_CLASS, CRITERION_MIN_WIDTH)}>
              {c.shortLabel}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row["Lookup Code"]}
            className={cn(TABLE_ROW_HEIGHT_CLASS, "group border-border/40 hover:bg-muted")}
          >
            <TableCell className={cn("py-0", STICKY_CELL_CLASS, PROGRAM_COL_WIDTH)}>
              <span className="whitespace-nowrap text-foreground">{row["EPP Name"]}</span>
            </TableCell>
            <TableCell
              className={cn("py-0", STICKY_CELL_CLASS, perfLevelStickyClass, PERF_LEVEL_COL_WIDTH, "pr-4")}
            >
              <PerformanceBadge level={performanceLevelFromScore(row[area.levelKey])} emphasis />
            </TableCell>
            {area.criteria.map((c) => (
              <TableCell key={c.key} className="py-0">
                <PerformanceBadge level={performanceLevelFromScore(row[c.key])} variant="plain" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
