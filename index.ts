// Utility functions for Smart School
import { type ClassValue, clsx } from 'clsx';

// Simple clsx implementation (no external dependency needed)
export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]): string {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === 'string') return [input];
      return Object.entries(input)
        .filter(([, value]) => value)
        .map(([key]) => key);
    })
    .join(' ');
}

export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = new Date(date);
  if (format === 'relative') {
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }
  if (format === 'long') {
    return d.toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }
  return d.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getPercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function getGradeColor(grade: string): string {
  switch (grade.toUpperCase()) {
    case 'A+': case 'A': return 'text-emerald-600';
    case 'B+': case 'B': return 'text-blue-600';
    case 'C+': case 'C': return 'text-amber-600';
    case 'D': return 'text-orange-600';
    case 'F': return 'text-red-600';
    default: return 'text-slate-600';
  }
}

export function getAttendanceColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'present': return 'bg-emerald-100 text-emerald-700';
    case 'absent': return 'bg-red-100 text-red-700';
    case 'late': return 'bg-amber-100 text-amber-700';
    case 'leave': return 'bg-blue-100 text-blue-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export function getComplaintStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'submitted': return 'bg-blue-100 text-blue-700';
    case 'under_review': return 'bg-purple-100 text-purple-700';
    case 'assigned': return 'bg-indigo-100 text-indigo-700';
    case 'in_progress': return 'bg-amber-100 text-amber-700';
    case 'resolved': return 'bg-emerald-100 text-emerald-700';
    case 'closed': return 'bg-slate-100 text-slate-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'urgent': return 'bg-red-100 text-red-700';
    case 'high': return 'bg-orange-100 text-orange-700';
    case 'medium': return 'bg-amber-100 text-amber-700';
    case 'low': return 'bg-green-100 text-green-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function generateComplaintNumber(): string {
  const prefix = 'CMP';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getDayName(dayNumber: number): string {
  const days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[dayNumber] || '';
}

export function getCurrentPeriod(periods: { start_time: string; end_time: string; period_number: number }[]): number | null {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  for (const period of periods) {
    if (currentTime >= period.start_time && currentTime <= period.end_time) {
      return period.period_number;
    }
  }
  return null;
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
