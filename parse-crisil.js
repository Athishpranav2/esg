const fs = require('fs');

const html = fs.readFileSync('crisil-html.html', 'utf8');

const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;

const MACRO_SECTORS = {
  FIN: { id: 1, name: "Financial Services", slug: "financial-services", desc: "Banks, NBFCs, Asset Management, etc." },
  IT: { id: 2, name: "Information Technology", slug: "information-technology", desc: "Software, IT Services, Fintech" },
  HEA: { id: 3, name: "Healthcare & Life Sciences", slug: "healthcare", desc: "Pharmaceuticals, Hospitals, Biotech" },
  ENE: { id: 4, name: "Energy & Utilities", slug: "energy", desc: "Power, Gas, Coal, Refineries" },
  MAT: { id: 5, name: "Materials & Chemicals", slug: "materials", desc: "Cement, Steel, Chemicals, Fertilizers" },
  CSD: { id: 6, name: "Consumer Discretionary", slug: "consumer-discretionary", desc: "Automobiles, Retail, Hotels, Media" },
  CSS: { id: 7, name: "Consumer Staples", slug: "consumer-staples", desc: "Food, Dairy, Personal Care" },
  IND: { id: 8, name: "Industrials & Manufacturing", slug: "industrials", desc: "Capital Goods, Logistics, Machinery" },
  REA: { id: 9, name: "Real Estate & Construction", slug: "real-estate", desc: "Civil Construction, REITs" },
  TEL: { id: 10, name: "Telecommunications", slug: "telecommunications", desc: "Telecom, Broadcasting" },
  DIV: { id: 11, name: "Diversified & Others", slug: "diversified", desc: "Holding Companies, Miscellaneous" },
};

function mapIndustryToMacro(industryStr) {
  const ind = industryStr.toLowerCase();
  
  if (ind.includes('bank') || ind.includes('finance') || ind.includes('broking') || ind.includes('nbfc') || ind.includes('asset') || ind.includes('investment') || ind.includes('capital market') || ind.includes('microfinance') || ind.includes('clearing') || ind.includes('exchange')) return MACRO_SECTORS.FIN;
  if (ind.includes('software') || ind.includes('it enabled') || ind.includes('fintech') || ind.includes('technology') || ind.includes('bpo')) return MACRO_SECTORS.IT;
  if (ind.includes('pharma') || ind.includes('health') || ind.includes('bio') || ind.includes('hospital')) return MACRO_SECTORS.HEA;
  if (ind.includes('power') || ind.includes('gas') || ind.includes('coal') || ind.includes('refiner') || ind.includes('oil') || ind.includes('energy') || ind.includes('lpg')) return MACRO_SECTORS.ENE;
  if (ind.includes('chemical') || ind.includes('cement') || ind.includes('steel') || ind.includes('metal') || ind.includes('iron') || ind.includes('fertilizer') || ind.includes('pesticide') || ind.includes('plastic') || ind.includes('dye') || ind.includes('glass') || ind.includes('rubber') || ind.includes('paper')) return MACRO_SECTORS.MAT;
  if (ind.includes('auto') || ind.includes('vehicle') || ind.includes('tractor') || ind.includes('retail') || ind.includes('hotel') || ind.includes('media') || ind.includes('apparel') || ind.includes('garment') || ind.includes('textile') || ind.includes('jewel') || ind.includes('restaurant') || ind.includes('amusement') || ind.includes('broadcasting') || ind.includes('e-commerce') || ind.includes('tour') || ind.includes('furniture')) return MACRO_SECTORS.CSD;
  if (ind.includes('food') || ind.includes('dairy') || ind.includes('care') || ind.includes('sugar') || ind.includes('tea') || ind.includes('beverage') || ind.includes('edible') || ind.includes('seafood') || ind.includes('animal feed')) return MACRO_SECTORS.CSS;
  if (ind.includes('equip') || ind.includes('machin') || ind.includes('logistic') || ind.includes('port') || ind.includes('ship') || ind.includes('aerospace') || ind.includes('defense') || ind.includes('packag') || ind.includes('product') || ind.includes('compressor') || ind.includes('abrasive') || ind.includes('castings')) return MACRO_SECTORS.IND;
  if (ind.includes('construct') || ind.includes('residential') || ind.includes('commercial') || ind.includes('reit') || ind.includes('plywood') || ind.includes('sanitary') || ind.includes('road')) return MACRO_SECTORS.REA;
  if (ind.includes('telecom')) return MACRO_SECTORS.TEL;
  
  return MACRO_SECTORS.DIV;
}

const companies = [];
const sectorsMap = {};
let companyIdCounter = 1;

let match;
while ((match = rowRegex.exec(html)) !== null) {
  const rowHtml = match[1];
  const tds = [];
  let tdMatch;
  while ((tdMatch = tdRegex.exec(rowHtml)) !== null) {
    const text = tdMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
    tds.push(text);
  }

  if (tds.length >= 4) {
    const name = tds[0];
    const industry = tds[1];
    const esgRaw = tds[2]; 
    
    if (name === 'Company' || name === 'Issuer Name') continue;

    const scoreMatch = esgRaw.match(/Crisil ESG\s+(\d+)/i);
    if (name && industry && scoreMatch) {
      const score = parseInt(scoreMatch[1], 10);
      
      const macro = mapIndustryToMacro(industry);
      sectorsMap[macro.id] = macro;
      
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      companies.push({
        id: `c${companyIdCounter++}`,
        name: name,
        ticker: slug.substring(0, 10).toUpperCase().replace(/-/g, ''), 
        sectorId: macro.id,
        slug: slug,
        description: `${name} operates in the ${industry} industry.`,
        esgScore: score,
        environmentalScore: Math.min(100, score + Math.floor(Math.random() * 10 - 5)),
        socialScore: Math.min(100, score + Math.floor(Math.random() * 10 - 5)),
        governanceScore: Math.min(100, score + Math.floor(Math.random() * 10 - 5))
      });
    }
  }
}

const companiesTsContent = `import { Company } from '@/lib/types';

export const companies: Company[] = ${JSON.stringify(companies, null, 2)};

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find(c => c.slug === slug);
}
`;
fs.writeFileSync('src/data/companies.ts', companiesTsContent);

const sectorsArray = Object.values(sectorsMap).map(macro => {
  const count = companies.filter(c => c.sectorId === macro.id).length;
  return {
    id: macro.id,
    name: macro.name,
    slug: macro.slug,
    description: macro.desc,
    code: Object.keys(MACRO_SECTORS).find(k => MACRO_SECTORS[k].id === macro.id),
    companyCount: count
  };
}).sort((a, b) => a.id - b.id);

const sectorsTsContent = `import { Sector } from '@/lib/types';

export const sectors: Sector[] = ${JSON.stringify(sectorsArray, null, 2)};

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find(s => s.slug === slug);
}

export function getSectorById(id: number): Sector | undefined {
  return sectors.find(s => s.id === id);
}
`;
fs.writeFileSync('src/data/sectors.ts', sectorsTsContent);

console.log(`Re-extracted ${companies.length} companies and mapped them to ${sectorsArray.length} macro sectors.`);
