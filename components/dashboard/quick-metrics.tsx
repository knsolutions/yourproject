"use client"

import { Card, CardContent } from "@/components/ui/card"
import { evmData, formatCurrency, getLatestEvm, getDashboardStats } from "@/lib/mock-data"
import { calculateSPI, calculateCPI } from "@/types/construction"
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertTriangle, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

function MiniSparkline({ data, color }: { data: number[], color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 100 40" className="w-20 h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function QuickMetrics() {
  const stats = getDashboardStats()
  const latestEvm = getLatestEvm('proj-1')

  const spi = latestEvm ? calculateSPI(latestEvm.earnedValue, latestEvm.plannedValue) : 1
  const cpi = latestEvm ? calculateCPI(latestEvm.earnedValue, latestEvm.actualCost) : 1

  const spiData = evmData.map(d => calculateSPI(d.earnedValue, d.plannedValue))
  const cpiData = evmData.map(d => calculateCPI(d.earnedValue, d.actualCost))

  return (
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
      {/* Budget Card */}
      <Link href="/analytics">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <DollarSign className="h-4 w-4 text-primary" />
              <MiniSparkline data={evmData.map(d => d.actualCost / 1000000)} color="var(--primary)" />
            </div>
            <p className="text-2xl font-bold mt-2">{formatCurrency(stats.totalSpent)}</p>
            <p className="text-xs text-muted-foreground">of {formatCurrency(stats.totalBudget)}</p>
          </CardContent>
        </Card>
      </Link>

      {/* Schedule Performance */}
      <Link href="/analytics">
        <Card className={cn(
          "hover:shadow-md transition-shadow cursor-pointer border-l-4",
          spi >= 1 ? "border-l-green-500" : "border-l-orange-500"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Calendar className={cn("h-4 w-4", spi >= 1 ? "text-green-500" : "text-orange-500")} />
              <MiniSparkline data={spiData} color={spi >= 1 ? "#22c55e" : "#f97316"} />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold">{spi.toFixed(2)}</p>
              <span className={cn(
                "text-xs font-medium flex items-center",
                spi >= 1 ? "text-green-600" : "text-orange-600"
              )}>
                {spi >= 1 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Schedule (SPI)</p>
          </CardContent>
        </Card>
      </Link>

      {/* Cost Performance */}
      <Link href="/analytics">
        <Card className={cn(
          "hover:shadow-md transition-shadow cursor-pointer border-l-4",
          cpi >= 1 ? "border-l-green-500" : "border-l-red-500"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Activity className={cn("h-4 w-4", cpi >= 1 ? "text-green-500" : "text-red-500")} />
              <MiniSparkline data={cpiData} color={cpi >= 1 ? "#22c55e" : "#ef4444"} />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold">{cpi.toFixed(2)}</p>
              <span className={cn(
                "text-xs font-medium flex items-center",
                cpi >= 1 ? "text-green-600" : "text-red-600"
              )}>
                {cpi >= 1 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Cost (CPI)</p>
          </CardContent>
        </Card>
      </Link>

      {/* Risks */}
      <Link href="/risks">
        <Card className={cn(
          "hover:shadow-md transition-shadow cursor-pointer border-l-4",
          stats.highRisks > 2 ? "border-l-red-500" : "border-l-yellow-500"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <AlertTriangle className={cn("h-4 w-4", stats.highRisks > 2 ? "text-red-500" : "text-yellow-500")} />
              <div className="flex gap-1">
                {[...Array(stats.openRisks)].map((_, i) => (
                  <div key={i} className={cn(
                    "w-1.5 h-4 rounded-full",
                    i < stats.highRisks ? "bg-red-500" : "bg-yellow-400"
                  )} />
                ))}
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.openRisks}</p>
            <p className="text-xs text-muted-foreground">{stats.highRisks} high priority</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
