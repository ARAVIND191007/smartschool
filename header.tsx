'use client';

import React from 'react';
import { Menu, Search, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function Header({ onMenuClick, title = 'Dashboard' }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-white px-4 border-b border-slate-200 shadow-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-slate-500 hover:text-slate-700 lg:hidden p-2 -ml-2 rounded-md hover:bg-slate-100"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar - Desktop Only */}
        <div className="hidden md:flex relative items-center">
          <Search className="absolute left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-full border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm text-slate-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <div className="absolute right-3 flex items-center">
            <kbd className="hidden sm:inline-block rounded border border-slate-200 bg-white px-1.5 font-sans text-xs font-medium text-slate-400">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-100 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:flex flex-col items-start pr-2">
              <span className="text-sm font-medium text-slate-700">{user?.name || 'User'}</span>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 border-b border-slate-100 md:hidden">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</p>
              </div>
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => { setShowDropdown(false); /* Navigate to profile */ }}
              >
                <User className="mr-3 h-4 w-4" />
                Your Profile
              </button>
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
