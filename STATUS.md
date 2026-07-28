# Status

## Done
- **Data**: `scripts/extract_data.py` runs clean against
  `data-raw/updated_data_2026_07_13.xlsx`, produces all 7 JSON files in
  `/data`. Verified shape/content — see notes below on known data quirks.
- **Shiny reference read**: full read of `~/Active/work/oep/dashboard-epp-review`
  R source. Notes captured in conversation history (columns, tooltips,
  color logic, edge cases) — not yet written to a standalone doc.
- **Scaffold**: Vite + React (plain JS, no TypeScript) + Tailwind v4 +
  shadcn/ui (Base UI primitives, `base-nova` style). U of A brand colors
  and Lato/Roboto Serif fonts wired into `src/index.css`.
- **Overview page**: built and rendering real data from
  `overall_scores.json` — Program / Overall Performance Level / Average
  Performance Score (bar) / Standard 1-3 levels, Traditional/Alternative
  toggle, sidebar legend + description, clickable Standard column headers
  that jump to that Standard's page.
- Git repo not yet initialized — walkthrough given, Roy to run commands.

## Known data quirks (see CLAUDE.md for the recurring ones)
- 12 institutions run both a Traditional and Alternative program under the
  same `EPP Code` — `Lookup Code` (e.g. `Tra6004` / `Alt6004`) is the real
  per-program key.
- Standard 1/3 Detail sheets include 2 Alt programs (`eSTEM Residency`,
  `Prism Education Center`) not present in Overview/Summary — likely too
  new to have an overall score yet.
- One literal `"#N/A"` string in `standard_1_data.json` (Prism Education
  Center growth score) — real Excel formula error, treat as null in the UI.

## Not started yet
- Standard 1 / 2 / 3 pages (Summary + Detail views, incl. Standard 3's
  3.1/3.2/3.3 sub-tabs). Per-criterion Score tooltip thresholds (~10 sets,
  from the Shiny app) need to be transcribed as constants while building
  these.
- Footer logos (DESE/OEP/EDRE — available in the Shiny app's `www/`
  folder, not yet copied over).
- GitHub Pages hosting setup.

## Next session kickoff prompt
See end of most recent conversation for a copy-paste kickoff prompt once
this session wraps.
