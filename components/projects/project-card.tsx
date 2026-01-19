"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Project } from "@/types/construction"
import { formatCurrency, formatDate } from "@/lib/mock-data"
import { Calendar, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const budgetPercent = (project.actualCost / project.budget) * 100
  const isOverBudget = budgetPercent > project.percentComplete + 10

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">In Progress</Badge>
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Completed</Badge>
      case 'planning':
        return <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-400">Planning</Badge>
      case 'on-hold':
        return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">On Hold</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription>{project.client}</CardDescription>
          </div>
          {getStatusBadge(project.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.percentComplete}%</span>
          </div>
          <Progress value={project.percentComplete} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{formatCurrency(project.actualCost)}</p>
              <p className={cn(
                "text-xs",
                isOverBudget ? "text-destructive" : "text-muted-foreground"
              )}>
                of {formatCurrency(project.budget)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{formatDate(project.endDate)}</p>
              <p className="text-xs text-muted-foreground">Target</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
