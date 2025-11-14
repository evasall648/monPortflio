import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', income: 54000, expense: 20000 },
  { name: 'Feb', income: 58000, expense: 22000 },
  { name: 'Mar', income: 61000, expense: 23500 },
  { name: 'Apr', income: 57000, expense: 21800 },
  { name: 'May', income: 63000, expense: 24100 },
  { name: 'Jun', income: 68000, expense: 25300 },
  { name: 'Jul', income: 72000, expense: 26200 },
  { name: 'Aug', income: 69000, expense: 25800 },
];

export const FinancialFlowChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
          formatter={(value: number) => [`${value.toLocaleString()} €`, '']}
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderColor: '#e2e8f0',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          className="dark:bg-gray-800 dark:border-gray-700" 
        />
        <Area 
          type="monotone" 
          dataKey="income" 
          stackId="1" 
          stroke="#0ea5e9" 
          fill="#0ea5e9" 
          fillOpacity={0.5}
          className="dark:stroke-cyan-600 dark:fill-cyan-600" 
        />
        <Area 
          type="monotone" 
          dataKey="expense" 
          stackId="1" 
          stroke="#ef4444" 
          fill="#ef4444" 
          fillOpacity={0.5}
          className="dark:stroke-red-600 dark:fill-red-600" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};