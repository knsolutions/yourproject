"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { PhaseCard } from "@/components/phases/phase-card"
import { PhaseGantt } from "@/components/phases/phase-gantt"
import { PhaseVarianceChart } from "@/components/phases/phase-variance-chart"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { phases, projects, getPhasesByProject } from "@/lib/mock-data"
import { BarChart3, LayoutGrid } from "lucide-react"

export default function PhasesPage() {
  const [view, setView] = useState<'gantt' | 'cards'>('gantt')
  const [projectFilter, setProjectFilter] = useState<string>('proj-1')

  const filteredPhases = projectFilter && projectFilter !== 'all'
    ? getPhasesByProject(projectFilter)
    : phases

  return (
    <DashboardShell title="Phases">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={view === 'gantt' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setView('gantt')}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'cards' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setView('cards')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Variance Chart - Show when project is selected */}
        {projectFilter && projectFilter !== 'all' && (
          <PhaseVarianceChart projectId={projectFilter} />
        )}

        {view === 'gantt' ? (
          projectFilter && projectFilter !== 'all' ? (
            <PhaseGantt phases={filteredPhases} projectId={projectFilter} />
          ) : (
            <div className="space-y-6">
              {projects.map((project) => (
                <PhaseGantt
                  key={project.id}
                  phases={getPhasesByProject(project.id)}
                  projectId={project.id}
                />
              ))}
            </div>
          )
        ) : (
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="delayed">Delayed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPhases.map((phase) => (
                  <PhaseCard key={phase.id} phase={phase} showProject={projectFilter === 'all'} />
                ))}
              </div>
            </TabsContent>

            {['in-progress', 'pending', 'completed', 'delayed'].map((status) => (
              <TabsContent key={status} value={status} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPhases
                    .filter((p) => p.status === status)
                    .map((phase) => (
                      <PhaseCard key={phase.id} phase={phase} showProject={projectFilter === 'all'} />
                    ))}
                </div>
                {filteredPhases.filter((p) => p.status === status).length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No phases with status &quot;{status}&quot;
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </DashboardShell>
  )
}
