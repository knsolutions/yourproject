"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projects, getStagesByProject } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react"
import Link from "next/link"

const stageNames = ['Preliminary Design', 'Design Development', 'Construction Documents', 'Construction', 'Closeout']

export function AllProjectsStages() {
  const projectsWithStages = projects.map(project => ({
    ...project,
    stages: getStagesByProject(project.id)
  }))

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      default:
        return 'bg-muted'
    }
  }

  const getOverallVariance = (stages: typeof projectsWithStages[0]['stages']) => {
    const activeStages = stages.filter(s => s.status !== 'upcoming')
    if (activeStages.length === 0) return { cost: 0, schedule: 0 }
    const avgCost = activeStages.reduce((sum, s) => sum + s.costVariance, 0) / activeStages.length
    const avgSchedule = activeStages.reduce((sum, s) => sum + s.scheduleVariance, 0) / activeStages.length
    return { cost: avgCost, schedule: avgSchedule }
  }

  const getCurrentStage = (stages: typeof projectsWithStages[0]['stages']) => {
    const current = stages.find(s => s.status === 'in-progress')
    return current?.name || stages.find(s => s.status === 'completed')?.name || 'Not Started'
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Projects Overview</CardTitle>
          <Link href="/analytics" className="text-xs text-primary flex items-center hover:underline">
            View Details <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {projectsWithStages.map(project => {
            const variance = getOverallVariance(project.stages)
            const currentStage = getCurrentStage(project.stages)

            return (
              <div
                key={project.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.name}</p>
                  <p className="text-xs text-muted-foreground">{currentStage}</p>
                </div>

                {/* Stage Progress Mini */}
                <div className="flex gap-0.5">
                  {stageNames.map((stageName) => {
                    const stage = project.stages.find(s => s.name === stageName)
                    return (
                      <div
                        key={stageName}
                        className={cn(
                          "w-6 h-2 rounded-sm first:rounded-l last:rounded-r",
                          stage ? getStageColor(stage.status) : 'bg-muted'
                        )}
                        title={stageName}
                      />
                    )
                  })}
                </div>

                {/* Variance Indicators */}
                <div className="flex gap-3 text-xs">
                  <div className={cn(
                    "flex items-center",
                    variance.cost >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {variance.cost >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                    <span className="font-medium">{Math.abs(variance.cost).toFixed(1)}%</span>
                  </div>
                  <div className={cn(
                    "flex items-center",
                    variance.schedule >= 0 ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"
                  )}>
                    {variance.schedule >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                    <span className="font-medium">{Math.abs(variance.schedule).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Compact Legend */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-green-500" />
              <span>Done</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-blue-500" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-muted" />
              <span>Pending</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Cost</span>
            <span>|</span>
            <span>Schedule</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
