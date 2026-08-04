// Performance Level thresholds are fixed business rules, not derived from
// the workbook. Average score is on a 0-3 scale.
export const PERFORMANCE_LEVELS = [
  { label: "Exceeds", min: 2.67, max: Infinity },
  { label: "Meets", min: 1.67, max: 2.67 },
  { label: "Approaching", min: 0.67, max: 1.67 },
  { label: "Below", min: -Infinity, max: 0.67 },
]

export function performanceLevelFromScore(score) {
  if (score === null || score === undefined || typeof score === "string") return null
  if (Number.isNaN(score)) return null
  if (score >= 2.67) return "Exceeds"
  if (score > 1.67) return "Meets"
  if (score > 0.67) return "Approaching"
  return "Below"
}

// Letter grades per Roy: A=Exceeds, B=Meets, C=Approaching, D and F
// collapse into a single "Below" tier so they display as one combined
// grade rather than splitting the bottom tier further.
export const PERFORMANCE_LEVEL_GRADES = {
  Exceeds: "A",
  Meets: "B",
  Approaching: "C",
  Below: "D/F",
}

// Trial: literal colors from the Shiny app (not U of A brand hexes) per
// Roy's request, so Josh's first look isn't a shock relative to the tool
// he already knows. Revisit once the broader redesign direction is settled.
export const PERFORMANCE_LEVEL_COLORS = {
  Exceeds: {
    bg: "#28A745",
    text: "#FFFFFF",
  },
  Meets: {
    bg: "#17A2B8",
    text: "#FFFFFF",
  },
  Approaching: {
    bg: "#FFC107",
    text: "#212529",
  },
  Below: {
    bg: "#DC3545",
    text: "#FFFFFF",
  },
}
