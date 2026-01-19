"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phase } from "@/types/construction"
import { getProjectById } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface PhaseGanttProps {
  phases: Phase[]
  projectId?: string
}

export function PhaseGantt({ phases, projectId }: PhaseGanttProps) {
  const project = projectId ? getProjectById(projectId) : null

  // Find date range for the gantt
  const allDates = phases.flatMap(p => [
    new Date(p.plannedStart),
    new Date(p.plannedEnd),
    ...(p.actualStart ? [new Date(p.actualStart)] : []),
    ...(p.actualEnd ? [new Date(p.actualEnd)] : []),
  ])

  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))

  const getBarPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const startOffset = Math.ceil((start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${Math.max((duration / totalDays) * 100, 2)}%`,
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-primary'
      case 'delayed':
        return 'bg-destructive'
      default:
        return 'bg-muted-foreground/50'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 text-xs">Done</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs">Active</Badge>
      case 'delayed':
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400 text-xs">Delayed</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-700 dark:text-gray-400 text-xs">Pending</Badge>
    }
  }

  // Generate month labels
  const months: { date: Date; label: string }[] = []
  const currentDate = new Date(minDate)
  currentDate.setDate(1)
  while (currentDate <= maxDate) {
    months.push({
      date: new Date(currentDate),
      label: currentDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    })
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>
          {project ? project.name : 'All Projects'} - Gantt View
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {/* Month labels */}
          <div className="flex mb-4 ml-[200px]">
            <div className="relative w-full h-6">
              {months.map((month, i) => {
                const offset = Math.ceil((month.date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))
                return (
                  <div
                    key={i}
                    className="absolute text-xs text-muted-foreground"
                    style={{ left: `${(offset / totalDays) * 100}%` }}
                  >
                    {month.label}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Phase bars */}
          {phases.map((phase) => {
            const plannedPos = getBarPosition(phase.plannedStart, phase.plannedEnd)

            return (
              <div key={phase.id} className="flex items-center gap-4 py-2">
                <div className="w-[180px] flex-shrink-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium truncate">{phase.name}</span>
                    {getStatusBadge(phase.status)}
                  </div>
                </div>
                <div className="relative flex-1 h-8 bg-muted/30 rounded">
                  {/* Planned bar (lighter) */}
                  <div
                    className="absolute h-full bg-muted-foreground/20 rounded"
                    style={plannedPos}
                  />
                  {/* Progress bar */}
                  <div
                    className={cn("absolute h-full rounded", getStatusColor(phase.status))}
                    style={{
                      ...plannedPos,
                      width: `${parseFloat(plannedPos.width) * (phase.percentComplete / 100)}%`,
                    }}
                  />
                  {/* Progress label */}
                  <div
                    className="absolute h-full flex items-center justify-center text-xs font-medium"
                    style={plannedPos}
                  >
                    <span className={cn(
                      phase.percentComplete > 50 ? "text-white" : "text-foreground"
                    )}>
                      {phase.percentComplete}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-green-500" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-primary" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-destructive" />
            <span>Delayed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-muted-foreground/50" />
            <span>Pending</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
