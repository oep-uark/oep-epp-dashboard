import { useProgramType } from "@/lib/ProgramTypeContext"
import { PageIntro } from "@/components/PageIntro"
import { ScienceOfReadingAreaTable } from "@/components/ScienceOfReadingAreaTable"
import { SCIENCE_OF_READING_AREAS } from "@/lib/scienceOfReadingConfig"

// Summarized (not quoted) from the state's Science of Reading framework
// reference doc, provided by Roy 2026-08-05.
const AREA_DESCRIPTIONS = {
  1: "Evaluates how well program coursework teaches the research foundations of reading " +
    "instruction and connects that evidence base to classroom application.",
  2: "Evaluates the quality of candidates' field-based clinical experiences, including the " +
    "feedback and supervision they receive while applying coursework in the classroom.",
  3: "Evaluates how program leadership uses reliable data on clinical performance and " +
    "candidate outcomes to monitor quality and drive continuous improvement.",
}

export function ScienceOfReadingAreaPage({ areaNumber }) {
  const { programType, setProgramType } = useProgramType()
  const area = SCIENCE_OF_READING_AREAS[areaNumber]

  return (
    <div>
      <PageIntro
        title={`${area.number} - ${area.name}`}
        description={AREA_DESCRIPTIONS[areaNumber]}
        programType={programType}
        onProgramTypeChange={setProgramType}
      />

      <div className="mt-6">
        <ScienceOfReadingAreaTable areaNumber={areaNumber} programType={programType} />
      </div>
    </div>
  )
}
