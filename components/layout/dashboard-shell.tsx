"use client"

import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardShellProps {
  children: React.ReactNode
  title: string
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
