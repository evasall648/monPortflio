import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

interface CircularProgressCardProps {
  title: string;
  value: string;
  percentage: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  progressColor: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

const CircularProgressCard: React.FC<CircularProgressCardProps> = ({
  title,
  value,
  percentage,
  icon: Icon,
  iconColor,
  iconBg,
  progressColor,
  trend,
  trendValue,
}) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="relative h-16 w-16">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 dark:text-gray-700 stroke-current"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            />
            <circle
              className={`stroke-current ${progressColor}`}
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`${percentage * 2.51} 251.2`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{percentage}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="mt-1 flex items-baseline justify-between">
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {trend && trendValue && (
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                trend === 'up'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              <ArrowUpRight
                className={`mr-1 h-3 w-3 ${trend === 'down' && 'rotate-90'}`}
              />
              {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircularProgressCard;