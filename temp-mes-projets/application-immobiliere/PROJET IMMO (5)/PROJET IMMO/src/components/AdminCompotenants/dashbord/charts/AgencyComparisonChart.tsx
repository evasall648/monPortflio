import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Agence Paris', performance: 92, revenue: 480000 },
  { name: 'Agence Lyon', performance: 88, revenue: 380000 },
  { name: 'Agence Marseille', performance: 85, revenue: 320000 },
  { name: 'Agence Bordeaux', performance: 90, revenue: 360000 },
  { name: 'Agence Lille', performance: 82, revenue: 290000 },
];

export const AgencyComparisonChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
          angle={-35}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          yAxisId="left"
          axisLine={false} 
          tickLine={false} 
          tickFormatter={(value) => `${value}%`} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
          domain={[75, 100]}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          axisLine={false} 
          tickLine={false} 
          tickFormatter={(value) => `${value / 1000}k`} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
        />
        <Tooltip 
          formatter={(value: number, name: string) => {
            if (name === 'performance') return [`${value}%`, 'Performance'];
            if (name === 'revenue') return [`${value.toLocaleString()} €`, 'Revenu'];
            return [value, name];
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
        <Bar 
          yAxisId="left"
          dataKey="performance" 
          fill="#0ea5e9" 
          radius={[4, 4, 0, 0]}
          name="Performance (%)"
          className="dark:fill-cyan-600" 
        />
        <Bar 
          yAxisId="right"
          dataKey="revenue" 
          fill="#f59e0b" 
          radius={[4, 4, 0, 0]}
          name="Revenu (€)"
          className="dark:fill-amber-600" 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};