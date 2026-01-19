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
import { Risk } from "@/types/construction"
import { getRiskLevel } from "@/types/construction"
import { getProjectById, formatDate } from "@/lib/mock-data"

interface RiskTableProps {
  risks: Risk[]
  showProject?: boolean
}

export function RiskTable({ risks, showProject = true }: RiskTableProps) {
  const getProbabilityBadge = (probability: string) => {
    switch (probability) {
      case 'high':
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">Medium</Badge>
      default:
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Low</Badge>
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge variant="outline" className="border-red-500/50 text-red-700 dark:text-red-400">High</Badge>
      case 'medium':
        return <Badge variant="outline" className="border-yellow-500/50 text-yellow-700 dark:text-yellow-400">Medium</Badge>
      default:
        return <Badge variant="outline" className="border-green-500/50 text-green-700 dark:text-green-400">Low</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">Open</Badge>
      case 'mitigated':
        return <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-400">Mitigated</Badge>
      case 'closed':
        return <Badge className="bg-gray-500/20 text-gray-700 dark:text-gray-400">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getLevelBadge = (risk: Risk) => {
    const level = getRiskLevel(risk.probability, risk.impact)
    switch (level) {
      case 'critical':
        return <Badge className="bg-red-600 text-white">Critical</Badge>
      case 'high':
        return <Badge className="bg-orange-500 text-white">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-500 text-black">Medium</Badge>
      default:
        return <Badge className="bg-green-500 text-white">Low</Badge>
    }
  }

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Risk</TableHead>
            {showProject && <TableHead>Project</TableHead>}
            <TableHead>Level</TableHead>
            <TableHead>Probability</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {risks.map((risk) => {
            const project = getProjectById(risk.projectId)
            return (
              <TableRow key={risk.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{risk.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{risk.description}</p>
                  </div>
                </TableCell>
                {showProject && (
                  <TableCell>
                    <span className="text-sm">{project?.name}</span>
                  </TableCell>
                )}
                <TableCell>{getLevelBadge(risk)}</TableCell>
                <TableCell>{getProbabilityBadge(risk.probability)}</TableCell>
                <TableCell>{getImpactBadge(risk.impact)}</TableCell>
                <TableCell>{getStatusBadge(risk.status)}</TableCell>
                <TableCell>
                  <span className="text-sm">{risk.owner || '-'}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatDate(risk.createdAt)}</span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
