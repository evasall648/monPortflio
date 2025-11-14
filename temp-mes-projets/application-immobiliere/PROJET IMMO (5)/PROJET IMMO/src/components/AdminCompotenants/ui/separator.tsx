"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Separator component that can be used to visually separate content.
 * @param orientation - The orientation of the separator. Can be "horizontal" or "vertical".
 * @param className - Additional class names to apply to the separator.
 * @param props - Additional props to pass to the separator element.
 */
const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    role="separator"
    {...props}
  />
))

Separator.displayName = "Separator"

export { Separator }
