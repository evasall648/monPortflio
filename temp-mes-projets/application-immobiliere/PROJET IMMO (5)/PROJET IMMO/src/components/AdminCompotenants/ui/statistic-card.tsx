import { Card, CardContent } from "@/components/AdminCompotenants/ui/Card"
import type { LucideIcon } from "lucide-react"

interface StatisticCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

export default function StatisticCard({ title, value, icon: Icon, iconColor, iconBg }: StatisticCardProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
