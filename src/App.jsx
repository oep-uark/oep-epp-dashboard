import { useState } from "react"
import { OverviewPage } from "@/components/OverviewPage"
import { EppReviewPage } from "@/components/EppReviewPage"
import { ScienceOfReadingPage } from "@/components/ScienceOfReadingPage"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const NAV_ITEMS = [
  { key: "overview", label: "Overview" },
  { key: "epp-review", label: "EPP State Review" },
  { key: "science-of-reading", label: "Science of Reading" },
]

function App() {
  const [page, setPage] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-start justify-between gap-x-8 gap-y-3 px-6 py-3">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <p className="max-w-2xs font-heading text-base leading-snug font-medium text-foreground">
              Arkansas Educator Preparation Program State Review Dashboard
            </p>
            <Tabs value={page} onValueChange={setPage}>
              <TabsList variant="line">
                {NAV_ITEMS.map((item) => (
                  <TabsTrigger key={item.key} value={item.key} className="after:bg-primary">
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <a
            href="https://dese.ade.arkansas.gov/Offices/educator-effectiveness/educator-preparation-programs-in-arkansas/arkansas-state-review-of-educator-preparation-programs-epps"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            EPP State Review Website
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 pt-6 pb-10">
        {page === "overview" && <OverviewPage />}
        {page === "epp-review" && <EppReviewPage />}
        {page === "science-of-reading" && <ScienceOfReadingPage />}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            The Arkansas Educator Preparation Program State Review Dashboard is a joint project
            of the Arkansas Department of Education Division of Elementary and Secondary
            Education and the University of Arkansas Department of Education Reform Office for
            Education Policy.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
