import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Fév', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Avr', amount: 55000 },
  { month: 'Mai', amount: 60000 },
  { month: 'Juin', amount: 58000 },
  { month: 'Juil', amount: 62000 },
  { month: 'Août', amount: 59000 },
  { month: 'Sep', amount: 63000 },
  { month: 'Oct', amount: 65000 },
  { month: 'Nov', amount: 68000 },
  { month: 'Déc', amount: 70000 },
];

export default function MonthlyEvolution() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-blue-900">Évolution mensuelle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis 
                dataKey="month" 
                stroke="#1e40af"
                tick={{ fill: '#1e40af' }}
              />
              <YAxis 
                stroke="#1e40af"
                tick={{ fill: '#1e40af' }}
                tickFormatter={(value: number) => `${value.toLocaleString()} €`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #bfdbfe',
                  borderRadius: '0.5rem',
                  color: '#1e40af'
                }}
                formatter={(value: number) => [`${value.toLocaleString()} €`, 'Montant']}
              />
              <Bar 
                dataKey="amount" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}