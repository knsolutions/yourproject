"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { ProjectTable } from "@/components/projects/project-table"
import { ProjectCard } from "@/components/projects/project-card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { projects } from "@/lib/mock-data"
import { LayoutGrid, List } from "lucide-react"

export default function ProjectsPage() {
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredProjects = statusFilter && statusFilter !== 'all'
    ? projects.filter(p => p.status === statusFilter)
    : projects

  return (
    <DashboardShell title="Projects">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={view === 'table' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setView('table')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setView('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {view === 'table' ? (
          <ProjectTable statusFilter={statusFilter} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
