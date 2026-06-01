import { Company } from '@/lib/types';

export const companies: Company[] = [
  {
    id: 'c1', name: 'Tata Motors Ltd.', ticker: 'TATAMOTORS', sectorId: 1, slug: 'tata-motors',
    description: 'Leading global automobile manufacturer offering a wide range of cars, sports utility vehicles, trucks, buses and defence vehicles.',
    esgScore: 78.5, environmentalScore: 82.1, socialScore: 74.3, governanceScore: 79.1
  },
  {
    id: 'c2', name: 'Infosys Ltd.', ticker: 'INFY', sectorId: 13, slug: 'infosys',
    description: 'Global leader in next-generation digital services and consulting.',
    esgScore: 84.2, environmentalScore: 79.5, socialScore: 86.1, governanceScore: 87.0
  },
  {
    id: 'c3', name: 'Reliance Industries Ltd.', ticker: 'RELIANCE', sectorId: 16, slug: 'reliance-industries',
    description: 'Multinational conglomerate with diverse businesses including energy, petrochemicals, natural gas, retail, and telecommunications.',
    esgScore: 68.4, environmentalScore: 61.2, socialScore: 70.8, governanceScore: 73.2
  },
  {
    id: 'c4', name: 'HDFC Bank Ltd.', ticker: 'HDFCBANK', sectorId: 10, slug: 'hdfc-bank',
    description: 'Leading private sector bank offering a diverse range of financial products and banking services.',
    esgScore: 76.1, environmentalScore: 65.4, socialScore: 78.2, governanceScore: 84.7
  },
  {
    id: 'c5', name: 'ITC Ltd.', ticker: 'ITC', sectorId: 9, slug: 'itc',
    description: 'Diversified conglomerate with businesses spanning Fast Moving Consumer Goods, Hotels, Paperboards and Packaging, Agri Business and Information Technology.',
    esgScore: 81.3, environmentalScore: 85.6, socialScore: 79.1, governanceScore: 79.2
  },
  {
    id: 'c6', name: 'Larsen & Toubro Ltd.', ticker: 'LT', sectorId: 4, slug: 'larsen-toubro',
    description: 'Multinational conglomerate engaged in EPC Projects, Hi-Tech Manufacturing and Services.',
    esgScore: 71.8, environmentalScore: 68.5, socialScore: 72.4, governanceScore: 74.5
  },
  {
    id: 'c7', name: 'Tata Consultancy Services Ltd.', ticker: 'TCS', sectorId: 13, slug: 'tcs',
    description: 'IT services, consulting and business solutions organization.',
    esgScore: 85.7, environmentalScore: 81.2, socialScore: 88.5, governanceScore: 87.4
  },
  {
    id: 'c8', name: 'Mahindra & Mahindra Ltd.', ticker: 'M&M', sectorId: 1, slug: 'mahindra-mahindra',
    description: 'Multinational automotive manufacturing corporation.',
    esgScore: 79.2, environmentalScore: 80.5, socialScore: 75.6, governanceScore: 81.5
  },
  {
    id: 'c9', name: 'Sun Pharmaceutical Industries Ltd.', ticker: 'SUNPHARMA', sectorId: 12, slug: 'sun-pharma',
    description: 'Multinational pharmaceutical company manufacturing and selling pharmaceutical formulations and active pharmaceutical ingredients.',
    esgScore: 73.4, environmentalScore: 69.1, socialScore: 74.8, governanceScore: 76.3
  },
  {
    id: 'c10', name: 'NTPC Ltd.', ticker: 'NTPC', sectorId: 17, slug: 'ntpc',
    description: 'Central Public Sector Undertaking under the Ministry of Power, engaged in generation of electricity and allied activities.',
    esgScore: 75.2, environmentalScore: 64.8, socialScore: 78.5, governanceScore: 82.3
  }
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find(c => c.slug === slug);
}
