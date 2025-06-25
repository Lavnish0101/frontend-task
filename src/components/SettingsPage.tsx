import type React from "react"
import { useState, useRef } from "react"
import { User, Bell, Upload, Edit, Mail, Camera, Smartphone } from "lucide-react"

interface SettingsPageProps {
  personalInfo: {
    fullName: string;
    email: string;
    shortDescription: string;
  };
  setPersonalInfo: React.Dispatch<React.SetStateAction<{
    fullName: string;
    email: string;
    shortDescription: string;
  }>>;
  hasProfilePhoto: boolean;
  setHasProfilePhoto: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFile: File | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export function SettingsPage({
  personalInfo,
  setPersonalInfo,
  hasProfilePhoto,
  setHasProfilePhoto,
  uploadedFile,
  setUploadedFile,
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("personal-information")
  const [notifications, setNotifications] = useState({
    mentionedInMessage: "inApp" as "inApp" | "email",
    someoneReplies: "email" as "inApp" | "email",
    assignedTask: "email" as "inApp" | "email",
    taskOverdue: "inApp" as "inApp" | "email",
    dailySummary: "email" as "inApp" | "email",
    weeklySummary: "inApp" as "inApp" | "email",
    monthlySummary: "inApp" as "inApp" | "email",
  })
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateNotification = (key: string, option: "inApp" | "email") => {
    setNotifications((prev) => ({
      ...prev,
      [key]: option,
    }))
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEditPhoto = () => {
    setShowPhotoUpload(true)
  }

  const handleDeletePhoto = () => {
    setHasProfilePhoto(false)
    setShowPhotoUpload(true)
    setUploadedFile(null)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setHasProfilePhoto(true)
    }
  }

  const handleSave = () => {
    // Here you would typically save the personalInfo and uploadedFile
    console.log("Saving data...", { personalInfo, hasProfilePhoto, uploadedFile });
    if (uploadedFile) {
      setHasProfilePhoto(true);
    }
    setShowPhotoUpload(false);
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="settings-container">
      {/* Settings Sidebar */}
      <div className="settings-sidebar">
        <div className="settings-sidebar-header">
          <h1 className="settings-sidebar-title">Settings</h1>
        </div>

        <div className="settings-sidebar-nav">
          <div className="settings-sidebar-nav-list">
            <button
              onClick={() => setActiveTab("personal-information")}
              className={`settings-sidebar-nav-item ${activeTab === "personal-information" ? "active" : ""}`}
            >
              <Edit style={{ width: "1.25rem", height: "1.25rem" }} />
              <span>Personal Information</span>
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`settings-sidebar-nav-item ${activeTab === "notifications" ? "active" : ""}`}
            >
              <Bell style={{ width: "1.25rem", height: "1.25rem" }} />
              <span>Notifications</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="settings-main">
        <div className="settings-main-header">
          {activeTab === "personal-information" && (
            <div className="settings-main-header-content">
              <h2>Personal Information</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing.</p>
            </div>
          )}
          {activeTab === "personal-information" && <button className="btn btn-primary" onClick={handleSave}>Save</button>}
        </div>

        <div className="settings-main-content">
          {activeTab === "personal-information" ? (
            <PersonalInformationForm
              personalInfo={personalInfo}
              onPersonalInfoChange={handlePersonalInfoChange}
              hasProfilePhoto={hasProfilePhoto}
              showPhotoUpload={showPhotoUpload}
              uploadedFile={uploadedFile}
              fileInputRef={fileInputRef}
              onEditPhoto={handleEditPhoto}
              onDeletePhoto={handleDeletePhoto}
              onFileUpload={handleFileUpload}
              onUploadClick={handleUploadClick}
              onCancelUpload={() => setShowPhotoUpload(false)}
            />
          ) : (
            <NotificationsForm notifications={notifications} onNotificationChange={updateNotification} />
          )}
        </div>
      </div>
    </div>
  )
}

interface PersonalInformationFormProps {
  personalInfo: {
    fullName: string
    email: string
    shortDescription: string
  }
  onPersonalInfoChange: (field: string, value: string) => void
  hasProfilePhoto: boolean
  showPhotoUpload: boolean
  uploadedFile: File | null
  fileInputRef: React.RefObject<HTMLInputElement>
  onEditPhoto: () => void
  onDeletePhoto: () => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUploadClick: (e: React.MouseEvent<HTMLDivElement>) => void
  onCancelUpload: () => void
}

function PersonalInformationForm({
  personalInfo,
  onPersonalInfoChange,
  hasProfilePhoto,
  showPhotoUpload,
  uploadedFile,
  fileInputRef,
  onEditPhoto,
  onDeletePhoto,
  onFileUpload,
  onUploadClick,
  onCancelUpload,
}: PersonalInformationFormProps) {
  return (
    <div className="personal-info-container">
      <div className="personal-info-form">
        {/* Full Name */}
        <div className="form-field">
          <label htmlFor="fullName" className="form-label">
            <User style={{ width: "1rem", height: "1rem" }} />
            Full name
          </label>
          <input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => onPersonalInfoChange("fullName", e.target.value)}
            className="form-input"
          />
        </div>

        {/* Email Address */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            <Mail style={{ width: "1rem", height: "1rem" }} />
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => onPersonalInfoChange("email", e.target.value)}
            className="form-input"
          />
        </div>

        {/* Photo Upload */}
        <div className="form-field">
          <label className="form-label">
            <Camera style={{ width: "1rem", height: "1rem" }} />
            Photo
          </label>
          {hasProfilePhoto && !showPhotoUpload ? (
            <div className="photo-upload-existing">
              <div className="photo-upload-avatar">
                {uploadedFile ? (
                  <img src={URL.createObjectURL(uploadedFile)} alt="Avatar" />
                ) : hasProfilePhoto ? (
                  <img src="/john.png" alt="Avatar" />
                ) : (
                  <User style={{ width: "2rem", height: "2rem", color: "white" }} />
                )}
              </div>
              <div className="photo-upload-actions">
                <button type="button" onClick={onEditPhoto} className="photo-upload-action">
                  Edit
                </button>
                <span className="photo-upload-separator">|</span>
                <button type="button" onClick={onDeletePhoto} className="photo-upload-action">
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="photo-upload-dropzone" onClick={onUploadClick}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileUpload} className="file-input" />
              <Upload className="photo-upload-icon" />
              <p className="photo-upload-text">
                <span className="photo-upload-text-highlight">Click to upload</span> or drag and drop
              </p>
              <p className="photo-upload-subtext">SVG, PNG, JPG or GIF (max. 800 x 400px)</p>
              {uploadedFile && <p className="photo-upload-file-info">Selected: {uploadedFile.name}</p>}
              {showPhotoUpload && hasProfilePhoto && (
                <button
                  type="button"
                  onClick={onCancelUpload}
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: "0.5rem" }}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>

        {/* Short Description */}
        <div className="form-field">
          <label htmlFor="description" className="form-label">
            <Edit style={{ width: "1rem", height: "1rem" }} />
            Short description
          </label>
          <textarea
            id="description"
            value={personalInfo.shortDescription}
            onChange={(e) => onPersonalInfoChange("shortDescription", e.target.value)}
            placeholder="Write a short bio about you..."
            className="form-textarea"
          />
        </div>
      </div>
    </div>
  )
}

interface NotificationsFormProps {
  notifications: {
    mentionedInMessage: "inApp" | "email"
    someoneReplies: "inApp" | "email"
    assignedTask: "inApp" | "email"
    taskOverdue: "inApp" | "email"
    dailySummary: "inApp" | "email"
    weeklySummary: "inApp" | "email"
    monthlySummary: "inApp" | "email"
  }
  onNotificationChange: (key: string, option: "inApp" | "email") => void
}

function NotificationsForm({ notifications, onNotificationChange }: NotificationsFormProps) {
  return (
    <div className="notifications-container">
      {/* General Notifications */}
      <div className="notifications-section">
        <h3 className="notifications-section-title">General notifications</h3>
        <p className="notifications-section-subtitle">Lorem ipsum dolor sit amet consectetur adipiscing.</p>

        <div className="notifications-list">
          <NotificationRow
            title="I'm mentioned in a message"
            selectedOption={notifications.mentionedInMessage}
            onOptionChange={(option) => onNotificationChange("mentionedInMessage", option)}
          />
          <NotificationRow
            title="Someone replies to any message"
            selectedOption={notifications.someoneReplies}
            onOptionChange={(option) => onNotificationChange("someoneReplies", option)}
          />
          <NotificationRow
            title="I'm assigned a task"
            selectedOption={notifications.assignedTask}
            onOptionChange={(option) => onNotificationChange("assignedTask", option)}
          />
          <NotificationRow
            title="A task is overdue"
            selectedOption={notifications.taskOverdue}
            onOptionChange={(option) => onNotificationChange("taskOverdue", option)}
          />
        </div>
      </div>

      {/* Summary Notifications */}
      <div className="notifications-section">
        <h3 className="notifications-section-title">Summary notifications</h3>
        <p className="notifications-section-subtitle">Lorem ipsum dolor sit amet consectetur adipiscing.</p>

        <div className="notifications-list">
          <NotificationRow
            title="Daily summary"
            selectedOption={notifications.dailySummary}
            onOptionChange={(option) => onNotificationChange("dailySummary", option)}
          />
          <NotificationRow
            title="Weekly summary"
            selectedOption={notifications.weeklySummary}
            onOptionChange={(option) => onNotificationChange("weeklySummary", option)}
          />
          <NotificationRow
            title="Monthly summary"
            selectedOption={notifications.monthlySummary}
            onOptionChange={(option) => onNotificationChange("monthlySummary", option)}
          />
        </div>
      </div>
    </div>
  )
}

interface NotificationRowProps {
  title: string
  selectedOption: "inApp" | "email"
  onOptionChange: (option: "inApp" | "email") => void
}

function NotificationRow({ title, selectedOption, onOptionChange }: NotificationRowProps) {
  return (
    <div className="notification-row">
      <div className="notification-row-content">
        <span className="notification-row-title">{title}</span>
        <div className="notification-row-tooltip">
          <span className="notification-row-tooltip-text">?</span>
        </div>
      </div>
      <div className="notification-row-controls">
        <div className="notification-toggle">
          <button
            onClick={() => onOptionChange("inApp")}
            className={`notification-toggle-btn ${selectedOption === "inApp" ? "active" : "inactive"}`}
          >
            <Smartphone style={{ width: "1rem", height: "1rem" }} />
            In-app
          </button>
          <button
            onClick={() => onOptionChange("email")}
            className={`notification-toggle-btn ${selectedOption === "email" ? "active" : "inactive"}`}
          >
            <Mail style={{ width: "1rem", height: "1rem" }} />
            Email
          </button>
        </div>
      </div>
    </div>
  )
}
