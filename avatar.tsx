import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export function Avatar({ src, alt = 'Avatar', initials, size = 'md', status, className = '', ...props }: AvatarProps) {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-300',
    away: 'bg-amber-500',
    busy: 'bg-red-500',
  };

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      <div className={`${sizes[size]} rounded-full overflow-hidden bg-slate-200 border-2 border-white flex items-center justify-center shadow-sm`}>
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span className="font-semibold text-slate-500 uppercase">
            {initials || alt.substring(0, 2)}
          </span>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${statusColors[status]}`}
          style={{
            width: size === 'xs' ? '6px' : size === 'sm' ? '8px' : size === 'xl' ? '14px' : '10px',
            height: size === 'xs' ? '6px' : size === 'sm' ? '8px' : size === 'xl' ? '14px' : '10px',
          }}
        />
      )}
    </div>
  );
}
