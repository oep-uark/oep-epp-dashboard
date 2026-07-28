import { useState } from "react"
import { AppSidebar } from "@/components/AppSidebar"
import { OverviewPage } from "@/components/OverviewPage"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { key: "overview", label: "Overview" },
  { key: "standard1", label: "Standard 1" },
  { key: "standard2", label: "Standard 2" },
  { key: "standard3", label: "Standard 3" },
]

function App() {
  const [page, setPage] = useState("overview")
  const [programType, setProgramType] = useState("Traditional")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-foreground text-background">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-8 px-6 py-4">
          <div>
            <p className="font-heading text-lg font-semibold">Arkansas EPP State Review Dashboard</p>
          </div>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setPage(item.key)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  page === item.key
                    ? "bg-primary text-primary-foreground"
                    : "text-background/80 hover:bg-background/10 hover:text-background"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <a
            href="https://dese.ade.arkansas.gov/Offices/educator-effectiveness/educator-preparation-programs-in-arkansas/arkansas-state-review-of-educator-preparation-programs-epps"
            target="_blank"
            rel="noreferrer"
            className="text-background/80 hover:text-background shrink-0 text-sm underline-offset-4 hover:underline"
          >
            EPP State Review Website
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 gap-8 px-6 py-8">
        <AppSidebar page={page} programType={programType} onProgramTypeChange={setProgramType} />
        <div className="min-w-0 flex-1">
          {page === "overview" && (
            <OverviewPage
              programType={programType}
              onNavigateToStandard={(n) => setPage(`standard${n}`)}
            />
          )}
          {page !== "overview" && <ComingSoon page={page} />}
        </div>
      </main>

      <footer className="border-border bg-secondary border-t">
        <div className="mx-auto max-w-[1600px] px-6 py-6">
          <p className="text-muted-foreground text-xs leading-relaxed">
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

const STANDARD_TITLES = {
  standard1: "Standard 1 - Candidate Recruitment and Completion",
  standard2: "Standard 2 - Preparing Candidates Effectively",
  standard3: "Standard 3 - Supporting Workforce Needs",
}

function ComingSoon({ page }) {
  return (
    <div className="border-border flex min-h-64 items-center justify-center rounded-lg border border-dashed">
      <p className="text-muted-foreground text-sm">
        {STANDARD_TITLES[page]} — coming next.
      </p>
    </div>
  )
}

export default App
