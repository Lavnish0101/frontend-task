import type React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
}

export function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-icon">{icon}</div>
      </div>
      <div className="stat-card-content">
        <div className="stat-card-value">{value}</div>
        <span className={`stat-card-change ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? (
            <TrendingUp style={{ width: "0.75rem", height: "0.75rem" }} />
          ) : (
            <TrendingDown style={{ width: "0.75rem", height: "0.75rem" }} />
          )}
          {change}
        </span>
      </div>
    </div>
  )
}
