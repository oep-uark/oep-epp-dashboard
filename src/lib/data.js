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
// excluded here rather than in science_of_reading.json itself - both are
// going through SoR baseline review in November 2026 and shouldn't show
// scores yet, but the workbook the state sent still has rows for them (all
// zeroes for Henderson, live-looking numbers for UAF). Per ADE email
// forwarded by Josh, 2026-09-04. Remove this filter once the state sends an
// updated workbook reflecting their baseline review.
const SOR_EXCLUDED_LOOKUP_CODES = ["Tra6272", "Alt6272", "Tra6866"]

export function getScienceOfReadingData() {
  return scienceOfReadingDataRaw
    .filter((row) => !SOR_EXCLUDED_LOOKUP_CODES.includes(row["Lookup Code"]))
    .map((row) => ({
      ...row,
      "EPP Code": coerceEppCode(row["EPP Code"]),
    }))
}

// Report links are hand-maintained in data/report_links.json (not part of
// the source workbook, so extract_data.py doesn't touch them) and keyed by
// Lookup Code - Traditional and Alternative each get their own report.
// Paths are relative to public/.
export function getReportLink(lookupCode, reportType) {
  return reportLinksRaw[lookupCode]?.[reportType] ?? null
}
