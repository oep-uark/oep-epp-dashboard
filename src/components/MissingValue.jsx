import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function MissingValue({ reason = "No score reported for this program yet." }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span tabIndex={0} />}
        className="cursor-default text-sm text-muted-foreground outline-none"
      >
        —
      </TooltipTrigger>
      <TooltipContent>{reason}</TooltipContent>
    </Tooltip>
  )
}
