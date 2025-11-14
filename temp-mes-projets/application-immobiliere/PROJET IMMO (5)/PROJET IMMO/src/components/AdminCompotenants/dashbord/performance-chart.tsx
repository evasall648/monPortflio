import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", revenus: 320, dépenses: 90, profit: 230 },
  { name: "Fév", revenus: 332, dépenses: 92, profit: 240 },
  { name: "Mar", revenus: 341, dépenses: 95, profit: 246 },
  { name: "Avr", revenus: 350, dépenses: 98, profit: 252 },
  { name: "Mai", revenus: 356, dépenses: 99, profit: 257 },
  { name: "Juin", revenus: 365, dépenses: 102, profit: 263 },
  { name: "Juil", revenus: 370, dépenses: 103, profit: 267 },
  { name: "Août", revenus: 368, dépenses: 102, profit: 266 },
  { name: "Sep", revenus: 360, dépenses: 100, profit: 260 },
  { name: "Oct", revenus: 355, dépenses: 99, profit: 256 },
  { name: "Nov", revenus: 350, dépenses: 98, profit: 252 },
  { name: "Déc", revenus: 345, dépenses: 97, profit: 248 },
]

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} K€`, ""]} labelFormatter={(label) => `${label} 2025`} />
        <Legend />
        <Bar dataKey="revenus" name="Revenus" fill="#3b82f6" />
        <Bar dataKey="dépenses" name="Dépenses" fill="#ef4444" />
        <Bar dataKey="profit" name="Profit" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  )
}
