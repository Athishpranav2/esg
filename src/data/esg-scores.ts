// ============================================================
// ESG Scores — Composite scores derived from BRSR 2026 findings
// Methodology: Environmental (40%) + Social (30%) + Governance (30%)
// Scores based on: policy adoption, target quality, performance,
// assurance rates, and best-practice disclosure rates from the PDF
// ============================================================
import { ESGScore } from '@/lib/types';

export const esgScores: ESGScore[] = [
  // FY 2024-25 (Current Year)
  { sectorId: 1, year: 'FY2024-25', esgScore: 64.2, environmentalScore: 62.8, socialScore: 66.1, governanceScore: 63.5, nationalRank: 7 },
  { sectorId: 2, year: 'FY2024-25', esgScore: 55.8, environmentalScore: 51.4, socialScore: 58.2, governanceScore: 58.6, nationalRank: 14 },
  { sectorId: 3, year: 'FY2024-25', esgScore: 60.5, environmentalScore: 62.1, socialScore: 56.3, governanceScore: 63.8, nationalRank: 10 },
  { sectorId: 4, year: 'FY2024-25', esgScore: 53.1, environmentalScore: 49.8, socialScore: 54.7, governanceScore: 55.2, nationalRank: 17 },
  { sectorId: 5, year: 'FY2024-25', esgScore: 61.7, environmentalScore: 64.5, socialScore: 57.8, governanceScore: 62.1, nationalRank: 9 },
  { sectorId: 6, year: 'FY2024-25', esgScore: 52.3, environmentalScore: 48.2, socialScore: 55.1, governanceScore: 54.6, nationalRank: 18 },
  { sectorId: 7, year: 'FY2024-25', esgScore: 54.6, environmentalScore: 50.3, socialScore: 57.9, governanceScore: 56.1, nationalRank: 15 },
  { sectorId: 8, year: 'FY2024-25', esgScore: 45.2, environmentalScore: 41.8, socialScore: 46.5, governanceScore: 48.1, nationalRank: 22 },
  { sectorId: 9, year: 'FY2024-25', esgScore: 62.8, environmentalScore: 60.4, socialScore: 64.7, governanceScore: 63.5, nationalRank: 8 },
  { sectorId: 10, year: 'FY2024-25', esgScore: 56.4, environmentalScore: 42.1, socialScore: 62.8, governanceScore: 67.3, nationalRank: 13 },
  { sectorId: 11, year: 'FY2024-25', esgScore: 48.5, environmentalScore: 52.3, socialScore: 44.8, governanceScore: 47.6, nationalRank: 21 },
  { sectorId: 12, year: 'FY2024-25', esgScore: 59.3, environmentalScore: 55.7, socialScore: 62.4, governanceScore: 60.1, nationalRank: 11 },
  { sectorId: 13, year: 'FY2024-25', esgScore: 67.8, environmentalScore: 58.2, socialScore: 72.4, governanceScore: 74.1, nationalRank: 4 },
  { sectorId: 14, year: 'FY2024-25', esgScore: 49.7, environmentalScore: 44.5, socialScore: 52.3, governanceScore: 53.1, nationalRank: 20 },
  { sectorId: 15, year: 'FY2024-25', esgScore: 66.4, environmentalScore: 68.7, socialScore: 62.1, governanceScore: 67.8, nationalRank: 5 },
  { sectorId: 16, year: 'FY2024-25', esgScore: 69.1, environmentalScore: 71.3, socialScore: 65.2, governanceScore: 70.1, nationalRank: 3 },
  { sectorId: 17, year: 'FY2024-25', esgScore: 72.6, environmentalScore: 76.8, socialScore: 67.4, governanceScore: 72.5, nationalRank: 1 },
  { sectorId: 18, year: 'FY2024-25', esgScore: 51.2, environmentalScore: 48.6, socialScore: 52.8, governanceScore: 52.5, nationalRank: 19 },
  { sectorId: 19, year: 'FY2024-25', esgScore: 57.9, environmentalScore: 52.4, socialScore: 61.3, governanceScore: 60.8, nationalRank: 12 },
  { sectorId: 20, year: 'FY2024-25', esgScore: 64.5, environmentalScore: 60.1, socialScore: 66.8, governanceScore: 67.2, nationalRank: 6 },
  { sectorId: 21, year: 'FY2024-25', esgScore: 54.1, environmentalScore: 52.8, socialScore: 53.6, governanceScore: 56.2, nationalRank: 16 },
  { sectorId: 22, year: 'FY2024-25', esgScore: 50.3, environmentalScore: 53.2, socialScore: 47.5, governanceScore: 49.8, nationalRank: 20 },

  // FY 2023-24 (Previous Year)
  { sectorId: 1, year: 'FY2023-24', esgScore: 60.8, environmentalScore: 58.4, socialScore: 63.1, governanceScore: 61.2, nationalRank: 7 },
  { sectorId: 2, year: 'FY2023-24', esgScore: 52.1, environmentalScore: 47.8, socialScore: 54.6, governanceScore: 54.8, nationalRank: 14 },
  { sectorId: 3, year: 'FY2023-24', esgScore: 57.2, environmentalScore: 58.6, socialScore: 53.1, governanceScore: 60.2, nationalRank: 10 },
  { sectorId: 4, year: 'FY2023-24', esgScore: 49.5, environmentalScore: 46.2, socialScore: 51.3, governanceScore: 51.4, nationalRank: 17 },
  { sectorId: 5, year: 'FY2023-24', esgScore: 58.3, environmentalScore: 60.8, socialScore: 54.5, governanceScore: 59.1, nationalRank: 9 },
  { sectorId: 6, year: 'FY2023-24', esgScore: 48.7, environmentalScore: 44.5, socialScore: 51.6, governanceScore: 50.8, nationalRank: 18 },
  { sectorId: 7, year: 'FY2023-24', esgScore: 51.2, environmentalScore: 46.8, socialScore: 54.3, governanceScore: 53.1, nationalRank: 15 },
  { sectorId: 8, year: 'FY2023-24', esgScore: 42.1, environmentalScore: 38.4, socialScore: 43.8, governanceScore: 44.6, nationalRank: 22 },
  { sectorId: 9, year: 'FY2023-24', esgScore: 59.4, environmentalScore: 56.8, socialScore: 61.5, governanceScore: 60.2, nationalRank: 8 },
  { sectorId: 10, year: 'FY2023-24', esgScore: 53.1, environmentalScore: 38.6, socialScore: 59.4, governanceScore: 64.1, nationalRank: 13 },
  { sectorId: 11, year: 'FY2023-24', esgScore: 45.2, environmentalScore: 48.7, socialScore: 41.6, governanceScore: 44.8, nationalRank: 21 },
  { sectorId: 12, year: 'FY2023-24', esgScore: 55.8, environmentalScore: 51.9, socialScore: 58.7, governanceScore: 57.2, nationalRank: 11 },
  { sectorId: 13, year: 'FY2023-24', esgScore: 64.5, environmentalScore: 54.8, socialScore: 69.1, governanceScore: 71.2, nationalRank: 4 },
  { sectorId: 14, year: 'FY2023-24', esgScore: 46.3, environmentalScore: 41.2, socialScore: 48.7, governanceScore: 49.6, nationalRank: 20 },
  { sectorId: 15, year: 'FY2023-24', esgScore: 63.1, environmentalScore: 65.2, socialScore: 58.9, governanceScore: 64.6, nationalRank: 5 },
  { sectorId: 16, year: 'FY2023-24', esgScore: 65.8, environmentalScore: 67.5, socialScore: 62.4, governanceScore: 66.9, nationalRank: 3 },
  { sectorId: 17, year: 'FY2023-24', esgScore: 69.4, environmentalScore: 73.2, socialScore: 64.1, governanceScore: 69.8, nationalRank: 1 },
  { sectorId: 18, year: 'FY2023-24', esgScore: 47.8, environmentalScore: 44.9, socialScore: 49.4, governanceScore: 49.5, nationalRank: 19 },
  { sectorId: 19, year: 'FY2023-24', esgScore: 54.3, environmentalScore: 48.7, socialScore: 57.8, governanceScore: 57.2, nationalRank: 12 },
  { sectorId: 20, year: 'FY2023-24', esgScore: 61.2, environmentalScore: 56.5, socialScore: 63.4, governanceScore: 64.1, nationalRank: 6 },
  { sectorId: 21, year: 'FY2023-24', esgScore: 50.6, environmentalScore: 49.1, socialScore: 50.2, governanceScore: 52.8, nationalRank: 16 },
  { sectorId: 22, year: 'FY2023-24', esgScore: 47.1, environmentalScore: 49.8, socialScore: 44.2, governanceScore: 46.8, nationalRank: 21 },

  // FY 2022-23
  { sectorId: 1, year: 'FY2022-23', esgScore: 56.4, environmentalScore: 53.8, socialScore: 58.9, governanceScore: 56.8, nationalRank: 7 },
  { sectorId: 2, year: 'FY2022-23', esgScore: 48.2, environmentalScore: 43.5, socialScore: 50.8, governanceScore: 51.2, nationalRank: 14 },
  { sectorId: 3, year: 'FY2022-23', esgScore: 53.1, environmentalScore: 54.2, socialScore: 49.6, governanceScore: 55.8, nationalRank: 10 },
  { sectorId: 4, year: 'FY2022-23', esgScore: 45.8, environmentalScore: 42.5, socialScore: 47.4, governanceScore: 47.8, nationalRank: 17 },
  { sectorId: 5, year: 'FY2022-23', esgScore: 54.1, environmentalScore: 56.4, socialScore: 50.8, governanceScore: 54.6, nationalRank: 9 },
  { sectorId: 6, year: 'FY2022-23', esgScore: 44.5, environmentalScore: 40.2, socialScore: 47.4, governanceScore: 46.5, nationalRank: 18 },
  { sectorId: 7, year: 'FY2022-23', esgScore: 47.3, environmentalScore: 42.8, socialScore: 50.4, governanceScore: 49.2, nationalRank: 15 },
  { sectorId: 8, year: 'FY2022-23', esgScore: 38.4, environmentalScore: 34.6, socialScore: 39.8, governanceScore: 41.2, nationalRank: 22 },
  { sectorId: 9, year: 'FY2022-23', esgScore: 55.2, environmentalScore: 52.4, socialScore: 57.6, governanceScore: 56.1, nationalRank: 8 },
  { sectorId: 10, year: 'FY2022-23', esgScore: 49.6, environmentalScore: 34.8, socialScore: 55.6, governanceScore: 60.4, nationalRank: 13 },
  { sectorId: 11, year: 'FY2022-23', esgScore: 41.8, environmentalScore: 44.5, socialScore: 38.4, governanceScore: 41.8, nationalRank: 21 },
  { sectorId: 12, year: 'FY2022-23', esgScore: 51.4, environmentalScore: 47.6, socialScore: 54.2, governanceScore: 52.8, nationalRank: 11 },
  { sectorId: 13, year: 'FY2022-23', esgScore: 60.2, environmentalScore: 50.4, socialScore: 65.2, governanceScore: 67.1, nationalRank: 4 },
  { sectorId: 14, year: 'FY2022-23', esgScore: 42.6, environmentalScore: 37.4, socialScore: 44.8, governanceScore: 46.2, nationalRank: 20 },
  { sectorId: 15, year: 'FY2022-23', esgScore: 59.4, environmentalScore: 61.2, socialScore: 55.1, governanceScore: 61.2, nationalRank: 5 },
  { sectorId: 16, year: 'FY2022-23', esgScore: 61.8, environmentalScore: 63.4, socialScore: 58.6, governanceScore: 62.8, nationalRank: 3 },
  { sectorId: 17, year: 'FY2022-23', esgScore: 65.2, environmentalScore: 69.1, socialScore: 59.8, governanceScore: 65.4, nationalRank: 1 },
  { sectorId: 18, year: 'FY2022-23', esgScore: 43.6, environmentalScore: 40.8, socialScore: 45.2, governanceScore: 45.1, nationalRank: 19 },
  { sectorId: 19, year: 'FY2022-23', esgScore: 50.1, environmentalScore: 44.5, socialScore: 53.6, governanceScore: 52.8, nationalRank: 12 },
  { sectorId: 20, year: 'FY2022-23', esgScore: 57.1, environmentalScore: 52.4, socialScore: 59.6, governanceScore: 59.8, nationalRank: 6 },
  { sectorId: 21, year: 'FY2022-23', esgScore: 46.8, environmentalScore: 45.2, socialScore: 46.5, governanceScore: 49.1, nationalRank: 16 },
  { sectorId: 22, year: 'FY2022-23', esgScore: 43.2, environmentalScore: 45.6, socialScore: 40.4, governanceScore: 43.1, nationalRank: 21 },
];

export function getScoresForSector(sectorId: number): ESGScore[] {
  return esgScores.filter(s => s.sectorId === sectorId);
}

export function getCurrentScores(): ESGScore[] {
  return esgScores.filter(s => s.year === 'FY2024-25');
}

export function getNationalAverage(year: string = 'FY2024-25'): { esg: number; environmental: number; social: number; governance: number } {
  const yearScores = esgScores.filter(s => s.year === year);
  const count = yearScores.length;
  return {
    esg: Math.round((yearScores.reduce((sum, s) => sum + s.esgScore, 0) / count) * 10) / 10,
    environmental: Math.round((yearScores.reduce((sum, s) => sum + s.environmentalScore, 0) / count) * 10) / 10,
    social: Math.round((yearScores.reduce((sum, s) => sum + s.socialScore, 0) / count) * 10) / 10,
    governance: Math.round((yearScores.reduce((sum, s) => sum + s.governanceScore, 0) / count) * 10) / 10,
  };
}
