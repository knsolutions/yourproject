"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLatestEvm, formatCurrency } from "@/lib/mock-data"
import { calculateSPI, calculateCPI, calculateEAC, calculateCV, calculateSV } from "@/types/construction"

export function EVMMetrics() {
  const latestEvm = getLatestEvm('proj-1')

  if (!latestEvm) return null

  const { plannedValue, earnedValue, actualCost, budgetAtCompletion } = latestEvm

  const spi = calculateSPI(earnedValue, plannedValue)
  const cpi = calculateCPI(earnedValue, actualCost)
  const eac = calculateEAC(budgetAtCompletion, cpi)
  const cv = calculateCV(earnedValue, actualCost)
  const sv = calculateSV(earnedValue, plannedValue)

  const getStatusBadge = (value: number) => {
    if (value >= 1) return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">On Track</Badge>
    if (value >= 0.9) return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">At Risk</Badge>
    return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">Behind</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">EVM Indicators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Schedule Performance (SPI)</p>
            <p className="text-xl font-bold">{spi.toFixed(2)}</p>
          </div>
          {getStatusBadge(spi)}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Cost Performance (CPI)</p>
            <p className="text-xl font-bold">{cpi.toFixed(2)}</p>
          </div>
          {getStatusBadge(cpi)}
        </div>

        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Schedule Variance</p>
              <p className={`text-sm font-medium ${sv < 0 ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
                {formatCurrency(sv)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cost Variance</p>
              <p className={`text-sm font-medium ${cv < 0 ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
                {formatCurrency(cv)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Budget (BAC)</p>
              <p className="text-sm font-medium">{formatCurrency(budgetAtCompletion)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Est. at Completion</p>
              <p className="text-sm font-medium">{formatCurrency(eac)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
