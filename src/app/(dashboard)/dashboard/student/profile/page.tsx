"use client"

import * as React from "react"
import { ProfileService } from "@/features/student/services/profile.service"
import { StudentProfile, CareerStatus } from "@/features/student/types/student.types"
import { ProfileSectionCard } from "@/features/student/components/ProfileSectionCard"
import { InformationField } from "@/features/student/components/InformationField"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  School, 
  Target, 
  FileBadge, 
  Loader2, 
  Edit2, 
  Save, 
  X,
  FileText,
  Compass,
  Eye,
  EyeOff
} from "lucide-react"

export default function StudentProfilePage() {
  const [profile, setProfile] = React.useState<StudentProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isEditing, setIsEditing] = React.useState(false)
  
  // Form States
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [graduationYear, setGraduationYear] = React.useState("")
  const [bio, setBio] = React.useState("")
  
  // Employment Enhancements Form States
  const [careerStatus, setCareerStatus] = React.useState<CareerStatus>("Seeking graduate employment")
  const [preferredJobTypes, setPreferredJobTypes] = React.useState<string[]>([])
  const [preferredWorkModes, setPreferredWorkModes] = React.useState<string[]>([])
  const [preferredLocations, setPreferredLocations] = React.useState<string[]>([])
  const [availabilityDate, setAvailabilityDate] = React.useState("")
  const [allowEmployerDiscovery, setAllowEmployerDiscovery] = React.useState(true)

  React.useEffect(() => {
    async function loadData() {
      try {
        const data = await ProfileService.getProfile()
        setProfile(data)
        setName(data.name)
        setEmail(data.email)
        setPhone(data.phone)
        setLocation(data.location)
        setGraduationYear(data.graduationYear)
        setBio(data.bio)
        
        // Load enhancements
        setCareerStatus(data.careerStatus || "Seeking graduate employment")
        setPreferredJobTypes(data.preferredJobTypes || [])
        setPreferredWorkModes(data.preferredWorkModes || [])
        setPreferredLocations(data.preferredLocations || [])
        setAvailabilityDate(data.availabilityDate || "")
        setAllowEmployerDiscovery(data.allowEmployerDiscovery ?? true)
      } catch (err) {
        console.error("Failed to load profile:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const updated = await ProfileService.updateProfile({
        name,
        email,
        phone,
        location,
        graduationYear,
        bio,
        careerStatus,
        preferredJobTypes,
        preferredWorkModes,
        preferredLocations,
        availabilityDate,
        allowEmployerDiscovery,
      })
      setProfile(updated)
      setIsEditing(false)
    } catch (err) {
      console.error("Failed to update profile:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleJobType = (type: string) => {
    if (preferredJobTypes.includes(type)) {
      setPreferredJobTypes(preferredJobTypes.filter((t) => t !== type))
    } else {
      setPreferredJobTypes([...preferredJobTypes, type])
    }
  }

  const handleToggleWorkMode = (mode: string) => {
    if (preferredWorkModes.includes(mode)) {
      setPreferredWorkModes(preferredWorkModes.filter((m) => m !== mode))
    } else {
      setPreferredWorkModes([...preferredWorkModes, mode])
    }
  }

  const handleToggleLocation = (loc: string) => {
    if (preferredLocations.includes(loc)) {
      setPreferredLocations(preferredLocations.filter((l) => l !== loc))
    } else {
      setPreferredLocations([...preferredLocations, loc])
    }
  }

  if (isLoading && !profile) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading career profile...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-border/40 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Career Profile
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage your personal data, credentials, and employment preferences.
          </p>
        </div>
        {!isEditing ? (
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            className="bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-semibold text-xs cursor-pointer select-none"
          >
            <Edit2 className="size-3.5 mr-1.5" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="h-9 rounded-xl text-xs border-slate-200"
            >
              <X className="size-3.5 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-slate-900 text-white hover:bg-slate-800 border-0 h-9 rounded-xl font-semibold text-xs cursor-pointer"
            >
              <Save className="size-3.5 mr-1.5" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 1: Personal Info */}
          <ProfileSectionCard title="Personal Information" icon={User}>
            {isEditing ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">Email Address</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">Contact Number</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">Current Location</label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} className="h-9 text-xs" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <InformationField label="Full Name" value={profile.name} />
                <InformationField label="Email Address" value={profile.email} />
                <InformationField label="Contact Number" value={profile.phone} />
                <InformationField label="Location" value={profile.location} />
              </div>
            )}
          </ProfileSectionCard>

          {/* Section 2: Academic Background */}
          <ProfileSectionCard title="Academic Background" icon={School}>
            <div className="grid grid-cols-2 gap-4">
              <InformationField label="Institution" value={profile.institution} />
              <InformationField label="Programme" value={profile.programme} />
              <InformationField label="Current Level" value={profile.level} />
              {isEditing ? (
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] font-bold text-slate-500">Graduation Year</label>
                  <Input value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} className="h-9 text-xs" />
                </div>
              ) : (
                <InformationField label="Graduation Year" value={profile.graduationYear} />
              )}
            </div>
          </ProfileSectionCard>

          {/* Section 3: Career Status & Preferences */}
          <ProfileSectionCard title="Employment Pathway & Preferences" icon={Compass}>
            {isEditing ? (
              <div className="space-y-4">
                {/* Career Status Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">Current Career Status</label>
                  <select 
                    value={careerStatus} 
                    onChange={(e) => setCareerStatus(e.target.value as CareerStatus)}
                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="Exploring career opportunities">Exploring career opportunities</option>
                    <option value="Seeking internship">Seeking internship</option>
                    <option value="Seeking graduate employment">Seeking graduate employment</option>
                    <option value="Open to full-time roles">Open to full-time roles</option>
                    <option value="Currently employed">Currently employed</option>
                  </select>
                </div>

                {/* Job Types */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 block">Preferred Job Types</label>
                  <div className="flex flex-wrap gap-2 pt-0.5 select-none">
                    {["Internship", "Graduate Program", "Full-Time Employment", "Contract"].map((type) => {
                      const isSelected = preferredJobTypes.includes(type)
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleToggleJobType(type)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-accent border-accent text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Work Modes */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 block">Work Modes</label>
                  <div className="flex flex-wrap gap-2 pt-0.5 select-none">
                    {["Remote", "Hybrid", "On-site"].map((mode) => {
                      const isSelected = preferredWorkModes.includes(mode)
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => handleToggleWorkMode(mode)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-accent border-accent text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {mode}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 block">Preferred Locations</label>
                  <div className="flex flex-wrap gap-2 pt-0.5 select-none">
                    {["Accra", "Ghana", "International"].map((loc) => {
                      const isSelected = preferredLocations.includes(loc)
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => handleToggleLocation(loc)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-accent border-accent text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {loc}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Availability Date */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">Availability Date</label>
                  <Input 
                    type="text" 
                    placeholder="E.g. September 2026" 
                    value={availabilityDate} 
                    onChange={(e) => setAvailabilityDate(e.target.value)} 
                    className="h-9 text-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <InformationField label="Career Status" value={<Badge variant="secondary" className="bg-orange-50 text-accent font-semibold px-2.5 py-0.5 text-[10px] uppercase border-0">{profile.careerStatus}</Badge>} />
                
                <InformationField 
                  label="Preferred Job Types" 
                  value={
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.preferredJobTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="text-[10px] font-semibold">{type}</Badge>
                      ))}
                    </div>
                  } 
                />

                <div className="grid grid-cols-2 gap-4">
                  <InformationField 
                    label="Preferred Mode" 
                    value={
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.preferredWorkModes.map((mode) => (
                          <Badge key={mode} variant="outline" className="text-[10px] border-slate-200 font-semibold">{mode}</Badge>
                        ))}
                      </div>
                    } 
                  />
                  <InformationField label="Availability Date" value={profile.availabilityDate || "Immediate"} />
                </div>

                <InformationField 
                  label="Locations" 
                  value={
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.preferredLocations.map((loc) => (
                        <Badge key={loc} variant="outline" className="text-[10px] border-slate-200 font-semibold">{loc}</Badge>
                      ))}
                    </div>
                  } 
                />
              </div>
            )}
          </ProfileSectionCard>

          {/* Section 4: Employer Visibility Settings */}
          <ProfileSectionCard title="Employer Visibility & Discovery" icon={allowEmployerDiscovery ? Eye : EyeOff}>
            <div className="space-y-4">
              {/* Toggle Switch */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-slate-50/20 select-none">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">Discovery Matching</h4>
                  <p className="text-[9px] text-muted-foreground leading-normal max-w-[220px]">
                    Allow verified recruiters to discover your index scorecard and contact details.
                  </p>
                </div>
                {isEditing ? (
                  <button
                    type="button"
                    onClick={() => setAllowEmployerDiscovery(!allowEmployerDiscovery)}
                    className={`h-6 w-11 rounded-full p-0.5 transition-colors cursor-pointer relative ${
                      allowEmployerDiscovery ? "bg-accent" : "bg-slate-300"
                    }`}
                  >
                    <span 
                      className={`h-5 w-5 rounded-full bg-white block transition-transform shadow ${
                        allowEmployerDiscovery ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                ) : (
                  <Badge className={`text-[10px] font-bold uppercase rounded-full ${
                    profile.allowEmployerDiscovery 
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0" 
                      : "bg-slate-100 text-slate-500 hover:bg-slate-100 border-0"
                  }`}>
                    {profile.allowEmployerDiscovery ? "Enabled" : "Disabled"}
                  </Badge>
                )}
              </div>

              {/* Discovery Details */}
              {allowEmployerDiscovery && (
                <div className="space-y-2.5 p-3.5 rounded-xl border border-dashed border-border/80 bg-slate-50/10 text-[10px] text-slate-500">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block">Recruiters can view:</span>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Technical competency stack tags</li>
                    <li>Vetted portfolio projects</li>
                    <li>Employability readiness score: <span className="font-extrabold text-accent">{profile.readinessScore}%</span></li>
                    <li>Assigned academic mentor verification badges</li>
                  </ul>
                </div>
              )}
            </div>
          </ProfileSectionCard>

          {/* Section 5: Academic Gaps & Career Interests */}
          <ProfileSectionCard title="Career Interests & Sectors" icon={Target}>
            <div className="space-y-4">
              <InformationField 
                label="Preferred Careers Goals" 
                value={
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.careerGoals.map((role) => (
                      <Badge key={role} variant="secondary" className="text-[10px] font-semibold">{role}</Badge>
                    ))}
                  </div>
                } 
              />
              <InformationField 
                label="Target Industries" 
                value={
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.preferredIndustries.map((ind) => (
                      <Badge key={ind} variant="outline" className="text-[10px] font-semibold border-slate-200">{ind}</Badge>
                    ))}
                  </div>
                } 
              />
            </div>
          </ProfileSectionCard>

          {/* Section 6: Certifications & CVs */}
          <ProfileSectionCard title="Credentials & Vetted CVs" icon={FileBadge}>
            <div className="space-y-4">
              <InformationField 
                label="Vetted Certifications" 
                value={
                  <div className="space-y-1.5 mt-1 select-none">
                    {profile.certifications.map((cert) => (
                      <div key={cert} className="text-xs font-semibold text-slate-700 bg-slate-50 p-1.5 rounded border border-border/50">
                        {cert}
                      </div>
                    ))}
                  </div>
                } 
              />
              <InformationField 
                label="Active CV / Resume" 
                value={
                  <div className="flex items-center gap-2 mt-1 p-2 rounded-xl border border-slate-200 bg-white">
                    <FileText className="size-4.5 text-accent" />
                    <span className="text-xs font-bold text-slate-700">alex-mensah-cv.pdf</span>
                    <Badge className="ml-auto bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-[9px] font-bold rounded-full">Vetted</Badge>
                  </div>
                } 
              />
            </div>
          </ProfileSectionCard>

          {/* Bio Box */}
          <div className="md:col-span-2 space-y-1.5 p-6 rounded-2xl border border-border bg-white dark:bg-slate-900 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Professional Bio Summary</h4>
            {isEditing ? (
              <textarea 
                rows={3} 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            ) : (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>

        </div>
      )}

    </div>
  )
}
