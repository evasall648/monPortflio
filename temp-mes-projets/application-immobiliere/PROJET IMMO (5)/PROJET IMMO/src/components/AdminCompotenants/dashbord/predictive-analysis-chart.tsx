import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const data = [
  // Données historiques
  { mois: "Mai", revenus: 356, prévision: null, min: null, max: null },
  { mois: "Juin", revenus: 365, prévision: null, min: null, max: null },
  { mois: "Juil", revenus: 370, prévision: null, min: null, max: null },
  { mois: "Août", revenus: 368, prévision: null, min: null, max: null },
  { mois: "Sep", revenus: 360, prévision: null, min: null, max: null },
  { mois: "Oct", revenus: 355, prévision: null, min: null, max: null },
  // Prévisions
  { mois: "Nov", revenus: null, prévision: 360, min: 352, max: 368 },
  { mois: "Déc", revenus: null, prévision: 365, min: 355, max: 375 },
  { mois: "Jan", revenus: null, prévision: 368, min: 356, max: 380 },
  { mois: "Fév", revenus: null, prévision: 370, min: 357, max: 383 },
  { mois: "Mar", revenus: null, prévision: 372, min: 358, max: 386 },
  { mois: "Avr", revenus: null, prévision: 375, min: 360, max: 390 },
  { mois: "Mai", revenus: null, prévision: 380, min: 365, max: 395 },
  { mois: "Juin", revenus: null, prévision: 385, min: 370, max: 400 },
  { mois: "Juil", revenus: null, prévision: 390, min: 375, max: 405 },
  { mois: "Août", revenus: null, prévision: 388, min: 373, max: 403 },
  { mois: "Sep", revenus: null, prévision: 385, min: 370, max: 400 },
  { mois: "Oct", revenus: null, prévision: 382, min: 367, max: 397 },
]

export function PredictiveAnalysisChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mois" />
        <YAxis domain={[340, 410]} />
        <Tooltip
          formatter={(value) => (value ? [`${value} K€`, ""] : ["-", ""])}
          labelFormatter={(label) => `${label} 2025`}
        />
        <Legend />
        <ReferenceLine x="Oct" stroke="#888" strokeDasharray="3 3" label={{ value: "Aujourd'hui", position: "top" }} />

        {/* Données historiques */}
        <Line
          type="monotone"
          dataKey="revenus"
          name="Revenus historiques"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 8 }}
        />

        {/* Prévisions */}
        <Line
          type="monotone"
          dataKey="prévision"
          name="Prévisions"
          stroke="#9333ea"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
        />

        {/* Intervalle de confiance */}
        <Line type="monotone" dataKey="min" name="Min" stroke="#9333ea" strokeWidth={0} dot={false} />
        <Line type="monotone" dataKey="max" name="Max" stroke="#9333ea" strokeWidth={0} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
