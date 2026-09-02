import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

      <div className="mt-4 flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="max-w-4xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Arkansas law requires educator preparation providers (EPPs) to be approved by the
            Arkansas Department of Education Division of Elementary and Secondary Education
            (DESE) (Ark. Code Ann. § 6-17-402(b)(1)(A)). To help ensure that these providers
            prepare new educators to meet the needs of Arkansas students, DESE conducts two
            reviews: the Teacher Pathways Review for all approved programs and the Science of
            Reading Review for programs offering K-6 and special education certification
            pathways.
          </p>
          <p>
            A description of each review is provided below. This dashboard reports results from
            both reviews. Use the links on the right to explore each program's performance on the
            components of the reviews, along with the underlying measures used to determine those
            results and available performance reports. The dashboard supports the state's
            reporting requirements and provides information for prospective educators, school
            districts, preparation providers, and the public.
          </p>
          <p className="font-semibold text-foreground">Teacher Pathways Review</p>
          <p>The Teacher Pathways Review evaluates programs according to three standards:</p>
          <ol className="list-decimal space-y-1 pl-5">
            {STANDARDS.map((standard) => (
              <li key={standard}>{standard}</li>
            ))}
          </ol>
          <p>
            These standards reflect areas of program quality identified in state rules, including
            candidate recruitment, preparation experiences, assessment, employment, and the
            effectiveness and preparedness of program completers. Standards 1 and 3 are evaluated
            using state data on licensure, employment, and completer effectiveness. Standard 2 is
            evaluated through an onsite review conducted at least every six years, during which a
            team of Arkansas education leaders reviews program evidence, observes coursework and
            clinical practice, and gathers feedback from program and school partners. State rules
            also require programs to be reviewed annually (6 CAR § 180-304).
          </p>
          <p className="font-semibold text-foreground">Science of Reading Review</p>
          <p>
            The Science of Reading Review examines whether applicable programs prepare candidates
            to teach reading using evidence-based instructional practices. Under the Right to
            Read Act, educator preparation program completers must demonstrate the knowledge and
            skills needed to teach reading consistent with scientific reading instruction, and
            DESE is required to periodically review approved programs for compliance (Ark. Code
            Ann. § 6-17-429; 6 CAR § 90-107).
          </p>
          <p>
            Initial reviews were conducted by Teacher Prep Inspection-US (TPI-US), which developed
            the Arkansas Literacy Review Framework in partnership with DESE. Reviewers examine
            literacy coursework and assessments, instruction and clinical practice, program data,
            and feedback from faculty, candidates, and completers. Programs are rated against the
            expectations of the framework, and DESE monitors any required improvements.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-8 lg:w-72">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Explore Each Review
            </p>
            <div className="mt-3 flex flex-col gap-3">
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

          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Additional Resources
            </p>
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
      </div>
    </div>
  )
}
