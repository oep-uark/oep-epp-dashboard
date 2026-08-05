import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EppOverviewTable } from "@/components/EppOverviewTable"
import { StandardPage } from "@/components/StandardPage"

const VIEW_ITEMS = [
  { key: "overview", label: "Overview" },
  { key: "standard1", label: "Standard 1" },
  { key: "standard2", label: "Standard 2" },
  { key: "standard3", label: "Standard 3" },
]

export function EppReviewPage() {
  const [view, setView] = useState("overview")

  return (
    <div>
      <Tabs value={view} onValueChange={setView}>
        <TabsList variant="line" className="h-auto gap-2.5 p-0">
          {VIEW_ITEMS.map((item) => (
            <TabsTrigger
              key={item.key}
              value={item.key}
              className="h-auto px-0 pb-1 text-[11px] font-normal text-muted-foreground after:hidden data-active:font-medium data-active:text-foreground"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4">
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
