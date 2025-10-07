import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

/**
 * A flexible separator component with two types:
 * - 'default': A thin, 1px line for inline separation.
 * - 'section': A thicker, full-bleed block for separating major UI sections.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  type = 'default', // Add the new 'type' prop with a default value
  ...props
}) {
  // If the type is 'section', render the custom section divider
  if (type === 'section') {
    return (
      <div
        className={cn(
          "h-[0.25rem] bg-gradient-to-b from-slate-200/60 via-slate-50 to-slate-200/60 -mx-7 mt-6 mb-4",
          className
        )}
        {...props}
      />
    );
  }

  // Otherwise, render the default Radix-based separator
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator }
