// ============================================================
// Leaderboard Data — 8 categories for ESG leaderboards
// ============================================================
import { LeaderboardCategory } from '@/lib/types';

export const leaderboardCategories: LeaderboardCategory[] = [
  {
    id: 'climate-performance',
    name: 'Climate Performance',
    description: 'Ranking by GHG emission management, carbon intensity reduction, and climate governance quality',
    icon: 'Thermometer',
    pillar: 'environmental',
    entries: [
      { rank: 1, sectorId: 17, sectorName: 'Power', sectorSlug: 'power', score: 82.4, delta: 4.2, trend: 'up' },
      { rank: 2, sectorId: 16, sectorName: 'Oil, Gas & Consumable Fuels', sectorSlug: 'oil-gas', score: 76.8, delta: 3.1, trend: 'up' },
      { rank: 3, sectorId: 15, sectorName: 'Metals & Mining', sectorSlug: 'metals-mining', score: 74.2, delta: 2.8, trend: 'up' },
      { rank: 4, sectorId: 5, sectorName: 'Construction Materials', sectorSlug: 'construction-materials', score: 71.6, delta: 1.4, trend: 'up' },
      { rank: 5, sectorId: 3, sectorName: 'Chemicals', sectorSlug: 'chemicals', score: 68.4, delta: 2.1, trend: 'up' },
      { rank: 18, sectorId: 14, sectorName: 'Media, Entertainment & Publication', sectorSlug: 'media-entertainment', score: 32.4, delta: -1.2, trend: 'down' },
      { rank: 19, sectorId: 6, sectorName: 'Consumer Durables', sectorSlug: 'consumer-durables', score: 30.8, delta: -0.8, trend: 'down' },
      { rank: 20, sectorId: 10, sectorName: 'Financial Services', sectorSlug: 'financial-services', score: 28.4, delta: 1.6, trend: 'up' },
      { rank: 21, sectorId: 8, sectorName: 'Diversified', sectorSlug: 'diversified', score: 24.6, delta: -2.4, trend: 'down' },
      { rank: 22, sectorId: 11, sectorName: 'Forest Materials', sectorSlug: 'forest-materials', score: 22.8, delta: -1.8, trend: 'down' },
    ]
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy Adoption',
    description: 'Ranking by percentage of total energy sourced from renewable sources',
    icon: 'Sun',
    pillar: 'environmental',
    entries: [
      { rank: 1, sectorId: 17, sectorName: 'Power', sectorSlug: 'power', score: 22.4, delta: 3.8, trend: 'up' },
      { rank: 2, sectorId: 13, sectorName: 'Information Technology', sectorSlug: 'information-technology', score: 18.6, delta: 3.2, trend: 'up' },
      { rank: 3, sectorId: 20, sectorName: 'Telecommunication', sectorSlug: 'telecommunication', score: 14.8, delta: 2.4, trend: 'up' },
      { rank: 4, sectorId: 10, sectorName: 'Financial Services', sectorSlug: 'financial-services', score: 12.4, delta: 2.2, trend: 'up' },
      { rank: 5, sectorId: 15, sectorName: 'Metals & Mining', sectorSlug: 'metals-mining', score: 10.2, delta: 1.6, trend: 'up' },
      { rank: 18, sectorId: 6, sectorName: 'Consumer Durables', sectorSlug: 'consumer-durables', score: 4.2, delta: 0.8, trend: 'up' },
      { rank: 19, sectorId: 8, sectorName: 'Diversified', sectorSlug: 'diversified', score: 3.8, delta: 1.0, trend: 'up' },
      { rank: 20, sectorId: 18, sectorName: 'Realty', sectorSlug: 'realty', score: 3.6, delta: -0.2, trend: 'down' },
      { rank: 21, sectorId: 4, sectorName: 'Construction', sectorSlug: 'construction', score: 3.4, delta: 0.6, trend: 'up' },
      { rank: 22, sectorId: 7, sectorName: 'Consumer Services', sectorSlug: 'consumer-services', score: 2.8, delta: -0.4, trend: 'down' },
    ]
  },
  {
    id: 'water-management',
    name: 'Water Management',
    description: 'Ranking by water efficiency, stress area management, and conservation practices',
    icon: 'Droplets',
    pillar: 'environmental',
    entries: [
      { rank: 1, sectorId: 13, sectorName: 'Information Technology', sectorSlug: 'information-technology', score: 88.2, delta: 2.4, trend: 'up' },
      { rank: 2, sectorId: 10, sectorName: 'Financial Services', sectorSlug: 'financial-services', score: 85.4, delta: 1.8, trend: 'up' },
      { rank: 3, sectorId: 14, sectorName: 'Media, Entertainment & Publication', sectorSlug: 'media-entertainment', score: 82.6, delta: 1.2, trend: 'up' },
      { rank: 4, sectorId: 19, sectorName: 'Services', sectorSlug: 'services', score: 80.4, delta: 2.1, trend: 'up' },
      { rank: 5, sectorId: 7, sectorName: 'Consumer Services', sectorSlug: 'consumer-services', score: 78.8, delta: 1.6, trend: 'up' },
      { rank: 18, sectorId: 3, sectorName: 'Chemicals', sectorSlug: 'chemicals', score: 42.4, delta: -1.4, trend: 'down' },
      { rank: 19, sectorId: 22, sectorName: 'Utilities', sectorSlug: 'utilities', score: 38.6, delta: 0.8, trend: 'up' },
      { rank: 20, sectorId: 11, sectorName: 'Forest Materials', sectorSlug: 'forest-materials', score: 35.2, delta: -2.1, trend: 'down' },
      { rank: 21, sectorId: 15, sectorName: 'Metals & Mining', sectorSlug: 'metals-mining', score: 32.8, delta: 1.4, trend: 'up' },
      { rank: 22, sectorId: 17, sectorName: 'Power', sectorSlug: 'power', score: 28.4, delta: -0.6, trend: 'down' },
    ]
  },
  {
    id: 'waste-management',
    name: 'Waste Management',
    description: 'Ranking by waste recycling rates, circular economy practices, and hazardous waste handling',
    icon: 'Recycle',
    pillar: 'environmental',
    entries: [
      { rank: 1, sectorId: 17, sectorName: 'Power', sectorSlug: 'power', score: 72.6, delta: 4.2, trend: 'up' },
      { rank: 2, sectorId: 15, sectorName: 'Metals & Mining', sectorSlug: 'metals-mining', score: 68.4, delta: 3.8, trend: 'up' },
      { rank: 3, sectorId: 16, sectorName: 'Oil, Gas & Consumable Fuels', sectorSlug: 'oil-gas', score: 64.2, delta: 3.8, trend: 'up' },
      { rank: 4, sectorId: 1, sectorName: 'Automobile & Auto Components', sectorSlug: 'automobile-auto-components', score: 62.4, delta: 4.2, trend: 'up' },
      { rank: 5, sectorId: 3, sectorName: 'Chemicals', sectorSlug: 'chemicals', score: 58.3, delta: 4.2, trend: 'up' },
      { rank: 18, sectorId: 14, sectorName: 'Media, Entertainment & Publication', sectorSlug: 'media-entertainment', score: 32.6, delta: 4.2, trend: 'up' },
      { rank: 19, sectorId: 8, sectorName: 'Diversified', sectorSlug: 'diversified', score: 32.1, delta: 3.7, trend: 'up' },
      { rank: 20, sectorId: 10, sectorName: 'Financial Services', sectorSlug: 'financial-services', score: 28.6, delta: 3.8, trend: 'up' },
      { rank: 21, sectorId: 6, sectorName: 'Consumer Durables', sectorSlug: 'consumer-durables', score: 24.8, delta: -2.4, trend: 'down' },
      { rank: 22, sectorId: 18, sectorName: 'Realty', sectorSlug: 'realty', score: 22.4, delta: -1.2, trend: 'down' },
    ]
  },
  {
    id: 'gender-diversity',
    name: 'Gender Diversity',
    description: 'Ranking by female workforce representation across all levels',
    icon: 'Users',
    pillar: 'social',
    entries: [
      { rank: 1, sectorId: 13, sectorName: 'Information Technology', sectorSlug: 'information-technology', score: 34.8, delta: 2.6, trend: 'up' },
      { rank: 2, sectorId: 7, sectorName: 'Consumer Services', sectorSlug: 'consumer-services', score: 28.4, delta: 1.8, trend: 'up' },
      { rank: 3, sectorId: 14, sectorName: 'Media, Entertainment & Publication', sectorSlug: 'media-entertainment', score: 26.2, delta: 1.4, trend: 'up' },
      { rank: 4, sectorId: 12, sectorName: 'Healthcare', sectorSlug: 'healthcare', score: 24.6, delta: 2.2, trend: 'up' },
      { rank: 5, sectorId: 21, sectorName: 'Textiles', sectorSlug: 'textiles', score: 22.8, delta: 1.6, trend: 'up' },
      { rank: 18, sectorId: 1, sectorName: 'Automobile & Auto Components', sectorSlug: 'automobile-auto-components', score: 12.4, delta: 0.8, trend: 'up' },
      { rank: 19, sectorId: 3, sectorName: 'Chemicals', sectorSlug: 'chemicals', score: 10.2, delta: 0.6, trend: 'up' },
      { rank: 20, sectorId: 5, sectorName: 'Construction Materials', sectorSlug: 'construction-materials', score: 9.4, delta: 0.4, trend: 'up' },
      { rank: 21, sectorId: 16, sectorName: 'Oil, Gas & Consumable Fuels', sectorSlug: 'oil-gas', score: 8.8, delta: 0.6, trend: 'up' },
      { rank: 22, sectorId: 15, sectorName: 'Metals & Mining', sectorSlug: 'metals-mining', score: 6.4, delta: 0.4, trend: 'up' },
    ]
  },
  {
    id: 'board-diversity',
    name: 'Board Diversity',
    description: 'Ranking by board independence percentage and board-level gender representation',
    icon: 'Building2',
    pillar: 'governance',
    entries: [
      { rank: 1, sectorId: 13, sectorName: 'Information Technology', sectorSlug: 'information-technology', score: 62.8, delta: 2.4, trend: 'up' },
      { rank: 2, sectorId: 17, sectorName: 'Power', sectorSlug: 'power', score: 60.2, delta: 1.8, trend: 'up' },
      { rank: 3, sectorId: 16, sectorName: 'Oil, Gas & Consumable Fuels', sectorSlug: 'oil-gas', score: 58.8, delta: 1.6, trend: 'up' },
      { rank: 4, sectorId: 10, sectorName: 'Financial Services', sectorSlug: 'financial-services', score: 58.4, delta: 1.2, trend: 'up' },
      { rank: 5, sectorId: 20, sectorName: 'Telecommunication', sectorSlug: 'telecommunication', score: 56.8, delta: 1.4, trend: 'up' },
      { rank: 18, sectorId: 4, sectorName: 'Construction', sectorSlug: 'construction', score: 48.6, delta: 0.4, trend: 'up' },
      { rank: 19, sectorId: 6, sectorName: 'Consumer Durables', sectorSlug: 'consumer-durables', score: 48.2, delta: 0.2, trend: 'stable' },
      { rank: 20, sectorId: 14, sectorName: 'Media, Entertainment & Publication', sectorSlug: 'media-entertainment', score: 46.8, delta: -0.4, trend: 'down' },
      { rank: 21, sectorId: 8, sectorName: 'Diversified', sectorSlug: 'diversified', score: 44.8, delta: -0.8, trend: 'down' },
      { rank: 22, sectorId: 22, sectorName: 'Utilities', sectorSlug: 'utilities', score: 42.6, delta: -1.2, trend: 'down' },
    ]
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Sustainability',
    description: 'Ranking by value chain ESG assessment coverage, ethical sourcing, and supplier accountability',
    icon: 'Link',
    pillar: 'social',
    entries: [
      { rank: 1, sectorId: 17, sectorName: 'Power', sectorSlug: 'power', score: 58.2, delta: 3.4, trend: 'up' },
      { rank: 2, sectorId: 13, sectorName: 'Information Technology', sectorSlug: 'information-technology', score: 56.8, delta: 2.8, trend: 'up' },
      { rank: 3, sectorId: 16, sectorName: 'Oil, Gas & Consumable Fuels', sectorSlug: 'oil-gas', score: 56.4, delta: 2.6, trend: 'up' },
      { rank: 4, sectorId: 9, sectorName: 'Fast Moving Consumer Goods', sectorSlug: 'fmcg', score: 54.2, delta: 2.2, trend: 'up' },
      { rank: 5, sectorId: 1, sectorName: 'Automobile & Auto Components', sectorSlug: 'automobile-auto-components', score: 52.6, delta: 1.8, trend: 'up' },
      { rank: 18, sectorId: 18, sectorName: 'Realty', sectorSlug: 'realty', score: 36.8, delta: 0.4, trend: 'up' },
      { rank: 19, sectorId: 8, sectorName: 'Diversified', sectorSlug: 'diversified', score: 36.2, delta: -0.6, trend: 'down' },
      { rank: 20, sectorId: 14, sectorName: 'Media, Entertainment & Publication', sectorSlug: 'media-entertainment', score: 34.2, delta: -0.8, trend: 'down' },
      { rank: 21, sectorId: 10, sectorName: 'Financial Services', sectorSlug: 'financial-services', score: 32.4, delta: 1.2, trend: 'up' },
      { rank: 22, sectorId: 11, sectorName: 'Forest Materials', sectorSlug: 'forest-materials', score: 28.6, delta: -1.4, trend: 'down' },
    ]
  },
  {
    id: 'compensation-fairness',
    name: 'Executive Compensation Fairness',
    description: 'Ranking by gender pay equity, compensation transparency, and executive-to-median ratio',
    icon: 'Scale',
    pillar: 'governance',
    entries: [
      { rank: 1, sectorId: 13, sectorName: 'Information Technology', sectorSlug: 'information-technology', score: 62.4, delta: 2.8, trend: 'up' },
      { rank: 2, sectorId: 17, sectorName: 'Power', sectorSlug: 'power', score: 62.8, delta: 2.4, trend: 'up' },
      { rank: 3, sectorId: 16, sectorName: 'Oil, Gas & Consumable Fuels', sectorSlug: 'oil-gas', score: 60.4, delta: 1.8, trend: 'up' },
      { rank: 4, sectorId: 15, sectorName: 'Metals & Mining', sectorSlug: 'metals-mining', score: 58.6, delta: 1.6, trend: 'up' },
      { rank: 5, sectorId: 20, sectorName: 'Telecommunication', sectorSlug: 'telecommunication', score: 58.2, delta: 1.4, trend: 'up' },
      { rank: 18, sectorId: 4, sectorName: 'Construction', sectorSlug: 'construction', score: 46.4, delta: -0.6, trend: 'down' },
      { rank: 19, sectorId: 14, sectorName: 'Media, Entertainment & Publication', sectorSlug: 'media-entertainment', score: 44.8, delta: -0.4, trend: 'down' },
      { rank: 20, sectorId: 8, sectorName: 'Diversified', sectorSlug: 'diversified', score: 44.6, delta: -1.2, trend: 'down' },
      { rank: 21, sectorId: 22, sectorName: 'Utilities', sectorSlug: 'utilities', score: 44.2, delta: -0.8, trend: 'down' },
      { rank: 22, sectorId: 11, sectorName: 'Forest Materials', sectorSlug: 'forest-materials', score: 42.8, delta: -1.6, trend: 'down' },
    ]
  },
];
