import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 82 },
  { name: 'Feb', value: 84 },
  { name: 'Mar', value: 86 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 88 },
  { name: 'Jun', value: 90 },
  { name: 'Jul', value: 92 },
  { name: 'Aug', value: 89 },
];

export const OccupancyRateChart: React.FC = () => {
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
          domain={[75, 100]}
          tickFormatter={(value) => `${value}%`} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
        />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Taux d\'occupation']}
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
          dataKey="value" 
          stroke="#3b82f6" 
          fill="#3b82f6" 
          fillOpacity={0.3}
          className="dark:stroke-blue-500 dark:fill-blue-500" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};