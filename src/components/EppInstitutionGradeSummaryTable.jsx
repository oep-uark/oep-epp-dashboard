import { useMemo } from "react"
import { getOverallScores } from "@/lib/data"
import { averageLevels } from "@/lib/constants"
import { InstitutionGradeSummaryTable } from "@/components/InstitutionGradeSummaryTable"

const DESCRIPTION =
  "One letter grade per institution, averaging its Traditional and Alternative Teacher " +
  "Pathways Review results."

export function EppInstitutionGradeSummaryTable() {
  const rows = useMemo(() => {
    const byEppCode = new Map()

    for (const row of getOverallScores()) {
      const code = row["EPP Code"]
      const institution = byEppCode.get(code) ?? { key: code, eppName: row["EPP Name"] }
      if (row.type === "Traditional") institution.traditionalLevel = row["Overall Performance Level"]
      if (row.type === "Alternative") institution.alternativeLevel = row["Overall Performance Level"]
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
      title="Teacher Pathways Review Provider Grade Summary"
      description={DESCRIPTION}
      rows={rows}
    />
  )
}
