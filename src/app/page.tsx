'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2, Users, BarChart3, TrendingUp, TrendingDown,
  Leaf, Shield, Heart, ArrowRight, Globe, Zap
} from 'lucide-react';
import KPICard from '@/components/cards/KPICard';
import InsightCard from '@/components/cards/InsightCard';
import InfoCard from '@/components/cards/InfoCard';
import GaugeChart from '@/components/charts/GaugeChart';
import TrendLineChart from '@/components/charts/TrendLineChart';
import HeatmapGrid from '@/components/charts/HeatmapGrid';
import { sectors } from '@/data/sectors';
import { esgScores, getCurrentScores, getNationalAverage } from '@/data/esg-scores';
import { insights } from '@/data/insights';
import { getScoreColor } from '@/lib/types';

export default function DashboardPage() {
  const currentScores = getCurrentScores();
  const nationalAvg = getNationalAverage('FY2024-25');
  const prevAvg = getNationalAverage('FY2023-24');
  const totalCompanies = sectors.reduce((sum, s) => sum + s.companyCount, 0);

  // Sort sectors by score for top/bottom
  const sortedByScore = [...currentScores]
    .map(score => {
      const sector = sectors.find(s => s.id === score.sectorId);
      return { ...score, sector };
    })
    .sort((a, b) => b.esgScore - a.esgScore);

  const topSectors = sortedByScore.slice(0, 5);
  const bottomSectors = sortedByScore.slice(-5).reverse();

  // Trend data
  const years = ['FY2022-23', 'FY2023-24', 'FY2024-25'];
  const trendData = years.map(year => {
    const avg = getNationalAverage(year);
    return {
      year: year.replace('FY', ''),
      ESG: avg.esg,
      Environmental: avg.environmental,
      Social: avg.social,
      Governance: avg.governance,
    };
  });

  // Heatmap data
  const heatmapData = sectors.map(sector => {
    const score = currentScores.find(s => s.sectorId === sector.id);
    return {
      name: sector.name.length > 25 ? sector.name.substring(0, 22) + '...' : sector.name,
      slug: sector.slug,
      environmental: score?.environmentalScore || 0,
      social: score?.socialScore || 0,
      governance: score?.governanceScore || 0,
    };
  }).sort((a, b) => {
    const avgA = (a.environmental + a.social + a.governance) / 3;
    const avgB = (b.environmental + b.social + b.governance) / 3;
    return avgB - avgA;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Page Title & Global Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            ESG Performance Overview
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Comprehensive ESG benchmarks from India&apos;s top listed companies · BRSR FY 2024–25
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          {/* Quick Search */}
          <form action="/search" className="relative w-full md:w-64">
            <input
              name="q"
              type="text"
              placeholder="Search 1,000+ companies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] text-sm focus:border-[#00d4aa]/40 outline-none"
              autoComplete="off"
            />
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)]"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </button>
          </form>
          
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] pulse-dot" />
            Live Data
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Companies Analyzed"
          value={totalCompanies}
          icon={Building2}
          accentColor="#3b82f6"
          delta={0}
          deltaLabel="BRSR-mandated top listed companies"
          delay={0}
        />
        <KPICard
          title="Sectors Covered"
          value={22}
          icon={Globe}
          accentColor="#a855f7"
          delta={0}
          deltaLabel="NSE sector classification framework"
          delay={100}
        />
        <KPICard
          title="National ESG Score"
          value={nationalAvg.esg}
          format="decimal"
          suffix=" / 100"
          icon={BarChart3}
          accentColor="#00d4aa"
          delta={nationalAvg.esg - prevAvg.esg}
          deltaLabel="vs FY 2023-24 average"
          delay={200}
        />
        <KPICard
          title="ESG Parameters"
          value={21}
          icon={Zap}
          accentColor="#f59e0b"
          delta={0}
          deltaLabel="E1–E7, S1–S7, G1–G7"
          delay={300}
        />
      </div>

      {/* ESG Pillar Scores + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* National Pillar Gauges */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#00d4aa] to-[#3b82f6]" />
            National ESG Pillar Scores
          </h3>
          <div className="flex items-center justify-around">
            <GaugeChart score={nationalAvg.environmental} label="Environmental" size={150} />
            <GaugeChart score={nationalAvg.social} label="Social" size={150} />
            <GaugeChart score={nationalAvg.governance} label="Governance" size={150} />
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Environmental', score: nationalAvg.environmental, prev: prevAvg.environmental, icon: Leaf, color: '#22c55e' },
              { label: 'Social', score: nationalAvg.social, prev: prevAvg.social, icon: Heart, color: '#3b82f6' },
              { label: 'Governance', score: nationalAvg.governance, prev: prevAvg.governance, icon: Shield, color: '#a855f7' },
            ].map(item => (
              <div key={item.label} className="text-center p-3 rounded-lg bg-[var(--color-bg-primary)]">
                <div className={`flex items-center justify-center gap-1 text-xs font-medium ${
                  item.score > item.prev ? 'text-[#00d4aa]' : 'text-[#ff4757]'
                }`}>
                  {item.score > item.prev ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {(item.score - item.prev).toFixed(1)}
                </div>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">vs FY 2023-24</p>
              </div>
            ))}
          </div>
        </div>

        {/* ESG Trend */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#f59e0b] to-[#ef4444]" />
            National ESG Trend (3-Year)
          </h3>
          <TrendLineChart
            data={trendData}
            lines={[
              { dataKey: 'ESG', name: 'Overall ESG', color: '#00d4aa' },
              { dataKey: 'Environmental', name: 'Environmental', color: '#22c55e' },
              { dataKey: 'Social', name: 'Social', color: '#3b82f6' },
              { dataKey: 'Governance', name: 'Governance', color: '#a855f7' },
            ]}
            height={280}
          />
        </div>
      </div>

      {/* Top & Bottom Sectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#00d4aa]" />
              Top Performing Sectors
            </h3>
            <Link href="/sectors" className="text-xs text-[#00d4aa] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {topSectors.map((item, i) => (
              <Link
                key={item.sectorId}
                href={`/sectors/${item.sector?.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-hover)] transition-all group"
              >
                <span className="w-6 h-6 rounded-full bg-[#00d4aa]/15 text-[#00d4aa] text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] truncate group-hover:text-[#00d4aa] transition-colors">
                    {item.sector?.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{item.sector?.companyCount} companies</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                    <div className="h-full rounded-full animate-bar" style={{ width: `${item.esgScore}%`, backgroundColor: getScoreColor(item.esgScore) }} />
                  </div>
                  <span className="text-sm font-bold min-w-[40px] text-right" style={{ color: getScoreColor(item.esgScore) }}>
                    {item.esgScore.toFixed(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Performers */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#ff4757]" />
              Lowest Performing Sectors
            </h3>
            <Link href="/sectors" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {bottomSectors.map((item, i) => (
              <Link
                key={item.sectorId}
                href={`/sectors/${item.sector?.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-hover)] transition-all group"
              >
                <span className="w-6 h-6 rounded-full bg-[#ff4757]/15 text-[#ff4757] text-xs font-bold flex items-center justify-center">
                  {22 - i}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] truncate group-hover:text-[#ff4757] transition-colors">
                    {item.sector?.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{item.sector?.companyCount} companies</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                    <div className="h-full rounded-full animate-bar" style={{ width: `${item.esgScore}%`, backgroundColor: getScoreColor(item.esgScore) }} />
                  </div>
                  <span className="text-sm font-bold min-w-[40px] text-right" style={{ color: getScoreColor(item.esgScore) }}>
                    {item.esgScore.toFixed(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ESG Heatmap */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#22c55e] via-[#3b82f6] to-[#a855f7]" />
          Sector × Pillar Heatmap
        </h3>
        <HeatmapGrid sectors={heatmapData} />
      </div>

      {/* AI Insights -> ESG Info */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#f59e0b] to-[#ef4444]" />
          ESG Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.slice(0, 6).map(insight => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      {/* Everyday Impact Section */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#00d4aa]" />
          How You Can Use This Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            title="For Consumers"
            description="Identify brands prioritizing sustainability and ethical practices. Use the environmental metrics to support companies transitioning to renewable energy and reducing their carbon footprint."
            icon="🛍️"
          />
          <InfoCard 
            title="For Job Seekers"
            description="Find inclusive and safe workplaces. Check social and governance scores to evaluate a company's commitment to gender diversity, employee safety, and fair compensation."
            icon="💼"
          />
          <InfoCard 
            title="For Retail Investors"
            description="Align your portfolio with your values. Use sector comparisons to find companies that manage long-term risks well and maintain high ethical standards."
            icon="📈"
          />
        </div>
      </div>
    </div>
  );
}
