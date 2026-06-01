-- ============================================================
-- India ESG Benchmark Dashboard — PostgreSQL Schema
-- For production deployment
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. Sectors Table
-- ============================================================
CREATE TABLE sectors (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  company_count INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sectors_slug ON sectors(slug);
CREATE INDEX idx_sectors_code ON sectors(code);

-- ============================================================
-- 2. ESG Scores Table
-- ============================================================
CREATE TABLE esg_scores (
  id SERIAL PRIMARY KEY,
  sector_id INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  year VARCHAR(20) NOT NULL,
  esg_score DECIMAL(5,2) NOT NULL,
  environmental_score DECIMAL(5,2) NOT NULL,
  social_score DECIMAL(5,2) NOT NULL,
  governance_score DECIMAL(5,2) NOT NULL,
  national_rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sector_id, year)
);

CREATE INDEX idx_esg_scores_sector_year ON esg_scores(sector_id, year);
CREATE INDEX idx_esg_scores_year ON esg_scores(year);

-- ============================================================
-- 3. Environmental Metrics Table (E1-E7)
-- ============================================================
CREATE TABLE environmental_metrics (
  id SERIAL PRIMARY KEY,
  sector_id INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  year VARCHAR(20) NOT NULL,
  -- E1: GHG Emissions
  ghg_emission_intensity DECIMAL(10,4),
  scope1_emissions DECIMAL(15,2),
  scope2_emissions DECIMAL(15,2),
  scope3_emissions DECIMAL(15,2),
  -- E2: Air Quality
  air_quality_score DECIMAL(5,2),
  nox_emissions DECIMAL(10,2),
  sox_emissions DECIMAL(10,2),
  -- E3: Water Management
  water_intensity DECIMAL(10,4),
  water_withdrawal DECIMAL(15,2),
  water_recycled_pct DECIMAL(5,2),
  -- E4: Energy Management
  renewable_energy_pct DECIMAL(5,2),
  total_energy_gj DECIMAL(15,2),
  energy_intensity DECIMAL(10,4),
  -- E5: Biodiversity
  biodiversity_score DECIMAL(5,2),
  operations_near_sensitive_areas BOOLEAN DEFAULT FALSE,
  -- E6: Waste Management
  waste_recycled_pct DECIMAL(5,2),
  hazardous_waste_tonnes DECIMAL(15,2),
  plastic_waste_tonnes DECIMAL(15,2),
  -- E7: Resource Efficiency
  resource_efficiency_score DECIMAL(5,2),
  rd_env_allocation_pct DECIMAL(5,2),
  capex_env_allocation_pct DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sector_id, year)
);

CREATE INDEX idx_env_metrics_sector_year ON environmental_metrics(sector_id, year);

-- ============================================================
-- 4. Social Metrics Table (S1-S7)
-- ============================================================
CREATE TABLE social_metrics (
  id SERIAL PRIMARY KEY,
  sector_id INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  year VARCHAR(20) NOT NULL,
  -- S1: Human Rights
  human_rights_score DECIMAL(5,2),
  human_rights_policy_pct DECIMAL(5,2),
  -- S2: Labour Practices
  employee_turnover_rate_male DECIMAL(5,2),
  employee_turnover_rate_female DECIMAL(5,2),
  worker_turnover_rate_male DECIMAL(5,2),
  worker_turnover_rate_female DECIMAL(5,2),
  -- S3: Health & Safety
  safety_incident_rate DECIMAL(5,4),
  trir DECIMAL(5,4),
  ltir DECIMAL(5,4),
  ohs_policy_pct DECIMAL(5,2),
  -- S4: Diversity & Inclusion
  gender_diversity_pct DECIMAL(5,2),
  female_board_pct DECIMAL(5,2),
  return_to_work_rate_female DECIMAL(5,2),
  -- S5: Supply Chain
  supply_chain_score DECIMAL(5,2),
  value_chain_assessment_pct DECIMAL(5,2),
  preferential_procurement_pct DECIMAL(5,2),
  -- S6: Data Privacy
  data_privacy_score DECIMAL(5,2),
  data_breaches INTEGER DEFAULT 0,
  -- S7: Community
  community_score DECIMAL(5,2),
  csr_spend DECIMAL(15,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sector_id, year)
);

CREATE INDEX idx_social_metrics_sector_year ON social_metrics(sector_id, year);

-- ============================================================
-- 5. Governance Metrics Table (G1-G7)
-- ============================================================
CREATE TABLE governance_metrics (
  id SERIAL PRIMARY KEY,
  sector_id INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  year VARCHAR(20) NOT NULL,
  -- G1: Anti-Corruption
  anti_corruption_score DECIMAL(5,2),
  anti_corruption_policy_pct DECIMAL(5,2),
  anti_corruption_training_pct DECIMAL(5,2),
  -- G2: Business Ethics
  ethics_score DECIMAL(5,2),
  ethics_policy_pct DECIMAL(5,2),
  whistleblower_mechanism BOOLEAN DEFAULT FALSE,
  -- G3: Competitive Behaviour
  competitive_behaviour_score DECIMAL(5,2),
  competition_policy_pct DECIMAL(5,2),
  -- G4: Risk Management
  risk_management_score DECIMAL(5,2),
  bcp_dr_plan_pct DECIMAL(5,2),
  -- G5: Board Structure
  board_independence_pct DECIMAL(5,2),
  board_sustainability_committee BOOLEAN DEFAULT FALSE,
  board_training_coverage_pct DECIMAL(5,2),
  -- G6: Stakeholder Engagement
  stakeholder_score DECIMAL(5,2),
  stakeholder_engagement_frequency VARCHAR(50),
  -- G7: Executive Compensation
  compensation_fairness_score DECIMAL(5,2),
  gender_pay_gap_board DECIMAL(5,2),
  external_assurance_pct DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sector_id, year)
);

CREATE INDEX idx_gov_metrics_sector_year ON governance_metrics(sector_id, year);

-- ============================================================
-- 6. Yearly Benchmarks Table
-- ============================================================
CREATE TABLE yearly_benchmarks (
  id SERIAL PRIMARY KEY,
  year VARCHAR(20) NOT NULL,
  metric_name VARCHAR(100) NOT NULL,
  national_avg DECIMAL(10,4),
  top_quartile DECIMAL(10,4),
  bottom_quartile DECIMAL(10,4),
  median_value DECIMAL(10,4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(year, metric_name)
);

CREATE INDEX idx_benchmarks_year ON yearly_benchmarks(year);

-- ============================================================
-- Views for common queries
-- ============================================================

-- Sector rankings view
CREATE VIEW sector_rankings AS
SELECT
  s.id,
  s.name,
  s.slug,
  s.code,
  s.company_count,
  e.esg_score,
  e.environmental_score,
  e.social_score,
  e.governance_score,
  e.national_rank,
  e.year
FROM sectors s
JOIN esg_scores e ON s.id = e.sector_id
ORDER BY e.esg_score DESC;

-- Latest scores view
CREATE VIEW latest_scores AS
SELECT * FROM sector_rankings
WHERE year = 'FY2024-25';
