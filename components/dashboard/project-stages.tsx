"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { projectStages, projects, getStagesByProject, formatCurrency } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle, PlayCircle, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ProjectStagesProps {
  projectId?: string
  compact?: boolean
}

export function ProjectStages({ projectId, compact = false }: ProjectStagesProps) {
  const stages = projectId ? getStagesByProject(projectId) : projectStages.filter(s => s.projectId === 'proj-1')
  const project = projects.find(p => p.id === (projectId || 'proj-1'))

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <PlayCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getVarianceIndicator = (variance: number) => {
    if (variance > 0) {
      return (
        <span className="flex items-center text-green-600 dark:text-green-400 text-xs font-medium">
          <TrendingUp className="h-3 w-3 mr-0.5" />
          +{variance.toFixed(1)}%
        </span>
      )
    } else if (variance < 0) {
      return (
        <span className="flex items-center text-red-600 dark:text-red-400 text-xs font-medium">
          <TrendingDown className="h-3 w-3 mr-0.5" />
          {variance.toFixed(1)}%
        </span>
      )
    }
    return (
      <span className="flex items-center text-muted-foreground text-xs">
        <Minus className="h-3 w-3 mr-0.5" />
        0%
      </span>
    )
  }

  const currentStageIndex = stages.findIndex(s => s.status === 'in-progress')
  const completedStages = stages.filter(s => s.status === 'completed').length
  const overallProgress = ((completedStages + 0.5 * (currentStageIndex >= 0 ? 1 : 0)) / stages.length) * 100

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Project Stages</CardTitle>
          <CardDescription>{project?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress bar showing overall stage completion */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{Math.round(overallProgress)}%</span>
              </div>
              <div className="flex gap-1">
                {stages.map((stage, i) => (
                  <div
                    key={stage.id}
                    className={cn(
                      "h-2 flex-1 rounded-full",
                      stage.status === 'completed' && "bg-green-500",
                      stage.status === 'in-progress' && "bg-blue-500",
                      stage.status === 'upcoming' && "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Stage list */}
            <div className="space-y-2">
              {stages.map((stage, i) => (
                <div key={stage.id} className="flex items-center gap-3">
                  {getStatusIcon(stage.status)}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      stage.status === 'upcoming' && "text-muted-foreground"
                    )}>
                      {stage.name}
                    </p>
                  </div>
                  {stage.status !== 'upcoming' && (
                    <div className="flex gap-3">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Cost</p>
                        {getVarianceIndicator(stage.costVariance)}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Schedule</p>
                        {getVarianceIndicator(stage.scheduleVariance)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Lifecycle Stages</CardTitle>
        <CardDescription>
          {project?.name} - Cost & Schedule Control Points
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stage progress visualization */}
          <div className="flex items-center gap-1">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex-1 flex flex-col items-center">
                <div
                  className={cn(
                    "w-full h-3 rounded-full transition-colors",
                    stage.status === 'completed' && "bg-green-500",
                    stage.status === 'in-progress' && "bg-blue-500 animate-pulse",
                    stage.status === 'upcoming' && "bg-muted"
                  )}
                />
                <span className={cn(
                  "text-xs mt-2 text-center",
                  stage.status === 'upcoming' ? "text-muted-foreground" : "font-medium"
                )}>
                  {stage.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Stage details table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Stage</th>
                  <th className="text-right p-3 font-medium">Planned Cost</th>
                  <th className="text-right p-3 font-medium">Actual Cost</th>
                  <th className="text-center p-3 font-medium">Cost Var.</th>
                  <th className="text-center p-3 font-medium">Schedule Var.</th>
                  <th className="text-right p-3 font-medium">LCA (CO2)</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((stage) => (
                  <tr key={stage.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(stage.status)}
                        <span className={stage.status === 'upcoming' ? 'text-muted-foreground' : ''}>
                          {stage.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-right p-3">{formatCurrency(stage.plannedCost)}</td>
                    <td className="text-right p-3">
                      {stage.actualCost > 0 ? formatCurrency(stage.actualCost) : '-'}
                    </td>
                    <td className="text-center p-3">{getVarianceIndicator(stage.costVariance)}</td>
                    <td className="text-center p-3">{getVarianceIndicator(stage.scheduleVariance)}</td>
                    <td className="text-right p-3 text-muted-foreground">
                      {(stage.lcaCarbonKg / 1000).toFixed(0)}t
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
