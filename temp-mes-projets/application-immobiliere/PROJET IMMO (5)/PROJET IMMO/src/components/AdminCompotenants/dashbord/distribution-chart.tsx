"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Factures payées", value: 372000 },
  { name: "Factures impayées", value: 420000 },
]

const COLORS = ["#06b6d4", "#3b82f6"]

export function DistributionChart() {
  return (
    <div className="h-full w-full">
      <h3 className="text-lg font-semibold text-cyan-500 mb-4">Répartition des factures</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#06b6d4"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | string) => {
                const numValue = typeof value === 'string' ? parseFloat(value) : value;
                return [`${(numValue / 1000).toFixed(0)} K€`, ""];
              }}
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))',
                borderRadius: 'var(--radius)',
                padding: '8px 12px',
              }}
              itemStyle={{
                color: 'hsl(var(--foreground))'
              }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right" 
              iconType="circle" 
              iconSize={10}
              wrapperStyle={{
                color: 'hsl(var(--foreground))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
