'use client';

import React, { useState, useMemo } from 'react';
import { GitCompareArrows, Plus, X, Leaf, Heart, Shield } from 'lucide-react';
import ESGRadarChart from '@/components/charts/ESGRadarChart';
import SectorBarChart from '@/components/charts/SectorBarChart';
import GaugeChart from '@/components/charts/GaugeChart';
import { sectors } from '@/data/sectors';
import { getCurrentScores, getNationalAverage } from '@/data/esg-scores';
import { getScoreColor } from '@/lib/types';

export default function ComparePage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(['power', 'information-technology']);
  const [showSelector, setShowSelector] = useState(false);
  const currentScores = getCurrentScores();
  const nationalAvg = getNationalAverage('FY2024-25');

  const selectedSectors = useMemo(() => {
    return selectedSlugs.map(slug => {
      const sector = sectors.find(s => s.slug === slug)!;
      const score = currentScores.find(s => s.sectorId === sector?.id);
      return { sector, score };
    }).filter(s => s.sector);
  }, [selectedSlugs, currentScores]);

  const addSector = (slug: string) => {
    if (!selectedSlugs.includes(slug) && selectedSlugs.length < 4) {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
    setShowSelector(false);
  };

  const removeSector = (slug: string) => {
    setSelectedSlugs(selectedSlugs.filter(s => s !== slug));
  };

  const comparisonColors = ['#00d4aa', '#3b82f6', '#a855f7', '#f59e0b'];

  // Radar data
  const radarData = ['Environmental', 'Social', 'Governance'].map(param => {
    const entry: Record<string, string | number> = { parameter: param, benchmark: param === 'Environmental' ? nationalAvg.environmental : param === 'Social' ? nationalAvg.social : nationalAvg.governance };
    selectedSectors.forEach(({ sector, score }) => {
      entry[sector.name] = param === 'Environmental' ? score?.environmentalScore || 0
        : param === 'Social' ? score?.socialScore || 0
        : score?.governanceScore || 0;
    });
    return entry;
  });

  // Bar comparison data
  const barMetrics = [
    { key: 'ESG Score', getValue: (s: typeof selectedSectors[0]) => s.score?.esgScore || 0 },
    { key: 'Environmental', getValue: (s: typeof selectedSectors[0]) => s.score?.environmentalScore || 0 },
    { key: 'Social', getValue: (s: typeof selectedSectors[0]) => s.score?.socialScore || 0 },
    { key: 'Governance', getValue: (s: typeof selectedSectors[0]) => s.score?.governanceScore || 0 },
  ];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <GitCompareArrows className="w-6 h-6 text-[#3b82f6]" />
          Sector Comparison
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Compare up to 4 sectors side-by-side across all ESG dimensions
        </p>
      </div>

      {/* Sector Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        {selectedSectors.map(({ sector }, i) => (
          <div
            key={sector.slug}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: `${comparisonColors[i]}10`,
              borderColor: `${comparisonColors[i]}30`,
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: comparisonColors[i] }} />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">{sector.name}</span>
            <button onClick={() => removeSector(sector.slug)} className="p-0.5 rounded hover:bg-[var(--color-bg-hover)]">
              <X className="w-3 h-3 text-[var(--color-text-muted)]" />
            </button>
          </div>
        ))}
        {selectedSlugs.length < 4 && (
          <div className="relative">
            <button
              onClick={() => setShowSelector(!showSelector)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-[var(--color-border-primary)] text-sm text-[var(--color-text-muted)] hover:border-[#00d4aa]/40 hover:text-[#00d4aa] transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Sector
            </button>
            {showSelector && (
              <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto glass-card p-2 z-20">
                {sectors
                  .filter(s => !selectedSlugs.includes(s.slug))
                  .map(s => (
                    <button
                      key={s.slug}
                      onClick={() => addSector(s.slug)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {s.name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedSectors.length >= 2 ? (
        <>
          {/* Score Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedSectors.map(({ sector, score }, i) => (
              <div key={sector.slug} className="glass-card p-5" style={{ borderTop: `2px solid ${comparisonColors[i]}30` }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: comparisonColors[i] }} />
                  <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate">{sector.name}</span>
                </div>
                <GaugeChart score={score?.esgScore || 0} label="ESG Score" size={110} strokeWidth={8} />
              </div>
            ))}
          </div>

          {/* Radar Comparison */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#3b82f6]" />
              ESG Profile Comparison
            </h3>
            <div className="h-[400px]">
              <ESGRadarChart
                data={(() => {
                  const s0 = selectedSectors[0]?.score;
                  return [
                    { parameter: 'Environmental', score: s0?.environmentalScore ?? 0, benchmark: nationalAvg.environmental },
                    { parameter: 'Social', score: s0?.socialScore ?? 0, benchmark: nationalAvg.social },
                    { parameter: 'Governance', score: s0?.governanceScore ?? 0, benchmark: nationalAvg.governance },
                  ];
                })()}
                sectorName={selectedSectors[0]?.sector.name}
                height={400}
              />
            </div>
          </div>

          {/* Side-by-side Metrics */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#22c55e] to-[#a855f7]" />
              Score Comparison
            </h3>
            <div className="space-y-6">
              {barMetrics.map(metric => (
                <div key={metric.key}>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">{metric.key}</p>
                  <div className="space-y-2">
                    {selectedSectors.map(({ sector, score }, i) => {
                      const val = metric.getValue({ sector, score });
                      return (
                        <div key={sector.slug} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: comparisonColors[i] }} />
                          <span className="text-xs text-[var(--color-text-secondary)] w-40 truncate">{sector.name}</span>
                          <div className="flex-1 h-3 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                            <div
                              className="h-full rounded-full animate-bar"
                              style={{ width: `${val}%`, backgroundColor: comparisonColors[i] }}
                            />
                          </div>
                          <span className="text-sm font-bold min-w-[40px] text-right" style={{ color: comparisonColors[i] }}>
                            {val.toFixed(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="glass-card p-12 text-center">
          <GitCompareArrows className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">Select at least 2 sectors to compare</p>
        </div>
      )}
    </div>
  );
}
