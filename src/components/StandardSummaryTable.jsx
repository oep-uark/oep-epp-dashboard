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
// Explicit h-6 overrides TableHead's default h-10 — without it the row
// renders 40px tall despite 11px of text, which is most of what reads as
// "empty space above the table."
// Row 1 outer cell: layout only. The hairline lives on an inner span
// (GROUP_LABEL_CLASS below) rather than the cell itself — adjacent header
// cells touch edge-to-edge with no gap between their border boxes, so a
// rule drawn on the cell would run straight into the next group's rule
// with no break. Sizing it to the inner content box instead means it
// naturally stops at the cell's padding, leaving a real gap at each
// group boundary (widened further where GROUP_GUTTER_CLASS applies).
const GROUP_ROW_CLASS = "h-6 align-bottom"
// Box-shadow rather than border-b — this cell sits next to the
// rowSpan={2} Program/Performance Level cells and the browser's table
// border-collapse algorithm was silently dropping a border-b here;
// box-shadow isn't part of that model, so it always paints.
const GROUP_LABEL_CLASS =
  "block pb-1 text-left text-[11px] font-medium text-foreground/70 shadow-[inset_0_-1px_0_0_color-mix(in_srgb,var(--color-border)_87%,transparent)]"
// Row 2: the primary functional header — Program, Performance Level, and
// each group's "Overall" + criteria columns.
const LEAF_HEAD_CLASS =
  "h-8 border-b border-border pb-1.5 text-sm font-semibold text-foreground align-bottom whitespace-nowrap"
const OVERALL_MIN_WIDTH = "min-w-[96px]"
const CRITERION_MIN_WIDTH = "min-w-[84px]"
const STICKY_HEAD_CLASS = "sticky left-0 z-20 bg-background"
// Sticky cells carry their own opaque background so scrolled content can't
// show through underneath them — group-hover swaps it to the same solid
// color the rest of the row uses on hover (a plain alpha overlay wouldn't
// stay opaque enough to keep hiding what's scrolled behind it). Needs its
// own transition-colors — the row's transition doesn't reach a background
// painted directly on the cell, so without this the sticky cells snapped
// to the hover color instantly while the rest of the row faded in.
const STICKY_CELL_CLASS = "sticky left-0 z-10 bg-background transition-colors group-hover:bg-muted"
// min-w/max-w alongside w- pin these to an exact size — plain w- is only
// a hint in auto table layout, and the browser was free to render it
// narrower or wider depending on how many total columns a given standard
// needed to fit, which made both these columns (and where the criteria
// matrix starts) inconsistent from one Standard page to the next.
const PROGRAM_COL_WIDTH = "w-[340px] min-w-[340px] max-w-[340px]"
const PROGRAM_COL_OFFSET = "left-[340px]"
// Wide enough for "Approaching" without wrapping, with some breathing room.
const PERF_LEVEL_COL_WIDTH = "w-44 min-w-44 max-w-44"
// Marks the start of a new numbered group through whitespace alone —
// applied before every group but the first, which already sits right
// after Performance Level's own padding.
const GROUP_GUTTER_CLASS = "pl-6"

export function StandardSummaryTable({ standardNumber, programType }) {
  const [scrolled, setScrolled] = useState(false)

  // Some criteria (e.g. Standard 3.1's Provisional License / Content Exam)
  // only apply to one program type — drop them from the matrix for the
  // other type rather than showing a column of nothing but missing values.
  const indicators = useMemo(() => {
    return STANDARD_SUMMARY_INDICATORS[standardNumber].map((indicator) => ({
      ...indicator,
      criteria: indicator.criteria.filter(
        (c) => !c.applicableTypes || c.applicableTypes.includes(programType)
      ),
    }))
  }, [standardNumber, programType])

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
            className={cn(
              LEAF_HEAD_CLASS,
              STICKY_HEAD_CLASS,
              perfLevelStickyClass,
              PERF_LEVEL_COL_WIDTH,
              "pr-4 align-bottom"
            )}
          >
            Performance Level
          </TableHead>
          {indicators.map((indicator, i) => (
            <TableHead
              key={indicator.subtotalKey}
              colSpan={1 + indicator.criteria.length}
              className={cn(GROUP_ROW_CLASS, i > 0 && GROUP_GUTTER_CLASS)}
            >
              <span className={GROUP_LABEL_CLASS}>
                {indicator.number} {indicator.name}
              </span>
            </TableHead>
          ))}
        </TableRow>
        <TableRow className="hover:bg-transparent">
          {indicators.flatMap((indicator, i) => [
            <TableHead
              key={indicator.subtotalKey}
              className={cn(LEAF_HEAD_CLASS, i > 0 && GROUP_GUTTER_CLASS, OVERALL_MIN_WIDTH)}
            >
              Overall
            </TableHead>,
            ...indicator.criteria.map((c) => (
              <TableHead key={c.key} className={cn(LEAF_HEAD_CLASS, CRITERION_MIN_WIDTH)}>
                <Tooltip>
                  <TooltipTrigger className="-m-1 inline-flex cursor-default items-center gap-1 p-1 outline-none">
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
          <TableRow key={row["Lookup Code"]} className="group border-border/40 hover:bg-muted">
            <TableCell className={cn("py-2.5", STICKY_CELL_CLASS, PROGRAM_COL_WIDTH)}>
              <span className="whitespace-nowrap text-foreground">{row["EPP Name"]}</span>
            </TableCell>
            <TableCell
              className={cn("py-2.5", STICKY_CELL_CLASS, perfLevelStickyClass, PERF_LEVEL_COL_WIDTH, "pr-4")}
            >
              <PerformanceBadge level={row[`Standard ${standardNumber} Performance Level`]} emphasis />
            </TableCell>
            {indicators.flatMap((indicator, i) => [
              <TableCell
                key={indicator.subtotalKey}
                className={cn("py-2.5", i > 0 && GROUP_GUTTER_CLASS, OVERALL_MIN_WIDTH)}
              >
                <PerformanceBadge
                  level={performanceLevelFromScore(row[indicator.subtotalKey])}
                  emphasis
                />
              </TableCell>,
              ...indicator.criteria.map((c) => (
                <TableCell key={c.key} className={cn("py-2.5", CRITERION_MIN_WIDTH)}>
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
