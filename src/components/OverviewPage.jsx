import { useMemo, useState } from "react"
import { getOverallScores } from "@/lib/data"
import { cn } from "@/lib/utils"
import { PerformanceBadge } from "@/components/PerformanceBadge"
import { ScoreBar } from "@/components/ScoreBar"
import { PerformanceLegend } from "@/components/PerformanceLegend"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TOGGLE_ITEM_CLASS =
  "aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:font-semibold"

const HEAD_CLASS = "text-xs font-semibold uppercase tracking-wide text-muted-foreground"
const HEAD_LINK_CLASS = "uppercase tracking-wide hover:text-primary hover:underline"

export function OverviewPage({ onNavigateToStandard }) {
  const [programType, setProgramType] = useState("Traditional")

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-xl font-medium text-foreground">
            EPP State Review Score Overview
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            The Arkansas Educator Preparation Program (EPP) State Review sets a shared vision and
            bar for high-quality educator preparation to ensure teacher candidates are ready to
            meet students' needs on day one.
          </p>
        </div>

        <ToggleGroup
          value={[programType]}
          onValueChange={(value) => value.length && setProgramType(value[0])}
          spacing={0}
          variant="outline"
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
        <PerformanceLegend />
      </div>

      <div className="mt-3">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={HEAD_CLASS}>Program</TableHead>
              <TableHead className={HEAD_CLASS}>Overall Performance Level</TableHead>
              <TableHead className={cn(HEAD_CLASS, "min-w-56")}>
                Average Performance Score
              </TableHead>
              <TableHead className={HEAD_CLASS}>
                <button
                  type="button"
                  className={HEAD_LINK_CLASS}
                  onClick={() => onNavigateToStandard(1)}
                >
                  Standard 1
                </button>
              </TableHead>
              <TableHead className={HEAD_CLASS}>
                <button
                  type="button"
                  className={HEAD_LINK_CLASS}
                  onClick={() => onNavigateToStandard(2)}
                >
                  Standard 2
                </button>
              </TableHead>
              <TableHead className={HEAD_CLASS}>
                <button
                  type="button"
                  className={HEAD_LINK_CLASS}
                  onClick={() => onNavigateToStandard(3)}
                >
                  Standard 3
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row["Lookup Code"]}>
                <TableCell className="font-medium whitespace-nowrap text-foreground">
                  {row["EPP Name"]}
                </TableCell>
                <TableCell>
                  <PerformanceBadge level={row["Overall Performance Level"]} />
                </TableCell>
                <TableCell className="min-w-56">
                  <ScoreBar
                    score={row["Average Performance Score"]}
                    level={row["Overall Performance Level"]}
                  />
                </TableCell>
                <TableCell>
                  <PerformanceBadge level={row["Standard 1 Performance Level"]} />
                </TableCell>
                <TableCell>
                  <PerformanceBadge level={row["Standard 2 Performance Level"]} />
                </TableCell>
                <TableCell>
                  <PerformanceBadge level={row["Standard 3 Performance Level"]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
