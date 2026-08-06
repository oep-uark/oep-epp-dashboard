// Indicator names and criteria descriptions transcribed from Josh's state
// review framework reference (email, 2026-08-04) — these replace the raw
// "1.1(a)"-style codes with plain language everywhere in the Summary
// tables. Short labels are our own condensed paraphrases of the full
// criteria text for column headers; the full sentence is preserved as
// tooltip content on each criterion column.
export const STANDARD_SUMMARY_INDICATORS = {
  1: [
    {
      number: "1.1",
      name: "Plans",
      subtotalKey: "1.1",
      criteria: [
        {
          key: "1.1(a)",
          shortLabel: "Formal Plans",
          fullText:
            "Programs have formal plans to meet the targets described in the state review framework (i.e., Standards 1-3) and show evidence of acting on their plans.",
        },
      ],
    },
    {
      number: "1.2",
      name: "Recruitment",
      subtotalKey: "1.2",
      criteria: [
        {
          key: "1.2(a)",
          shortLabel: "Enrollment",
          fullText:
            "Programs meet annual recruitment targets that align with their program size and Arkansas's workforce needs.",
        },
        {
          key: "1.2(b)",
          shortLabel: "Shortage Areas Enrollment",
          fullText:
            "Programs recruit candidates for Arkansas certification shortage areas in proportion to the need.",
        },
      ],
    },
    {
      number: "1.3",
      name: "Completion",
      subtotalKey: "1.3",
      criteria: [
        {
          key: "1.3(a)",
          shortLabel: "Completion Rate",
          fullText:
            "Candidates have high rates of persistence from enrollment to completion. Based on the three year program completion rate.",
        },
      ],
    },
  ],
  2: [
    {
      number: "2.1",
      name: "Coursework",
      subtotalKey: "2.1",
      criteria: [
        {
          key: "2.1(a)",
          shortLabel: "Evidence-Based",
          fullText: "Candidates receive high-quality program coursework that is evidence-based.",
        },
        {
          key: "2.1(b)",
          shortLabel: "Supports Development",
          fullText: "Candidates' coursework supports their development as a teacher.",
        },
      ],
    },
    {
      number: "2.2",
      name: "Clinical Experiences",
      subtotalKey: "2.2",
      criteria: [
        {
          key: "2.2(a)",
          shortLabel: "Quality",
          fullText:
            "Candidates are provided clinical experiences that support their development as a teacher.",
        },
        {
          key: "2.2(b)",
          shortLabel: "Internship Effectiveness",
          fullText:
            "Candidates across the program are provided with an effective clinical internship.",
        },
        {
          key: "2.2(c)",
          shortLabel: "K-12 Partnerships",
          fullText:
            "Strong partnerships exist between the EPP and K12 schools and districts that facilitate the development of strong candidates.",
        },
      ],
    },
    {
      number: "2.3",
      name: "Development",
      subtotalKey: "2.3",
      criteria: [
        {
          key: "2.3(a)",
          shortLabel: "Coursework Success",
          fullText: "Candidates are successful with their program coursework.",
        },
        {
          key: "2.3(b)",
          shortLabel: "Internship Success",
          fullText: "Candidates are successful in their clinical internship.",
        },
      ],
    },
  ],
  3: [
    {
      number: "3.1",
      name: "Licensure",
      subtotalKey: "3.1",
      criteria: [
        {
          key: "3.1(a)",
          shortLabel: "Standard License",
          fullText:
            "A high proportion of program candidates obtain a standard license within one year of program completion.",
        },
        {
          key: "3.1(b)",
          shortLabel: "Provisional License",
          fullText: "A high proportion of alternative route enrollees are provisionally licensed.",
          // Null for every Traditional row in the data — the criterion only
          // applies to alternative-route candidates.
          applicableTypes: ["Alternative"],
        },
        {
          key: "3.1(c)",
          shortLabel: "Content Exam",
          fullText:
            "A high proportion of traditional program candidates pass the content exam in their area on the first try.",
          // Null for every Alternative row in the data — the criterion only
          // applies to traditional program candidates.
          applicableTypes: ["Traditional"],
        },
      ],
    },
    {
      number: "3.2",
      name: "Employment",
      subtotalKey: "3.2",
      criteria: [
        {
          key: "3.2(a)",
          shortLabel: "AR Teachers",
          fullText:
            "A high proportion of completers are employed as teachers within Arkansas public schools within three years of program completion.",
        },
        {
          key: "3.2(b)",
          shortLabel: "High-Priority Placement",
          fullText:
            "A high proportion of completers work as teachers in high-priority Arkansas public school districts and subjects.",
        },
        {
          key: "3.2(c)",
          shortLabel: "Multi-Year Retention",
          fullText:
            "Program completers remain in the classroom for multiple years. Measured by years of completer experience during the first three years after program completion.",
        },
      ],
    },
    {
      number: "3.3",
      name: "Effectiveness",
      subtotalKey: "3.3",
      criteria: [
        {
          key: "3.3(a)",
          shortLabel: "Leader Rating",
          fullText: "School leaders rate program completers that they hire as well prepared to teach.",
        },
        {
          key: "3.3(b)",
          shortLabel: "Completer Rating",
          fullText: "Completers feel that their program prepared them well to be a teacher.",
        },
        {
          key: "3.3(c)",
          shortLabel: "Teacher Growth Scores",
          fullText: "A high proportion of program completers have above average value-added scores.",
        },
      ],
    },
  ],
}
