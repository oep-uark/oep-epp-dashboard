import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Springwater, one of the brand's sparingly-used accent hues (see CLAUDE.md) -
// reserved for this one "look here" cue rather than the primary Razorback Red
// used everywhere else, so it doesn't compete with the buttons below it.
const ACCENT_COLOR = "#3E94AA"

const STANDARDS = [
  "Candidate Recruitment and Completion",
  "Preparing Candidates Effectively",
  "Meeting Workforce Needs",
]

const RESOURCE_LINKS = [
  {
    label: "EPP State Review Framework",
    href: "https://dese.ade.arkansas.gov/Offices/educator-effectiveness/educator-preparation-programs-in-arkansas/arkansas-state-review-of-educator-preparation-programs-epps",
  },
  {
    label: "Science of Reading Rubric",
    href: "https://dese.ade.arkansas.gov/Files/1._FINAL_AR_Literacy_Framework_-_1.5.24_EEF.pdf",
  },
]

export function LandingPage({ onNavigate }) {
  return (
    <div>
      <h1 className="font-heading text-xl font-medium text-foreground">Overview</h1>

      <div className="mt-4 max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          The Arkansas Department of Education evaluates educator preparation programs (EPPs) to
          ensure that new teachers are adequately prepared to meet the needs of Arkansas students
          on day one. The AR State Review evaluates EPPs according to three standards:
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          {STANDARDS.map((standard) => (
            <li key={standard}>{standard}</li>
          ))}
        </ol>
        <p>
          Beginning in 2024, the State Review also includes a Science of Reading coursework audit
          for state-approved programs offering K-6 and special education certification pathways.
          This audit supports the state's goal of ensuring that future Arkansas educators complete
          their training well prepared to develop students' literacy skills.
        </p>
        <p>
          This dashboard reports the results of both the overall State Review and the Science of
          Reading audit for EPPs across the state. The pages below display these programs'
          performance levels on each component of the review, as well as the underlying metrics
          used to determine those results.
        </p>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium" style={{ color: ACCENT_COLOR }}>
          Click below to explore each review
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button onClick={() => onNavigate("epp-review")}>
            Teacher Pathways Review
            <ArrowRight />
          </Button>
          <Button onClick={() => onNavigate("science-of-reading")}>
            Science of Reading Review
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="mt-8 max-w-2xl border-t border-border pt-6">
        <p className="text-sm font-medium text-foreground">Additional Resources</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {RESOURCE_LINKS.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {link.label}
                </a>
              ) : (
                <span className="text-muted-foreground">
                  {link.label} <span className="text-xs">(link coming soon)</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
