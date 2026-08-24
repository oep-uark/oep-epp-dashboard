import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScienceOfReadingInstitutionGradeSummaryTable } from "@/components/ScienceOfReadingInstitutionGradeSummaryTable"
import { ScienceOfReadingOverviewTable } from "@/components/ScienceOfReadingOverviewTable"
import { ScienceOfReadingAreaPage } from "@/components/ScienceOfReadingAreaPage"

// Provider Grade Summary isn't ready for release - enabled: false hides the
// sub-tab without deleting the page behind it.
const VIEW_ITEMS = [
  { key: "institution", label: "Provider Grade Summary", enabled: false },
  { key: "overview", label: "Science of Reading Performance Summary" },
  { key: "area1", label: "Quality of Literacy Coursework" },
  { key: "area2", label: "Field-Based Experiences" },
  { key: "area3", label: "Continuous Improvement" },
]

export function ScienceOfReadingPage() {
  const [view, setView] = useState("overview")

  return (
    <div>
      <Tabs value={view} onValueChange={setView}>
        <TabsList variant="line" className="h-auto gap-5 p-0">
          {VIEW_ITEMS.filter((item) => item.enabled !== false).map((item) => (
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

      <div className="mt-3">
        {view === "institution" && <ScienceOfReadingInstitutionGradeSummaryTable />}
        {view === "overview" && (
          <ScienceOfReadingOverviewTable onNavigateToArea={(n) => setView(`area${n}`)} />
        )}
        {view === "area1" && <ScienceOfReadingAreaPage areaNumber={1} />}
        {view === "area2" && <ScienceOfReadingAreaPage areaNumber={2} />}
        {view === "area3" && <ScienceOfReadingAreaPage areaNumber={3} />}
      </div>
    </div>
  )
}
