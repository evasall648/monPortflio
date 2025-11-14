import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
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
]

export function PredictiveAnalysisChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
        <YAxis
          domain={[340, 410]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          dx={-10}
        />
        <Tooltip
          formatter={(value) => (value ? [`${value} K€`, ""] : ["-", ""])}
          labelFormatter={(label) => `${label} 2025`}
          contentStyle={{
            borderRadius: "0.375rem",
            border: "none",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            padding: "8px 12px",
            backgroundColor: "white",
          }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: 10 }} />
        <ReferenceLine
          x="Oct"
          stroke="#94a3b8"
          strokeDasharray="3 3"
          label={{
            value: "Aujourd'hui",
            position: "top",
            fill: "#64748b",
            fontSize: 12,
          }}
        />

        {/* Zone de prévision (intervalle de confiance) */}
        <Area type="monotone" dataKey="min" stackId="1" stroke="none" fill="#c7d2fe" fillOpacity={0.6} />
        <Area type="monotone" dataKey="max" stackId="1" stroke="none" fill="#c7d2fe" fillOpacity={0} />

        {/* Données historiques */}
        <Line
          type="monotone"
          dataKey="revenus"
          name="Revenus historiques"
          stroke="#4f46e5"
          strokeWidth={2}
          dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "white" }}
          activeDot={{ r: 6, fill: "#4f46e5", strokeWidth: 2, stroke: "white" }}
        />

        {/* Prévisions */}
        <Line
          type="monotone"
          dataKey="prévision"
          name="Prévisions"
          stroke="#8b5cf6"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "white" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
