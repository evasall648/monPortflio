import * as React from 'react';

declare module '@/components/ui/tabs' {
  export const Tabs: React.FC<{
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children?: React.ReactNode;
  }>;
  
  export const TabsList: React.FC<{
    className?: string;
    children?: React.ReactNode;
  }>;
  
  export const TabsTrigger: React.FC<{
    value: string;
    className?: string;
    children?: React.ReactNode;
  }>;
  
  export const TabsContent: React.FC<{
    value: string;
    className?: string;
    children?: React.ReactNode;
  }>;
}
