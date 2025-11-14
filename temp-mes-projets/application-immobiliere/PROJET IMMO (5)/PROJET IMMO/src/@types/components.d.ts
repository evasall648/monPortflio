// Types pour les composants UI
import type { LucideIcon } from 'lucide-react';

declare module '@/components/ui/dashboard-stats' {
  import * as React from 'react';

  export interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    colorClass?: string;
    trend?: 'up' | 'down' | 'stable';
    trendValue?: string;
  }

  export const StatCard: React.FC<StatCardProps>;
  
  export interface CircularStatProps extends StatCardProps {
    percentage: number;
  }

  export const CircularStat: React.FC<CircularStatProps>;
}

declare module '@/components/ui/select' {
  import * as React from 'react';
  
  export const Select: React.FC<{
    value?: string;
    onValueChange?: (value: string) => void;
    children?: React.ReactNode;
  }>;
  
  export const SelectTrigger: React.FC<{
    className?: string;
    children?: React.ReactNode;
  }>;
  
  export const SelectValue: React.FC<{
    placeholder?: string;
  }>;
  
  export const SelectContent: React.FC<{
    children?: React.ReactNode;
  }>;
  
  export const SelectItem: React.FC<{
    value: string;
    children?: React.ReactNode;
  }>;
}

declare module '@/components/ui/badge' {
  import * as React from 'react';
  
  export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  }
  
  export const Badge: React.ForwardRefExoticComponent<
    BadgeProps & React.RefAttributes<HTMLDivElement>
  >;
}

declare module '@/components/ui/tooltip' {
  import * as React from 'react';
  
  export const Tooltip: React.FC<{
    children: React.ReactNode;
  }>;
  
  export const TooltipTrigger: React.FC<{
    children: React.ReactNode;
  }>;
  
  export const TooltipContent: React.FC<{
    children: React.ReactNode;
  }>;
  
  export const TooltipProvider: React.FC<{
    children: React.ReactNode;
  }>;
}

// Types pour les composants UI
declare module '@/components/ui/button' {
  import * as React from 'react';
  
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }
  
  const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
  
  export { Button };
}

declare module '@/components/ui/card' {
  import * as React from 'react';
  
  export const Card: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;
  
  export const CardHeader: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;
  
  export const CardTitle: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>
  >;
  
  export const CardDescription: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>
  >;
  
  export const CardContent: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;
  
  export const CardFooter: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;
}

declare module '@/components/ui/input' {
  import * as React from 'react';
  
  export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}
    
  const Input: React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  >;
  
  export { Input };
}

declare module '@/components/ui/label' {
  import * as React from 'react';
  
  export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement> {}
    
  const Label: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;
  
  export { Label };
}

declare module '@/components/ui/switch' {
  import * as React from 'react';
  
  export interface SwitchProps
    extends React.InputHTMLAttributes<HTMLButtonElement> {}
    
  const Switch: React.ForwardRefExoticComponent<
    SwitchProps & React.RefAttributes<HTMLButtonElement>
  >;
  
  export { Switch };
}

declare module '@/components/ui/tabs' {
  import * as React from 'react';
  
  export const Tabs: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const TabsTrigger: React.FC<React.HTMLAttributes<HTMLButtonElement>>;
  export const TabsContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/toast' {
  import * as React from 'react';
  
  export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive';
  }
  
  export type ToastActionElement = React.ReactElement<{
    altText: string;
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
  }>;
  
  export const Toast: React.FC<ToastProps>;
  export const ToastAction: React.FC<React.HTMLAttributes<HTMLButtonElement>>;
  export const ToastClose: React.FC<React.HTMLAttributes<HTMLButtonElement>>;
  export const ToastDescription: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ToastProvider: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ToastTitle: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ToastViewport: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

