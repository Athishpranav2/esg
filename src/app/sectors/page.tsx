'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowUpDown, Search, ArrowRight, TrendingUp, TrendingDown, Minus,
  Leaf, Heart, Shield, BarChart3
} from 'lucide-react';
import SectorBarChart from '@/components/charts/SectorBarChart';
import { sectors } from '@/data/sectors';
import { esgScores, getCurrentScores } from '@/data/esg-scores';
import { getScoreColor, ESGPillar } from '@/lib/types';

type SortKey = 'name' | 'esgScore' | 'environmentalScore' | 'socialScore' | 'governanceScore' | 'companyCount';
type SortDir = 'asc' | 'desc';

export default function SectorsPage() {
  const [activePillar, setActivePillar] = useState<ESGPillar>('esg');
  const [sortKey, setSortKey] = useState<SortKey>('esgScore');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const currentScores = getCurrentScores();
  const prevScores = esgScores.filter(s => s.year === 'FY2023-24');

  const enrichedSectors = useMemo(() => {
    return sectors.map(sector => {
      const score = currentScores.find(s => s.sectorId === sector.id);
      const prev = prevScores.find(s => s.sectorId === sector.id);
      return {
        ...sector,
        esgScore: score?.esgScore || 0,
        environmentalScore: score?.environmentalScore || 0,
        socialScore: score?.socialScore || 0,
        governanceScore: score?.governanceScore || 0,
        esgDelta: (score?.esgScore || 0) - (prev?.esgScore || 0),
      };
    });
  }, [currentScores, prevScores]);

  const filtered = useMemo(() => {
    let result = enrichedSectors;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      const aVal = sortKey === 'name' ? a.name : a[sortKey];
      const bVal = sortKey === 'name' ? b.name : b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return result;
  }, [enrichedSectors, searchQuery, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const pillars = [
    { key: 'esg' as ESGPillar, label: 'Overall ESG', icon: BarChart3, color: '#00d4aa' },
    { key: 'environmental' as ESGPillar, label: 'Environmental', icon: Leaf, color: '#22c55e' },
    { key: 'social' as ESGPillar, label: 'Social', icon: Heart, color: '#3b82f6' },
    { key: 'governance' as ESGPillar, label: 'Governance', icon: Shield, color: '#a855f7' },
  ];

  const getScoreKey = (): SortKey => {
    switch (activePillar) {
      case 'environmental': return 'environmentalScore';
      case 'social': return 'socialScore';
      case 'governance': return 'governanceScore';
      default: return 'esgScore';
    }
  };

  const barChartData = [...filtered]
    .sort((a, b) => (b[getScoreKey()] as number) - (a[getScoreKey()] as number))
    .slice(0, 15)
    .map(s => ({
      name: s.name.length > 22 ? s.name.substring(0, 20) + '...' : s.name,
      score: s[getScoreKey()] as number,
      slug: s.slug,
    }));

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Sector Rankings</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Compare ESG performance across all 22 sectors · Sort by any pillar
        </p>
      </div>

      {/* Pillar Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {pillars.map(p => (
          <button
            key={p.key}
            onClick={() => { setActivePillar(p.key); setSortKey(getScoreKey()); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activePillar === p.key
                ? 'text-white border'
                : 'text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] border border-transparent hover:border-[var(--color-border-primary)]'
            }`}
            style={activePillar === p.key ? { backgroundColor: `${p.color}20`, borderColor: `${p.color}40`, color: p.color } : {}}
          >
            <p.icon className="w-4 h-4" />
            {p.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search sectors..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[#00d4aa]/40 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="xl:col-span-1 glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
            {pillars.find(p => p.key === activePillar)?.label} Score Distribution
          </h3>
          <SectorBarChart data={barChartData} height={520} layout="vertical" />
        </div>

        {/* Rankings Table */}
        <div className="xl:col-span-2 glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-primary)]">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => toggleSort('name')} className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                      Sector <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  {[
                    { key: 'esgScore' as SortKey, label: 'ESG' },
                    { key: 'environmentalScore' as SortKey, label: 'E' },
                    { key: 'socialScore' as SortKey, label: 'S' },
                    { key: 'governanceScore' as SortKey, label: 'G' },
                  ].map(col => (
                    <th key={col.key} className="px-4 py-3 text-center">
                      <button onClick={() => toggleSort(col.key)} className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mx-auto">
                        {col.label} <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Trend
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((sector, i) => (
                  <tr key={sector.id} className="border-b border-[var(--color-border-primary)]/50 hover:bg-[var(--color-bg-hover)] transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-[var(--color-text-muted)]">
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/sectors/${sector.slug}`} className="group">
                        <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[#00d4aa] transition-colors">
                          {sector.name}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">{sector.companyCount} companies</p>
                      </Link>
                    </td>
                    {[sector.esgScore, sector.environmentalScore, sector.socialScore, sector.governanceScore].map((score, j) => (
                      <td key={j} className="px-4 py-3 text-center">
                        <span className="text-sm font-bold" style={{ color: getScoreColor(score) }}>
                          {score.toFixed(1)}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-flex items-center gap-1 text-xs font-medium ${
                        sector.esgDelta > 0 ? 'text-[#00d4aa]' : sector.esgDelta < 0 ? 'text-[#ff4757]' : 'text-[var(--color-text-muted)]'
                      }`}>
                        {sector.esgDelta > 0 ? <TrendingUp className="w-3 h-3" /> : sector.esgDelta < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        {sector.esgDelta > 0 ? '+' : ''}{sector.esgDelta.toFixed(1)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/sectors/${sector.slug}`} className="p-1.5 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors inline-flex">
                        <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
