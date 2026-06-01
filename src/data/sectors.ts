// ============================================================
// Sectors Data — 22 NSE-classified sectors from BRSR 2026 report
// ============================================================
import { Sector } from '@/lib/types';

export const sectors: Sector[] = [
  {
    id: 1, code: 'IN0201', name: 'Automobile & Auto Components', slug: 'automobile-auto-components',
    companyCount: 58, description: 'Passenger vehicles, commercial vehicles, auto parts, EV manufacturers and component suppliers'
  },
  {
    id: 2, code: 'IN0702', name: 'Capital Goods', slug: 'capital-goods',
    companyCount: 153, description: 'Heavy engineering, industrial machinery, electrical equipment, and defense manufacturing'
  },
  {
    id: 3, code: 'IN0101', name: 'Chemicals', slug: 'chemicals',
    companyCount: 74, description: 'Specialty chemicals, agrochemicals, petrochemicals, and chemical manufacturing'
  },
  {
    id: 4, code: 'IN0701', name: 'Construction', slug: 'construction',
    companyCount: 34, description: 'Civil construction, infrastructure development, and EPC contractors'
  },
  {
    id: 5, code: 'IN0102', name: 'Construction Materials', slug: 'construction-materials',
    companyCount: 23, description: 'Cement, glass, ceramics, and building materials manufacturers'
  },
  {
    id: 6, code: 'IN0202', name: 'Consumer Durables', slug: 'consumer-durables',
    companyCount: 61, description: 'Consumer electronics, home appliances, wearables, and lifestyle products'
  },
  {
    id: 7, code: 'IN0206', name: 'Consumer Services', slug: 'consumer-services',
    companyCount: 49, description: 'Hotels, restaurants, tourism, education, and media services'
  },
  {
    id: 8, code: 'IN1201', name: 'Diversified', slug: 'diversified',
    companyCount: 4, description: 'Multi-sector conglomerates with diversified business operations'
  },
  {
    id: 9, code: 'IN0401', name: 'Fast Moving Consumer Goods', slug: 'fmcg',
    companyCount: 68, description: 'Food, beverages, personal care, household products, and tobacco'
  },
  {
    id: 10, code: 'IN0501', name: 'Financial Services', slug: 'financial-services',
    companyCount: 135, description: 'Banks, NBFCs, insurance, asset management, and capital markets'
  },
  {
    id: 11, code: 'IN0104', name: 'Forest Materials', slug: 'forest-materials',
    companyCount: 4, description: 'Paper, pulp, packaging, and forest-based product manufacturers'
  },
  {
    id: 12, code: 'IN0601', name: 'Healthcare', slug: 'healthcare',
    companyCount: 81, description: 'Pharmaceuticals, hospitals, diagnostics, medical devices, and biotech'
  },
  {
    id: 13, code: 'IN0801', name: 'Information Technology', slug: 'information-technology',
    companyCount: 50, description: 'IT services, software products, BPO, and digital transformation'
  },
  {
    id: 14, code: 'IN0204', name: 'Media, Entertainment & Publication', slug: 'media-entertainment',
    companyCount: 13, description: 'Broadcasting, digital media, print media, and entertainment'
  },
  {
    id: 15, code: 'IN0103', name: 'Metals & Mining', slug: 'metals-mining',
    companyCount: 23, description: 'Steel, aluminium, copper, mining, and mineral processing'
  },
  {
    id: 16, code: 'IN0301', name: 'Oil, Gas & Consumable Fuels', slug: 'oil-gas',
    companyCount: 25, description: 'Exploration, refining, distribution of petroleum, natural gas, and LNG'
  },
  {
    id: 17, code: 'IN1101', name: 'Power', slug: 'power',
    companyCount: 20, description: 'Thermal, hydro, solar, wind power generation and distribution'
  },
  {
    id: 18, code: 'IN0205', name: 'Realty', slug: 'realty',
    companyCount: 23, description: 'Residential, commercial, and industrial real estate development'
  },
  {
    id: 19, code: 'IN0901', name: 'Services', slug: 'services',
    companyCount: 35, description: 'Logistics, staffing, consulting, and professional services'
  },
  {
    id: 20, code: 'IN1001', name: 'Telecommunication', slug: 'telecommunication',
    companyCount: 15, description: 'Telecom operators, tower companies, and communication infrastructure'
  },
  {
    id: 21, code: 'IN0203', name: 'Textiles', slug: 'textiles',
    companyCount: 30, description: 'Yarn, fabrics, garments, home textiles, and technical textiles'
  },
  {
    id: 22, code: 'IN1102', name: 'Utilities', slug: 'utilities',
    companyCount: 4, description: 'Water utilities, waste management, and multi-utility services'
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find(s => s.slug === slug);
}

export function getSectorById(id: number): Sector | undefined {
  return sectors.find(s => s.id === id);
}
