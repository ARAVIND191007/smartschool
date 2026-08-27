'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
  currentPath: string;
}

export function DashboardLayout({ children, role, currentPath }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-close sidebar on route change for mobile
    setSidebarOpen(false);
  }, [currentPath]);

  // Derived title from currentPath
  const pathParts = currentPath.split('/').filter(Boolean);
  const pageTitle = pathParts.length > 0 
    ? pathParts[pathParts.length - 1].charAt(0).toUpperCase() + pathParts[pathParts.length - 1].slice(1)
    : 'Dashboard';

  if (!mounted) {
    return null; // Or a simple skeleton
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        role={role}
        currentPath={currentPath}
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        setIsOpen={setSidebarOpen}
        setIsCollapsed={setSidebarCollapsed}
      />
      
      <div 
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          title={pageTitle}
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
