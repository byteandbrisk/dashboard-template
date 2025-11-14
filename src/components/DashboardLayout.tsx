'use client'

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  ChevronLeft, 
  ChevronRight,
  User,
  Home
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
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'iot', label: 'IoT', icon: Wifi, href: '/iot' },
  { id: 'tables', label: 'Tables', icon: Table2, href: '/tables' },
  { id: 'forms', label: 'Forms', icon: FileText, href: '/forms' },
  { id: 'charts', label: 'Charts', icon: BarChart3, href: '/charts' },
  { id: 'maps', label: 'Maps', icon: Map, href: '/maps' },
  { id: 'components', label: 'Components', icon: Component, href: '/components' },
  { id: 'pricing', label: 'Pricing', icon: DollarSign, href: '/pricing' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '/contact' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Filter nav items based on search
  const searchResults = navItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  // Handle search navigation
  const handleSearchSelect = (href: string) => {
    router.push(href);
    setSearchQuery('');
    setShowSearchResults(false);
  };

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
            <Link href="/" className="flex items-center gap-2 fade-in">
              <div className="w-8 h-8 rounded-lg bg-[color:var(--primary)] flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">Admin Pro</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link href="/" className="w-8 h-8 rounded-lg bg-[color:var(--primary)] flex items-center justify-center fade-in">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
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
                  </Link>
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
            <div className="flex-1 max-w-md relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                <Input
                  placeholder="Search pages..."
                  className="pl-10 pr-4 bg-[color:var(--surface-muted)] border-transparent"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.length > 0);
                  }}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                />
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-[color:var(--surface)] border border-[color:var(--border)] rounded-lg shadow-lg z-50 fade-in">
                  <div className="p-2">
                    {searchResults.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSearchSelect(item.href)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[color:var(--surface-muted)] transition-colors text-left"
                        >
                          <Icon className="w-4 h-4 text-[color:var(--text-muted)]" />
                          <span className="text-sm">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {showSearchResults && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-[color:var(--surface)] border border-[color:var(--border)] rounded-lg shadow-lg z-50 fade-in">
                  <div className="p-4 text-center text-sm text-[color:var(--text-muted)]">
                    No pages found
                  </div>
                </div>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                    >
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <div className="flex items-start gap-2 w-full">
                        <div className="w-2 h-2 rounded-full bg-[color:var(--primary)] mt-1.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">New user registration</p>
                          <p className="text-xs text-[color:var(--text-muted)] mt-0.5">
                            John Smith just signed up for an account
                          </p>
                          <p className="text-xs text-[color:var(--text-muted)] mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <div className="flex items-start gap-2 w-full">
                        <div className="w-2 h-2 rounded-full bg-[color:var(--primary)] mt-1.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">Server update completed</p>
                          <p className="text-xs text-[color:var(--text-muted)] mt-0.5">
                            All systems are now running version 2.4.1
                          </p>
                          <p className="text-xs text-[color:var(--text-muted)] mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <div className="flex items-start gap-2 w-full">
                        <div className="w-2 h-2 rounded-full bg-[color:var(--primary)] mt-1.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">New comment on your post</p>
                          <p className="text-xs text-[color:var(--text-muted)] mt-0.5">
                            Sarah commented: "Great work on the dashboard!"
                          </p>
                          <p className="text-xs text-[color:var(--text-muted)] mt-1">3 hours ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-sm text-[color:var(--primary)] font-medium cursor-pointer">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-[color:var(--danger)]"
                    onClick={() => router.push('/auth/login')}
                  >
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

