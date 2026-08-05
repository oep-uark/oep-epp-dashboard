// Shared editorial table styling — used by every data table (Overview,
// EPP Review Overview, Standard summary) so header typography, row rules,
// and the Traditional/Alternative toggle stay in sync instead of drifting
// per-table the way they did before this got centralized.

// Sentence case, restrained weight — no uppercase/tracking-wide.
export const TABLE_HEAD_CLASS = "text-sm font-semibold text-foreground"

// Body row: light hairline between rows, extremely subtle solid hover
// (not translucent — translucent hover breaks under sticky columns that
// need an opaque background of their own).
export const TABLE_ROW_CLASS = "border-border/40 hover:bg-muted"

// Quiet two-option segmented control — tighter and squarer than the
// shadcn toggle default so it doesn't read as a generic pill button.
export const TOGGLE_ITEM_CLASS =
  "h-6 rounded-[6px] px-2 text-xs aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:font-semibold"
