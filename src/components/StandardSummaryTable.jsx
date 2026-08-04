import { useMemo } from "react"
import { getStandardData } from "@/lib/data"
import { STANDARD_SUMMARY_GROUPS, isSubtotalColumn } from "@/lib/standardSummaryConfig"
import { cn } from "@/lib/utils"
import { PerformanceBadge } from "@/components/PerformanceBadge"
import { MissingValue } from "@/components/MissingValue"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const GROUP_HEAD_CLASS =
  "h-6 border-b border-border pb-0 text-center text-[11px] font-normal text-muted-foreground align-bottom"
const LEAF_HEAD_CLASS = "h-8 border-b border-border text-xs font-medium text-muted-foreground align-bottom"
const GROUP_START_CLASS = "pl-6"
const RIGHT_ALIGN_HEAD_TYPES = ["score", "subtotal", "raw"]
const RIGHT_ALIGN_CELL_TYPES = ["score", "subtotal", "raw"]
const STICKY_HEAD_CLASS = "sticky left-0 z-20 bg-background"
const STICKY_CELL_CLASS = "sticky left-0 z-10 bg-background"

function formatScore(value) {
  if (value === null || value === undefined || typeof value === "string") return null
  const num = Number(value)
  return Number.isNaN(num) ? null : num
}

export function StandardSummaryTable({ standardNumber, programType }) {
  const nameGroup = {
    label: "",
    columns: [{ key: "EPP Name", label: "Program", type: "name" }],
  }

  const scoreGroup = {
    label: `Standard ${standardNumber} Score`,
    columns: [
      { key: `Standard ${standardNumber} Average Criteria Score`, label: "Avg. Criteria Score", type: "score" },
      { key: `Standard ${standardNumber} Performance Level`, label: "Performance Level", type: "level" },
      { key: `Standard ${standardNumber} Performance Score`, label: "Performance Score", type: "score" },
    ],
  }

  const criteriaGroups = STANDARD_SUMMARY_GROUPS[standardNumber].map((group) => ({
    label: group.label,
    columns: group.columns.map((key) => ({
      key,
      label: key,
      type: isSubtotalColumn(key) ? "subtotal" : "raw",
    })),
  }))

  const groups = [nameGroup, scoreGroup, ...criteriaGroups]
  const leafColumns = groups.flatMap((group, gi) =>
    group.columns.map((col, ci) => ({ ...col, isGroupStart: ci === 0 && gi > 0 }))
  )

  const rows = useMemo(() => {
    const all = getStandardData()
    return all
      .filter((row) => row.type === programType)
      .sort((a, b) =>
        (a["EPP Name"] ?? "").toLowerCase().localeCompare((b["EPP Name"] ?? "").toLowerCase())
      )
  }, [programType])

  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow className="hover:bg-transparent">
          {groups.map((group) => (
            <TableHead
              key={group.label || "name"}
              colSpan={group.columns.length}
              className={cn(GROUP_HEAD_CLASS, group === nameGroup && STICKY_HEAD_CLASS)}
            >
              {group.label}
            </TableHead>
          ))}
        </TableRow>
        <TableRow className="hover:bg-transparent">
          {leafColumns.map((col) => (
            <TableHead
              key={col.key}
              className={cn(
                LEAF_HEAD_CLASS,
                col.isGroupStart && GROUP_START_CLASS,
                RIGHT_ALIGN_HEAD_TYPES.includes(col.type) && "text-right",
                col.type === "name" && cn(STICKY_HEAD_CLASS, "pr-6")
              )}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row["Lookup Code"]} className="border-border/40">
            {leafColumns.map((col) => (
              <TableCell
                key={col.key}
                className={cn(
                  "py-3",
                  col.isGroupStart && GROUP_START_CLASS,
                  RIGHT_ALIGN_CELL_TYPES.includes(col.type) && "text-right",
                  col.type === "name" && cn(STICKY_CELL_CLASS, "pr-6")
                )}
              >
                {col.type === "name" && (
                  <span className="whitespace-nowrap text-foreground">{row["EPP Name"]}</span>
                )}
                {col.type === "level" && <PerformanceBadge level={row[col.key]} />}
                {col.type === "score" &&
                  (formatScore(row[col.key]) === null ? (
                    <MissingValue />
                  ) : (
                    <span className="font-semibold tabular-nums text-foreground">
                      {formatScore(row[col.key]).toFixed(2)}
                    </span>
                  ))}
                {col.type === "subtotal" &&
                  (formatScore(row[col.key]) === null ? (
                    <MissingValue />
                  ) : (
                    <span className="font-semibold tabular-nums text-foreground">
                      {formatScore(row[col.key]).toFixed(2)}
                    </span>
                  ))}
                {col.type === "raw" &&
                  (formatScore(row[col.key]) === null ? (
                    <MissingValue />
                  ) : (
                    <span className="tabular-nums text-muted-foreground">
                      {formatScore(row[col.key]).toFixed(2)}
                    </span>
                  ))}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
