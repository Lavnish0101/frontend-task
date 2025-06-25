import { useState } from "react"
import { Eye, Users, UserPlus, CreditCard } from "lucide-react"
import { Sidebar } from "./components/Sidebar"
import { StatCard } from "./components/StatCard"
import { RevenueChart } from "./components/RevenueChart"
import { ProfitChart } from "./components/ProfitChart"
import { SessionsChart } from "./components/SessionsChart"
import { SettingsPage } from "./components/SettingsPage"
import { ProductListPage } from "./components/ProductListPage"
import "./App.css"

function App() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Carter",
    email: "john@dashdark.com",
    shortDescription: "",
  })
  const [hasProfilePhoto, setHasProfilePhoto] = useState(true)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const renderContent = () => {
    switch (activeSection) {
      case "settings":
        return (
          <SettingsPage
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            hasProfilePhoto={hasProfilePhoto}
            setHasProfilePhoto={setHasProfilePhoto}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        )
      case "product-list":
        return <ProductListPage />
      case "dashboard":
      default:
        return (
          <main className="main-content">
            {/* Header */}
            <div className="page-header">
              <h1 className="page-title">Welcome back, John</h1>
              <p className="page-subtitle">Measure your advertising ROI and report website traffic.</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <StatCard
                title="Pageviews"
                value="50.8K"
                change="+5.4%"
                isPositive={true}
                icon={<Eye style={{ width: "1.25rem", height: "1.25rem" }} />}
              />
              <StatCard
                title="Monthly users"
                value="23.6K"
                change="-10.8%"
                isPositive={false}
                icon={<Users style={{ width: "1.25rem", height: "1.25rem" }} />}
              />
              <StatCard
                title="New sign ups"
                value="756"
                change="+16.2%"
                isPositive={true}
                icon={<UserPlus style={{ width: "1.25rem", height: "1.25rem" }} />}
              />
              <StatCard
                title="Subscriptions"
                value="2.3K"
                change="+8.5%"
                isPositive={true}
                icon={<CreditCard style={{ width: "1.25rem", height: "1.25rem" }} />}
              />
            </div>

            {/* Charts */}
            <div className="charts-grid">
              <RevenueChart />
              <div className="small-charts">
                <ProfitChart />
                <SessionsChart />
              </div>
            </div>
          </main>
        )
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        userName={personalInfo.fullName}
        userAvatar={uploadedFile ? URL.createObjectURL(uploadedFile) : hasProfilePhoto ? "/john.png" : ""}
      />
      {activeSection === "dashboard" ? renderContent() : <main className="main-content-full">{renderContent()}</main>}
    </div>
  )
}

export default App
