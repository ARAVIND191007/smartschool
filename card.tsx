import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  change?: number; // percentage change
  changeLabel?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-primary',
  change,
  changeLabel,
  className = '',
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-semibold text-slate-800 mt-1">{value}</p>
        </div>
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
      </div>
      {(change !== undefined || changeLabel) && (
        <div className="mt-4 flex items-center text-sm">
          {change !== undefined && (
            <span className={`flex items-center font-medium ${isPositive ? 'text-emerald-600' : isNegative ? 'text-red-600' : 'text-slate-500'}`}>
              {isPositive && <ArrowUpRight className="h-4 w-4 mr-1" />}
              {isNegative && <ArrowDownRight className="h-4 w-4 mr-1" />}
              {Math.abs(change)}%
            </span>
          )}
          {changeLabel && <span className="text-slate-500 ml-2">{changeLabel}</span>}
        </div>
      )}
    </Card>
  );
}

export interface ProfileCardProps {
  name: string;
  role: string;
  photoUrl?: string;
  fallbackInitials?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ProfileCard({ name, role, photoUrl, fallbackInitials, className = '', children }: ProfileCardProps) {
  const initials = fallbackInitials || name.substring(0, 2).toUpperCase();
  
  return (
    <Card className={`p-6 flex flex-col items-center text-center ${className}`}>
      <div className="h-24 w-24 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-sm mb-4 flex items-center justify-center">
        {photoUrl ? (
          <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-2xl font-semibold text-slate-400">{initials}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
      <p className="text-sm text-slate-500 mb-4">{role}</p>
      {children && <div className="w-full mt-2">{children}</div>}
    </Card>
  );
}
