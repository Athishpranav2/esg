'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy, TrendingUp, TrendingDown, Minus, ArrowRight,
  Thermometer, Sun, Droplets, Recycle, Users, Building2, Link as LinkIcon, Scale,
} from 'lucide-react';
import { leaderboardCategories } from '@/data/leaderboards';
import { getScoreColor } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
  Thermometer, Sun, Droplets, Recycle, Users, Building2, Link: LinkIcon, Scale,
};

const pillarColors = {
  environmental: { bg: '#22c55e', text: '#22c55e' },
  social: { bg: '#3b82f6', text: '#3b82f6' },
  governance: { bg: '#a855f7', text: '#a855f7' },
};

export default function LeaderboardsPage() {
  const [activeCategory, setActiveCategory] = useState(leaderboardCategories[0].id);
  const active = leaderboardCategories.find(c => c.id === activeCategory) || leaderboardCategories[0];
  const Icon = iconMap[active.icon] || Trophy;
  const color = pillarColors[active.pillar];

  const topEntries = active.entries.filter(e => e.rank <= 5);
  const bottomEntries = active.entries.filter(e => e.rank > 5).sort((a, b) => a.rank - b.rank);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">ESG Leaderboards</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Sector rankings across 8 key ESG performance categories
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Category Selector */}
        <div className="xl:col-span-1 space-y-2">
          {leaderboardCategories.map(cat => {
            const CatIcon = iconMap[cat.icon] || Trophy;
            const catColor = pillarColors[cat.pillar];
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                  isActive
                    ? 'glass-card border-opacity-100'
                    : 'hover:bg-[var(--color-bg-hover)]'
                }`}
                style={isActive ? { borderColor: `${catColor.bg}40` } : {}}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${catColor.bg}15` }}
                >
                  <CatIcon className="w-4.5 h-4.5" style={{ color: catColor.text }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                    {cat.pillar}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Leaderboard Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Header */}
          <div className="glass-card p-6" style={{ borderTop: `2px solid ${color.bg}30` }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color.bg}15` }}>
                <Icon className="w-6 h-6" style={{ color: color.text }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--color-text-primary)]">{active.name}</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">{active.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#f59e0b]" />
                Top Performers
              </h3>
              <div className="space-y-2">
                {topEntries.map((entry, i) => (
                  <Link
                    key={entry.sectorId}
                    href={`/sectors/${entry.sectorSlug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-hover)] transition-all group"
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? 'bg-[#f59e0b]/15 text-[#f59e0b]' :
                      i === 1 ? 'bg-[#94a3b8]/15 text-[#94a3b8]' :
                      i === 2 ? 'bg-[#cd7f32]/15 text-[#cd7f32]' :
                      'bg-[var(--color-bg-primary)] text-[var(--color-text-muted)]'
                    }`}>
                      {entry.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] truncate group-hover:text-[#00d4aa]">
                        {entry.sectorName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: getScoreColor(entry.score) }}>
                        {entry.score.toFixed(1)}
                      </span>
                      <div className={`flex items-center gap-0.5 text-[10px] font-medium ${
                        entry.trend === 'up' ? 'text-[#00d4aa]' : entry.trend === 'down' ? 'text-[#ff4757]' : 'text-[var(--color-text-muted)]'
                      }`}>
                        {entry.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : entry.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        {entry.delta > 0 ? '+' : ''}{entry.delta.toFixed(1)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Performers */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-[#ff4757]" />
                Needs Improvement
              </h3>
              <div className="space-y-2">
                {bottomEntries.map((entry) => (
                  <Link
                    key={entry.sectorId}
                    href={`/sectors/${entry.sectorSlug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-hover)] transition-all group"
                  >
                    <span className="w-7 h-7 rounded-full bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] flex items-center justify-center text-xs font-bold">
                      {entry.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] truncate group-hover:text-[#ff4757]">
                        {entry.sectorName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: getScoreColor(entry.score) }}>
                        {entry.score.toFixed(1)}
                      </span>
                      <div className={`flex items-center gap-0.5 text-[10px] font-medium ${
                        entry.trend === 'up' ? 'text-[#00d4aa]' : entry.trend === 'down' ? 'text-[#ff4757]' : 'text-[var(--color-text-muted)]'
                      }`}>
                        {entry.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : entry.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        {entry.delta > 0 ? '+' : ''}{entry.delta.toFixed(1)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
