import { DashboardShell } from "@/components/layout/dashboard-shell"
import { QuickMetrics } from "@/components/dashboard/quick-metrics"
import { AllProjectsStages } from "@/components/dashboard/all-projects-stages"
import { RiskSummary } from "@/components/dashboard/risk-summary"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <div className="space-y-4">
        {/* Quick Metrics with Sparklines */}
        <QuickMetrics />

        {/* Projects Overview - Compact */}
        <AllProjectsStages />

        {/* Bottom Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          <RiskSummary />
          <RecentActivity />
        </div>
      </div>
    </DashboardShell>
  )
}
