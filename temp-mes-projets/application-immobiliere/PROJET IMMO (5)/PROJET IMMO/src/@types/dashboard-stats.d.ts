import type { LucideIcon } from 'lucide-react';

declare module '@/components/ui/dashboard-stats' {
  import * as React from 'react';

  export interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    colorClass?: string;
  }

  export const StatCard: React.FC<StatCardProps>;
  
  export interface CircularStatProps extends StatCardProps {
    percentage: number;
  }

  export const CircularStat: React.FC<CircularStatProps>;
}
