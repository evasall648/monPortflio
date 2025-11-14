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
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mois" />
        <YAxis domain={[60, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, ""]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="taux"
          name="Taux de rétention global"
          stroke="#3b82f6"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="renouvellement" name="Taux de renouvellement" stroke="#22c55e" strokeWidth={2} />
        <Line
          type="monotone"
          dataKey="nouveaux"
          name="Rétention nouveaux locataires"
          stroke="#f59e0b"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
