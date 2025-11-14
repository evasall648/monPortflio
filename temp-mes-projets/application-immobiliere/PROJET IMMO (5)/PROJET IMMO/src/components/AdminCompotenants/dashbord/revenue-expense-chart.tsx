import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenus: 4000, depenses: 2400 },
  { name: 'Fév', revenus: 3000, depenses: 1398 },
  { name: 'Mar', revenus: 2000, depenses: 9800 },
  { name: 'Avr', revenus: 2780, depenses: 3908 },
  { name: 'Mai', revenus: 1890, depenses: 4800 },
  { name: 'Juin', revenus: 2390, depenses: 3800 },
  { name: 'Juil', revenus: 3490, depenses: 4300 },
];

export function RevenueExpenseChart() {
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
        <Tooltip />
        <Legend />
        <Bar dataKey="revenus" fill="#4CAF50" name="Revenus" />
        <Bar dataKey="depenses" fill="#F44336" name="Dépenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}
