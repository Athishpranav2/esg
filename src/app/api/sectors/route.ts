import { NextRequest, NextResponse } from 'next/server';
import { sectors } from '@/data/sectors';
import { getCurrentScores } from '@/data/esg-scores';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q')?.toLowerCase() || '';
  const sort = searchParams.get('sort') || 'esgScore';
  const order = searchParams.get('order') || 'desc';
  
  const currentScores = getCurrentScores();
  
  let enrichedSectors = sectors.map(sector => {
    const score = currentScores.find(s => s.sectorId === sector.id);
    return {
      ...sector,
      esgScore: score?.esgScore || 0,
      environmentalScore: score?.environmentalScore || 0,
      socialScore: score?.socialScore || 0,
      governanceScore: score?.governanceScore || 0,
      nationalRank: score?.nationalRank || 0,
    };
  });

  if (q) {
    enrichedSectors = enrichedSectors.filter(
      s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    );
  }

  const sortKey = sort as keyof typeof enrichedSectors[0];
  enrichedSectors.sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  return NextResponse.json({
    total: enrichedSectors.length,
    year: 'FY2024-25',
    sectors: enrichedSectors,
  });
}
