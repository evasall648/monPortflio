import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 54000, expense: 20000 },
  { name: 'Feb', revenue: 58000, expense: 22000 },
  { name: 'Mar', revenue: 61000, expense: 23500 },
  { name: 'Apr', revenue: 57000, expense: 21800 },
  { name: 'May', revenue: 63000, expense: 24100 },
  { name: 'Jun', revenue: 68000, expense: 25300 },
];

export const RevenueExpenseChart: React.FC = () => {
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
          formatter={(value: number, name: string) => {
            return [`${value.toLocaleString()} €`, name === 'revenue' ? 'Revenus' : 'Dépenses'];
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
          dataKey="revenue" 
          fill="#10b981" 
          name="Revenus"
          radius={[4, 4, 0, 0]}
          className="dark:fill-green-600" 
        />
        <Bar 
          dataKey="expense" 
          fill="#ef4444" 
          name="Dépenses"
          radius={[4, 4, 0, 0]}
          className="dark:fill-red-600" 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};