"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", montant: 320 },
  { name: "Fév", montant: 332 },
  { name: "Mar", montant: 341 },
  { name: "Avr", montant: 350 },
  { name: "Mai", montant: 356 },
  { name: "Juin", montant: 365 },
  { name: "Juil", montant: 370 },
  { name: "Août", montant: 368 },
  { name: "Sep", montant: 360 },
  { name: "Oct", montant: 355 },
  { name: "Nov", montant: 350 },
  { name: "Déc", montant: 345 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
        barSize={30}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dx={-10} />
        <Tooltip
          formatter={(value) => [`${value} K€`, ""]}
          contentStyle={{
            borderRadius: "0.375rem",
            border: "none",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            padding: "8px 12px",
            backgroundColor: "white",
          }}
          cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
        />
        <Bar dataKey="montant" name="Montant" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
