import overallScoresRaw from "../../data/overall_scores.json"
import standardDataRaw from "../../data/standard_data.json"
import scienceOfReadingDataRaw from "../../data/science_of_reading.json"

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

export function getScienceOfReadingData() {
  return scienceOfReadingDataRaw.map((row) => ({
    ...row,
    "EPP Code": coerceEppCode(row["EPP Code"]),
  }))
}
