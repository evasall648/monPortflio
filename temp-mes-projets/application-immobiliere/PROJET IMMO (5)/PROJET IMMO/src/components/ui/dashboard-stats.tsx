import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import type { LucideIcon } from "lucide-react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  colorClass?: string
  trend?: "up" | "down" | "stable"
  trendValue?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  colorClass = "text-blue-500",
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2">
          {trend && trendValue && (
            <Badge
              variant="outline"
              className={`gap-1 ${
                trend === "up"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : trend === "down"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : trend === "down" ? (
                <ArrowDownRight className="h-3 w-3" />
              ) : null}
              {trendValue}
            </Badge>
          )}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export function CircularStat({
  title,
  value,
  percentage,
  icon: Icon,
  colorClass = "text-blue-500",
  trend,
  trendValue,
}: StatCardProps & { percentage: number }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-4">
        <div className="relative h-24 w-24">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            />
            <circle
              className={`${colorClass} stroke-current`}
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`${percentage * 2.51} 251.2`}
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="50"
              dominantBaseline="middle"
              textAnchor="middle"
              className="text-xl font-bold"
              fill="currentColor"
            >
              {percentage}%
            </text>
          </svg>
          <div className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-md dark:bg-gray-800">
            <Icon className={`h-4 w-4 ${colorClass}`} />
          </div>
        </div>
        <div className="mt-2 text-center">
          <div className="text-xl font-bold">{value}</div>
          {trend && trendValue && (
            <Badge
              variant="outline"
              className={`mt-1 gap-1 ${
                trend === "up"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : trend === "down"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : trend === "down" ? (
                <ArrowDownRight className="h-3 w-3" />
              ) : null}
              {trendValue}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
