// Criteria groupings for each standard's Summary table, transcribed from
// the Shiny app's grouped column headers (mod_page_standard.R,
// mod_page_standard_3.R). The last column in each group is that group's
// subtotal (e.g. "1.1"), styled distinctly from its raw (a)/(b)/(c) inputs.
export const STANDARD_SUMMARY_GROUPS = {
  1: [
    { label: "Program Plans", columns: ["1.1(a)", "1.1"] },
    { label: "Recruitment", columns: ["1.2(a)", "1.2(b)", "1.2"] },
    { label: "Completion", columns: ["1.3(a)", "1.3"] },
  ],
  2: [
    { label: "Coursework", columns: ["2.1(a)", "2.1(b)", "2.1(c)", "2.1"] },
    { label: "Clinical Experiences", columns: ["2.2(a)", "2.2(b)", "2.2(c)", "2.2"] },
    { label: "Candidate Development", columns: ["2.3(a)", "2.3(b)", "2.3"] },
  ],
  3: [
    { label: "Licensure", columns: ["3.1(a)", "3.1(b)", "3.1(c)", "3.1"] },
    { label: "Employment", columns: ["3.2(a)", "3.2(b)", "3.2(c)", "3.2"] },
    { label: "Effectiveness", columns: ["3.3(a)", "3.3(b)", "3.3(c)", "3.3"] },
  ],
}

// A group's subtotal column is the one with no (a)/(b)/(c) suffix, e.g. "1.1".
export function isSubtotalColumn(key) {
  return /^\d\.\d$/.test(key)
}
