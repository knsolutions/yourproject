"use client"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-14 items-center border-b border-border bg-card px-6 flex-shrink-0">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
    </header>
  )
}
