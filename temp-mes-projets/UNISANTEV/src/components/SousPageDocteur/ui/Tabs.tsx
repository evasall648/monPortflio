// Fichier : src/components/ui/tabs.tsx

import * as React from "react"
import { cn } from "@/lib/utils"

// Typage des props pour Tabs
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  onValueChange?: (value: string) => void
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, onValueChange, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue)

    const handleTabChange = (value: string) => {
      setActiveTab(value)
      if (onValueChange) onValueChange(value)
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange }}>
          {children}
        </TabsContext.Provider>
      </div>
    )
  }
)

Tabs.displayName = "Tabs"

// Contexte pour partager l'état des onglets
const TabsContext = React.createContext<{
  activeTab: string
  onTabChange: (value: string) => void
}>({
  activeTab: "",
  onTabChange: () => {},
})

// Composant TabsList
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          className
        )}
        {...props}
      />
    )
  }
)

TabsList.displayName = "TabsList"

// Composant TabsTrigger
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, ...props }, ref) => {
    const { activeTab, onTabChange } = React.useContext(TabsContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onTabChange(value)
      if (onClick) onClick(e)
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          activeTab === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
          className
        )}
        onClick={handleClick}
        data-state={activeTab === value ? "active" : "inactive"}
        {...props}
      />
    )
  }
)

TabsTrigger.displayName = "TabsTrigger"

export { Tabs, TabsList, TabsTrigger }