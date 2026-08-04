import { useMemo, useState } from "react"
import { Info } from "lucide-react"
import { getStandardData } from "@/lib/data"
import { performanceLevelFromScore } from "@/lib/constants"
import { STANDARD_SUMMARY_INDICATORS } from "@/lib/standardSummaryConfig"
import { cn } from "@/lib/utils"
import { PerformanceBadge } from "@/components/PerformanceBadge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Row 1: quiet structural annotation naming each numbered indicator group.
const GROUP_ROW_CLASS = "pt-1.5 pb-0.5 text-[10px] font-normal text-muted-foreground align-bottom"
// Row 2: the primary functional header — Program, Performance Level, and
// each group's "Overall" + criteria columns.
const LEAF_HEAD_CLASS =
  "h-8 border-b border-border pb-1.5 text-xs font-medium text-foreground align-bottom whitespace-nowrap"
const OVERALL_MIN_WIDTH = "min-w-[96px]"
const CRITERION_MIN_WIDTH = "min-w-[84px]"
const OVERALL_TINT_CLASS = "bg-muted/25"
const GROUP_DIVIDER_CLASS = "border-l border-border/50 pl-4"
const STICKY_HEAD_CLASS = "sticky left-0 z-20 bg-background"
const STICKY_CELL_CLASS = "sticky left-0 z-10 bg-background"
// Program's width is fixed (not content-driven, generous enough for the
// longest EPP name without wrapping) so Performance Level, the second
// sticky column, can sit at a predictable `left` offset right after it.
const PROGRAM_COL_WIDTH = "w-96"
const PROGRAM_COL_OFFSET = "left-96"

export function StandardSummaryTable({ standardNumber, programType }) {
  const [scrolled, setScrolled] = useState(false)
  const indicators = STANDARD_SUMMARY_INDICATORS[standardNumber]

  const rows = useMemo(() => {
    const all = getStandardData()
    return all
      .filter((row) => row.type === programType)
      .sort((a, b) =>
        (a["EPP Name"] ?? "").toLowerCase().localeCompare((b["EPP Name"] ?? "").toLowerCase())
      )
  }, [programType])

  // Performance Level is the last sticky column before the scrolling
  // region, so it's the one that gets the boundary shadow once scrolled.
  const perfLevelStickyClass = cn(
    PROGRAM_COL_OFFSET,
    scrolled && "border-r border-border shadow-[6px_0_8px_-6px_rgba(0,0,0,0.18)]"
  )

  return (
    <Table
      onScroll={(e) => setScrolled(e.currentTarget.scrollLeft > 4)}
    >
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow className="hover:bg-transparent">
          <TableHead
            rowSpan={2}
            className={cn(LEAF_HEAD_CLASS, STICKY_HEAD_CLASS, PROGRAM_COL_WIDTH, "align-bottom")}
          >
            Program
          </TableHead>
          <TableHead
            rowSpan={2}
            className={cn(LEAF_HEAD_CLASS, STICKY_HEAD_CLASS, perfLevelStickyClass, "pr-6 align-bottom")}
          >
            Performance Level
          </TableHead>
          {indicators.map((indicator) => (
            <TableHead
              key={indicator.subtotalKey}
              colSpan={1 + indicator.criteria.length}
              className={cn(GROUP_ROW_CLASS, GROUP_DIVIDER_CLASS)}
            >
              {indicator.number} {indicator.name}
            </TableHead>
          ))}
        </TableRow>
        <TableRow className="hover:bg-transparent">
          {indicators.flatMap((indicator) => [
            <TableHead
              key={indicator.subtotalKey}
              className={cn(LEAF_HEAD_CLASS, GROUP_DIVIDER_CLASS, OVERALL_MIN_WIDTH, OVERALL_TINT_CLASS)}
            >
              Overall
            </TableHead>,
            ...indicator.criteria.map((c) => (
              <TableHead key={c.key} className={cn(LEAF_HEAD_CLASS, CRITERION_MIN_WIDTH)}>
                <Tooltip>
                  <TooltipTrigger className="inline-flex cursor-default items-center gap-1 outline-none">
                    {c.shortLabel}
                    <Info className="size-3 shrink-0 text-muted-foreground/70" />
                  </TooltipTrigger>
                  <TooltipContent>{c.fullText}</TooltipContent>
                </Tooltip>
              </TableHead>
            )),
          ])}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row["Lookup Code"]} className="border-border/40">
            <TableCell className={cn("py-3", STICKY_CELL_CLASS, PROGRAM_COL_WIDTH)}>
              <span className="whitespace-nowrap text-foreground">{row["EPP Name"]}</span>
            </TableCell>
            <TableCell className={cn("py-3", STICKY_CELL_CLASS, perfLevelStickyClass, "pr-6")}>
              <PerformanceBadge level={row[`Standard ${standardNumber} Performance Level`]} emphasis />
            </TableCell>
            {indicators.flatMap((indicator) => [
              <TableCell
                key={indicator.subtotalKey}
                className={cn("py-3", GROUP_DIVIDER_CLASS, OVERALL_MIN_WIDTH, OVERALL_TINT_CLASS)}
              >
                <PerformanceBadge
                  level={performanceLevelFromScore(row[indicator.subtotalKey])}
                  emphasis
                />
              </TableCell>,
              ...indicator.criteria.map((c) => (
                <TableCell key={c.key} className={cn("py-3", CRITERION_MIN_WIDTH)}>
                  <PerformanceBadge level={performanceLevelFromScore(row[c.key])} variant="plain" />
                </TableCell>
              )),
            ])}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
