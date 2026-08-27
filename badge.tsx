import React from 'react';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = 'neutral', className = '', children, ...props }: BadgeProps) {
  const variants = {
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    neutral: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

// Pre-configured badges for specific domains
export function AttendanceBadge({ status }: { status: 'present' | 'absent' | 'late' | 'leave' }) {
  const config = {
    present: { variant: 'success' as const, label: 'Present' },
    absent: { variant: 'danger' as const, label: 'Absent' },
    late: { variant: 'warning' as const, label: 'Late' },
    leave: { variant: 'info' as const, label: 'On Leave' },
  };

  const { variant, label } = config[status] || config.present;
  return <Badge variant={variant}>{label}</Badge>;
}

export function ComplaintStatusBadge({ status }: { status: 'submitted' | 'under_review' | 'assigned' | 'in_progress' | 'resolved' | 'closed' }) {
  const config = {
    submitted: { variant: 'neutral' as const, label: 'Submitted' },
    under_review: { variant: 'warning' as const, label: 'Under Review' },
    assigned: { variant: 'info' as const, label: 'Assigned' },
    in_progress: { variant: 'info' as const, label: 'In Progress' },
    resolved: { variant: 'success' as const, label: 'Resolved' },
    closed: { variant: 'neutral' as const, label: 'Closed' },
  };

  const { variant, label } = config[status] || config.submitted;
  return <Badge variant={variant}>{label}</Badge>;
}
