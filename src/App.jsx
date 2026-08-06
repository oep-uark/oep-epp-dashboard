import { useState } from "react"
import { OverviewPage } from "@/components/OverviewPage"
import { EppReviewPage } from "@/components/EppReviewPage"
import { ScienceOfReadingPage } from "@/components/ScienceOfReadingPage"
import { LeadershipProgramReviewPage } from "@/components/LeadershipProgramReviewPage"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const NAV_ITEMS = [
  { key: "overview", label: "Provider Letter Grades" },
  { key: "epp-review", label: "Teacher Pathways Review" },
  { key: "science-of-reading", label: "Science of Reading Review" },
  { key: "leadership-review", label: "Leadership Pathways Review" },
]

function App() {
  const [page, setPage] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-x-6 px-6 py-2.5">
          <p className="max-w-2xs shrink-0 font-heading text-base leading-tight font-medium text-foreground">
            Arkansas Educator Preparation Provider Quality Dashboard
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
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-6">
        {page === "overview" && <OverviewPage />}
        {page === "epp-review" && <EppReviewPage />}
        {page === "science-of-reading" && <ScienceOfReadingPage />}
        {page === "leadership-review" && <LeadershipProgramReviewPage />}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            The Arkansas Educator Preparation Provider Quality Dashboard is a joint project
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
