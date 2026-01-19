"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Risk } from "@/types/construction"
import { cn } from "@/lib/utils"

interface RiskMatrixProps {
  risks: Risk[]
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  const openRisks = risks.filter(r => r.status === 'open' || r.status === 'mitigated')

  const getCell = (probability: 'low' | 'medium' | 'high', impact: 'low' | 'medium' | 'high') => {
    return openRisks.filter(r => r.probability === probability && r.impact === impact)
  }

  const getCellColor = (probability: string, impact: string) => {
    const levels = { low: 1, medium: 2, high: 3 }
    const score = levels[probability as keyof typeof levels] * levels[impact as keyof typeof levels]

    if (score >= 6) return 'bg-red-500/30 hover:bg-red-500/40'
    if (score >= 4) return 'bg-orange-500/30 hover:bg-orange-500/40'
    if (score >= 2) return 'bg-yellow-500/30 hover:bg-yellow-500/40'
    return 'bg-green-500/30 hover:bg-green-500/40'
  }

  const getCellBorderColor = (probability: string, impact: string) => {
    const levels = { low: 1, medium: 2, high: 3 }
    const score = levels[probability as keyof typeof levels] * levels[impact as keyof typeof levels]

    if (score >= 6) return 'border-red-500/50'
    if (score >= 4) return 'border-orange-500/50'
    if (score >= 2) return 'border-yellow-500/50'
    return 'border-green-500/50'
  }

  const probabilityLevels: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low']
  const impactLevels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Matrix</CardTitle>
        <CardDescription>Probability vs Impact analysis of open risks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          {/* Y-axis label */}
          <div className="flex flex-col justify-center">
            <span className="text-xs text-muted-foreground -rotate-90 whitespace-nowrap">
              Probability
            </span>
          </div>

          <div className="flex-1">
            {/* Matrix grid */}
            <div className="grid grid-cols-4 gap-1">
              {/* Header row */}
              <div /> {/* Empty corner cell */}
              {impactLevels.map((impact) => (
                <div key={impact} className="text-center text-xs font-medium text-muted-foreground py-2 capitalize">
                  {impact}
                </div>
              ))}

              {/* Data rows */}
              {probabilityLevels.map((probability) => (
                <>
                  <div key={`label-${probability}`} className="flex items-center justify-end pr-2 text-xs font-medium text-muted-foreground capitalize">
                    {probability}
                  </div>
                  {impactLevels.map((impact) => {
                    const cellRisks = getCell(probability, impact)
                    return (
                      <div
                        key={`${probability}-${impact}`}
                        className={cn(
                          "aspect-square rounded-lg border-2 flex items-center justify-center transition-colors cursor-default",
                          getCellColor(probability, impact),
                          getCellBorderColor(probability, impact)
                        )}
                        title={cellRisks.map(r => r.title).join('\n')}
                      >
                        <span className="text-lg font-bold">
                          {cellRisks.length || ''}
                        </span>
                      </div>
                    )
                  })}
                </>
              ))}
            </div>

            {/* X-axis label */}
            <div className="text-center mt-2">
              <span className="text-xs text-muted-foreground">Impact</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-red-500/50" />
            <span>Critical (6-9)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-orange-500/50" />
            <span>High (4-5)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-yellow-500/50" />
            <span>Medium (2-3)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-green-500/50" />
            <span>Low (1)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
