import { ChevronDown } from "lucide-react"

// Phone-sized stand-in for a page's sub-nav tabs. Four long tab labels don't
// fit across a phone screen, so below lg the tabs are hidden and this
// dropdown takes their place. A native <select> on purpose - phones open
// their own built-in picker for it, which is easier to use than anything
// custom.
export function MobileViewSelect({ items, value, onValueChange, label }) {
  return (
    <div className="relative w-full lg:hidden">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        aria-label={label}
        className="h-10 w-full appearance-none rounded-md border border-border bg-background pr-9 pl-3 text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {items.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
}
