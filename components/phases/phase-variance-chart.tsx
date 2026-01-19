"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer, Cell } from "recharts"
import { getStagesByProject } from "@/lib/mock-data"

const chartConfig = {
  costVariance: {
    label: "Cost Variance",
    color: "var(--chart-1)",
  },
  scheduleVariance: {
    label: "Schedule Variance",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

interface PhaseVarianceChartProps {
  projectId: string
}

export function PhaseVarianceChart({ projectId }: PhaseVarianceChartProps) {
  const stages = getStagesByProject(projectId)

  const chartData = stages
    .filter(s => s.status !== 'upcoming')
    .map(stage => ({
      name: stage.name.split(' ')[0],
      fullName: stage.name,
      costVariance: stage.costVariance,
      scheduleVariance: stage.scheduleVariance,
    }))

  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Variance by Stage</CardTitle>
        <div className="w-full h-0.5 bg-primary/20 mt-2" />
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-400" />
            <span className="text-sm text-muted-foreground">Under Budget / Ahead</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-400" />
            <span className="text-sm text-muted-foreground">Over Budget / Behind</span>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--foreground)', fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
                domain={['auto', 'auto']}
              />
              <ReferenceLine y={0} stroke="var(--border)" strokeWidth={2} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: 'var(--muted)', opacity: 0.1 }}
              />
              <Bar dataKey="costVariance" radius={[4, 4, 0, 0]} maxBarSize={50}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cost-${index}`}
                    fill={entry.costVariance >= 0 ? "#86efac" : "#fca5a5"}
                    stroke={entry.costVariance >= 0 ? "#22c55e" : "#ef4444"}
                    strokeWidth={1}
                  />
                ))}
              </Bar>
              <Bar dataKey="scheduleVariance" radius={[4, 4, 0, 0]} maxBarSize={50}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`schedule-${index}`}
                    fill={entry.scheduleVariance >= 0 ? "#93c5fd" : "#fdba74"}
                    stroke={entry.scheduleVariance >= 0 ? "#3b82f6" : "#f97316"}
                    strokeWidth={1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Secondary Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-300 border border-green-500" />
            <span className="text-xs text-muted-foreground">Cost Variance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-300 border border-blue-500" />
            <span className="text-xs text-muted-foreground">Schedule Variance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
