import { useMemo } from "react"
import { getOverallScores } from "@/lib/data"
import { PerformanceBadge } from "@/components/PerformanceBadge"
import { ScoreBar } from "@/components/ScoreBar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewPage({ programType, onNavigateToStandard }) {
  const rows = useMemo(() => {
    const all = getOverallScores()
    return all
      .filter((row) => row.type === programType)
      .sort((a, b) =>
        (a["EPP Name"] ?? "").toLowerCase().localeCompare((b["EPP Name"] ?? "").toLowerCase())
      )
  }, [programType])

  return (
    <Card>
      <CardHeader>
        <CardTitle>EPP State Review Score Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Overall Performance Level</TableHead>
              <TableHead>Average Performance Score</TableHead>
              <TableHead>
                <button
                  type="button"
                  className="hover:text-primary hover:underline"
                  onClick={() => onNavigateToStandard(1)}
                >
                  Standard 1
                </button>
              </TableHead>
              <TableHead>
                <button
                  type="button"
                  className="hover:text-primary hover:underline"
                  onClick={() => onNavigateToStandard(2)}
                >
                  Standard 2
                </button>
              </TableHead>
              <TableHead>
                <button
                  type="button"
                  className="hover:text-primary hover:underline"
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
                <TableCell className="font-medium whitespace-nowrap">{row["EPP Name"]}</TableCell>
                <TableCell>
                  <PerformanceBadge level={row["Overall Performance Level"]} />
                </TableCell>
                <TableCell>
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
      </CardContent>
    </Card>
  )
}
