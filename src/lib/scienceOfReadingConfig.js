import { performanceLevelFromScore } from "@/lib/constants"

// The raw sheet abbreviates program type ("Tra"/"Alt") where the rest of
// the app spells it out ("Traditional"/"Alternative") - this maps the
// PageIntro toggle's value to what's actually in science_of_reading.json.
export const PROGRAM_TYPE_ABBR = {
  Traditional: "Tra",
  Alternative: "Alt",
}

// The sheet has no single field that already blends all three review areas, so
// the overall grade is the average of Review Area 1/2/3 (already rescaled to
// 0-3 in science_of_reading.json), run through the same thresholds as
// everything else - confirmed with Roy against a worked example (Southern
// Arkansas University: RA1 4, RA2 3, RA3 3 on the raw 1-4 scale -> avg 3.33 ->
// "Meets"/B).
export function scienceOfReadingOverallLevel(row) {
  const scores = [row["REVIEW AREA 1"], row["REVIEW AREA 2"], row["REVIEW AREA 3"]].filter(
    (v) => v !== null && v !== undefined
  )
  if (scores.length === 0) return null
  const avg = scores.reduce((sum, v) => sum + v, 0) / scores.length
  return performanceLevelFromScore(avg)
}

// Review area names and short column labels are our own condensed
// paraphrases, drafted from the raw literacy review workbook (August 2026)
// since there's no official framework doc for Science of Reading yet, the
// way there is for the EPP Review standards. Revisit if Josh sends an
// official framework reference later.
//
// Each area's first data column shares its name with the area itself
// (e.g. "Overview of the Science of Reading" is both Review Area 1's name
// and a scored column) - that column is the state's own summarizing score
// for the area, so it drives the area's Performance Level rather than
// showing up as a regular criterion (`levelKey`, not part of `criteria`).
export const SCIENCE_OF_READING_AREAS = {
  1: {
    number: "Review Area 1",
    name: "Overview of the Science of Reading",
    scoreKey: "REVIEW AREA 1",
    levelKey: "Overview of the Science of Reading",
    criteria: [
      { key: "Concepts of Print", shortLabel: "Concepts of Print" },
      { key: "Oral Language & Collaborative Communication", shortLabel: "Oral Language" },
      { key: "Phonological & Phonemic Awareness", shortLabel: "Phonological Awareness" },
      {
        key: "Phonics, Orthography, & Automatic Word Recognition",
        shortLabel: "Phonics & Word Recognition",
      },
      { key: "Fluency", shortLabel: "Fluency" },
      { key: "Vocabulary", shortLabel: "Vocabulary" },
      { key: "Text Comprehension", shortLabel: "Text Comprehension" },
      { key: "Writing Instruction", shortLabel: "Writing Instruction" },
    ],
  },
  2: {
    number: "Review Area 2",
    name: "Field-Based Experiences",
    scoreKey: "REVIEW AREA 2",
    levelKey: "Field- Based Experiences",
    criteria: [
      { key: "Selection of Clinical Placement schools", shortLabel: "Clinical Placement Selection" },
      { key: "Selection of CT (EMT)", shortLabel: "CT (EMT) Selection" },
      { key: "Opportunity to Observe EB early lit Pk-3", shortLabel: "Observe EB Early Literacy" },
      { key: "Opportunity to use HQIM in Reading", shortLabel: "Use HQIM in Reading" },
      { key: "Prepare for full responsibility in licensure area", shortLabel: "Full Responsibility Prep" },
      { key: "Opportunity w/ multilingual studnets", shortLabel: "Multilingual Students" },
      {
        key: "Opportunity w/ students who experience difficulty reading (dyslexia)/ T1, T2",
        shortLabel: "Students w/ Reading Difficulty",
      },
      {
        key: "EMT skillful in EB, HQIM, coach in eval and analysis of lit instruction",
        shortLabel: "EMT Skill & Coaching",
      },
      {
        key: "Faculty, supervisors, practitioners guide/support/evaluates candidates through HQ training",
        shortLabel: "Faculty Guidance & Training",
      },
      { key: "Quality of written/oral feedback", shortLabel: "Feedback Quality" },
      { key: "Student engagement/impact on learning", shortLabel: "Student Engagement" },
    ],
  },
  3: {
    number: "Review Area 3",
    name: "Performance Management & Continuous Improvement",
    scoreKey: "REVIEW AREA 3",
    levelKey: "Performance Management & Continuous Improvement",
    criteria: [
      { key: "Quality of Data", shortLabel: "Data Quality" },
      { key: "Internal QC gates", shortLabel: "Internal QC Gates" },
      { key: "Quality of Monitoring", shortLabel: "Monitoring Quality" },
      {
        key: "Monitoring course quality, teaching quality, clinical connections",
        shortLabel: "Course/Teaching/Clinical Monitoring",
      },
      { key: "Quality Improvement Planning", shortLabel: "Improvement Planning" },
      { key: "Partnership opporutnities to learn/use HQIM", shortLabel: "HQIM Partnership Opportunities" },
      {
        key: "Consistently evaluates partnerships and ability to provide EB lit instruction",
        shortLabel: "Partnership Evaluation",
      },
    ],
  },
}
