// ============================================================
// Governance Metrics — G1-G7 parameters from BRSR 2026
// ============================================================
import { GovernanceMetrics } from '@/lib/types';

export const governanceMetrics: GovernanceMetrics[] = [
  // FY 2024-25
  { sectorId: 1, year: 'FY2024-25', boardIndependencePct: 52.4, antiCorruptionScore: 68.2, ethicsScore: 72.4, riskManagementScore: 64.8, stakeholderScore: 58.6, compensationFairnessScore: 52.4, competitiveBehaviourScore: 62.8 },
  { sectorId: 2, year: 'FY2024-25', boardIndependencePct: 50.8, antiCorruptionScore: 62.4, ethicsScore: 68.6, riskManagementScore: 58.2, stakeholderScore: 54.8, compensationFairnessScore: 48.6, competitiveBehaviourScore: 58.4 },
  { sectorId: 3, year: 'FY2024-25', boardIndependencePct: 54.2, antiCorruptionScore: 66.8, ethicsScore: 74.2, riskManagementScore: 62.4, stakeholderScore: 56.4, compensationFairnessScore: 54.8, competitiveBehaviourScore: 64.6 },
  { sectorId: 4, year: 'FY2024-25', boardIndependencePct: 48.6, antiCorruptionScore: 58.4, ethicsScore: 64.8, riskManagementScore: 54.6, stakeholderScore: 50.2, compensationFairnessScore: 46.4, competitiveBehaviourScore: 56.2 },
  { sectorId: 5, year: 'FY2024-25', boardIndependencePct: 52.8, antiCorruptionScore: 64.6, ethicsScore: 72.8, riskManagementScore: 60.4, stakeholderScore: 56.8, compensationFairnessScore: 52.6, competitiveBehaviourScore: 62.4 },
  { sectorId: 6, year: 'FY2024-25', boardIndependencePct: 48.2, antiCorruptionScore: 58.8, ethicsScore: 62.4, riskManagementScore: 52.8, stakeholderScore: 48.6, compensationFairnessScore: 50.4, competitiveBehaviourScore: 54.8 },
  { sectorId: 7, year: 'FY2024-25', boardIndependencePct: 50.4, antiCorruptionScore: 60.2, ethicsScore: 66.8, riskManagementScore: 56.4, stakeholderScore: 52.4, compensationFairnessScore: 48.2, competitiveBehaviourScore: 58.6 },
  { sectorId: 8, year: 'FY2024-25', boardIndependencePct: 44.8, antiCorruptionScore: 52.4, ethicsScore: 56.8, riskManagementScore: 46.2, stakeholderScore: 42.8, compensationFairnessScore: 44.6, competitiveBehaviourScore: 48.4 },
  { sectorId: 9, year: 'FY2024-25', boardIndependencePct: 54.6, antiCorruptionScore: 66.4, ethicsScore: 74.6, riskManagementScore: 62.8, stakeholderScore: 58.4, compensationFairnessScore: 54.2, competitiveBehaviourScore: 64.2 },
  { sectorId: 10, year: 'FY2024-25', boardIndependencePct: 58.4, antiCorruptionScore: 72.8, ethicsScore: 78.4, riskManagementScore: 68.2, stakeholderScore: 64.6, compensationFairnessScore: 56.8, competitiveBehaviourScore: 68.8 },
  { sectorId: 11, year: 'FY2024-25', boardIndependencePct: 42.6, antiCorruptionScore: 50.4, ethicsScore: 54.6, riskManagementScore: 44.8, stakeholderScore: 40.2, compensationFairnessScore: 42.8, competitiveBehaviourScore: 46.8 },
  { sectorId: 12, year: 'FY2024-25', boardIndependencePct: 52.4, antiCorruptionScore: 64.2, ethicsScore: 70.8, riskManagementScore: 60.4, stakeholderScore: 56.2, compensationFairnessScore: 50.6, competitiveBehaviourScore: 62.4 },
  { sectorId: 13, year: 'FY2024-25', boardIndependencePct: 62.8, antiCorruptionScore: 78.4, ethicsScore: 82.6, riskManagementScore: 74.2, stakeholderScore: 68.4, compensationFairnessScore: 62.4, competitiveBehaviourScore: 72.8 },
  { sectorId: 14, year: 'FY2024-25', boardIndependencePct: 46.8, antiCorruptionScore: 56.4, ethicsScore: 62.8, riskManagementScore: 52.4, stakeholderScore: 46.8, compensationFairnessScore: 44.8, competitiveBehaviourScore: 54.2 },
  { sectorId: 15, year: 'FY2024-25', boardIndependencePct: 56.4, antiCorruptionScore: 72.4, ethicsScore: 76.8, riskManagementScore: 66.4, stakeholderScore: 62.8, compensationFairnessScore: 58.6, competitiveBehaviourScore: 68.4 },
  { sectorId: 16, year: 'FY2024-25', boardIndependencePct: 58.8, antiCorruptionScore: 74.6, ethicsScore: 78.2, riskManagementScore: 70.2, stakeholderScore: 66.4, compensationFairnessScore: 60.4, competitiveBehaviourScore: 70.6 },
  { sectorId: 17, year: 'FY2024-25', boardIndependencePct: 60.2, antiCorruptionScore: 76.8, ethicsScore: 80.4, riskManagementScore: 72.8, stakeholderScore: 68.6, compensationFairnessScore: 62.8, competitiveBehaviourScore: 72.4 },
  { sectorId: 18, year: 'FY2024-25', boardIndependencePct: 46.4, antiCorruptionScore: 56.2, ethicsScore: 62.4, riskManagementScore: 50.8, stakeholderScore: 48.4, compensationFairnessScore: 46.2, competitiveBehaviourScore: 52.8 },
  { sectorId: 19, year: 'FY2024-25', boardIndependencePct: 52.6, antiCorruptionScore: 64.8, ethicsScore: 72.4, riskManagementScore: 60.2, stakeholderScore: 56.8, compensationFairnessScore: 52.4, competitiveBehaviourScore: 62.8 },
  { sectorId: 20, year: 'FY2024-25', boardIndependencePct: 56.8, antiCorruptionScore: 72.2, ethicsScore: 76.4, riskManagementScore: 66.8, stakeholderScore: 62.4, compensationFairnessScore: 58.2, competitiveBehaviourScore: 68.2 },
  { sectorId: 21, year: 'FY2024-25', boardIndependencePct: 48.4, antiCorruptionScore: 60.4, ethicsScore: 66.4, riskManagementScore: 54.8, stakeholderScore: 50.6, compensationFairnessScore: 48.8, competitiveBehaviourScore: 58.6 },
  { sectorId: 22, year: 'FY2024-25', boardIndependencePct: 44.2, antiCorruptionScore: 54.6, ethicsScore: 58.2, riskManagementScore: 48.4, stakeholderScore: 44.6, compensationFairnessScore: 44.2, competitiveBehaviourScore: 50.4 },
];

export function getGovernanceForSector(sectorId: number): GovernanceMetrics[] {
  return governanceMetrics.filter(m => m.sectorId === sectorId);
}
