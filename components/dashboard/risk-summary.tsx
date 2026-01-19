"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { risks } from "@/lib/mock-data"
import { getRiskLevel } from "@/types/construction"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"

export function RiskSummary() {
  const openRisks = risks.filter(r => r.status === 'open')
  const highPriorityRisks = openRisks
    .map(r => ({ ...r, level: getRiskLevel(r.probability, r.impact) }))
    .filter(r => r.level === 'critical' || r.level === 'high')
    .slice(0, 3)

  const riskCounts = {
    high: openRisks.filter(r => r.probability === 'high' || r.impact === 'high').length,
    medium: openRisks.filter(r => r.probability === 'medium' && r.impact === 'medium').length,
    low: openRisks.filter(r => r.probability === 'low' && r.impact === 'low').length,
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return <Badge className="bg-red-500 text-white">Critical</Badge>
      case 'high':
        return <Badge className="bg-orange-500 text-white">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-500 text-black">Medium</Badge>
      default:
        return <Badge className="bg-green-500 text-white">Low</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Overview</CardTitle>
        <CardDescription>{openRisks.length} open risks across all projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-red-500/10 p-3">
            <AlertTriangle className="mx-auto h-5 w-5 text-red-500" />
            <p className="mt-1 text-lg font-bold text-red-600 dark:text-red-400">{riskCounts.high}</p>
            <p className="text-xs text-muted-foreground">High</p>
          </div>
          <div className="rounded-lg bg-yellow-500/10 p-3">
            <AlertCircle className="mx-auto h-5 w-5 text-yellow-500" />
            <p className="mt-1 text-lg font-bold text-yellow-600 dark:text-yellow-400">{riskCounts.medium}</p>
            <p className="text-xs text-muted-foreground">Medium</p>
          </div>
          <div className="rounded-lg bg-green-500/10 p-3">
            <Info className="mx-auto h-5 w-5 text-green-500" />
            <p className="mt-1 text-lg font-bold text-green-600 dark:text-green-400">{riskCounts.low}</p>
            <p className="text-xs text-muted-foreground">Low</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="mb-3 text-sm font-medium">Top Priority Risks</h4>
          <div className="space-y-3">
            {highPriorityRisks.map((risk) => (
              <div key={risk.id} className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{risk.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{risk.mitigation}</p>
                </div>
                {getLevelBadge(risk.level)}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
