'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Trophy,
  GitCompareArrows,
  Search,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Download,
  TrendingUp,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/sectors', label: 'Sector Rankings', icon: BarChart3 },
  { href: '/leaderboards', label: 'ESG Leaderboards', icon: Trophy },
  { href: '/compare', label: 'Compare Sectors', icon: GitCompareArrows },
  { href: '/search', label: 'Search', icon: Search },
];

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        } ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      style={{
        background: 'linear-gradient(180deg, #0d0d15 0%, #12121a 100%)',
        borderRight: '1px solid rgba(30, 41, 59, 0.6)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-[var(--color-border-primary)]">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-[var(--color-text-primary)] whitespace-nowrap">
              India ESG
            </h1>
            <p className="text-[10px] text-[var(--color-text-muted)] whitespace-nowrap">
              Benchmark Dashboard
            </p>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#00d4aa]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]'}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[var(--color-border-primary)] p-3 space-y-1">
        <Link
          href="/api/export/csv"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
        >
          <Download className="w-5 h-5 flex-shrink-0 text-[var(--color-text-muted)]" />
          {!collapsed && <span>Export Data</span>}
        </Link>
        <div className="flex items-center gap-3 px-3 py-2.5">
          <TrendingUp className="w-5 h-5 flex-shrink-0 text-[#00d4aa]" />
          {!collapsed && (
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">BRSR 2026</p>
              <p className="text-xs text-[#00d4aa] font-medium">982 Companies</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle (Desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all z-50"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
    </>
  );
}
