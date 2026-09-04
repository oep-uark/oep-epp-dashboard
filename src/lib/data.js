import overallScoresRaw from "../../data/overall_scores.json"
import standardDataRaw from "../../data/standard_data.json"
import scienceOfReadingDataRaw from "../../data/science_of_reading.json"
import reportLinksRaw from "../../data/report_links.json"

// EPP Code sometimes arrives as a float (e.g. 6011.0) because of NaNs
// introduced during joins upstream in the source workbook.
function coerceEppCode(value) {
  if (value === null || value === undefined) return null
  return Math.trunc(Number(value))
}

export function getOverallScores() {
  return overallScoresRaw.map((row) => ({
    ...row,
    "EPP Code": coerceEppCode(row["EPP Code"]),
  }))
}

export function getStandardData() {
  return standardDataRaw.map((row) => ({
    ...row,
    "EPP Code": coerceEppCode(row["EPP Code"]),
  }))
}

// Henderson State (Tra6272/Alt6272) and UA-Fayetteville (Tra6866) are
// going through SoR baseline review in November 2026 and shouldn't show
// scores yet, but the workbook the state sent still has rows for them (all
// zeroes for Henderson, live-looking numbers for UAF). Per ADE email
// forwarded by Josh, 2026-09-04. Rather than dropping the rows - which would
// make it look like the dashboard forgot these institutions - every field
// except identity gets nulled out here so they still appear everywhere with
// a "-" for every score. Remove once the state sends an updated workbook
// reflecting their baseline review.
const SOR_BASELINE_PENDING_LOOKUP_CODES = ["Tra6272", "Alt6272", "Tra6866"]
const SOR_IDENTITY_FIELDS = ["EPP Name", "Lookup Code", "Program Type", "EPP Code"]

function blankScienceOfReadingScores(row) {
  const blanked = { ...row }
  for (const key of Object.keys(blanked)) {
    if (!SOR_IDENTITY_FIELDS.includes(key)) blanked[key] = null
  }
  return blanked
}

export function getScienceOfReadingData() {
  return scienceOfReadingDataRaw.map((row) => {
    const withCode = { ...row, "EPP Code": coerceEppCode(row["EPP Code"]) }
    return SOR_BASELINE_PENDING_LOOKUP_CODES.includes(row["Lookup Code"])
      ? blankScienceOfReadingScores(withCode)
      : withCode
  })
}

// Report links are hand-maintained in data/report_links.json (not part of
// the source workbook, so extract_data.py doesn't touch them) and keyed by
// Lookup Code - Traditional and Alternative each get their own report.
// Paths are relative to public/.
export function getReportLink(lookupCode, reportType) {
  return reportLinksRaw[lookupCode]?.[reportType] ?? null
}
