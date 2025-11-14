// Fichier : src/components/ui/label.tsx

import * as React from "react"
import { cn } from "@/lib/utils" // Utilitaire pour concaténer les classes (voir note ci-dessous)

// Typage des props
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)

Label.displayName = "label"

export { Label }