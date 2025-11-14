import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Q1 2022', company: 3.2, market: 2.1 },
  { name: 'Q2 2022', company: 3.8, market: 2.3 },
  { name: 'Q3 2022', company: 3.5, market: 2.5 },
  { name: 'Q4 2022', company: 4.2, market: 2.8 },
  { name: 'Q1 2023', company: 4.8, market: 3.1 },
  { name: 'Q2 2023', company: 5.3, market: 3.4 },
  { name: 'Q3 2023', company: 5.8, market: 3.6 },
  { name: 'Q4 2023', company: 6.2, market: 3.9 },
];

export const MarketComparisonChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tickFormatter={(value) => `${value}%`} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
        />
        <Tooltip 
          formatter={(value: number, name: string) => {
            return [`${value}%`, name === 'company' ? 'Notre performance' : 'Performance du marché'];
          }}
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderColor: '#e2e8f0',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          className="dark:bg-gray-800 dark:border-gray-700" 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="company" 
          name="Notre croissance"
          stroke="#0ea5e9" 
          strokeWidth={2} 
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="dark:stroke-cyan-500" 
        />
        <Line 
          type="monotone" 
          dataKey="market" 
          name="Moyenne du marché"
          stroke="#94a3b8" 
          strokeWidth={2} 
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="dark:stroke-gray-400" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};