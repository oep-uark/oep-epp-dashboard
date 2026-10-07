import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileViewSelect } from "@/components/MobileViewSelect"
import { EppInstitutionGradeSummaryTable } from "@/components/EppInstitutionGradeSummaryTable"
import { EppOverviewTable } from "@/components/EppOverviewTable"
import { StandardPage } from "@/components/StandardPage"

// Provider Grade Summary isn't ready for release - enabled: false hides the
// sub-tab without deleting the page behind it.
const VIEW_ITEMS = [
  { key: "institution", label: "Provider Grade Summary", enabled: false },
  { key: "overview", label: "Teacher Pathways Performance Summary" },
  { key: "standard1", label: "Recruitment & Completion" },
  { key: "standard2", label: "Preparing Candidates Effectively" },
  { key: "standard3", label: "Supporting Workforce Needs" },
]
const VISIBLE_VIEW_ITEMS = VIEW_ITEMS.filter((item) => item.enabled !== false)

export function EppReviewPage() {
  const [view, setView] = useState("overview")

  return (
    <div>
      <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
        {/* Below lg the tabs don't fit across the screen, so a dropdown
            stands in for them. */}
        <MobileViewSelect
          items={VISIBLE_VIEW_ITEMS}
          value={view}
          onValueChange={setView}
          label="Page section"
        />
        <Tabs value={view} onValueChange={setView} className="max-lg:hidden">
          <TabsList variant="line" className="h-auto gap-5 p-0">
            {VISIBLE_VIEW_ITEMS.map((item) => (
              <TabsTrigger
                key={item.key}
                value={item.key}
                className="h-auto px-0 text-[13px] font-medium text-muted-foreground after:bg-primary data-active:font-semibold data-active:text-foreground"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <a
          href="https://dese.ade.arkansas.gov/Offices/educator-effectiveness/educator-preparation-programs-in-arkansas/arkansas-state-review-of-educator-preparation-programs-epps"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-sm text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Teacher Pathways Review Framework
          {/* Phones only - stacked under the dropdown, the link needs a cue
              that it's an outside link and not another menu item. */}
          <ExternalLink className="size-3.5 lg:hidden" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-5 lg:mt-3">
        {view === "institution" && <EppInstitutionGradeSummaryTable />}
        {view === "overview" && (
          <EppOverviewTable onNavigateToStandard={(n) => setView(`standard${n}`)} />
        )}
        {view === "standard1" && <StandardPage standardNumber={1} />}
        {view === "standard2" && <StandardPage standardNumber={2} />}
        {view === "standard3" && <StandardPage standardNumber={3} />}
      </div>
    </div>
  )
}
