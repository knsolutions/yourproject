"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  FolderKanban,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react"
import { getDashboardStats, getLatestEvm } from "@/lib/mock-data"
import { calculateSPI, calculateCPI } from "@/types/construction"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  accentColor: string
  bgGradient: string
}

function StatCard({ title, value, change, changeLabel, accentColor, bgGradient }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <Card className={cn("relative overflow-hidden border-l-4", accentColor)}>
      <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -mr-10 -mt-10", bgGradient)} />
      <div className={cn("absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-5 -mr-5 -mb-5", bgGradient)} />
      <CardContent className="p-6 relative">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
        <div className="mt-2 flex items-baseline gap-3">
          <p className="text-4xl font-bold tracking-tight">{value}</p>
          <span
            className={cn(
              "flex items-center text-sm font-semibold",
              isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {isPositive ? "+" : ""}{change.toFixed(1)}%
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{changeLabel}</p>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  const stats = getDashboardStats()
  const latestEvm = getLatestEvm('proj-1')

  const spi = latestEvm ? calculateSPI(latestEvm.earnedValue, latestEvm.plannedValue) : 1
  const cpi = latestEvm ? calculateCPI(latestEvm.earnedValue, latestEvm.actualCost) : 1

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Projects"
        value={stats.totalProjects.toString()}
        change={25}
        changeLabel={`${stats.activeProjects} currently active`}
        accentColor="border-l-primary"
        bgGradient="bg-primary"
      />

      <StatCard
        title="Schedule Performance"
        value={spi.toFixed(2)}
        change={(spi - 1) * 100}
        changeLabel={spi >= 1 ? "Ahead of schedule" : "Behind schedule"}
        accentColor={spi >= 1 ? "border-l-green-500" : "border-l-orange-500"}
        bgGradient={spi >= 1 ? "bg-green-500" : "bg-orange-500"}
      />

      <StatCard
        title="Cost Performance"
        value={cpi.toFixed(2)}
        change={(cpi - 1) * 100}
        changeLabel={cpi >= 1 ? "Under budget" : "Over budget"}
        accentColor={cpi >= 1 ? "border-l-green-500" : "border-l-red-500"}
        bgGradient={cpi >= 1 ? "bg-green-500" : "bg-red-500"}
      />

      <StatCard
        title="Open Risks"
        value={stats.openRisks.toString()}
        change={stats.highRisks > 2 ? -15 : 10}
        changeLabel={`${stats.highRisks} high priority`}
        accentColor={stats.highRisks > 2 ? "border-l-red-500" : "border-l-yellow-500"}
        bgGradient={stats.highRisks > 2 ? "bg-red-500" : "bg-yellow-500"}
      />
    </div>
  )
}
