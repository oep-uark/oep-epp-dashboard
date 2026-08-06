import { cn } from "@/lib/utils"
import { PageIntro } from "@/components/PageIntro"
import { LetterGradeBadge } from "@/components/LetterGradeBadge"
import { TABLE_HEAD_CLASS, TABLE_ROW_CLASS, TABLE_ROW_HEIGHT_CLASS } from "@/lib/tableStyles"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// One row per institution — Traditional and Alternative no longer split
// into separate rows/toggle here, so Overall is the institution's single
// letter grade (average of its Traditional and Alternative results).
const GRADE_HEAD_CLASS = cn(TABLE_HEAD_CLASS, "w-[21%] text-center")
const GRADE_CELL_CLASS = "py-0 text-center"

export function InstitutionGradeSummaryTable({ title, description, rows }) {
  return (
    <div>
      <PageIntro title={title} description={description} />

      <div className="mt-6">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(TABLE_HEAD_CLASS, "w-[37%]")}>Provider</TableHead>
              <TableHead className={cn(GRADE_HEAD_CLASS, "font-bold")}>
                Overall Letter Grade
              </TableHead>
              <TableHead className={GRADE_HEAD_CLASS}>Traditional Pathway Letter Grade</TableHead>
              <TableHead className={GRADE_HEAD_CLASS}>Alternative Pathway Letter Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key} className={cn(TABLE_ROW_HEIGHT_CLASS, TABLE_ROW_CLASS)}>
                <TableCell className="py-0 whitespace-nowrap text-foreground">
                  {row.eppName}
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge level={row.overallLevel} size="sm" />
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge level={row.traditionalLevel} size="sm" />
                </TableCell>
                <TableCell className={GRADE_CELL_CLASS}>
                  <LetterGradeBadge level={row.alternativeLevel} size="sm" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
