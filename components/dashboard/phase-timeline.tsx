"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getPhasesByProject, getProjectById } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface PhaseTimelineProps {
  projectId?: string
}

export function PhaseTimeline({ projectId = 'proj-1' }: PhaseTimelineProps) {
  const phases = getPhasesByProject(projectId)
  const project = getProjectById(projectId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30'
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30'
      case 'delayed':
        return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30'
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '[&>div]:bg-green-500'
      case 'in-progress':
        return '[&>div]:bg-primary'
      case 'delayed':
        return '[&>div]:bg-destructive'
      default:
        return '[&>div]:bg-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phase Progress</CardTitle>
        <CardDescription>{project?.name || 'Project Phases'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{phase.name}</span>
                  <Badge variant="outline" className={cn("text-xs", getStatusColor(phase.status))}>
                    {phase.status.replace('-', ' ')}
                  </Badge>
                </div>
                <Progress
                  value={phase.percentComplete}
                  className={cn("h-2", getProgressColor(phase.status))}
                />
                <span className="text-xs text-muted-foreground">
                  {phase.percentComplete}% complete
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
