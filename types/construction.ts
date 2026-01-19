export interface Project {
  id: string
  name: string
  client: string
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed'
  startDate: string
  endDate: string
  budget: number
  actualCost: number
  percentComplete: number
  description?: string
}

export interface Phase {
  id: string
  projectId: string
  name: string
  status: 'pending' | 'in-progress' | 'completed' | 'delayed'
  plannedStart: string
  plannedEnd: string
  actualStart?: string
  actualEnd?: string
  percentComplete: number
  order: number
}

export interface Risk {
  id: string
  projectId: string
  title: string
  description: string
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  status: 'open' | 'mitigated' | 'closed'
  mitigation: string
  owner?: string
  createdAt: string
}

export interface EVMMetrics {
  projectId: string
  date: string
  plannedValue: number      // PV - Budgeted Cost of Work Scheduled
  earnedValue: number       // EV - Budgeted Cost of Work Performed
  actualCost: number        // AC - Actual Cost of Work Performed
  budgetAtCompletion: number // BAC
}

export interface Activity {
  id: string
  projectId: string
  type: 'milestone' | 'update' | 'risk' | 'issue'
  title: string
  description: string
  timestamp: string
}

// Derived EVM calculations helper functions
export function calculateSPI(ev: number, pv: number): number {
  // Schedule Performance Index = EV / PV
  return pv === 0 ? 0 : ev / pv
}

export function calculateCPI(ev: number, ac: number): number {
  // Cost Performance Index = EV / AC
  return ac === 0 ? 0 : ev / ac
}

export function calculateEAC(bac: number, cpi: number): number {
  // Estimate at Completion = BAC / CPI
  return cpi === 0 ? bac : bac / cpi
}

export function calculateVAC(bac: number, eac: number): number {
  // Variance at Completion = BAC - EAC
  return bac - eac
}

export function calculateCV(ev: number, ac: number): number {
  // Cost Variance = EV - AC
  return ev - ac
}

export function calculateSV(ev: number, pv: number): number {
  // Schedule Variance = EV - PV
  return ev - pv
}

export function getRiskLevel(probability: Risk['probability'], impact: Risk['impact']): 'low' | 'medium' | 'high' | 'critical' {
  const levels = { low: 1, medium: 2, high: 3 }
  const score = levels[probability] * levels[impact]

  if (score >= 6) return 'critical'
  if (score >= 4) return 'high'
  if (score >= 2) return 'medium'
  return 'low'
}
