import React from 'react';
import { DivideIcon as LucideIcon, ArrowUpRight } from 'lucide-react';

interface StatisticCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  isFloating?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
  trendValue,
  isFloating = false,
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
      <div className="flex items-start gap-3">
        <div className={`flex ${isFloating ? '-mt-6' : ''} h-12 w-12 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="flex-1">
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
    </div>
  );
};

export default StatisticCard;