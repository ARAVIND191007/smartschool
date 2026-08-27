'use client';
import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, items, align = 'right', className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200
            ${align === 'right' ? 'right-0' : 'left-0'}
          `}
        >
          <div className="py-1">
            {items.map((item, index) => {
              if (item.divider) {
                return <div key={`divider-${index}`} className="h-px my-1 bg-slate-200" />;
              }

              const ItemWrapper = item.href ? 'a' : 'button';
              
              return (
                <ItemWrapper
                  key={`${item.label}-${index}`}
                  href={item.href}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick?.();
                      setIsOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={`
                    w-full text-left flex items-center px-4 py-2 text-sm
                    ${item.disabled ? 'opacity-50 cursor-not-allowed text-slate-400' : 'hover:bg-slate-100'}
                    ${item.danger ? 'text-red-600 hover:text-red-700' : 'text-slate-700'}
                  `}
                >
                  {item.icon && (
                    <span className={`mr-3 h-4 w-4 ${item.danger ? 'text-red-500' : 'text-slate-400'}`}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </ItemWrapper>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
