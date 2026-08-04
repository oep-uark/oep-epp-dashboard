import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EppOverviewTable } from "@/components/EppOverviewTable"

const VIEW_ITEMS = [
  { key: "overview", label: "Overview" },
  {
    key: "standard1",
    label: "Standard 1",
    title: "Standard 1 - Candidate Recruitment and Completion",
  },
  {
    key: "standard2",
    label: "Standard 2",
    title: "Standard 2 - Preparing Candidates Effectively",
  },
  {
    key: "standard3",
    label: "Standard 3",
    title: "Standard 3 - Supporting Workforce Needs",
  },
]

export function EppReviewPage() {
  const [view, setView] = useState("overview")
  const active = VIEW_ITEMS.find((item) => item.key === view) ?? VIEW_ITEMS[0]

  return (
    <div>
      <Tabs value={view} onValueChange={setView}>
        <TabsList variant="line" className="h-auto gap-4 p-0">
          {VIEW_ITEMS.map((item) => (
            <TabsTrigger
              key={item.key}
              value={item.key}
              className="h-auto px-0 pb-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase after:bg-primary/70 data-active:text-foreground"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-6">
        {view === "overview" && (
          <EppOverviewTable onNavigateToStandard={(n) => setView(`standard${n}`)} />
        )}
        {view !== "overview" && (
          <div>
            <h1 className="font-heading text-xl font-medium text-foreground">{active.title}</h1>
            <div className="mt-6 flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border">
              <p className="text-sm text-muted-foreground">Summary / Detail views — coming next.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
