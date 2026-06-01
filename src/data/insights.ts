// ============================================================
// AI-Generated Insights — Key findings from BRSR 2026 synthesis
// ============================================================
import { InsightItem } from '@/lib/types';

export const insights: InsightItem[] = [
  {
    id: 'insight-1',
    title: 'Policy–Practice Divide: India\'s Core ESG Challenge',
    description: 'Policy adoption rates exceed 94–99% across all ESG dimensions, but only 3–12% of companies achieve best-practice performance outcomes. The gap between policy formalisation and operational delivery is the defining structural weakness.',
    severity: 'critical',
    pillar: 'overall',
    source: 'Chapter 24 — Synthesis & Conclusions'
  },
  {
    id: 'insight-2',
    title: 'Renewable Energy Transition Stalled at 5.6% Median',
    description: 'Sector median renewable energy share stands at just 5.6% of total energy consumption. Despite near-universal policy commitment to clean energy, actual deployment remains critically low across most sectors.',
    severity: 'critical',
    pillar: 'environmental',
    source: 'Chapter 7 — Energy Management (E4)'
  },
  {
    id: 'insight-3',
    title: 'Biodiversity Disclosure: 75.97% Have Zero Credible Reporting',
    description: '668 companies (68.02%) provide no substantive response on biodiversity, and 78 (7.94%) are declarative only. Only 33 companies (3.36%) achieve best-practice disclosure quality.',
    severity: 'critical',
    pillar: 'environmental',
    source: 'Chapter 8 — Biodiversity & Climate Adaptation (E5)'
  },
  {
    id: 'insight-4',
    title: 'Gender Pay Gap Persists Across All 22 Sectors',
    description: 'Female Board-of-Director median salaries are lower than male in every single sector. Gender pay equity at the leadership level remains unaddressed despite widespread diversity policy adoption.',
    severity: 'warning',
    pillar: 'social',
    source: 'Chapter 23 — Executive Compensation (G7)'
  },
  {
    id: 'insight-5',
    title: 'Supply Chain Accountability at Structural Low',
    description: 'Only 16.5% of companies have a preferential procurement policy, and value chain environmental assessment exceeds 80% coverage for only 9.88% of companies. Supply chain ESG governance is effectively absent.',
    severity: 'critical',
    pillar: 'social',
    source: 'Chapter 14 — Supply Chain Management (S5)'
  },
  {
    id: 'insight-6',
    title: 'Power Sector Leads Environmental Performance',
    description: 'Power sector achieves the highest ESG score (72.6) driven by regulatory scrutiny, 25% best-practice biodiversity disclosure rate, and highest renewable energy adoption at 22.4%.',
    severity: 'positive',
    pillar: 'environmental',
    source: 'Cross-sector Environmental Analysis'
  },
  {
    id: 'insight-7',
    title: 'IT Sector Demonstrates Strongest Governance',
    description: 'Information Technology sector leads governance with 74.1 score, driven by highest board independence (62.8%), strongest ethics disclosure (82.6), and best data privacy practices (78.4).',
    severity: 'positive',
    pillar: 'governance',
    source: 'Cross-sector Governance Analysis'
  },
  {
    id: 'insight-8',
    title: 'Healthcare Turnover Crisis: 31.5% Male, 32.1% Female',
    description: 'Healthcare and Chemicals sectors show the highest employee turnover rates, indicating structural retention challenges driven by demand-supply dynamics and workforce management gaps.',
    severity: 'warning',
    pillar: 'social',
    source: 'Chapter 13 — Employee Engagement (S4)'
  },
  {
    id: 'insight-9',
    title: 'External Assurance Below Global Benchmarks',
    description: 'Independent external assurance remains below 40% across all environmental themes — water (37.58%), waste (35.85%), and GHG emissions (37.4%) — well below international standards.',
    severity: 'warning',
    pillar: 'governance',
    source: 'Chapter 24 — Synthesis & Conclusions'
  },
  {
    id: 'insight-10',
    title: '80% of Companies Report Near Ecologically Sensitive Areas',
    description: '786 of 982 companies (80.04%) report operations near ecologically sensitive areas, confirming biodiversity risk is broadly material and not sector-specific.',
    severity: 'notable',
    pillar: 'environmental',
    source: 'Chapter 8 — Biodiversity & Climate Adaptation (E5)'
  },
];

// Sector-specific strengths and weaknesses derived from PDF
export const sectorInsights: Record<string, { strengths: string[]; weaknesses: string[] }> = {
  'automobile-auto-components': {
    strengths: ['Strong policy adoption for environmental stewardship', 'Improving waste recycling rates (62.4%)', 'Board-approved ESG policies at 94%+'],
    weaknesses: ['Low renewable energy adoption (8.2%)', 'Limited supply chain ESG assessment', 'Gender diversity below 15%']
  },
  'capital-goods': {
    strengths: ['Large sector with 153 companies driving industry standards', 'Moderate governance score improvements', 'Growing environmental policy adoption'],
    weaknesses: ['Below-average ESG score (55.8)', 'Weak biodiversity disclosure (62.7% no response)', 'Low renewable energy share (5.1%)']
  },
  'chemicals': {
    strengths: ['Above-average environmental score due to regulatory compliance', 'Strong ethics and transparency policies', 'Improving waste management practices'],
    weaknesses: ['Highest employee turnover (28.9% male, 31.0% female)', 'High GHG emission intensity', 'High water intensity (8.2)']
  },
  'construction': {
    strengths: ['Improving governance framework adoption', 'Moderate employee retention rates', 'Growing awareness of environmental reporting'],
    weaknesses: ['Low overall ESG score (53.1)', 'Highest safety incident rates in sector', 'Very low renewable energy adoption (3.4%)']
  },
  'construction-materials': {
    strengths: ['High environmental materiality awareness', 'Above-average waste recycling (55.6%)', 'Improving resource efficiency'],
    weaknesses: ['High GHG emission intensity (1.24)', 'Limited biodiversity best-practice (0%)', 'Small sector limits benchmarking depth']
  },
  'consumer-durables': {
    strengths: ['Above-average gender diversity (14.2%)', 'Low safety incident rate', 'Growing data privacy awareness'],
    weaknesses: ['Weak biodiversity disclosure (75.4% no response)', 'Low environmental scores overall', 'Limited supply chain accountability']
  },
  'consumer-services': {
    strengths: ['Highest gender diversity among traditional sectors (28.4%)', 'Low safety incidents', 'Strong community engagement'],
    weaknesses: ['Below-average environmental performance', 'Limited waste management sophistication', 'Low renewable energy adoption']
  },
  'diversified': {
    strengths: ['Diverse business portfolios enable cross-sector learning', 'Moderate turnover rates'],
    weaknesses: ['Lowest ESG score (45.2) among all sectors', 'Only 4 companies — limited data representativeness', 'Weakest governance scores']
  },
  'fmcg': {
    strengths: ['Strong community engagement scores', 'Above-average renewable energy (9.4%)', 'Good supply chain management'],
    weaknesses: ['Moderate environmental footprint from packaging', 'Water intensity challenges', 'Target quality predominantly aspirational']
  },
  'financial-services': {
    strengths: ['Strongest governance architecture (67.3)', 'Highest data privacy scores', 'Robust anti-corruption frameworks'],
    weaknesses: ['Weakest environmental score (42.1) — 0% biodiversity best-practice', 'Highest non-response rates on environmental indicators', 'High employee turnover (24.6%)']
  },
  'forest-materials': {
    strengths: ['High water and resource intensity awareness', 'Environmental materiality recognition'],
    weaknesses: ['Only 4 companies — limited benchmarking', 'Below-average social metrics', 'Weak governance infrastructure']
  },
  'healthcare': {
    strengths: ['High gender diversity (24.6%)', 'Strong community health engagement', 'Good data privacy practices'],
    weaknesses: ['Highest employee turnover rates (31.5% M, 32.1% F)', 'Moderate environmental performance', 'Biomedical waste management challenges']
  },
  'information-technology': {
    strengths: ['Highest governance score (74.1)', 'Best gender diversity (34.8%)', 'Strongest data privacy (78.4)', 'Highest renewable energy in services (18.6%)'],
    weaknesses: ['Low environmental materiality beyond energy', 'Limited supply chain physical footprint assessment', 'Moderate waste management']
  },
  'media-entertainment': {
    strengths: ['High gender diversity (26.2%)', 'Low environmental footprint', 'Good workplace safety'],
    weaknesses: ['Below-average ESG score (49.7)', 'Weak environmental disclosure', 'Limited sustainability target-setting']
  },
  'metals-mining': {
    strengths: ['Highest biodiversity best-practice rate (13%)', 'Strong waste recycling (68.4%)', 'Robust governance from regulatory pressure'],
    weaknesses: ['Highest GHG emission intensity', 'Highest safety incident rates', 'Lowest gender diversity (6.4%)']
  },
  'oil-gas': {
    strengths: ['Strong ESG score (69.1) driven by regulatory compliance', 'High waste recycling rates', 'Robust risk management'],
    weaknesses: ['Highest overall emission intensity (2.14)', 'Water-intensive operations', 'Transition risk exposure']
  },
  'power': {
    strengths: ['Highest ESG score (72.6)', 'Best renewable energy adoption (22.4%)', 'Highest biodiversity best-practice (25%)', 'Strongest environmental governance'],
    weaknesses: ['Highest GHG absolute emissions', 'Water-intensive thermal operations', 'High employee turnover (22.2%)']
  },
  'realty': {
    strengths: ['Growing green building initiatives', 'Moderate gender diversity (16.8%)', 'Community engagement focus'],
    weaknesses: ['Low overall ESG score (51.2)', 'Weak environmental metrics', 'Limited supply chain oversight']
  },
  'services': {
    strengths: ['Good gender diversity (20.4%)', 'Strong data privacy awareness', 'Moderate governance scores'],
    weaknesses: ['Average environmental performance', 'High employee turnover (22.2%)', 'Limited manufacturing footprint assessment']
  },
  'telecommunication': {
    strengths: ['Strong data privacy governance', 'Above-average renewable energy (14.8%)', 'Good governance scores'],
    weaknesses: ['E-waste management challenges', 'Moderate environmental performance', 'Infrastructure energy intensity']
  },
  'textiles': {
    strengths: ['Good gender diversity (22.8%)', 'Water management awareness', 'Moderate governance framework'],
    weaknesses: ['High employee turnover (26.5% M, 27.6% F)', 'Moderate environmental performance', 'Low renewable energy adoption (5.4%)']
  },
  'utilities': {
    strengths: ['Environmental materiality awareness', 'Waste management focus', 'Growing regulatory compliance'],
    weaknesses: ['Low overall ESG score (50.3)', 'Only 4 companies', 'Weak governance infrastructure']
  },
};
