"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts"

interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

interface ModernChartProps {
  data: ChartData[]
  type: "line" | "area" | "bar" | "pie" | "radial"
  title?: string
  height?: number
  color?: string
  gradient?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
}

const COLORS = [
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#10b981",
  "#059669",
  "#047857",
  "#065f46",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#ef4444",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
]

export function ModernChart({
  data,
  type,
  title,
  height = 300,
  color = "#06b6d4",
  gradient = true,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
}: ModernChartProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
            <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis className="text-xs" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            )}
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        )

      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
            <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis className="text-xs" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            )}
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={gradient ? "url(#colorGradient)" : color}
            />
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
            <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis className="text-xs" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            )}
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        )

      case "pie":
        return (
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </PieChart>
        )

      case "radial":
        return (
          <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={data}>
            <RadialBar dataKey="value" cornerRadius={10} fill={color} />
            {showTooltip && <Tooltip />}
          </RadialBarChart>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {title && <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h4>}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
