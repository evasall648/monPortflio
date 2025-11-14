import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', votreAgence: 4000, moyenneMarche: 2400 },
  { name: 'Fév', votreAgence: 3000, moyenneMarche: 1398 },
  { name: 'Mar', votreAgence: 2000, moyenneMarche: 9800 },
  { name: 'Avr', votreAgence: 2780, moyenneMarche: 3908 },
  { name: 'Mai', votreAgence: 1890, moyenneMarche: 4800 },
  { name: 'Juin', votreAgence: 2390, moyenneMarche: 3800 },
  { name: 'Juil', votreAgence: 3490, moyenneMarche: 4300 },
];

export function MarketComparisonChart() {
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
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="votreAgence" 
          stroke="#3B82F6" 
          strokeWidth={2}
          name="Votre agence"
          activeDot={{ r: 8 }} 
        />
        <Line 
          type="monotone" 
          dataKey="moyenneMarche" 
          stroke="#10B981" 
          strokeWidth={2}
          name="Moyenne du marché" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}