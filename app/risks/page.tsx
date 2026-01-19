"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { RiskTable } from "@/components/risks/risk-table"
import { RiskMatrix } from "@/components/risks/risk-matrix"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { risks, projects, getRisksByProject } from "@/lib/mock-data"
import { AlertTriangle, AlertCircle, CheckCircle2, Shield } from "lucide-react"

export default function RisksPage() {
  const [projectFilter, setProjectFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  let filteredRisks = projectFilter && projectFilter !== 'all'
    ? getRisksByProject(projectFilter)
    : risks

  if (statusFilter && statusFilter !== 'all') {
    filteredRisks = filteredRisks.filter(r => r.status === statusFilter)
  }

  const openRisks = risks.filter(r => r.status === 'open')
  const mitigatedRisks = risks.filter(r => r.status === 'mitigated')
  const closedRisks = risks.filter(r => r.status === 'closed')
  const highPriorityRisks = openRisks.filter(r => r.probability === 'high' || r.impact === 'high')

  return (
    <DashboardShell title="Risk Register">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Risks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openRisks.length}</div>
              <p className="text-xs text-muted-foreground">
                Requiring attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{highPriorityRisks.length}</div>
              <p className="text-xs text-muted-foreground">
                Critical or high severity
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mitigated</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mitigatedRisks.length}</div>
              <p className="text-xs text-muted-foreground">
                Controls in place
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{closedRisks.length}</div>
              <p className="text-xs text-muted-foreground">
                Resolved risks
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Matrix */}
        <RiskMatrix risks={risks} />

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="mitigated">Mitigated</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Risk Table */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Risks ({filteredRisks.length})</TabsTrigger>
            <TabsTrigger value="critical">Critical/High ({filteredRisks.filter(r => r.probability === 'high' || r.impact === 'high').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <RiskTable risks={filteredRisks} showProject={projectFilter === 'all'} />
          </TabsContent>

          <TabsContent value="critical">
            <RiskTable
              risks={filteredRisks.filter(r => r.probability === 'high' || r.impact === 'high')}
              showProject={projectFilter === 'all'}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
