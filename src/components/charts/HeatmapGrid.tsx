'use client';

import React from 'react';
import { getScoreColor } from '@/lib/types';

interface HeatmapGridProps {
  sectors: { name: string; slug: string; environmental: number; social: number; governance: number }[];
}

export default function HeatmapGrid({ sectors }: HeatmapGridProps) {
  const pillars = ['environmental', 'social', 'governance'] as const;
  const pillarLabels = { environmental: 'E', social: 'S', governance: 'G' };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header */}
        <div className="flex items-center mb-2">
          <div className="w-[200px] flex-shrink-0" />
          {pillars.map(p => (
            <div key={p} className="flex-1 text-center text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {pillarLabels[p]}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {sectors.map((sector) => (
            <div key={sector.slug} className="flex items-center group">
              <div className="w-[200px] flex-shrink-0 pr-3 text-xs text-[var(--color-text-secondary)] truncate group-hover:text-[var(--color-text-primary)] transition-colors">
                {sector.name}
              </div>
              {pillars.map(p => {
                const score = sector[p];
                return (
                  <div key={p} className="flex-1 px-0.5">
                    <div
                      className="h-8 rounded flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-105 cursor-pointer"
                      style={{
                        backgroundColor: `${getScoreColor(score)}22`,
                        color: getScoreColor(score),
                        border: `1px solid ${getScoreColor(score)}33`,
                      }}
                      title={`${sector.name} - ${pillarLabels[p]}: ${score}`}
                    >
                      {score.toFixed(0)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-[var(--color-border-primary)]">
          {[
            { label: '< 30', color: '#ef4444' },
            { label: '30-50', color: '#f59e0b' },
            { label: '50-65', color: '#eab308' },
            { label: '65-80', color: '#22c55e' },
            { label: '> 80', color: '#00d4aa' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] text-[var(--color-text-muted)]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
