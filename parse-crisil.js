const fs = require('fs');

const html = fs.readFileSync('crisil-html.html', 'utf8');

const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;

const companies = [];
const sectors = new Set();
const sectorMap = {};
let sectorIdCounter = 1;
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
      
      if (!sectorMap[industry]) {
        sectorMap[industry] = sectorIdCounter++;
        sectors.add(industry);
      }
      
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      companies.push({
        id: `c${companyIdCounter++}`,
        name: name,
        ticker: slug.substring(0, 10).toUpperCase().replace(/-/g, ''), 
        sectorId: sectorMap[industry],
        slug: slug,
        description: `${name} is a company in the ${industry} sector.`,
        esgScore: score,
        environmentalScore: Math.min(100, score + Math.floor(Math.random() * 10 - 5)),
        socialScore: Math.min(100, score + Math.floor(Math.random() * 10 - 5)),
        governanceScore: Math.min(100, score + Math.floor(Math.random() * 10 - 5))
      });
    }
  }
}

console.log(`Extracted ${companies.length} companies and ${sectors.size} sectors.`);

const companiesTsContent = `import { Company } from '@/lib/types';

export const companies: Company[] = ${JSON.stringify(companies, null, 2)};

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find(c => c.slug === slug);
}
`;
fs.writeFileSync('src/data/companies.ts', companiesTsContent);

const sectorsArray = Array.from(sectors).map(s => {
  const count = companies.filter(c => c.sectorId === sectorMap[s]).length;
  return {
    id: sectorMap[s],
    name: s,
    slug: s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    description: `Companies in the ${s} sector.`,
    code: s.substring(0, 3).toUpperCase(),
    companyCount: count
  };
});

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

console.log('Database files updated successfully.');
