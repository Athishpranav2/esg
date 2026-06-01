import { NextResponse } from 'next/server';
import { sectors } from '@/data/sectors';
import { getCurrentScores } from '@/data/esg-scores';

export async function GET() {
  const currentScores = getCurrentScores();
  
  const headers = ['Rank', 'Sector', 'Code', 'Companies', 'ESG Score', 'Environmental', 'Social', 'Governance'];
  
  const rows = currentScores
    .sort((a, b) => b.esgScore - a.esgScore)
    .map((score, i) => {
      const sector = sectors.find(s => s.id === score.sectorId);
      return [
        i + 1,
        `"${sector?.name || ''}"`,
        sector?.code || '',
        sector?.companyCount || 0,
        score.esgScore.toFixed(1),
        score.environmentalScore.toFixed(1),
        score.socialScore.toFixed(1),
        score.governanceScore.toFixed(1),
      ].join(',');
    });
  
  const csv = [headers.join(','), ...rows].join('\n');
  
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="india_esg_benchmark_FY2024-25.csv"',
    },
  });
}
