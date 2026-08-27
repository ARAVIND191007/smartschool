'use client';
import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultValue, value, onChange, className = '' }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || tabs[0]?.id);
  
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (id: string) => {
    if (value === undefined) {
      setInternalValue(id);
    }
    onChange?.(id);
  };

  const activeTab = tabs.find(t => t.id === currentValue) || tabs[0];

  return (
    <div className={className}>
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = tab.id === currentValue;
            return (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && handleChange(tab.id)}
                disabled={tab.disabled}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                  ${isActive 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }
                  ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.icon && (
                  <span className={`mr-2 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-500'}`}>
                    {tab.icon}
                  </span>
                )}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="mt-4 focus:outline-none">
        {activeTab?.content}
      </div>
    </div>
  );
}
