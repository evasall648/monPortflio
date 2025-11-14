import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InvoiceCardProps {
  title: string;
  value: string;
  percentage: number;
  color: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  textColor?: string;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({
  title,
  value,
  percentage,
  color,
  icon: Icon,
  iconBg,
  iconColor,
  textColor = "text-gray-900",
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="relative h-12 w-12">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              className="stroke-current text-gray-200 dark:text-gray-700"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            />
            <circle
              className={`stroke-current ${color}`}
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
            <span className="text-xs font-bold dark:text-white">{percentage}%</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className={`text-xl font-bold ${textColor} dark:text-white`}>{value}</p>
      </div>
    </div>
  );
};

export default InvoiceCard;