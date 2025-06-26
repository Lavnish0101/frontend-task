import { TrendingUp, Clock } from "lucide-react"

export function SessionsChart() {
  return (
    <div className="small-chart">
      <div className="small-chart-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Clock style={{ width: "1.25rem", height: "1.25rem", color: "#94a3b8" }} />
          <div className="small-chart-title">Total sessions</div>
        </div>
        <div className="small-chart-value-section">
          <span className="small-chart-value">400</span>
          <span className="small-chart-change">
            <TrendingUp style={{ width: "0.75rem", height: "0.75rem" }} />
            +16.8%
          </span>
        </div>
      </div>
      <div style={{ display: "flex", height: "8rem", position: "relative", marginBottom: "1rem" }}>
        <div className="small-chart-y-axis" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: "0.5rem", fontSize: "12px", color: "#94a3b8" }}>
          <span>500</span>
          <span>250</span>
          <span>100</span>
          <span>0</span>
        </div>
        <svg className="sessions-chart-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
          <path
            d="M 0 80 L 40 40 L 60 60 L 80 20 L 120 50 L 150 10 L 180 90 L 220 80 L 250 80 L 280 40 L 300 90"
            stroke="#a855f7"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="small-chart-x-axis" style={{ paddingLeft: "2rem" }}>
        <span>12 AM</span>
        <span>8 AM</span>
        <span>4 PM</span>
        <span>11 PM</span>
      </div>

      <div className="small-chart-footer">
        <div className="small-chart-footer-item">
          <span className="small-chart-live">
            <div className="small-chart-footer-dot" style={{ backgroundColor: "#10b981" }}></div>
            Live
          </span>
          <span className="small-chart-footer-text" style={{ marginLeft: "0.5rem" }}>10k visitors</span>
        </div>
      </div>
    </div>
  )
}
