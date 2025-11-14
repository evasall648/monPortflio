import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 54000 },
  { name: 'Feb', value: 58000 },
  { name: 'Mar', value: 61000 },
  { name: 'Apr', value: 57000 },
  { name: 'May', value: 63000 },
  { name: 'Jun', value: 68000 },
  { name: 'Jul', value: 72000 },
  { name: 'Aug', value: 69000 },
];

export const RevenueChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
          tickFormatter={(value) => `${value / 1000}k`} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
        />
        <Tooltip 
          formatter={(value: number) => [`${value.toLocaleString()} €`, 'Revenue']}
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderColor: '#e2e8f0',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          className="dark:bg-gray-800 dark:border-gray-700" 
        />
        <Bar 
          dataKey="value" 
          fill="#0ea5e9" 
          radius={[4, 4, 0, 0]}
          className="dark:fill-cyan-600" 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};