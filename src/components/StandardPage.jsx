import { useProgramType } from "@/lib/ProgramTypeContext"
import { PageIntro } from "@/components/PageIntro"
import { StandardSummaryTable } from "@/components/StandardSummaryTable"

const STANDARD_TITLES = {
  1: "Standard 1 - Candidate Recruitment and Completion",
  2: "Standard 2 - Preparing Candidates Effectively",
  3: "Standard 3 - Supporting Workforce Needs",
}

// Verbatim from the Shiny app's sidebar copy (R/fct_custom_sidebar.R).
const STANDARD_DESCRIPTIONS = {
  1: "For Standard 1, EPPs are graded on their formal plans to meet EPP State Review targets and their candidate recruitment and retention.",
  2: "For Standard 2, EPPs are graded via a site visit on their program's coursework, clinical experiences, and candidate development.",
  3: "For Standard 3, EPPs are graded on their completers' licensure, employment, and effectiveness.",
}

export function StandardPage({ standardNumber }) {
  const { programType, setProgramType } = useProgramType()

  return (
    <div>
      <PageIntro
        title={STANDARD_TITLES[standardNumber]}
        description={STANDARD_DESCRIPTIONS[standardNumber]}
        programType={programType}
        onProgramTypeChange={setProgramType}
      />

      <div className="mt-6">
        <StandardSummaryTable standardNumber={standardNumber} programType={programType} />
      </div>
    </div>
  )
}
