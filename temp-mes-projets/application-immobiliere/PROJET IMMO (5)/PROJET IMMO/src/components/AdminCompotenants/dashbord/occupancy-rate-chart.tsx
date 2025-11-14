"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { mois: "Jan", taux: 82.3, moyenne: 80.1 },
  { mois: "Fév", taux: 83.1, moyenne: 80.3 },
  { mois: "Mar", taux: 83.8, moyenne: 80.5 },
  { mois: "Avr", taux: 84.5, moyenne: 80.8 },
  { mois: "Mai", taux: 85.2, moyenne: 81.0 },
  { mois: "Juin", taux: 86.0, moyenne: 81.2 },
  { mois: "Juil", taux: 86.7, moyenne: 81.5 },
  { mois: "Août", taux: 87.5, moyenne: 81.7 },
  { mois: "Sep", taux: 88.2, moyenne: 82.0 },
  { mois: "Oct", taux: 88.9, moyenne: 82.2 },
  { mois: "Nov", taux: 89.6, moyenne: 82.5 },
  { mois: "Déc", taux: 90.3, moyenne: 82.7 },
]

export function OccupancyRateChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
        <YAxis domain={[75, 95]} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dx={-10} />
        <Tooltip
          formatter={(value) => [`${value}%`, ""]}
          contentStyle={{
            borderRadius: "0.375rem",
            border: "none",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            padding: "8px 12px",
            backgroundColor: "white",
          }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: 10 }} />
        <Line
          type="monotone"
          dataKey="taux"
          name="Taux d'occupation"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "white" }}
          activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 2, stroke: "white" }}
          animationDuration={1500}
        />
        <Line
          type="monotone"
          dataKey="moyenne"
          name="Moyenne du marché"
          stroke="#94a3b8"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4, fill: "#94a3b8", strokeWidth: 2, stroke: "white" }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
