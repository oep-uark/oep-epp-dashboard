import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScienceOfReadingOverviewTable } from "@/components/ScienceOfReadingOverviewTable"
import { ScienceOfReadingAreaPage } from "@/components/ScienceOfReadingAreaPage"

const VIEW_ITEMS = [
  { key: "overview", label: "Grade Summary" },
  { key: "area1", label: "Science of Reading Overview" },
  { key: "area2", label: "Field-Based Experiences" },
  { key: "area3", label: "Continuous Improvement" },
]

export function ScienceOfReadingPage() {
  const [view, setView] = useState("overview")

  return (
    <div>
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

      <div className="mt-3">
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
