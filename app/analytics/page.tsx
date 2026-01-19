"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { EVMChart } from "@/components/dashboard/evm-chart"
import { EVMMetrics } from "@/components/dashboard/evm-metrics"
import { PerformanceIndicators } from "@/components/dashboard/performance-indicators"
import { BudgetOverview } from "@/components/dashboard/budget-overview"
import { ProjectStages } from "@/components/dashboard/project-stages"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { projects, getStagesByProject, formatCurrency } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, DollarSign, Calendar, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AnalyticsPage() {
  const [selectedProject, setSelectedProject] = useState<string>('proj-1')
  const project = projects.find(p => p.id === selectedProject)
  const stages = getStagesByProject(selectedProject)

  // Calculate totals
  const totalPlannedCost = stages.reduce((sum, s) => sum + s.plannedCost, 0)
  const totalActualCost = stages.reduce((sum, s) => sum + s.actualCost, 0)
  const totalLCA = stages.reduce((sum, s) => sum + s.lcaCarbonKg, 0)
  const avgCostVariance = stages.filter(s => s.status !== 'upcoming').reduce((sum, s) => sum + s.costVariance, 0) / stages.filter(s => s.status !== 'upcoming').length || 0
  const avgScheduleVariance = stages.filter(s => s.status !== 'upcoming').reduce((sum, s) => sum + s.scheduleVariance, 0) / stages.filter(s => s.status !== 'upcoming').length || 0

  return (
    <DashboardShell title="Analytics">
      <div className="space-y-6">
        {/* Project Selector */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Project Performance Analytics</h2>
            <p className="text-sm text-muted-foreground">Detailed cost, schedule, and environmental metrics</p>
          </div>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalPlannedCost)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Spent: {formatCurrency(totalActualCost)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cost Variance</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    avgCostVariance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {avgCostVariance >= 0 ? '+' : ''}{avgCostVariance.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {avgCostVariance >= 0 ? 'Under budget' : 'Over budget'}
                  </p>
                </div>
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center",
                  avgCostVariance >= 0 ? "bg-green-500/10" : "bg-red-500/10"
                )}>
                  {avgCostVariance >= 0 ? (
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Schedule Variance</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    avgScheduleVariance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {avgScheduleVariance >= 0 ? '+' : ''}{avgScheduleVariance.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {avgScheduleVariance >= 0 ? 'Ahead of schedule' : 'Behind schedule'}
                  </p>
                </div>
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center",
                  avgScheduleVariance >= 0 ? "bg-green-500/10" : "bg-red-500/10"
                )}>
                  <Calendar className={cn(
                    "h-6 w-6",
                    avgScheduleVariance >= 0 ? "text-green-500" : "text-red-500"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                  <p className="text-2xl font-bold">{(totalLCA / 1000).toFixed(0)}t</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total CO2 (LCA)
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="stages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="stages">Project Stages</TabsTrigger>
            <TabsTrigger value="evm">Earned Value</TabsTrigger>
            <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="stages" className="space-y-4">
            <ProjectStages projectId={selectedProject} />
          </TabsContent>

          <TabsContent value="evm" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <EVMChart />
              </div>
              <EVMMetrics />
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <PerformanceIndicators />
              <BudgetOverview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
