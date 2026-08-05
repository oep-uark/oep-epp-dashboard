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
        <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-x-6 px-6 py-2.5">
          <p className="max-w-2xs font-heading text-base leading-tight font-medium text-foreground">
            Arkansas Educator Preparation Program State Review Dashboard
          </p>

          <Tabs value={page} onValueChange={setPage}>
            <TabsList variant="line" className="gap-6">
              {NAV_ITEMS.map((item) => (
                <TabsTrigger
                  key={item.key}
                  value={item.key}
                  className="px-0.5 text-sm font-medium text-muted-foreground after:bg-primary hover:text-foreground data-active:font-semibold data-active:text-foreground"
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
            className="shrink-0 justify-self-end rounded-sm text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            EPP State Review Website
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-6">
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
