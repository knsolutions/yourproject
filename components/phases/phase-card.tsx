"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Phase } from "@/types/construction"
import { formatDate, getProjectById } from "@/lib/mock-data"
import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhaseCardProps {
  phase: Phase
  showProject?: boolean
}

export function PhaseCard({ phase, showProject = true }: PhaseCardProps) {
  const project = getProjectById(phase.projectId)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Completed</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">In Progress</Badge>
      case 'delayed':
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">Delayed</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-700 dark:text-gray-400">Pending</Badge>
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

  const isDelayed = phase.status === 'delayed' ||
    (phase.actualStart && new Date(phase.actualStart) > new Date(phase.plannedStart))

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{phase.name}</CardTitle>
            {showProject && project && (
              <p className="text-sm text-muted-foreground">{project.name}</p>
            )}
          </div>
          {getStatusBadge(phase.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{phase.percentComplete}%</span>
          </div>
          <Progress
            value={phase.percentComplete}
            className={cn("h-2", getProgressColor(phase.status))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">Planned</span>
            </div>
            <p className="text-xs">{formatDate(phase.plannedStart)}</p>
            <p className="text-xs text-muted-foreground">to {formatDate(phase.plannedEnd)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="text-xs">Actual</span>
            </div>
            {phase.actualStart ? (
              <>
                <p className={cn("text-xs", isDelayed && "text-destructive")}>
                  {formatDate(phase.actualStart)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {phase.actualEnd ? `to ${formatDate(phase.actualEnd)}` : 'Ongoing'}
                </p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">Not started</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
