import { useState, useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";

const chartData = {
  "jan2023-dec2023": {
    revenue: "240.8K",
    change: "+24.6%",
    revenuePath:
      "M 20 270 C 80 200, 150 120, 240 100 C 330 80, 400 120, 480 40",
    expensesPath:
      "M 20 240 C 80 280, 180 100, 280 160 C 380 220, 420 100, 480 80",
    dataPoint: { x: 240, y: 100, value: "$125.2k", date: "June 21, 2023" },
  },
  "jan2024-dec2024": {
    revenue: "320.5K",
    change: "+18.2%",
    revenuePath:
      "M 20 250 C 80 180, 150 100, 240 80 C 330 60, 400 100, 480 20",
    expensesPath:
      "M 20 220 C 80 260, 180 80, 280 140 C 380 200, 420 80, 480 60",
    dataPoint: { x: 280, y: 140, value: "$185.7K", date: "Aug 15, 2024" },
  },
  "jan2022-dec2022": {
    revenue: "180.3K",
    change: "+12.8%",
    revenuePath:
      "M 20 280 C 80 220, 150 140, 240 120 C 330 100, 400 140, 480 60",
    expensesPath:
      "M 20 260 C 80 300, 180 120, 280 180 C 380 240, 420 120, 480 100",
    dataPoint: { x: 360, y: 130, value: "$95.4K", date: "Oct 12, 2022" },
  },
  "jan2021-dec2021": {
    revenue: "150.7K",
    change: "+8.4%",
    revenuePath:
      "M 20 290 C 80 240, 150 160, 240 140 C 330 120, 400 160, 480 80",
    expensesPath:
      "M 20 280 C 80 320, 180 140, 280 200 C 380 260, 420 140, 480 120",
    dataPoint: { x: 400, y: 150, value: "$78.9K", date: "Dec 5, 2021" },
  },
};

const dateOptions = [
  { value: "jan2023-dec2023", label: "Jan 2023 - Dec 2023" },
  { value: "jan2024-dec2024", label: "Jan 2024 - Dec 2024" },
  { value: "jan2022-dec2022", label: "Jan 2022 - Dec 2022" },
  { value: "jan2021-dec2021", label: "Jan 2021 - Dec 2021" },
];

export function RevenueChart() {
  const [selectedDateRange, setSelectedDateRange] = useState("jan2023-dec2023");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentData = chartData[selectedDateRange as keyof typeof chartData];
  const selectedLabel = dateOptions.find(
    (option) => option.value === selectedDateRange
  )?.label;

  const handleDateChange = (value: string) => {
    setSelectedDateRange(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="revenue-chart">
      <div className="revenue-chart-header">
        <div className="revenue-chart-header-content">
          <div className="revenue-chart-title-section">
            <div className="revenue-chart-title">Total revenue</div>
            <div className="revenue-chart-value-section">
              <span className="revenue-chart-value">
                ${currentData.revenue}
              </span>
              <span className="revenue-chart-change">
                <TrendingUp style={{ width: "0.75rem", height: "0.75rem" }} />
                {currentData.change}
              </span>
            </div>
          </div>
          <div className="revenue-chart-controls">
            <div className="revenue-chart-legend">
              <div className="revenue-chart-legend-item">
                <div className="revenue-chart-legend-dot revenue"></div>
                <span className="revenue-chart-legend-text">Revenue</span>
              </div>
              <div className="revenue-chart-legend-item">
                <div className="revenue-chart-legend-dot expenses"></div>
                <span className="revenue-chart-legend-text">Expenses</span>
              </div>
            </div>
            <div className="date-dropdown" ref={dropdownRef}>
              <button
                className="date-dropdown-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedLabel}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="date-dropdown-content">
                  {dateOptions.map((option) => (
                    <div
                      key={option.value}
                      className="date-dropdown-item"
                      onClick={() => handleDateChange(option.value)}
                    >
                      <span>{option.label}</span>
                      {selectedDateRange === option.value && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="revenue-chart-content">
        <div className="revenue-chart-container">
          <div className="revenue-chart-y-axis">
            <span>250K</span>
            <span>200K</span>
            <span>150K</span>
            <span>100K</span>
            <span>50K</span>
            <span>0K</span>
          </div>
          <div className="revenue-chart-area" style={{ position: "relative" }}>
            <svg
              className="revenue-chart-svg"
              viewBox="0 0 500 280"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern
                  id="grid"
                  width="50"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 40"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </pattern>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              <path
                d={currentData.revenuePath + " L 480 280 L 20 280 Z"}
                fill="url(#revenueFill)"
                strokeWidth="0"
              />
              <path
                d={currentData.expensesPath + " L 480 280 L 20 280 Z"}
                fill="url(#expensesFill)"
                strokeWidth="0"
              />

              <path
                d={currentData.revenuePath}
                stroke="#a855f7"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={currentData.expensesPath}
                stroke="#06b6d4"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              <circle
                cx={currentData.dataPoint.x}
                cy={currentData.dataPoint.y}
                r="5"
                fill="#a855f7"
                stroke="#1e293b"
                strokeWidth="2"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                left: `${(currentData.dataPoint.x / 500) * 100}%`,
                top: `${(currentData.dataPoint.y / 280) * 100}%`,
                transform: "translate(-50%, -120%)",
                backgroundColor: "#1e293b",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                border: "1px solid #475569",
                color: "white",
                textAlign: "center",
                minWidth: "120px",
                pointerEvents: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "16px", fontWeight: "700" }}>
                  {currentData.dataPoint.value}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#103941",
                    borderRadius: "2px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#4ade80",
                    border: "0.1px solid #4ade80",
                  }}
                >
                  <TrendingUp style={{ width: "0.75rem", height: "0.75rem", marginRight: "4px" }} />
                  {currentData.change}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>
                {currentData.dataPoint.date}
              </div>
            </div>
            <div className="revenue-chart-x-axis">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
