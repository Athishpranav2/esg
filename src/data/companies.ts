import { Company } from '@/lib/types';

export const companies: Company[] = [
  {
    id: 'c1', name: 'Tata Motors Ltd.', ticker: 'TATAMOTORS', sectorId: 1, slug: 'tata-motors',
    description: 'Leading global automobile manufacturer offering a wide range of cars, sports utility vehicles, trucks, buses and defence vehicles.',
    esgScore: 58.0, environmentalScore: 62.0, socialScore: 55.0, governanceScore: 57.0
  },
  {
    id: 'c2', name: 'Infosys Ltd.', ticker: 'INFY', sectorId: 13, slug: 'infosys',
    description: 'Global leader in next-generation digital services and consulting.',
    esgScore: 79.0, environmentalScore: 76.0, socialScore: 82.0, governanceScore: 79.0
  },
  {
    id: 'c3', name: 'Reliance Industries Limited', ticker: 'RELIANCE', sectorId: 16, slug: 'reliance-industries',
    description: 'Multinational conglomerate with diverse businesses including energy, petrochemicals, natural gas, retail, and telecommunications.',
    esgScore: 61.0, environmentalScore: 55.0, socialScore: 62.0, governanceScore: 65.0
  },
  {
    id: 'c4', name: 'HDFC Bank Ltd.', ticker: 'HDFCBANK', sectorId: 10, slug: 'hdfc-bank',
    description: 'Leading private sector bank offering a diverse range of financial products and banking services.',
    esgScore: 68.0, environmentalScore: 60.0, socialScore: 72.0, governanceScore: 70.0
  },
  {
    id: 'c5', name: 'ITC Ltd.', ticker: 'ITC', sectorId: 9, slug: 'itc',
    description: 'Diversified conglomerate with businesses spanning Fast Moving Consumer Goods, Hotels, Paperboards and Packaging, Agri Business and Information Technology.',
    esgScore: 71.0, environmentalScore: 68.0, socialScore: 74.0, governanceScore: 72.0
  },
  {
    id: 'c6', name: 'Larsen & Toubro Ltd.', ticker: 'LT', sectorId: 4, slug: 'larsen-toubro',
    description: 'Multinational conglomerate engaged in EPC Projects, Hi-Tech Manufacturing and Services.',
    esgScore: 52.0, environmentalScore: 48.0, socialScore: 55.0, governanceScore: 54.0
  },
  {
    id: 'c7', name: 'Tata Consultancy Services Ltd.', ticker: 'TCS', sectorId: 13, slug: 'tcs',
    description: 'IT services, consulting and business solutions organization.',
    esgScore: 75.0, environmentalScore: 70.0, socialScore: 78.0, governanceScore: 76.0
  },
  {
    id: 'c8', name: 'Mahindra & Mahindra Ltd.', ticker: 'M&M', sectorId: 1, slug: 'mahindra-mahindra',
    description: 'Multinational automotive manufacturing corporation.',
    esgScore: 64.0, environmentalScore: 68.0, socialScore: 60.0, governanceScore: 62.0
  },
  {
    id: 'c9', name: 'Sun Pharmaceutical Industries Ltd.', ticker: 'SUNPHARMA', sectorId: 12, slug: 'sun-pharma',
    description: 'Multinational pharmaceutical company manufacturing and selling pharmaceutical formulations and active pharmaceutical ingredients.',
    esgScore: 50.0, environmentalScore: 45.0, socialScore: 54.0, governanceScore: 52.0
  },
  {
    id: 'c10', name: 'NTPC Ltd.', ticker: 'NTPC', sectorId: 17, slug: 'ntpc',
    description: 'Central Public Sector Undertaking under the Ministry of Power, engaged in generation of electricity and allied activities.',
    esgScore: 42.0, environmentalScore: 30.0, socialScore: 50.0, governanceScore: 48.0
  }
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find(c => c.slug === slug);
}
