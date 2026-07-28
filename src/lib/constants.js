// Performance Level thresholds are fixed business rules, not derived from
// the workbook. Average score is on a 0-3 scale.
export const PERFORMANCE_LEVELS = [
  { label: "Exceeds", min: 2.67, max: Infinity },
  { label: "Meets", min: 1.67, max: 2.67 },
  { label: "Approaching", min: 0.67, max: 1.67 },
  { label: "Below", min: -Infinity, max: 0.67 },
]

export function performanceLevelFromScore(score) {
  if (score === null || score === undefined || Number.isNaN(score)) return null
  if (score >= 2.67) return "Exceeds"
  if (score > 1.67) return "Meets"
  if (score > 0.67) return "Approaching"
  return "Below"
}

// U of A brand colors standing in for the Shiny app's teal/yellow/red scheme.
export const PERFORMANCE_LEVEL_COLORS = {
  Exceeds: {
    bg: "#3E94AA", // Springwater
    text: "#FFFFFF",
  },
  Meets: {
    bg: "#9DC9D5", // Clearsky
    text: "#0F3842",
  },
  Approaching: {
    bg: "#DDBA96", // Buckskin
    text: "#492D14",
  },
  Below: {
    bg: "#9D2235", // Razorback Red
    text: "#FFFFFF",
  },
}
