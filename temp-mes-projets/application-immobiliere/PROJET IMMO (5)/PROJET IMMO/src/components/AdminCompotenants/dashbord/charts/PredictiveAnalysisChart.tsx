import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  // Historical data
  { month: 'Jan', actual: 54000, predicted: null },
  { month: 'Feb', actual: 58000, predicted: null },
  { month: 'Mar', actual: 61000, predicted: null },
  { month: 'Apr', actual: 57000, predicted: null },
  { month: 'May', actual: 63000, predicted: null },
  { month: 'Jun', actual: 68000, predicted: null },
  // Current
  { month: 'Jul', actual: 72000, predicted: 71000 },
  { month: 'Aug', actual: 69000, predicted: 70000 },
  // Predictions
  { month: 'Sep', actual: null, predicted: 75000 },
  { month: 'Oct', actual: null, predicted: 78000 },
  { month: 'Nov', actual: null, predicted: 82000 },
  { month: 'Dec', actual: null, predicted: 88000 },
  { month: 'Jan', actual: null, predicted: 84000 },
  { month: 'Feb', actual: null, predicted: 89000 },
];

export const PredictiveAnalysisChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="month" 
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
            return [`${value.toLocaleString()} €`, name === 'actual' ? 'Réel' : 'Prévision'];
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
          dataKey="actual" 
          name="Revenus réels"
          stroke="#0ea5e9" 
          strokeWidth={2} 
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="dark:stroke-cyan-500" 
        />
        <Line 
          type="monotone" 
          dataKey="predicted" 
          name="Prévisions"
          stroke="#8b5cf6" 
          strokeWidth={2} 
          strokeDasharray="5 5"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="dark:stroke-purple-500" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};