"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from "recharts"
import { evmData } from "@/lib/mock-data"
import { calculateSPI, calculateCPI } from "@/types/construction"
import { TrendingUp, TrendingDown } from "lucide-react"

const chartConfig = {
  spi: {
    label: "SPI",
    color: "var(--chart-1)",
  },
  cpi: {
    label: "CPI",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function PerformanceIndicators() {
  const chartData = evmData.map((d) => ({
    date: d.date,
    spi: calculateSPI(d.earnedValue, d.plannedValue),
    cpi: calculateCPI(d.earnedValue, d.actualCost),
  }))

  const latestSPI = chartData[chartData.length - 1]?.spi || 1
  const latestCPI = chartData[chartData.length - 1]?.cpi || 1

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-chart-2/5 -mr-16 -mt-16" />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performance Trends</CardTitle>
        <CardDescription>SPI & CPI over time - Target: 1.0</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Values */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Schedule (SPI)</span>
              {latestSPI >= 1 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-orange-500" />
              )}
            </div>
            <p className={`text-2xl font-bold mt-1 ${latestSPI >= 1 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
              {latestSPI.toFixed(2)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Cost (CPI)</span>
              {latestCPI >= 1 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
            <p className={`text-2xl font-bold mt-1 ${latestCPI >= 1 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {latestCPI.toFixed(2)}
            </p>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="spiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cpiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0.85, 1.05]}
                tickFormatter={(value) => value.toFixed(2)}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                width={45}
              />
              <ReferenceLine
                y={1}
                stroke="var(--muted-foreground)"
                strokeDasharray="5 5"
                strokeOpacity={0.5}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="spi"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#spiGradient)"
                dot={false}
                activeDot={{ r: 5, fill: 'var(--chart-1)', stroke: 'white', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="cpi"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#cpiGradient)"
                dot={false}
                activeDot={{ r: 5, fill: 'var(--chart-2)', stroke: 'white', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1" />
            <span className="text-xs text-muted-foreground">SPI (Schedule)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-xs text-muted-foreground">CPI (Cost)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
