"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { projects, formatCurrency } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function ProjectProgress() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30">In Progress</Badge>
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30">Completed</Badge>
      case 'planning':
        return <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30">Planning</Badge>
      case 'on-hold':
        return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30">On Hold</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>Progress and budget status for all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => {
            const budgetPercent = (project.actualCost / project.budget) * 100
            const isOverBudget = budgetPercent > project.percentComplete + 10

            return (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{project.name}</h4>
                    <p className="text-xs text-muted-foreground">{project.client}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.percentComplete}%</span>
                  </div>
                  <Progress value={project.percentComplete} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Budget: {formatCurrency(project.actualCost)} / {formatCurrency(project.budget)}
                  </span>
                  <span className={cn(
                    "font-medium",
                    isOverBudget ? "text-destructive" : "text-green-600 dark:text-green-400"
                  )}>
                    {budgetPercent.toFixed(0)}% used
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
