import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Paris Centre",
    occupation: 94,
    recouvrement: 98,
    satisfaction: 91,
    rentabilité: 6.2,
  },
  {
    name: "Lyon",
    occupation: 91,
    recouvrement: 97,
    satisfaction: 88,
    rentabilité: 5.9,
  },
  {
    name: "Marseille",
    occupation: 87,
    recouvrement: 95,
    satisfaction: 86,
    rentabilité: 6.0,
  },
  {
    name: "Bordeaux",
    occupation: 89,
    recouvrement: 94,
    satisfaction: 85,
    rentabilité: 5.8,
  },
  {
    name: "Lille",
    occupation: 85,
    recouvrement: 93,
    satisfaction: 82,
    rentabilité: 5.7,
  },
  {
    name: "Toulouse",
    occupation: 86,
    recouvrement: 92,
    satisfaction: 83,
    rentabilité: 5.6,
  },
  {
    name: "Nice",
    occupation: 84,
    recouvrement: 91,
    satisfaction: 80,
    rentabilité: 5.5,
  },
  {
    name: "Strasbourg",
    occupation: 82,
    recouvrement: 90,
    satisfaction: 79,
    rentabilité: 5.4,
  },
]

export function AgencyComparisonChart() {
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
        <YAxis yAxisId="left" orientation="left" domain={[70, 100]} />
        <YAxis yAxisId="right" orientation="right" domain={[5, 7]} />
        <Tooltip
          formatter={(value, name) => {
            if (name === "rentabilité") return [`${value}%`, "Rentabilité"]
            const nameStr = String(name);
            return [`${value}%`, nameStr.charAt(0).toUpperCase() + nameStr.slice(1)]
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="occupation" name="Occupation" fill="#3b82f6" />
        <Bar yAxisId="left" dataKey="recouvrement" name="Recouvrement" fill="#22c55e" />
        <Bar yAxisId="left" dataKey="satisfaction" name="Satisfaction" fill="#9333ea" />
        <Bar yAxisId="right" dataKey="rentabilité" name="Rentabilité" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}
