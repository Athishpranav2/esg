'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Building2, TrendingUp, TrendingDown, CheckCircle,
  Leaf, Heart, Shield, BarChart3, Layers
} from 'lucide-react';
import GaugeChart from '@/components/charts/GaugeChart';
import ESGRadarChart from '@/components/charts/ESGRadarChart';
import InfoCard from '@/components/cards/InfoCard';
import { companies, getCompanyBySlug } from '@/data/companies';
import { sectors, getSectorById } from '@/data/sectors';
import { getScoresForSector, getNationalAverage } from '@/data/esg-scores';
import { getScoreColor, getMaturityLevel } from '@/lib/types';

export default function CompanyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const company = getCompanyBySlug(slug);

  if (!company) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">Company not found</p>
          <Link href="/search" className="text-sm text-[#00d4aa] hover:underline mt-2 inline-block">Back to Search</Link>
        </div>
      </div>
    );
  }

  const sector = getSectorById(company.sectorId);
  const sectorScores = getScoresForSector(company.sectorId).find(s => s.year === 'FY2024-25');
  const nationalAvg = getNationalAverage('FY2024-25');
  const maturity = getMaturityLevel(company.esgScore);

  // Radar data
  const radarData = [
    { parameter: 'Environmental', score: company.environmentalScore, benchmark: sectorScores?.environmentalScore || 0 },
    { parameter: 'Social', score: company.socialScore, benchmark: sectorScores?.socialScore || 0 },
    { parameter: 'Governance', score: company.governanceScore, benchmark: sectorScores?.governanceScore || 0 },
  ];

  // Benchmark comparison
  const benchmarkData = [
    { name: 'Environmental', score: company.environmentalScore },
    { name: 'Social', score: company.socialScore },
    { name: 'Governance', score: company.governanceScore },
  ];

  const maturityColors: Record<string, string> = {
    Nascent: '#ef4444', Emerging: '#f59e0b', Developing: '#eab308',
    Advancing: '#22c55e', Leading: '#00d4aa',
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[#00d4aa] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Search
        </Link>
        <span className="text-[var(--color-text-muted)]">/</span>
        {sector && (
          <>
            <Link href={`/sectors/${sector.slug}`} className="text-[var(--color-text-muted)] hover:text-[#00d4aa] transition-colors">
              {sector.name}
            </Link>
            <span className="text-[var(--color-text-muted)]">/</span>
          </>
        )}
        <span className="text-[var(--color-text-primary)] font-medium">{company.name}</span>
      </div>

      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{company.name}</h1>
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
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">{company.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                Ticker: <span className="font-mono text-[var(--color-text-primary)]">{company.ticker}</span>
              </div>
              {sector && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                  <Layers className="w-3.5 h-3.5" />
                  <Link href={`/sectors/${sector.slug}`} className="hover:text-[#00d4aa] transition-colors">
                    {sector.name}
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <GaugeChart score={company.esgScore} label="Company ESG Score" size={120} />
            <div className="space-y-2">
              {[
                { label: 'Environmental', score: company.environmentalScore, icon: Leaf, color: '#22c55e' },
                { label: 'Social', score: company.socialScore, icon: Heart, color: '#3b82f6' },
                { label: 'Governance', score: company.governanceScore, icon: Shield, color: '#a855f7' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-[#00d4aa]" />
            Company Profile vs {sector?.name} Average
          </h3>
          <ESGRadarChart data={radarData} sectorName={`${sector?.name} Average`} height={320} />
        </div>
        
        {/* Benchmark Comparison */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
            Benchmark vs {sector?.name} Sector
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benchmarkData.map(item => {
              const avg = item.name === 'Environmental' ? (sectorScores?.environmentalScore || 0)
                : item.name === 'Social' ? (sectorScores?.socialScore || 0) : (sectorScores?.governanceScore || 0);
              const diff = item.score - avg;
              return (
                <div key={item.name} className="p-4 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]">
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">{item.name}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold" style={{ color: getScoreColor(item.score) }}>
                      {item.score.toFixed(1)}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] mb-1">vs {avg.toFixed(1)} sector avg</span>
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
      </div>

      {/* Everyday Impact Section */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#00d4aa]" />
          Everyday Impact of {company.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            title="As a Consumer"
            description={`Your choices matter. By supporting top performers like ${company.name}, you encourage better environmental practices and ethical supply chains in their sector.`}
            icon="🛍️"
          />
          <InfoCard 
            title="As a Professional"
            description={`Look at the Social scores. High diversity and low safety incidents indicate a workplace that values employee well-being and fair compensation.`}
            icon="💼"
          />
          <InfoCard 
            title="As an Investor"
            description={`Strong governance is a predictor of long-term stability. ${company.name}'s ESG profile helps you align your investments with your personal values.`}
            icon="📈"
          />
        </div>
      </div>
    </div>
  );
}
