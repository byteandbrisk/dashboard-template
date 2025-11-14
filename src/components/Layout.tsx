'use client'

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { 
  LayoutDashboard, 
  Wifi, 
  Table2, 
  FileText, 
  BarChart3, 
  Map, 
  Component, 
  DollarSign, 
  Mail, 
  Settings, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  ChevronLeft, 
  ChevronRight,
  Command,
  User,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'introduction', label: 'Introduction', icon: Info },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'iot', label: 'IoT', icon: Wifi },
  { id: 'tables', label: 'Tables', icon: Table2 },
  { id: 'forms', label: 'Forms', icon: FileText },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
  { id: 'maps', label: 'Maps', icon: Map },
  { id: 'components', label: 'Components', icon: Component },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside
        className={`bg-[color:var(--surface)] border-r border-[color:var(--border)] transition-all flex flex-col h-screen flex-shrink-0 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
        style={{ 
          boxShadow: 'var(--elevation-1)',
          transitionDuration: 'var(--duration)',
          transitionTimingFunction: 'var(--ease)'
        }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[color:var(--border)]">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 fade-in">
              <div className="w-8 h-8 rounded-lg bg-[color:var(--primary)] flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">Admin Pro</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-[color:var(--primary)] flex items-center justify-center fade-in">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[color:var(--primary-light)] text-[color:var(--primary)] shadow-sm'
                        : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--text)]'
                    }`}
                    style={{ 
                      transitionDuration: 'var(--duration-fast)',
                      transitionTimingFunction: 'var(--ease)'
                    }}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-[color:var(--border)]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header
          className="h-16 bg-[color:var(--surface)] border-b border-[color:var(--border)] flex-shrink-0"
          style={{ boxShadow: 'var(--elevation-1)' }}
        >
          <div className="h-full px-6 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                <Input
                  placeholder="Search or type ⌘K..."
                  className="pl-10 pr-4 bg-[color:var(--surface-muted)] border-transparent"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[color:var(--surface)] border border-[color:var(--border)] rounded text-xs text-[color:var(--text-muted)]">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                title="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-[color:var(--primary)] text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden sm:inline">
                      John Doe
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('settings')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-[color:var(--danger)]">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[color:var(--bg)]">
          {children}
        </main>
      </div>
    </div>
  );
}
