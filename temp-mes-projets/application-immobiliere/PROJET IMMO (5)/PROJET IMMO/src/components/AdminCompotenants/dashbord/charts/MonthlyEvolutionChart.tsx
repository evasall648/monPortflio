import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlyEvolutionChartProps {
  period?: string;
}

const dataByPeriod = {
  jan: [
    { day: '01', value: 4500 },
    { day: '05', value: 5200 },
    { day: '10', value: 5800 },
    { day: '15', value: 6400 },
    { day: '20', value: 6900 },
    { day: '25', value: 7300 },
    { day: '30', value: 7800 },
  ],
  feb: [
    { day: '01', value: 4800 },
    { day: '05', value: 5500 },
    { day: '10', value: 6100 },
    { day: '15', value: 6700 },
    { day: '20', value: 7200 },
    { day: '25', value: 7600 },
    { day: '28', value: 8100 },
  ],
  mar: [
    { day: '01', value: 5100 },
    { day: '05', value: 5800 },
    { day: '10', value: 6400 },
    { day: '15', value: 7000 },
    { day: '20', value: 7500 },
    { day: '25', value: 7900 },
    { day: '30', value: 8400 },
  ],
  last_year: [
    { month: 'Jan', value: 54000 },
    { month: 'Feb', value: 58000 },
    { month: 'Mar', value: 61000 },
    { month: 'Apr', value: 57000 },
    { month: 'May', value: 63000 },
    { month: 'Jun', value: 68000 },
    { month: 'Jul', value: 72000 },
    { month: 'Aug', value: 69000 },
    { month: 'Sep', value: 74000 },
    { month: 'Oct', value: 78000 },
    { month: 'Nov', value: 82000 },
    { month: 'Dec', value: 86000 },
  ],
};

// Default to current month if no period specified
const defaultData = dataByPeriod.jan;

export const MonthlyEvolutionChart: React.FC<MonthlyEvolutionChartProps> = ({ period = 'jan' }) => {
  const chartData = period === 'last_year' 
    ? dataByPeriod.last_year
    : dataByPeriod[period as keyof typeof dataByPeriod] || defaultData;
  
  const xKey = period === 'last_year' ? 'month' : 'day';
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey={xKey} 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b' }}
          className="dark:text-gray-400" 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tickFormatter={(value) => period === 'last_year' ? `${value / 1000}k` : `${value}`} 
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
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#0ea5e9" 
          strokeWidth={2} 
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="dark:stroke-cyan-500" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};