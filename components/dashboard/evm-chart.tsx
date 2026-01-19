"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { evmData } from "@/lib/mock-data"

const chartConfig = {
  plannedValue: {
    label: "Planned Value (PV)",
    color: "var(--chart-1)",
  },
  earnedValue: {
    label: "Earned Value (EV)",
    color: "var(--chart-2)",
  },
  actualCost: {
    label: "Actual Cost (AC)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function EVMChart() {
  const chartData = evmData.map((d, index) => ({
    date: d.date,
    plannedValue: d.plannedValue / 1000000,
    earnedValue: d.earnedValue / 1000000,
    actualCost: d.actualCost / 1000000,
    isLatest: index === evmData.length - 1,
  }))

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/5 -mr-20 -mt-20" />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Earned Value Management</CardTitle>
        <CardDescription>
          Downtown Office Tower - Cost & Schedule Performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientPV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradientEV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradientAC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}M`}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                width={60}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Area
                type="monotone"
                dataKey="plannedValue"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#gradientPV)"
                dot={false}
                activeDot={{ r: 6, fill: 'var(--chart-1)', stroke: 'white', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="earnedValue"
                stroke="var(--chart-2)"
                strokeWidth={3}
                fill="url(#gradientEV)"
                dot={false}
                activeDot={{ r: 8, fill: 'var(--chart-2)', stroke: 'white', strokeWidth: 3 }}
              />
              <Area
                type="monotone"
                dataKey="actualCost"
                stroke="var(--chart-3)"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#gradientAC)"
                dot={false}
                activeDot={{ r: 6, fill: 'var(--chart-3)', stroke: 'white', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-chart-1" />
            <span className="text-xs text-muted-foreground">Planned Value</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1.5 rounded-full bg-chart-2" />
            <span className="text-xs text-muted-foreground">Earned Value</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-chart-3 opacity-70" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--chart-3) 0, var(--chart-3) 3px, transparent 3px, transparent 6px)' }} />
            <span className="text-xs text-muted-foreground">Actual Cost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
