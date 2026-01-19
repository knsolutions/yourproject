"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { projects, formatCurrency, formatDate } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ProjectTableProps {
  statusFilter?: string
}

export function ProjectTable({ statusFilter }: ProjectTableProps) {
  const filteredProjects = statusFilter && statusFilter !== 'all'
    ? projects.filter(p => p.status === statusFilter)
    : projects

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
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Budget</TableHead>
            <TableHead>Schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => {
            const budgetPercent = (project.actualCost / project.budget) * 100
            const isOverBudget = budgetPercent > project.percentComplete + 10

            return (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{project.name}</p>
                    {project.description && (
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {project.description}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{getStatusBadge(project.status)}</TableCell>
                <TableCell>
                  <div className="w-[120px] space-y-1">
                    <Progress value={project.percentComplete} className="h-2" />
                    <span className="text-xs text-muted-foreground">{project.percentComplete}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <p className="font-medium">{formatCurrency(project.actualCost)}</p>
                    <p className={cn(
                      "text-xs",
                      isOverBudget ? "text-destructive" : "text-muted-foreground"
                    )}>
                      of {formatCurrency(project.budget)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{formatDate(project.startDate)}</p>
                    <p className="text-xs text-muted-foreground">to {formatDate(project.endDate)}</p>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
