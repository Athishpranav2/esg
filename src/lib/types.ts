// ============================================================
// India ESG Benchmark Dashboard — Core Type Definitions
// ============================================================

export interface Sector {
  id: number;
  code: string;
  name: string;
  slug: string;
  companyCount: number;
  description: string;
}

export interface Company {
  id: string;
  name: string;
  ticker: string;
  sectorId: number;
  slug: string;
  description: string;
  esgScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
}

export interface ESGScore {
  sectorId: number;
  year: string;
  esgScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  nationalRank: number;
}

export interface EnvironmentalMetrics {
  sectorId: number;
  year: string;
  ghgEmissionIntensity: number;
  renewableEnergyPct: number;
  waterIntensity: number;
  wasteRecycledPct: number;
  biodiversityScore: number;
  airQualityScore: number;
  resourceEfficiencyScore: number;
}

export interface SocialMetrics {
  sectorId: number;
  year: string;
  genderDiversityPct: number;
  safetyIncidentRate: number;
  employeeTurnoverRate: number;
  humanRightsScore: number;
  supplyChainScore: number;
  dataPrivacyScore: number;
  communityScore: number;
}

export interface GovernanceMetrics {
  sectorId: number;
  year: string;
  boardIndependencePct: number;
  antiCorruptionScore: number;
  ethicsScore: number;
  riskManagementScore: number;
  stakeholderScore: number;
  compensationFairnessScore: number;
  competitiveBehaviourScore: number;
}

export interface YearlyBenchmark {
  year: string;
  metricName: string;
  nationalAvg: number;
  topQuartile: number;
  bottomQuartile: number;
}

export interface SectorDetail extends Sector {
  scores: ESGScore[];
  environmental: EnvironmentalMetrics[];
  social: SocialMetrics[];
  governance: GovernanceMetrics[];
  strengths: string[];
  weaknesses: string[];
  insights: string[];
}

export interface LeaderboardEntry {
  rank: number;
  sectorId: number;
  sectorName: string;
  sectorSlug: string;
  score: number;
  delta: number;
  trend: 'up' | 'down' | 'stable';
}

export interface LeaderboardCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  pillar: 'environmental' | 'social' | 'governance';
  entries: LeaderboardEntry[];
}

export interface SearchResult {
  type: 'sector' | 'metric' | 'indicator';
  category: string;
  title: string;
  description: string;
  link: string;
  score?: number;
}

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'notable' | 'positive';
  pillar: 'environmental' | 'social' | 'governance' | 'overall';
  source: string;
}

export type ESGPillar = 'esg' | 'environmental' | 'social' | 'governance';

export type MaturityLevel = 'Nascent' | 'Emerging' | 'Developing' | 'Advancing' | 'Leading';

export function getMaturityLevel(score: number): MaturityLevel {
  if (score < 25) return 'Nascent';
  if (score < 40) return 'Emerging';
  if (score < 55) return 'Developing';
  if (score < 70) return 'Advancing';
  return 'Leading';
}

export function getScoreColor(score: number): string {
  if (score < 30) return '#ef4444';
  if (score < 50) return '#f59e0b';
  if (score < 65) return '#eab308';
  if (score < 80) return '#22c55e';
  return '#00d4aa';
}

export function getScoreGradient(score: number): string {
  if (score < 30) return 'from-red-500 to-red-700';
  if (score < 50) return 'from-amber-500 to-orange-600';
  if (score < 65) return 'from-yellow-400 to-amber-500';
  if (score < 80) return 'from-green-400 to-emerald-600';
  return 'from-emerald-400 to-teal-500';
}
