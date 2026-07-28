import { PERFORMANCE_LEVELS, PERFORMANCE_LEVEL_COLORS } from "@/lib/constants"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PAGE_COPY = {
  overview: {
    heading: "Overview",
    body: "The Arkansas Educator Preparation Program (EPP) State Review sets a shared vision and bar for high-quality educator preparation to ensure teacher candidates are ready to meet students' needs on day one.",
  },
  standard1: {
    heading: "Recruitment and Completion",
    body: "For Standard 1, EPPs are graded on their formal plans to meet EPP State Review targets and their candidate recruitment and retention.",
  },
  standard2: {
    heading: "Preparing Candidates Effectively",
    body: "For Standard 2, EPPs are graded via a site visit on their program's coursework, clinical experiences, and candidate development.",
  },
  standard3: {
    heading: "Supporting Workforce Needs",
    body: "For Standard 3, EPPs are graded on their completers' licensure, employment, and effectiveness.",
  },
}

export function AppSidebar({ page, programType, onProgramTypeChange }) {
  const copy = PAGE_COPY[page] ?? PAGE_COPY.overview
  const isTraditional = programType === "Traditional"

  return (
    <aside className="w-72 shrink-0 space-y-6">
      <div>
        <h2 className="text-foreground font-heading text-lg font-semibold">{copy.heading}</h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{copy.body}</p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-foreground text-sm font-semibold">EPP Type</span>
          <span className="text-muted-foreground text-xs">
            {isTraditional ? "Traditional" : "Alternative"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs ${isTraditional ? "text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            Traditional
          </span>
          <Switch
            checked={!isTraditional}
            onCheckedChange={(checked) => onProgramTypeChange(checked ? "Alternative" : "Traditional")}
          />
          <span
            className={`text-xs ${!isTraditional ? "text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            Alternative
          </span>
        </div>
      </div>

      <Card className="py-4">
        <CardHeader className="px-4">
          <CardTitle className="text-sm">Performance Level Based on Average Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-4">
          {PERFORMANCE_LEVELS.map(({ label }) => {
            const { bg, text } = PERFORMANCE_LEVEL_COLORS[label]
            return (
              <div
                key={label}
                className="flex items-center justify-between rounded-md px-3 py-2"
                style={{ backgroundColor: bg, color: text }}
              >
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-xs">{legendRange(label)}</span>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </aside>
  )
}

function legendRange(label) {
  switch (label) {
    case "Exceeds":
      return "Avg. ≥ 2.67"
    case "Meets":
      return "2.67 > Avg. > 1.67"
    case "Approaching":
      return "1.67 ≥ Avg. > 0.67"
    case "Below":
      return "0.67 ≥ Avg."
    default:
      return ""
  }
}
