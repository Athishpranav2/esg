'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Building2, TrendingUp, TrendingDown, CheckCircle,
  AlertTriangle, Leaf, Heart, Shield, BarChart3
} from 'lucide-react';
import GaugeChart from '@/components/charts/GaugeChart';
import ESGRadarChart from '@/components/charts/ESGRadarChart';
import InfoCard from '@/components/cards/InfoCard';
import TrendLineChart from '@/components/charts/TrendLineChart';
import SectorBarChart from '@/components/charts/SectorBarChart';
import { sectors, getSectorBySlug } from '@/data/sectors';
import { esgScores, getNationalAverage, getScoresForSector } from '@/data/esg-scores';
import { environmentalMetrics, getEnvironmentalForSector } from '@/data/environmental-metrics';
import { socialMetrics, getSocialForSector } from '@/data/social-metrics';
import { governanceMetrics, getGovernanceForSector } from '@/data/governance-metrics';
import { sectorInsights } from '@/data/insights';
import { getScoreColor, getMaturityLevel } from '@/lib/types';

export default function SectorDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">Sector not found</p>
          <Link href="/sectors" className="text-sm text-[#00d4aa] hover:underline mt-2 inline-block">Back to Rankings</Link>
        </div>
      </div>
    );
  }

  const scores = getScoresForSector(sector.id);
  const currentScore = scores.find(s => s.year === 'FY2024-25');
  const prevScore = scores.find(s => s.year === 'FY2023-24');
  const nationalAvg = getNationalAverage('FY2024-25');
  const envMetrics = getEnvironmentalForSector(sector.id).find(m => m.year === 'FY2024-25');
  const socMetrics = getSocialForSector(sector.id).find(m => m.year === 'FY2024-25');
  const govMetrics = getGovernanceForSector(sector.id).find(m => m.year === 'FY2024-25');
  const sectorInfo = sectorInsights[slug] || { strengths: [], weaknesses: [] };
  const maturity = getMaturityLevel(currentScore?.esgScore || 0);

  // Radar data
  const radarData = [
    { parameter: 'Environmental', score: currentScore?.environmentalScore || 0, benchmark: nationalAvg.environmental },
    { parameter: 'Social', score: currentScore?.socialScore || 0, benchmark: nationalAvg.social },
    { parameter: 'Governance', score: currentScore?.governanceScore || 0, benchmark: nationalAvg.governance },
  ];

  // Trend data
  const trendData = ['FY2022-23', 'FY2023-24', 'FY2024-25'].map(year => {
    const s = scores.find(sc => sc.year === year);
    return {
      year: year.replace('FY', ''),
      ESG: s?.esgScore || 0,
      Environmental: s?.environmentalScore || 0,
      Social: s?.socialScore || 0,
      Governance: s?.governanceScore || 0,
    };
  });

  // Parameter breakdown
  const parameterData = [
    { name: 'GHG & Climate', score: envMetrics ? Math.round(100 - envMetrics.ghgEmissionIntensity * 20) : 50 },
    { name: 'Renewable Energy', score: envMetrics ? Math.round(envMetrics.renewableEnergyPct * 3.5) : 20 },
    { name: 'Water Mgmt', score: envMetrics ? Math.round(100 - envMetrics.waterIntensity * 4) : 50 },
    { name: 'Waste Mgmt', score: envMetrics?.wasteRecycledPct || 40 },
    { name: 'Biodiversity', score: envMetrics?.biodiversityScore || 30 },
    { name: 'Air Quality', score: envMetrics?.airQualityScore || 50 },
    { name: 'Resource Eff.', score: envMetrics?.resourceEfficiencyScore || 45 },
    { name: 'Human Rights', score: socMetrics?.humanRightsScore || 55 },
    { name: 'Labour', score: socMetrics ? Math.round(100 - socMetrics.employeeTurnoverRate * 2) : 60 },
    { name: 'Safety', score: socMetrics ? Math.round(100 - socMetrics.safetyIncidentRate * 25) : 70 },
    { name: 'Diversity', score: socMetrics ? Math.round(socMetrics.genderDiversityPct * 2) : 30 },
    { name: 'Supply Chain', score: socMetrics?.supplyChainScore || 40 },
    { name: 'Data Privacy', score: socMetrics?.dataPrivacyScore || 55 },
    { name: 'Community', score: socMetrics?.communityScore || 55 },
    { name: 'Anti-Corruption', score: govMetrics?.antiCorruptionScore || 60 },
    { name: 'Ethics', score: govMetrics?.ethicsScore || 65 },
    { name: 'Risk Mgmt', score: govMetrics?.riskManagementScore || 55 },
    { name: 'Board', score: govMetrics ? Math.round(govMetrics.boardIndependencePct * 1.4) : 60 },
    { name: 'Stakeholder', score: govMetrics?.stakeholderScore || 50 },
    { name: 'Compensation', score: govMetrics?.compensationFairnessScore || 48 },
    { name: 'Competition', score: govMetrics?.competitiveBehaviourScore || 55 },
  ];

  // Benchmark comparison
  const benchmarkData = [
    { name: 'Environmental', score: currentScore?.environmentalScore || 0 },
    { name: 'Social', score: currentScore?.socialScore || 0 },
    { name: 'Governance', score: currentScore?.governanceScore || 0 },
  ];

  const maturityColors: Record<string, string> = {
    Nascent: '#ef4444', Emerging: '#f59e0b', Developing: '#eab308',
    Advancing: '#22c55e', Leading: '#00d4aa',
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/sectors" className="text-[var(--color-text-muted)] hover:text-[#00d4aa] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Sectors
        </Link>
        <span className="text-[var(--color-text-muted)]">/</span>
        <span className="text-[var(--color-text-primary)] font-medium">{sector.name}</span>
      </div>

      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{sector.name}</h1>
              <span
                className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full"
                style={{
                  color: maturityColors[maturity],
                  backgroundColor: `${maturityColors[maturity]}15`,
                  border: `1px solid ${maturityColors[maturity]}30`,
                }}
              >
                {maturity}
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">{sector.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <Building2 className="w-3.5 h-3.5" />
                {sector.companyCount} Companies
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                NSE Code: <span className="font-mono text-[var(--color-text-secondary)]">{sector.code}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                Rank: <span className="font-bold text-[var(--color-text-primary)]">#{currentScore?.nationalRank || 'N/A'}</span> of 22
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <GaugeChart score={currentScore?.esgScore || 0} label="ESG Score" size={120} />
            <div className="space-y-2">
              {[
                { label: 'Environmental', score: currentScore?.environmentalScore || 0, icon: Leaf, color: '#22c55e' },
                { label: 'Social', score: currentScore?.socialScore || 0, icon: Heart, color: '#3b82f6' },
                { label: 'Governance', score: currentScore?.governanceScore || 0, icon: Shield, color: '#a855f7' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                  <span className="text-xs text-[var(--color-text-muted)] w-20">{item.label}</span>
                  <div className="w-20 h-1.5 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                    <div className="h-full rounded-full animate-bar" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Radar + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-[#00d4aa]" />
            ESG Profile vs National Average
          </h3>
          <ESGRadarChart data={radarData} sectorName={sector.name} height={320} />
        </div>
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-[#f59e0b]" />
            3-Year Performance Trend
          </h3>
          <TrendLineChart
            data={trendData}
            lines={[
              { dataKey: 'ESG', name: 'Overall ESG', color: '#00d4aa' },
              { dataKey: 'Environmental', name: 'Environmental', color: '#22c55e' },
              { dataKey: 'Social', name: 'Social', color: '#3b82f6' },
              { dataKey: 'Governance', name: 'Governance', color: '#a855f7' },
            ]}
            height={320}
          />
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00d4aa]" />
            Key Strengths
          </h3>
          <div className="space-y-3">
            {sectorInfo.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#00d4aa]/5 border border-[#00d4aa]/10">
                <div className="w-5 h-5 rounded-full bg-[#00d4aa]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-[#00d4aa]">{i + 1}</span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#ff4757]" />
            Key Weaknesses
          </h3>
          <div className="space-y-3">
            {sectorInfo.weaknesses.map((w, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#ff4757]/5 border border-[#ff4757]/10">
                <div className="w-5 h-5 rounded-full bg-[#ff4757]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-[#ff4757]">{i + 1}</span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{w}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parameter Breakdown */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#22c55e] via-[#3b82f6] to-[#a855f7]" />
          21-Parameter Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Environmental */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#22c55e] mb-3 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" /> Environmental (E1–E7)
            </h4>
            <div className="space-y-2">
              {parameterData.slice(0, 7).map(p => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--color-text-muted)] w-24 truncate">{p.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(p.score, 100)}%`, backgroundColor: getScoreColor(p.score) }} />
                  </div>
                  <span className="text-xs font-bold min-w-[28px] text-right" style={{ color: getScoreColor(p.score) }}>
                    {Math.min(p.score, 100)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3b82f6] mb-3 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" /> Social (S1–S7)
            </h4>
            <div className="space-y-2">
              {parameterData.slice(7, 14).map(p => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--color-text-muted)] w-24 truncate">{p.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(p.score, 100)}%`, backgroundColor: getScoreColor(p.score) }} />
                  </div>
                  <span className="text-xs font-bold min-w-[28px] text-right" style={{ color: getScoreColor(p.score) }}>
                    {Math.min(p.score, 100)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Governance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a855f7] mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Governance (G1–G7)
            </h4>
            <div className="space-y-2">
              {parameterData.slice(14).map(p => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--color-text-muted)] w-24 truncate">{p.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(p.score, 100)}%`, backgroundColor: getScoreColor(p.score) }} />
                  </div>
                  <span className="text-xs font-bold min-w-[28px] text-right" style={{ color: getScoreColor(p.score) }}>
                    {Math.min(p.score, 100)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Comparison */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
          Benchmark vs National Average
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benchmarkData.map(item => {
            const avg = item.name === 'Environmental' ? nationalAvg.environmental
              : item.name === 'Social' ? nationalAvg.social : nationalAvg.governance;
            const diff = item.score - avg;
            return (
              <div key={item.name} className="p-4 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-2">{item.name}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold" style={{ color: getScoreColor(item.score) }}>
                    {item.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] mb-1">vs {avg.toFixed(1)} avg</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium mt-2 ${diff > 0 ? 'text-[#00d4aa]' : 'text-[#ff4757]'}`}>
                  {diff > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {diff > 0 ? '+' : ''}{diff.toFixed(1)} points {diff > 0 ? 'above' : 'below'} average
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Everyday Impact Section */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#00d4aa]" />
          Everyday Impact of the {sector.name} Sector
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            title="As a Consumer"
            description={`Your choices matter. By supporting top performers in the ${sector.name} sector, you encourage better environmental practices and ethical supply chains.`}
            icon="🛍️"
          />
          <InfoCard 
            title="As a Professional"
            description={`Look at the Social scores. High diversity and low safety incidents indicate a workplace that values employee well-being and fair compensation.`}
            icon="💼"
          />
          <InfoCard 
            title="As an Investor"
            description={`Strong governance is a predictor of long-term stability. The ${sector.name} sector's ESG profile helps you align your investments with your personal values.`}
            icon="📈"
          />
        </div>
      </div>
    </div>
  );
}
