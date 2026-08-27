'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap, LayoutDashboard, User, CalendarCheck, BookOpen, Clock, FileText,
  ClipboardList, Calendar, Newspaper, Trophy, Medal, MessageSquare, Bot, Bell,
  Users, FileCheck, UserCog, School, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

interface SidebarProps {
  role: string;
  currentPath: string;
  isOpen: boolean;
  isCollapsed: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const ROLE_PREFIX: Record<string, string> = {
  STUDENT: '/student',
  TEACHER: '/teacher',
  PARENT: '/parent',
  ADMIN: '/admin',
};

const MENU_ITEMS = {
  STUDENT: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Attendance', icon: CalendarCheck, path: '/attendance' },
    { name: 'Academics', icon: GraduationCap, path: '/academics' },
    { name: 'Subjects', icon: BookOpen, path: '/subjects' },
    { name: 'Timetable', icon: Clock, path: '/timetable' },
    { name: 'Homework', icon: FileText, path: '/homework' },
    { name: 'Exams', icon: ClipboardList, path: '/exams' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Circulars', icon: Newspaper, path: '/circulars' },
    { name: 'Achievements', icon: Trophy, path: '/achievements' },
    { name: 'Rankings', icon: Medal, path: '/rankings' },
    { name: 'Complaints', icon: MessageSquare, path: '/complaints' },
    { name: 'AI Assistant', icon: Bot, path: '/ai' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
  ],
  TEACHER: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '' },
    { name: 'My Classes', icon: Users, path: '/classes' },
    { name: 'Attendance', icon: CalendarCheck, path: '/attendance' },
    { name: 'Students', icon: GraduationCap, path: '/students' },
    { name: 'Marks Entry', icon: FileCheck, path: '/marks' },
    { name: 'Homework', icon: FileText, path: '/homework' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Complaints', icon: MessageSquare, path: '/complaints' },
  ],
  PARENT: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '' },
    { name: 'My Children', icon: Users, path: '/children' },
    { name: 'Attendance', icon: CalendarCheck, path: '/attendance' },
    { name: 'Academics', icon: GraduationCap, path: '/academics' },
    { name: 'Homework', icon: FileText, path: '/homework' },
    { name: 'Timetable', icon: Clock, path: '/timetable' },
    { name: 'Exams', icon: ClipboardList, path: '/exams' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Circulars', icon: Newspaper, path: '/circulars' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
  ],
  ADMIN: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '' },
    { name: 'Students', icon: GraduationCap, path: '/students' },
    { name: 'Teachers', icon: UserCog, path: '/teachers' },
    { name: 'Parents', icon: Users, path: '/parents' },
    { name: 'Classes', icon: School, path: '/classes' },
    { name: 'Subjects', icon: BookOpen, path: '/subjects' },
    { name: 'Timetable', icon: Clock, path: '/timetable' },
    { name: 'Attendance', icon: CalendarCheck, path: '/attendance' },
    { name: 'Exams', icon: ClipboardList, path: '/exams' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Circulars', icon: Newspaper, path: '/circulars' },
    { name: 'Achievements', icon: Trophy, path: '/achievements' },
    { name: 'Complaints', icon: MessageSquare, path: '/complaints' },
    { name: 'Rankings', icon: Medal, path: '/rankings' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ],
};

export function Sidebar({ role, currentPath, isOpen, isCollapsed, setIsOpen, setIsCollapsed }: SidebarProps) {
  const menuItems = MENU_ITEMS[role as keyof typeof MENU_ITEMS] || MENU_ITEMS.STUDENT;
  const { user, logout } = useAuth();
  const prefix = ROLE_PREFIX[role] || '/student';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/80 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#1e3a5f] text-slate-300 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-72`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold text-white whitespace-nowrap">Smart School</span>
            )}
          </div>
          <button 
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const fullPath = prefix + item.path;
              const isActive = currentPath === fullPath || 
                (item.path !== '' && currentPath.startsWith(fullPath + '/'));
              return (
                <Link
                  key={fullPath}
                  href={fullPath}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white font-medium' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3 mb-4`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 shrink-0 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold uppercase">
                {user?.name?.charAt(0) || role.charAt(0)}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white truncate">{user?.name || 'User'}</span>
                  <span className="text-xs text-slate-400 capitalize">{role.toLowerCase()}</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button onClick={logout} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
          {isCollapsed && (
            <button onClick={logout} className="w-full flex justify-center text-slate-400 hover:text-white p-2 rounded-md hover:bg-white/10 transition-colors" title="Logout">
              <LogOut className="h-5 w-5" />
            </button>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center p-2 mt-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </aside>
    </>
  );
}
