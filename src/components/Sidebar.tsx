import type React from "react"
import { useState } from "react"
import { BarChart3, Home, List, Settings, User, ChevronLeft, ChevronRight, Star } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
  userName: string
  userAvatar: string
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
  defaultIcon?: string;
  hoverIcon?: string;
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
  isCollapsed,
  defaultIcon,
  hoverIcon,
}: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    if (isActive) {
      return icon;
    }
    if (isHovered && hoverIcon) {
      return (
        <img
          src={hoverIcon}
          alt={label}
          style={{ width: "1.25rem", height: "1.25rem" }}
        />
      );
    }
    if (defaultIcon) {
      return (
        <img
          src={defaultIcon}
          alt={label}
          style={{ width: "1.25rem", height: "1.25rem" }}
        />
      );
    }
    return icon;
  };

  return (
    <div
      className={`nav-item ${isActive ? "active" : ""}`}
      onClick={onClick}
      title={isCollapsed ? label : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={isActive ? "nav-item-icon active" : "nav-item-icon"}>
        {getIcon()}
      </div>
      {!isCollapsed && <span>{label}</span>}
    </div>
  );
}

export function Sidebar({ activeSection, onNavigate, userName, userAvatar }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleProfileClick = () => {
    onNavigate("settings")
  }

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`} style={{ transition: "width 0.3s ease" }}>
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-content">
            <div className="sidebar-logo-icon">
              <BarChart3 style={{ width: "1.25rem", height: "1.25rem", color: "white" }} />
            </div>
            {!isCollapsed && <span className="sidebar-logo-text">Dashdark X</span>}
          </div>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="sidebar-toggle">
            {isCollapsed ? (
              <ChevronRight style={{ width: "1rem", height: "1rem" }} />
            ) : (
              <ChevronLeft style={{ width: "1rem", height: "1rem" }} />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-list">
          <NavItem
            icon={
              <img
                src="/Rectangle 5913.png"
                alt="home"
                style={{ width: "1.25rem", height: "1.25rem" }}
              />
            }
            label="Dashboard"
            isActive={activeSection === "dashboard"}
            onClick={() => onNavigate("dashboard")}
            isCollapsed={isCollapsed}
            defaultIcon="/default.png"
            hoverIcon="/hover.png"
          />
          <NavItem
            icon={<Star style={{ width: "1.25rem", height: "1.25rem" }} />}
            label="Product List"
            isActive={activeSection === "product-list"}
            onClick={() => onNavigate("product-list")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<Settings style={{ width: "1.25rem", height: "1.25rem" }} />}
            label="Settings"
            isActive={activeSection === "settings"}
            onClick={() => onNavigate("settings")}
            isCollapsed={isCollapsed}
          />
        </div>
      </nav>

      {/* User Profile */}
      <div className="sidebar-profile">
        <div className="sidebar-profile-content" onClick={handleProfileClick}>
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-avatar">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} />
              ) : (
                <img src="/john.png" alt="John Carter" />
              )}
            </div>
            {!isCollapsed && <span className="sidebar-profile-name">{userName}</span>}
          </div>
          {!isCollapsed && (
            <button className="sidebar-profile-arrow" title="Go to Personal Information">
              <ChevronRight style={{ width: "1rem", height: "1rem" }} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
