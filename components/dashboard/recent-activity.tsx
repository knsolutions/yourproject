"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { activities, getProjectById } from "@/lib/mock-data"
import { Flag, RefreshCw, AlertTriangle, AlertCircle } from "lucide-react"

export function RecentActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return <Flag className="h-4 w-4 text-green-500" />
      case 'update':
        return <RefreshCw className="h-4 w-4 text-blue-500" />
      case 'risk':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'issue':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'milestone':
        return <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30">Milestone</Badge>
      case 'update':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30">Update</Badge>
      case 'risk':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30">Risk</Badge>
      case 'issue':
        return <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30">Issue</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity) => {
            const project = getProjectById(activity.projectId)
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    {getTypeBadge(activity.type)}
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{project?.name}</span>
                    <span>•</span>
                    <span>{formatTimestamp(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
