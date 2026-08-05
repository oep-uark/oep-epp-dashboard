import { useMemo, useState } from "react"
import { getOverallScores } from "@/lib/data"
import { LetterGradeBadge } from "@/components/LetterGradeBadge"
import { PerformanceLegend } from "@/components/PerformanceLegend"
import { TABLE_HEAD_CLASS, TABLE_ROW_CLASS, TOGGLE_ITEM_CLASS } from "@/lib/tableStyles"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SOR_MISSING_REASON = "Science of Reading data is not yet available."

export function OverviewPage() {
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
          <h1 className="font-heading text-xl font-medium text-foreground">Overview</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            A combined look at each program's EPP State Review and Science of Reading results.
            See the EPP State Review and Science of Reading tabs for the full breakdown behind
            each grade.
          </p>
        </div>

        <ToggleGroup
          value={[programType]}
          onValueChange={(value) => value.length && setProgramType(value[0])}
          spacing={0}
          variant="outline"
          size="sm"
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
        <PerformanceLegend showGrades />
      </div>

      <div className="mt-3">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={TABLE_HEAD_CLASS}>Program</TableHead>
              <TableHead className={TABLE_HEAD_CLASS}>Overall Grade</TableHead>
              <TableHead className={TABLE_HEAD_CLASS}>EPP Review Grade</TableHead>
              <TableHead className={TABLE_HEAD_CLASS}>Science of Reading Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row["Lookup Code"]} className={TABLE_ROW_CLASS}>
                <TableCell className="py-2.5 whitespace-nowrap text-foreground">
                  {row["EPP Name"]}
                </TableCell>
                {/* Overall grade combines EPP Review + Science of Reading once Josh
                    defines that formula — using the Review grade as a placeholder
                    until then. */}
                <TableCell>
                  <LetterGradeBadge level={row["Overall Performance Level"]} />
                </TableCell>
                <TableCell>
                  <LetterGradeBadge level={row["Overall Performance Level"]} />
                </TableCell>
                <TableCell>
                  <LetterGradeBadge level={null} missingReason={SOR_MISSING_REASON} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
