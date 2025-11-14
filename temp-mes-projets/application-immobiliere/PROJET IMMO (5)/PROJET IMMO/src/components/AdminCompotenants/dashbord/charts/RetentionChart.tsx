import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2018', value: 68 },
  { year: '2019', value: 72 },
  { year: '2020', value: 70 },
  { year: '2021', value: 74 },
  { year: '2022', value: 78 },
  { year: '2023', value: 76 },
];

export const RetentionChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="year" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          domain={[60, 90]}
          tickFormatter={(value) => `${value}%`} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
        />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Taux de rétention']}
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderColor: '#e2e8f0',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          className="dark:bg-gray-800 dark:border-gray-700" 
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#10b981" 
          strokeWidth={2} 
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="dark:stroke-green-500" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};