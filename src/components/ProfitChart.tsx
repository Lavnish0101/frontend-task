import { TrendingUp } from "lucide-react"

export function ProfitChart() {
  const profitData = [
    { purple: 60, blue: 40 }, { purple: 50, blue: 30 }, { purple: 70, blue: 20 },
    { purple: 40, blue: 50 }, { purple: 80, blue: 60 }, { purple: 50, blue: 70 },
    { purple: 60, blue: 40 }, { purple: 50, blue: 30 }, { purple: 70, blue: 20 },
    { purple: 40, blue: 50 }, { purple: 80, blue: 60 }, { purple: 50, blue: 70 },
    { purple: 60, blue: 40 }, { purple: 50, blue: 30 }, { purple: 70, blue: 20 },
    { purple: 40, blue: 50 }, { purple: 80, blue: 60 }, { purple: 50, blue: 70 },
  ];

  return (
    <div className="small-chart">
      <div className="small-chart-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <TrendingUp style={{ width: "1.25rem", height: "1.25rem", color: "#94a3b8" }} />
          <div className="small-chart-title">Total profit</div>
        </div>
        <div className="small-chart-value-section">
          <span className="small-chart-value">$144.6K</span>
          <span className="small-chart-change">
            <TrendingUp style={{ width: "0.75rem", height: "0.75rem" }} />
            +28.5%
          </span>
        </div>
      </div>
      <div className="small-chart-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "6rem" }}>
        {profitData.flatMap((data, index) => [
          <div key={`${index}-purple`} className="small-chart-bar" style={{ height: `${data.purple}%`, backgroundColor: "#00C2FF", width: "4px" }} />,
          <div key={`${index}-blue`} className="small-chart-bar" style={{ height: `${data.blue}%`, backgroundColor: "#CB3CFF", width: "4px" }} />
        ])}
      </div>
      <div className="small-chart-x-axis">
        <span>12 AM</span>
        <span>8 AM</span>
        <span>4 PM</span>
        <span>11 PM</span>
      </div>
      <span className="small-chart-subtitle" style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>Last 12 months</span>
    </div>
  )
}
