'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Layers, BarChart3, Shield, Menu, Building2 } from 'lucide-react';
import { sectors } from '@/data/sectors';
import { companies } from '@/data/companies';

interface SearchResult {
  type: 'sector' | 'metric' | 'category' | 'company';
  title: string;
  subtitle: string;
  href: string;
}

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const sectorResults: SearchResult[] = sectors
      .filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
      .slice(0, 3)
      .map(s => ({
        type: 'sector' as const,
        title: s.name,
        subtitle: `${s.companyCount} companies · ${s.code}`,
        href: `/sectors/${s.slug}`,
      }));

    const companyResults: SearchResult[] = companies
      .filter(c => c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q))
      .slice(0, 4)
      .map(c => ({
        type: 'company' as const,
        title: c.name,
        subtitle: `${c.ticker} · ESG Score: ${c.esgScore}`,
        href: `/companies/${c.slug}`,
      }));

    const metricOptions = [
      { title: 'GHG Emissions', subtitle: 'Environmental · E1', href: '/search?q=ghg+emissions', category: 'metric' as const },
      { title: 'Renewable Energy', subtitle: 'Environmental · E4', href: '/search?q=renewable+energy', category: 'metric' as const },
      { title: 'Water Management', subtitle: 'Environmental · E3', href: '/search?q=water+management', category: 'metric' as const },
      { title: 'Waste Management', subtitle: 'Environmental · E6', href: '/search?q=waste+management', category: 'metric' as const },
      { title: 'Biodiversity', subtitle: 'Environmental · E5', href: '/search?q=biodiversity', category: 'metric' as const },
      { title: 'Gender Diversity', subtitle: 'Social · S4', href: '/search?q=gender+diversity', category: 'metric' as const },
      { title: 'Employee Safety', subtitle: 'Social · S3', href: '/search?q=employee+safety', category: 'metric' as const },
      { title: 'Board Independence', subtitle: 'Governance · G5', href: '/search?q=board+independence', category: 'metric' as const },
      { title: 'Anti-Corruption', subtitle: 'Governance · G1', href: '/search?q=anti+corruption', category: 'metric' as const },
      { title: 'Supply Chain', subtitle: 'Social · S5', href: '/search?q=supply+chain', category: 'metric' as const },
    ];
    const metricResults: SearchResult[] = metricOptions
      .filter(m => m.title.toLowerCase().includes(q) || m.subtitle.toLowerCase().includes(q))
      .slice(0, 3)
      .map(m => ({ type: 'metric', title: m.title, subtitle: m.subtitle, href: m.href }));

    setResults([...companyResults, ...sectorResults, ...metricResults]);
  }, [query]);

  const handleSelect = (href: string) => {
    setQuery('');
    setSearchOpen(false);
    router.push(href);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'sector': return <Layers className="w-4 h-4" />;
      case 'company': return <Building2 className="w-4 h-4" />;
      case 'metric': return <BarChart3 className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--color-border-primary)]" style={{ background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] md:hidden text-[var(--color-text-primary)]"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-sm md:text-lg font-semibold text-[var(--color-text-primary)] truncate max-w-[150px] md:max-w-none">
          India ESG Dashboard
        </h2>
        <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/20">
          FY 2024–25
        </span>
      </div>

      <div className="relative">
        {!searchOpen ? (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-muted)] text-sm hover:border-[var(--color-border-hover)] transition-all"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">Search sectors, metrics...</span>
            <kbd className="hidden md:inline ml-4 px-1.5 py-0.5 text-[10px] font-mono rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]">⌘K</kbd>
          </button>
        ) : (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24" onClick={() => setSearchOpen(false)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-xl mx-4" onClick={e => e.stopPropagation()}>
              <div className="glass-card overflow-hidden">
                <div className="flex items-center px-4 border-b border-[var(--color-border-primary)]">
                  <Search className="w-5 h-5 text-[var(--color-text-muted)]" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search sectors, ESG metrics, indicators..."
                    className="flex-1 px-3 py-4 bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none text-sm"
                    onKeyDown={e => {
                      if (e.key === 'Escape') setSearchOpen(false);
                      if (e.key === 'Enter' && results.length > 0) handleSelect(results[0].href);
                    }}
                  />
                  <button onClick={() => setSearchOpen(false)} className="p-1 rounded hover:bg-[var(--color-bg-hover)]">
                    <X className="w-4 h-4 text-[var(--color-text-muted)]" />
                  </button>
                </div>
                {results.length > 0 && (
                  <div className="max-h-80 overflow-y-auto py-2">
                    {results.map((result, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(result.href)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-hover)] transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] flex items-center justify-center text-[var(--color-text-muted)]">
                          {getIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{result.title}</p>
                          <p className="text-xs text-[var(--color-text-muted)]">{result.subtitle}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
                {query && results.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
