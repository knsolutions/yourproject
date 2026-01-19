"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  AlertTriangle,
  Building2,
  Settings,
  LogOut,
  Search,
  Bell,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Phases", href: "/phases", icon: Layers },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Risks", href: "/risks", icon: AlertTriangle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border flex-shrink-0">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <Building2 className="h-8 w-8 text-sidebar-primary" />
        <span className="text-lg font-semibold text-sidebar-foreground">
          BuildTrack
        </span>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-muted-foreground bg-sidebar hover:bg-sidebar-accent"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">Search...</span>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-4 space-y-3">
        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="relative text-sidebar-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-sidebar-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <Separator className="bg-sidebar-border" />
        {/* User profile */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
              PM
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Project Manager
            </p>
            <p className="text-xs text-muted-foreground truncate">
              pm@buildtrack.com
            </p>
          </div>
          <Button variant="ghost" size="icon" className="text-sidebar-foreground flex-shrink-0">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
