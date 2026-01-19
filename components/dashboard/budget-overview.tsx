"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts"
import { projects } from "@/lib/mock-data"

const chartConfig = {
  budget: {
    label: "Budget",
    color: "var(--chart-1)",
  },
  spent: {
    label: "Spent",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function BudgetOverview() {
  const chartData = projects.map((p) => ({
    name: p.name.split(' ').slice(0, 2).join(' '),
    fullName: p.name,
    budget: p.budget / 1000000,
    spent: p.actualCost / 1000000,
    percentUsed: (p.actualCost / p.budget) * 100,
  }))

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-chart-1/5 -ml-16 -mb-16" />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Budget Overview</CardTitle>
        <CardDescription>Budget vs actual spend by project (in millions)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}M`}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={90}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
              />
              <Bar dataKey="budget" fill="var(--chart-1)" radius={[0, 4, 4, 0]} opacity={0.2} barSize={20} />
              <Bar dataKey="spent" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.percentUsed > 90 ? "var(--chart-3)" : "var(--chart-1)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-chart-1 opacity-30" />
            <span className="text-xs text-muted-foreground">Budget</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-chart-1" />
            <span className="text-xs text-muted-foreground">Spent (on track)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-chart-3" />
            <span className="text-xs text-muted-foreground">Spent (over 90%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
