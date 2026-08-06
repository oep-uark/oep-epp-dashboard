import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EppOverviewTable } from "@/components/EppOverviewTable"
import { StandardPage } from "@/components/StandardPage"

const VIEW_ITEMS = [
  { key: "overview", label: "Grade Summary" },
  { key: "standard1", label: "Recruitment & Completion" },
  { key: "standard2", label: "Preparing Candidates Effectively" },
  { key: "standard3", label: "Supporting Workforce Needs" },
]

export function EppReviewPage() {
  const [view, setView] = useState("overview")

  return (
    <div>
      <div className="flex items-center justify-between">
        <Tabs value={view} onValueChange={setView}>
          <TabsList variant="line" className="h-auto gap-5 p-0">
            {VIEW_ITEMS.map((item) => (
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
          className="shrink-0 rounded-sm text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          EPP Program Review Framework
        </a>
      </div>

      <div className="mt-3">
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
