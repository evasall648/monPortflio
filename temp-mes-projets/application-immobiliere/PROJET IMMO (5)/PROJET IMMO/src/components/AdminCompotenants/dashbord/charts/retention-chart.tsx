import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { mois: "Mai", taux: 76, renouvellement: 82, nouveaux: 68 },
  { mois: "Juin", taux: 77, renouvellement: 83, nouveaux: 69 },
  { mois: "Juil", taux: 78, renouvellement: 84, nouveaux: 70 },
  { mois: "Août", taux: 79, renouvellement: 85, nouveaux: 71 },
  { mois: "Sep", taux: 80, renouvellement: 86, nouveaux: 72 },
  { mois: "Oct", taux: 81, renouvellement: 87, nouveaux: 73 },
  { mois: "Nov", taux: 82, renouvellement: 88, nouveaux: 74 },
  { mois: "Déc", taux: 83, renouvellement: 89, nouveaux: 75 },
  { mois: "Jan", taux: 84, renouvellement: 90, nouveaux: 76 },
  { mois: "Fév", taux: 85, renouvellement: 91, nouveaux: 77 },
  { mois: "Mar", taux: 86, renouvellement: 92, nouveaux: 78 },
  { mois: "Avr", taux: 87, renouvellement: 92, nouveaux: 80 },
]

export function RetentionChart() {
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
        <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
        <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dx={-10} />
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
          name="Taux de rétention global"
          stroke="#4f46e5"
          strokeWidth={2}
          dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "white" }}
          activeDot={{ r: 6, fill: "#4f46e5", strokeWidth: 2, stroke: "white" }}
        />
        <Line
          type="monotone"
          dataKey="renouvellement"
          name="Taux de renouvellement"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "white" }}
          activeDot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "white" }}
        />
        <Line
          type="monotone"
          dataKey="nouveaux"
          name="Rétention nouveaux locataires"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ r: 4, fill: "#f59e0b", strokeWidth: 2, stroke: "white" }}
          activeDot={{ r: 6, fill: "#f59e0b", strokeWidth: 2, stroke: "white" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
