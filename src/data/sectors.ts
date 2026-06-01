import { Sector } from '@/lib/types';

export const sectors: Sector[] = [
  {
    "id": 1,
    "name": "Financial Services",
    "slug": "financial-services",
    "description": "Banks, NBFCs, Asset Management, etc.",
    "code": "FIN",
    "companyCount": 135
  },
  {
    "id": 2,
    "name": "Information Technology",
    "slug": "information-technology",
    "description": "Software, IT Services, Fintech",
    "code": "IT",
    "companyCount": 59
  },
  {
    "id": 3,
    "name": "Healthcare & Life Sciences",
    "slug": "healthcare",
    "description": "Pharmaceuticals, Hospitals, Biotech",
    "code": "HEA",
    "companyCount": 79
  },
  {
    "id": 4,
    "name": "Energy & Utilities",
    "slug": "energy",
    "description": "Power, Gas, Coal, Refineries",
    "code": "ENE",
    "companyCount": 59
  },
  {
    "id": 5,
    "name": "Materials & Chemicals",
    "slug": "materials",
    "description": "Cement, Steel, Chemicals, Fertilizers",
    "code": "MAT",
    "companyCount": 155
  },
  {
    "id": 6,
    "name": "Consumer Discretionary",
    "slug": "consumer-discretionary",
    "description": "Automobiles, Retail, Hotels, Media",
    "code": "CSD",
    "companyCount": 149
  },
  {
    "id": 7,
    "name": "Consumer Staples",
    "slug": "consumer-staples",
    "description": "Food, Dairy, Personal Care",
    "code": "CSS",
    "companyCount": 37
  },
  {
    "id": 8,
    "name": "Industrials & Manufacturing",
    "slug": "industrials",
    "description": "Capital Goods, Logistics, Machinery",
    "code": "IND",
    "companyCount": 126
  },
  {
    "id": 9,
    "name": "Real Estate & Construction",
    "slug": "real-estate",
    "description": "Civil Construction, REITs",
    "code": "REA",
    "companyCount": 80
  },
  {
    "id": 10,
    "name": "Telecommunications",
    "slug": "telecommunications",
    "description": "Telecom, Broadcasting",
    "code": "TEL",
    "companyCount": 14
  },
  {
    "id": 11,
    "name": "Diversified & Others",
    "slug": "diversified",
    "description": "Holding Companies, Miscellaneous",
    "code": "DIV",
    "companyCount": 132
  }
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find(s => s.slug === slug);
}

export function getSectorById(id: number): Sector | undefined {
  return sectors.find(s => s.id === id);
}
