import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", revenus: 320, prévision: 325 },
  { name: "Fév", revenus: 332, prévision: 335 },
  { name: "Mar", revenus: 341, prévision: 340 },
  { name: "Avr", revenus: 350, prévision: 348 },
  { name: "Mai", revenus: 356, prévision: 355 },
  { name: "Juin", revenus: 365, prévision: 362 },
  { name: "Juil", revenus: 370, prévision: 368 },
  { name: "Août", revenus: 368, prévision: 372 },
  { name: "Sep", revenus: 360, prévision: 365 },
  { name: "Oct", revenus: 355, prévision: 360 },
  { name: "Nov", revenus: 350, prévision: 355 },
  { name: "Déc", revenus: 345, prévision: 350 },
]

export function RevenueChart() {
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
        <XAxis dataKey="name" />
        <YAxis domain={[300, 380]} />
        <Tooltip formatter={(value) => [`${value} K€`, ""]} labelFormatter={(label) => `${label} 2025`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenus"
          name="Revenus réels"
          stroke="#3b82f6"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="prévision"
          name="Prévisions"
          stroke="#9333ea"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
