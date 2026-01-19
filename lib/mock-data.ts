import { Project, Phase, Risk, EVMMetrics, Activity } from '@/types/construction'

// Project Lifecycle Stages (Control Points)
export interface ProjectStage {
  id: string
  projectId: string
  name: string
  status: 'completed' | 'in-progress' | 'upcoming'
  plannedCost: number
  actualCost: number
  plannedDuration: number // in days
  actualDuration: number | null
  startDate: string
  endDate: string | null
  costVariance: number // percentage
  scheduleVariance: number // percentage
  lcaCarbonKg: number // Life Cycle Assessment - carbon footprint
}

export const projectStages: ProjectStage[] = [
  // Downtown Office Tower stages
  { id: 'stage-1-1', projectId: 'proj-1', name: 'Preliminary Design', status: 'completed', plannedCost: 1800000, actualCost: 1650000, plannedDuration: 45, actualDuration: 42, startDate: '2025-03-01', endDate: '2025-04-12', costVariance: 8.3, scheduleVariance: 6.7, lcaCarbonKg: 15000 },
  { id: 'stage-1-2', projectId: 'proj-1', name: 'Design Development', status: 'completed', plannedCost: 3200000, actualCost: 3450000, plannedDuration: 60, actualDuration: 68, startDate: '2025-04-13', endDate: '2025-06-20', costVariance: -7.8, scheduleVariance: -13.3, lcaCarbonKg: 22000 },
  { id: 'stage-1-3', projectId: 'proj-1', name: 'Construction Documents', status: 'completed', plannedCost: 2500000, actualCost: 2400000, plannedDuration: 45, actualDuration: 40, startDate: '2025-06-21', endDate: '2025-07-31', costVariance: 4.0, scheduleVariance: 11.1, lcaCarbonKg: 8000 },
  { id: 'stage-1-4', projectId: 'proj-1', name: 'Construction', status: 'in-progress', plannedCost: 35000000, actualCost: 11000000, plannedDuration: 365, actualDuration: null, startDate: '2025-08-01', endDate: null, costVariance: -2.5, scheduleVariance: -5.0, lcaCarbonKg: 2850000 },
  { id: 'stage-1-5', projectId: 'proj-1', name: 'Closeout', status: 'upcoming', plannedCost: 2500000, actualCost: 0, plannedDuration: 30, actualDuration: null, startDate: '2026-08-01', endDate: null, costVariance: 0, scheduleVariance: 0, lcaCarbonKg: 5000 },

  // Riverside Residential Complex stages
  { id: 'stage-2-1', projectId: 'proj-2', name: 'Preliminary Design', status: 'completed', plannedCost: 1200000, actualCost: 1180000, plannedDuration: 40, actualDuration: 38, startDate: '2025-06-15', endDate: '2025-07-23', costVariance: 1.7, scheduleVariance: 5.0, lcaCarbonKg: 12000 },
  { id: 'stage-2-2', projectId: 'proj-2', name: 'Design Development', status: 'completed', plannedCost: 2200000, actualCost: 2350000, plannedDuration: 55, actualDuration: 62, startDate: '2025-07-24', endDate: '2025-09-24', costVariance: -6.8, scheduleVariance: -12.7, lcaCarbonKg: 18000 },
  { id: 'stage-2-3', projectId: 'proj-2', name: 'Construction Documents', status: 'completed', plannedCost: 1800000, actualCost: 1750000, plannedDuration: 35, actualDuration: 33, startDate: '2025-09-25', endDate: '2025-10-28', costVariance: 2.8, scheduleVariance: 5.7, lcaCarbonKg: 6000 },
  { id: 'stage-2-4', projectId: 'proj-2', name: 'Construction', status: 'in-progress', plannedCost: 25000000, actualCost: 2920000, plannedDuration: 420, actualDuration: null, startDate: '2025-10-29', endDate: null, costVariance: 1.2, scheduleVariance: -3.5, lcaCarbonKg: 1950000 },
  { id: 'stage-2-5', projectId: 'proj-2', name: 'Closeout', status: 'upcoming', plannedCost: 1800000, actualCost: 0, plannedDuration: 30, actualDuration: null, startDate: '2027-02-01', endDate: null, costVariance: 0, scheduleVariance: 0, lcaCarbonKg: 4000 },

  // Industrial Distribution Center stages
  { id: 'stage-3-1', projectId: 'proj-3', name: 'Preliminary Design', status: 'in-progress', plannedCost: 600000, actualCost: 350000, plannedDuration: 30, actualDuration: null, startDate: '2025-11-15', endDate: null, costVariance: 2.5, scheduleVariance: 0, lcaCarbonKg: 8000 },
  { id: 'stage-3-2', projectId: 'proj-3', name: 'Design Development', status: 'upcoming', plannedCost: 900000, actualCost: 0, plannedDuration: 40, actualDuration: null, startDate: '2026-01-01', endDate: null, costVariance: 0, scheduleVariance: 0, lcaCarbonKg: 12000 },
  { id: 'stage-3-3', projectId: 'proj-3', name: 'Construction Documents', status: 'upcoming', plannedCost: 700000, actualCost: 0, plannedDuration: 30, actualDuration: null, startDate: '2026-02-15', endDate: null, costVariance: 0, scheduleVariance: 0, lcaCarbonKg: 5000 },
  { id: 'stage-3-4', projectId: 'proj-3', name: 'Construction', status: 'upcoming', plannedCost: 15500000, actualCost: 0, plannedDuration: 240, actualDuration: null, startDate: '2026-04-01', endDate: null, costVariance: 0, scheduleVariance: 0, lcaCarbonKg: 1200000 },
  { id: 'stage-3-5', projectId: 'proj-3', name: 'Closeout', status: 'upcoming', plannedCost: 800000, actualCost: 0, plannedDuration: 20, actualDuration: null, startDate: '2026-12-01', endDate: null, costVariance: 0, scheduleVariance: 0, lcaCarbonKg: 3000 },

  // Central Hospital Expansion stages
  { id: 'stage-4-1', projectId: 'proj-4', name: 'Preliminary Design', status: 'completed', plannedCost: 2500000, actualCost: 2650000, plannedDuration: 50, actualDuration: 55, startDate: '2025-01-15', endDate: '2025-03-11', costVariance: -6.0, scheduleVariance: -10.0, lcaCarbonKg: 20000 },
  { id: 'stage-4-2', projectId: 'proj-4', name: 'Design Development', status: 'completed', plannedCost: 4200000, actualCost: 4500000, plannedDuration: 70, actualDuration: 78, startDate: '2025-03-12', endDate: '2025-05-29', costVariance: -7.1, scheduleVariance: -11.4, lcaCarbonKg: 28000 },
  { id: 'stage-4-3', projectId: 'proj-4', name: 'Construction Documents', status: 'completed', plannedCost: 3500000, actualCost: 3400000, plannedDuration: 50, actualDuration: 48, startDate: '2025-05-30', endDate: '2025-07-17', costVariance: 2.9, scheduleVariance: 4.0, lcaCarbonKg: 10000 },
  { id: 'stage-4-4', projectId: 'proj-4', name: 'Construction', status: 'in-progress', plannedCost: 52000000, actualCost: 11450000, plannedDuration: 300, actualDuration: null, startDate: '2025-07-18', endDate: null, costVariance: -8.5, scheduleVariance: -15.0, lcaCarbonKg: 4500000 },
  { id: 'stage-4-5', projectId: 'proj-4', name: 'Closeout', status: 'upcoming', plannedCost: 2800000, actualCost: 0, plannedDuration: 30, actualDuration: null, startDate: '2026-05-15', endDate: null, costVariance: 0, scheduleVariance: 0, lcaCarbonKg: 6000 },
]

// Helper to get stages for a project
export function getStagesByProject(projectId: string): ProjectStage[] {
  return projectStages.filter(s => s.projectId === projectId)
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Downtown Office Tower',
    client: 'Metro Commercial Group',
    status: 'in-progress',
    startDate: '2025-03-01',
    endDate: '2026-08-31',
    budget: 45000000,
    actualCost: 18500000,
    percentComplete: 42,
    description: '25-story Class A office building with underground parking'
  },
  {
    id: 'proj-2',
    name: 'Riverside Residential Complex',
    client: 'Horizon Developments',
    status: 'in-progress',
    startDate: '2025-06-15',
    endDate: '2027-02-28',
    budget: 32000000,
    actualCost: 8200000,
    percentComplete: 28,
    description: 'Mixed-use residential with 180 units and retail space'
  },
  {
    id: 'proj-3',
    name: 'Industrial Distribution Center',
    client: 'LogiPro Warehousing',
    status: 'planning',
    startDate: '2026-02-01',
    endDate: '2026-12-15',
    budget: 18500000,
    actualCost: 450000,
    percentComplete: 5,
    description: '250,000 sq ft warehouse with automated systems'
  },
  {
    id: 'proj-4',
    name: 'Central Hospital Expansion',
    client: 'Regional Health Authority',
    status: 'on-hold',
    startDate: '2025-01-15',
    endDate: '2026-06-30',
    budget: 65000000,
    actualCost: 22000000,
    percentComplete: 35,
    description: 'New surgical wing and patient care facilities'
  }
]

export const phases: Phase[] = [
  // Downtown Office Tower phases
  { id: 'phase-1-1', projectId: 'proj-1', name: 'Design & Engineering', status: 'completed', plannedStart: '2025-03-01', plannedEnd: '2025-05-31', actualStart: '2025-03-01', actualEnd: '2025-06-10', percentComplete: 100, order: 1 },
  { id: 'phase-1-2', projectId: 'proj-1', name: 'Permits & Approvals', status: 'completed', plannedStart: '2025-04-15', plannedEnd: '2025-06-30', actualStart: '2025-04-20', actualEnd: '2025-07-15', percentComplete: 100, order: 2 },
  { id: 'phase-1-3', projectId: 'proj-1', name: 'Site Preparation', status: 'completed', plannedStart: '2025-07-01', plannedEnd: '2025-08-15', actualStart: '2025-07-16', actualEnd: '2025-08-30', percentComplete: 100, order: 3 },
  { id: 'phase-1-4', projectId: 'proj-1', name: 'Foundation', status: 'completed', plannedStart: '2025-08-16', plannedEnd: '2025-10-31', actualStart: '2025-09-01', actualEnd: '2025-11-15', percentComplete: 100, order: 4 },
  { id: 'phase-1-5', projectId: 'proj-1', name: 'Structural Framing', status: 'in-progress', plannedStart: '2025-11-01', plannedEnd: '2026-03-31', actualStart: '2025-11-16', percentComplete: 65, order: 5 },
  { id: 'phase-1-6', projectId: 'proj-1', name: 'MEP Rough-In', status: 'in-progress', plannedStart: '2026-01-15', plannedEnd: '2026-05-15', actualStart: '2026-01-20', percentComplete: 25, order: 6 },
  { id: 'phase-1-7', projectId: 'proj-1', name: 'Exterior Envelope', status: 'pending', plannedStart: '2026-04-01', plannedEnd: '2026-06-30', percentComplete: 0, order: 7 },
  { id: 'phase-1-8', projectId: 'proj-1', name: 'Interior Finishes', status: 'pending', plannedStart: '2026-05-15', plannedEnd: '2026-08-15', percentComplete: 0, order: 8 },

  // Riverside Residential Complex phases
  { id: 'phase-2-1', projectId: 'proj-2', name: 'Design & Engineering', status: 'completed', plannedStart: '2025-06-15', plannedEnd: '2025-08-31', actualStart: '2025-06-15', actualEnd: '2025-09-10', percentComplete: 100, order: 1 },
  { id: 'phase-2-2', projectId: 'proj-2', name: 'Permits & Approvals', status: 'completed', plannedStart: '2025-08-01', plannedEnd: '2025-10-15', actualStart: '2025-08-05', actualEnd: '2025-10-28', percentComplete: 100, order: 2 },
  { id: 'phase-2-3', projectId: 'proj-2', name: 'Site Preparation', status: 'completed', plannedStart: '2025-10-16', plannedEnd: '2025-11-30', actualStart: '2025-10-30', actualEnd: '2025-12-15', percentComplete: 100, order: 3 },
  { id: 'phase-2-4', projectId: 'proj-2', name: 'Foundation', status: 'in-progress', plannedStart: '2025-12-01', plannedEnd: '2026-02-28', actualStart: '2025-12-16', percentComplete: 55, order: 4 },
  { id: 'phase-2-5', projectId: 'proj-2', name: 'Structural Framing', status: 'pending', plannedStart: '2026-03-01', plannedEnd: '2026-07-31', percentComplete: 0, order: 5 },
  { id: 'phase-2-6', projectId: 'proj-2', name: 'MEP Installation', status: 'pending', plannedStart: '2026-06-01', plannedEnd: '2026-10-31', percentComplete: 0, order: 6 },
  { id: 'phase-2-7', projectId: 'proj-2', name: 'Interior Finishes', status: 'pending', plannedStart: '2026-09-01', plannedEnd: '2027-01-31', percentComplete: 0, order: 7 },
  { id: 'phase-2-8', projectId: 'proj-2', name: 'Final Inspection', status: 'pending', plannedStart: '2027-02-01', plannedEnd: '2027-02-28', percentComplete: 0, order: 8 },

  // Industrial Distribution Center phases
  { id: 'phase-3-1', projectId: 'proj-3', name: 'Design & Engineering', status: 'in-progress', plannedStart: '2025-11-01', plannedEnd: '2026-01-31', actualStart: '2025-11-15', percentComplete: 75, order: 1 },
  { id: 'phase-3-2', projectId: 'proj-3', name: 'Permits & Approvals', status: 'pending', plannedStart: '2026-01-15', plannedEnd: '2026-03-15', percentComplete: 0, order: 2 },
  { id: 'phase-3-3', projectId: 'proj-3', name: 'Site Preparation', status: 'pending', plannedStart: '2026-03-16', plannedEnd: '2026-04-30', percentComplete: 0, order: 3 },
  { id: 'phase-3-4', projectId: 'proj-3', name: 'Foundation & Slab', status: 'pending', plannedStart: '2026-05-01', plannedEnd: '2026-06-30', percentComplete: 0, order: 4 },
  { id: 'phase-3-5', projectId: 'proj-3', name: 'Steel Erection', status: 'pending', plannedStart: '2026-07-01', plannedEnd: '2026-09-15', percentComplete: 0, order: 5 },
  { id: 'phase-3-6', projectId: 'proj-3', name: 'Building Envelope', status: 'pending', plannedStart: '2026-09-01', plannedEnd: '2026-10-31', percentComplete: 0, order: 6 },
  { id: 'phase-3-7', projectId: 'proj-3', name: 'Interior & Systems', status: 'pending', plannedStart: '2026-10-15', plannedEnd: '2026-12-01', percentComplete: 0, order: 7 },
  { id: 'phase-3-8', projectId: 'proj-3', name: 'Commissioning', status: 'pending', plannedStart: '2026-12-01', plannedEnd: '2026-12-15', percentComplete: 0, order: 8 },

  // Central Hospital Expansion phases
  { id: 'phase-4-1', projectId: 'proj-4', name: 'Design & Engineering', status: 'completed', plannedStart: '2025-01-15', plannedEnd: '2025-04-30', actualStart: '2025-01-15', actualEnd: '2025-05-15', percentComplete: 100, order: 1 },
  { id: 'phase-4-2', projectId: 'proj-4', name: 'Permits & Approvals', status: 'completed', plannedStart: '2025-03-15', plannedEnd: '2025-06-30', actualStart: '2025-03-20', actualEnd: '2025-07-10', percentComplete: 100, order: 2 },
  { id: 'phase-4-3', projectId: 'proj-4', name: 'Site Preparation', status: 'completed', plannedStart: '2025-07-01', plannedEnd: '2025-08-15', actualStart: '2025-07-15', actualEnd: '2025-08-30', percentComplete: 100, order: 3 },
  { id: 'phase-4-4', projectId: 'proj-4', name: 'Foundation', status: 'delayed', plannedStart: '2025-08-16', plannedEnd: '2025-10-31', actualStart: '2025-09-01', percentComplete: 80, order: 4 },
  { id: 'phase-4-5', projectId: 'proj-4', name: 'Structural Work', status: 'pending', plannedStart: '2025-11-01', plannedEnd: '2026-02-28', percentComplete: 0, order: 5 },
  { id: 'phase-4-6', projectId: 'proj-4', name: 'MEP Systems', status: 'pending', plannedStart: '2026-01-15', plannedEnd: '2026-04-30', percentComplete: 0, order: 6 },
  { id: 'phase-4-7', projectId: 'proj-4', name: 'Interior Build-Out', status: 'pending', plannedStart: '2026-03-15', plannedEnd: '2026-05-31', percentComplete: 0, order: 7 },
  { id: 'phase-4-8', projectId: 'proj-4', name: 'Medical Equipment', status: 'pending', plannedStart: '2026-05-15', plannedEnd: '2026-06-30', percentComplete: 0, order: 8 }
]

export const risks: Risk[] = [
  {
    id: 'risk-1',
    projectId: 'proj-1',
    title: 'Steel supply chain delays',
    description: 'Potential delays in structural steel delivery due to global supply constraints',
    probability: 'high',
    impact: 'high',
    status: 'open',
    mitigation: 'Secured secondary supplier; maintaining 3-week buffer stock on site',
    owner: 'John Martinez',
    createdAt: '2025-10-15'
  },
  {
    id: 'risk-2',
    projectId: 'proj-1',
    title: 'Skilled labor shortage',
    description: 'Difficulty in securing qualified ironworkers for high-rise construction',
    probability: 'medium',
    impact: 'high',
    status: 'mitigated',
    mitigation: 'Partnered with trade unions; offering premium rates and training programs',
    owner: 'Sarah Chen',
    createdAt: '2025-09-01'
  },
  {
    id: 'risk-3',
    projectId: 'proj-2',
    title: 'Soil contamination discovery',
    description: 'Potential for additional soil remediation if contamination found during excavation',
    probability: 'low',
    impact: 'high',
    status: 'open',
    mitigation: 'Environmental consultant on retainer; contingency budget allocated',
    owner: 'Mike Rodriguez',
    createdAt: '2025-11-20'
  },
  {
    id: 'risk-4',
    projectId: 'proj-2',
    title: 'Permit approval delays',
    description: 'Zoning variance approval taking longer than expected',
    probability: 'medium',
    impact: 'medium',
    status: 'closed',
    mitigation: 'Engaged local planning consultant; weekly check-ins with city officials',
    owner: 'Lisa Thompson',
    createdAt: '2025-08-10'
  },
  {
    id: 'risk-5',
    projectId: 'proj-3',
    title: 'Utility connection delays',
    description: 'High-voltage electrical connection timeline uncertain',
    probability: 'medium',
    impact: 'medium',
    status: 'open',
    mitigation: 'Early engagement with utility company; temporary power backup plan',
    owner: 'David Park',
    createdAt: '2025-12-01'
  },
  {
    id: 'risk-6',
    projectId: 'proj-4',
    title: 'Adjacent hospital operations',
    description: 'Construction noise and vibration impacting ongoing hospital operations',
    probability: 'high',
    impact: 'medium',
    status: 'mitigated',
    mitigation: 'Restricted work hours; vibration monitoring; noise barriers installed',
    owner: 'Amy Wilson',
    createdAt: '2025-06-15'
  },
  {
    id: 'risk-7',
    projectId: 'proj-4',
    title: 'Funding approval delay',
    description: 'Government funding tranche delayed pending budget review',
    probability: 'high',
    impact: 'high',
    status: 'open',
    mitigation: 'Working with financial advisors; exploring bridge financing options',
    owner: 'Robert James',
    createdAt: '2025-11-01'
  },
  {
    id: 'risk-8',
    projectId: 'proj-1',
    title: 'Weather delays in Q1',
    description: 'Potential for severe winter weather impacting exterior work schedule',
    probability: 'medium',
    impact: 'low',
    status: 'open',
    mitigation: 'Float days built into schedule; weather monitoring in place',
    owner: 'John Martinez',
    createdAt: '2025-12-10'
  },
  {
    id: 'risk-9',
    projectId: 'proj-1',
    title: 'Elevator equipment lead time',
    description: 'Long lead time for high-speed elevator systems',
    probability: 'low',
    impact: 'medium',
    status: 'mitigated',
    mitigation: 'Order placed 8 months in advance; penalty clause in supplier contract',
    owner: 'Sarah Chen',
    createdAt: '2025-07-20'
  },
  {
    id: 'risk-10',
    projectId: 'proj-3',
    title: 'Automation system integration',
    description: 'Risk of delays in warehouse automation system installation',
    probability: 'medium',
    impact: 'high',
    status: 'open',
    mitigation: 'Early vendor engagement; phased installation approach',
    owner: 'David Park',
    createdAt: '2025-12-15'
  }
]

// EVM data - 12 months of data for main project
export const evmData: EVMMetrics[] = [
  { projectId: 'proj-1', date: '2025-04', plannedValue: 2000000, earnedValue: 1800000, actualCost: 1900000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2025-05', plannedValue: 4500000, earnedValue: 4200000, actualCost: 4400000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2025-06', plannedValue: 6800000, earnedValue: 6300000, actualCost: 6600000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2025-07', plannedValue: 8500000, earnedValue: 7800000, actualCost: 8200000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2025-08', plannedValue: 10200000, earnedValue: 9400000, actualCost: 9900000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2025-09', plannedValue: 12000000, earnedValue: 11000000, actualCost: 11700000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2025-10', plannedValue: 14000000, earnedValue: 12800000, actualCost: 13500000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2025-11', plannedValue: 16200000, earnedValue: 14500000, actualCost: 15400000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2025-12', plannedValue: 18000000, earnedValue: 16200000, actualCost: 17100000, budgetAtCompletion: 45000000 },
  { projectId: 'proj-1', date: '2026-01', plannedValue: 20000000, earnedValue: 18000000, actualCost: 18500000, budgetAtCompletion: 45000000 },
]

export const activities: Activity[] = [
  {
    id: 'act-1',
    projectId: 'proj-1',
    type: 'milestone',
    title: 'Floor 15 structural complete',
    description: 'Structural framing completed for floor 15 of Downtown Office Tower',
    timestamp: '2026-01-18T14:30:00Z'
  },
  {
    id: 'act-2',
    projectId: 'proj-2',
    type: 'update',
    title: 'Foundation pour scheduled',
    description: 'Next foundation pour scheduled for January 22nd, weather permitting',
    timestamp: '2026-01-17T09:15:00Z'
  },
  {
    id: 'act-3',
    projectId: 'proj-4',
    type: 'risk',
    title: 'Funding delay impact assessment',
    description: 'Team meeting scheduled to assess impact of delayed funding tranche',
    timestamp: '2026-01-16T16:45:00Z'
  },
  {
    id: 'act-4',
    projectId: 'proj-1',
    type: 'update',
    title: 'MEP coordination meeting',
    description: 'Weekly MEP coordination completed - HVAC routing finalized for floors 10-15',
    timestamp: '2026-01-15T11:00:00Z'
  },
  {
    id: 'act-5',
    projectId: 'proj-3',
    type: 'milestone',
    title: 'Design phase 75% complete',
    description: 'Structural and MEP design drawings at 75% completion',
    timestamp: '2026-01-14T10:30:00Z'
  },
  {
    id: 'act-6',
    projectId: 'proj-1',
    type: 'issue',
    title: 'Steel delivery rescheduled',
    description: 'Next steel delivery pushed back 3 days due to transportation issue',
    timestamp: '2026-01-13T08:00:00Z'
  }
]

// Helper function to get project by ID
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

// Helper function to get phases for a project
export function getPhasesByProject(projectId: string): Phase[] {
  return phases.filter(p => p.projectId === projectId).sort((a, b) => a.order - b.order)
}

// Helper function to get risks for a project
export function getRisksByProject(projectId: string): Risk[] {
  return risks.filter(r => r.projectId === projectId)
}

// Helper function to get EVM data for a project
export function getEvmByProject(projectId: string): EVMMetrics[] {
  return evmData.filter(e => e.projectId === projectId)
}

// Helper to get latest EVM metrics
export function getLatestEvm(projectId: string): EVMMetrics | undefined {
  const data = getEvmByProject(projectId)
  return data.length > 0 ? data[data.length - 1] : undefined
}

// Get aggregated stats
export function getDashboardStats() {
  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'in-progress').length
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.actualCost, 0)
  const activePhases = phases.filter(p => p.status === 'in-progress').length
  const openRisks = risks.filter(r => r.status === 'open').length
  const highRisks = risks.filter(r => r.status === 'open' && (r.probability === 'high' || r.impact === 'high')).length

  return {
    totalProjects,
    activeProjects,
    totalBudget,
    totalSpent,
    budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
    activePhases,
    openRisks,
    highRisks
  }
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Format percentage
export function formatPercent(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
