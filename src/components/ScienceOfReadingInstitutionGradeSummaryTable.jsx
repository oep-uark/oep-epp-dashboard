import { useMemo } from "react"
import { getScienceOfReadingData } from "@/lib/data"
import { averageLevels } from "@/lib/constants"
import { scienceOfReadingOverallLevel } from "@/lib/scienceOfReadingConfig"
import { InstitutionGradeSummaryTable } from "@/components/InstitutionGradeSummaryTable"

const DESCRIPTION =
  "One letter grade per institution, averaging its Traditional and Alternative Science of " +
  "Reading Review results."

export function ScienceOfReadingInstitutionGradeSummaryTable() {
  const rows = useMemo(() => {
    const byEppCode = new Map()

    for (const row of getScienceOfReadingData()) {
      const code = row["EPP Code"]
      const institution = byEppCode.get(code) ?? { key: code, eppName: row["EPP Name"] }
      const level = scienceOfReadingOverallLevel(row)
      if (row["Program Type"] === "Tra") institution.traditionalLevel = level
      if (row["Program Type"] === "Alt") institution.alternativeLevel = level
      byEppCode.set(code, institution)
    }

    return Array.from(byEppCode.values())
      .map((institution) => ({
        ...institution,
        overallLevel: averageLevels(institution.traditionalLevel, institution.alternativeLevel),
      }))
      .sort((a, b) => (a.eppName ?? "").toLowerCase().localeCompare((b.eppName ?? "").toLowerCase()))
  }, [])

  return (
    <InstitutionGradeSummaryTable
      title="Science of Reading Provider Grade Summary"
      description={DESCRIPTION}
      rows={rows}
      showDashLegend
    />
  )
}
