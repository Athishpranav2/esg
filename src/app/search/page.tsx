'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search, Layers, BarChart3, Shield, Leaf, Heart, ArrowRight, Building2
} from 'lucide-react';
import { sectors } from '@/data/sectors';
import { companies } from '@/data/companies';
import { getCurrentScores } from '@/data/esg-scores';
import { getScoreColor } from '@/lib/types';

const esgMetrics = [
  { name: 'GHG Emissions & Climate Risk', code: 'E1', pillar: 'Environmental', description: 'Scope 1, 2 & 3 emissions, carbon footprint, transition risks' },
  { name: 'Air Quality', code: 'E2', pillar: 'Environmental', description: 'NOx, SOx, particulate matter emissions during reporting period' },
  { name: 'Water Management', code: 'E3', pillar: 'Environmental', description: 'Freshwater withdrawal, consumption, water-stress exposure' },
  { name: 'Energy Management', code: 'E4', pillar: 'Environmental', description: 'Total energy use, renewable energy share, efficiency metrics' },
  { name: 'Biodiversity & Climate Adaptation', code: 'E5', pillar: 'Environmental', description: 'Ecosystem impacts, site assessments, adaptation strategies' },
  { name: 'Waste & Hazardous Materials', code: 'E6', pillar: 'Environmental', description: 'Waste generated, recycled/reused, hazardous material handling' },
  { name: 'Resource Efficiency', code: 'E7', pillar: 'Environmental', description: 'Resource optimisation, pollution prevention, circular economy' },
  { name: 'Human Rights', code: 'S1', pillar: 'Social', description: 'Commitments, due diligence, remediation across operations' },
  { name: 'Labour Practices', code: 'S2', pillar: 'Social', description: 'Fair labour conditions, workforce rights, industrial relations' },
  { name: 'Employee Health & Safety', code: 'S3', pillar: 'Social', description: 'Occupational safety, TRIR and LTIR metrics' },
  { name: 'Employee Engagement, Diversity & Inclusion', code: 'S4', pillar: 'Social', description: 'Gender diversity, voluntary attrition, inclusion initiatives' },
  { name: 'Supply Chain Management', code: 'S5', pillar: 'Social', description: 'Ethical sourcing, social risks, human rights compliance' },
  { name: 'Customer Privacy & Data Security', code: 'S6', pillar: 'Social', description: 'Data protection practices, breach incidents, customer impact' },
  { name: 'Access, Affordability & Community', code: 'S7', pillar: 'Social', description: 'Community impact, CSR spend, accessibility of products' },
  { name: 'Anti-Corruption & Bribery', code: 'G1', pillar: 'Governance', description: 'Anti-bribery policies, training, incident reporting' },
  { name: 'Business Ethics & Transparency', code: 'G2', pillar: 'Governance', description: 'Ethics policies, whistleblower mechanisms, transparency' },
  { name: 'Competitive Behaviour', code: 'G3', pillar: 'Governance', description: 'Fair competition policies, antitrust compliance' },
  { name: 'Risk & Crisis Management', code: 'G4', pillar: 'Governance', description: 'Enterprise risk management, business continuity' },
  { name: 'Board Structure & Oversight', code: 'G5', pillar: 'Governance', description: 'Board independence, committee structure, oversight' },
  { name: 'Stakeholder Engagement', code: 'G6', pillar: 'Governance', description: 'Materiality assessment, stakeholder dialogue, reporting' },
  { name: 'Executive Compensation', code: 'G7', pillar: 'Governance', description: 'Pay transparency, gender gap, performance linkage' },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const currentScores = getCurrentScores();

  const results = useMemo(() => {
    if (!query.trim()) return { sectors: [], metrics: [], companies: [] };
    const q = query.toLowerCase();

    // Sort function: exact match > starts with > includes
    const scoreMatch = (name: string, ticker: string, description: string) => {
      const n = name.toLowerCase();
      const t = ticker.toLowerCase();
      const d = description.toLowerCase();
      if (n === q || t === q) return 3;
      if (n.startsWith(q) || t.startsWith(q)) return 2;
      if (n.includes(q) || t.includes(q) || d.includes(q)) return 1;
      return 0;
    };

    const matchedSectors = sectors
      .map(s => ({ s, scoreMatch: scoreMatch(s.name, s.code, s.description) }))
      .filter(x => x.scoreMatch > 0)
      .sort((a, b) => b.scoreMatch - a.scoreMatch)
      .map(x => ({
        ...x.s,
        score: currentScores.find(sc => sc.sectorId === x.s.id),
      }))
      .slice(0, 20); // Cap at 20

    const matchedCompanies = companies
      .map(c => ({ c, scoreMatch: scoreMatch(c.name, c.ticker, c.description) }))
      .filter(x => x.scoreMatch > 0)
      .sort((a, b) => b.scoreMatch - a.scoreMatch)
      .map(x => x.c)
      .slice(0, 50); // Cap at 50

    const matchedMetrics = esgMetrics
      .filter(m => m.name.toLowerCase().includes(q) || m.code.toLowerCase().includes(q) || m.description.toLowerCase().includes(q) || m.pillar.toLowerCase().includes(q))
      .slice(0, 10);

    return { sectors: matchedSectors, metrics: matchedMetrics, companies: matchedCompanies };
  }, [query, currentScores]);

  const totalResults = results.sectors.length + results.metrics.length + results.companies.length;

  const pillarIcons: Record<string, React.ElementType> = {
    Environmental: Leaf,
    Social: Heart,
    Governance: Shield,
  };

  const pillarColors: Record<string, string> = {
    Environmental: '#22c55e',
    Social: '#3b82f6',
    Governance: '#a855f7',
  };

  return (
    <div className="space-y-6 max-w-[1000px]">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Search</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Search across sectors, ESG metrics, and indicators
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search sectors, ESG metrics, environmental indicators, governance indicators..."
          className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[#00d4aa]/40 transition-colors text-sm"
          autoFocus
        />
      </div>

      {query && (
        <p className="text-sm text-[var(--color-text-muted)]">
          {totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Company Results */}
      {results.companies.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Companies ({results.companies.length})
          </h3>
          <div className="space-y-2">
            {results.companies.map(company => (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                className="glass-card p-4 flex items-center gap-4 hover:border-[var(--color-border-hover)] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[#3b82f6] transition-colors">
                    {company.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{company.ticker} · {sectors.find(s => s.id === company.sectorId)?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold" style={{ color: getScoreColor(company.esgScore) }}>
                    {company.esgScore.toFixed(1)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sector Results */}
      {results.sectors.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Sectors ({results.sectors.length})
          </h3>
          <div className="space-y-2">
            {results.sectors.map(sector => (
              <Link
                key={sector.slug}
                href={`/sectors/${sector.slug}`}
                className="glass-card p-4 flex items-center gap-4 hover:border-[var(--color-border-hover)] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-[#00d4aa]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[#00d4aa] transition-colors">
                    {sector.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{sector.companyCount} companies · {sector.code}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold" style={{ color: getScoreColor(sector.score?.esgScore || 0) }}>
                    {sector.score?.esgScore.toFixed(1)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Metric Results */}
      {results.metrics.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> ESG Metrics ({results.metrics.length})
          </h3>
          <div className="space-y-2">
            {results.metrics.map(metric => {
              const PillarIcon = pillarIcons[metric.pillar] || Shield;
              const color = pillarColors[metric.pillar] || '#94a3b8';
              return (
                <div key={metric.code} className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <PillarIcon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{metric.name}</p>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded" style={{ color, backgroundColor: `${color}15` }}>
                        {metric.code}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">{metric.description}</p>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color }}>
                    {metric.pillar}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {query && totalResults === 0 && (
        <div className="glass-card p-12 text-center">
          <Search className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Try searching for sector names, ESG codes (E1-E7, S1-S7, G1-G7), or metric keywords</p>
        </div>
      )}

      {!query && (
        <div className="glass-card p-8">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {['Power', 'Renewable Energy', 'Biodiversity', 'Gender Diversity', 'Financial Services', 'Governance', 'Climate', 'Water', 'Supply Chain', 'Board Independence'].map(term => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1.5 rounded-lg text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] hover:border-[#00d4aa]/40 hover:text-[#00d4aa] transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-[var(--color-text-muted)]">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
