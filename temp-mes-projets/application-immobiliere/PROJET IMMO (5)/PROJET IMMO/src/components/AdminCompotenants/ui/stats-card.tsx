"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  className?: string
  colorScheme?: "blue" | "green" | "purple" | "orange" | "red"
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend = "neutral",
  className,
  colorScheme = "blue",
}: StatsCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500 text-blue-600 dark:text-blue-400",
    green: "from-green-500 to-emerald-500 text-green-600 dark:text-green-400",
    purple: "from-purple-500 to-violet-500 text-purple-600 dark:text-purple-400",
    orange: "from-orange-500 to-amber-500 text-orange-600 dark:text-orange-400",
    red: "from-red-500 to-pink-500 text-red-600 dark:text-red-400",
  }

  const trendClasses = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {change !== undefined && (
            <div className="flex items-center space-x-1">
              <span className={cn("text-sm font-medium", trendClasses[trend])}>
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              {changeLabel && <span className="text-xs text-gray-500 dark:text-gray-400">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div
          className={cn("rounded-lg bg-gradient-to-br p-3", colorClasses[colorScheme].split(" ").slice(0, 2).join(" "))}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Decorative gradient */}
      <div
        className={cn(
          "absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br opacity-10",
          colorClasses[colorScheme].split(" ").slice(0, 2).join(" "),
        )}
      />
    </div>
  )
}
