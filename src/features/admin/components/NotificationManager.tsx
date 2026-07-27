import * as React from "react"
import { PlatformAnnouncement } from "../types/admin.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Users, Calendar, Megaphone } from "lucide-react"

interface NotificationManagerProps {
  announcements: PlatformAnnouncement[]
  onCreateAnnouncement: (data: Omit<PlatformAnnouncement, "id" | "date" | "author">) => void
}

export function NotificationManager({ announcements, onCreateAnnouncement }: NotificationManagerProps) {
  const [showForm, setShowForm] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [audience, setAudience] = React.useState<PlatformAnnouncement["audience"]>("All Users")
  const [type, setType] = React.useState<PlatformAnnouncement["type"]>("Platform Update")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !message) return
    onCreateAnnouncement({ title, message, audience, type })
    setTitle("")
    setMessage("")
    setShowForm(false)
  }

  const getTypeBadge = (annType: PlatformAnnouncement["type"]) => {
    switch (annType) {
      case "Career Event":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-bold text-[10px]">Career Event</Badge>
      case "Platform Update":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-bold text-[10px]">Platform Update</Badge>
      case "Training Opportunity":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px]">Training Opportunity</Badge>
      case "Maintenance Notice":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-bold text-[10px]">Maintenance Notice</Badge>
    }
  }

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      {/* Header controls */}
      <div className="flex justify-between items-center border-b border-border/40 pb-3">
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          <Megaphone className="size-4 text-accent" />
          Broadcast Platform Announcements
        </h3>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-slate-900 hover:bg-slate-800 text-white h-8 rounded-xl font-bold text-xs cursor-pointer border-0"
        >
          <Plus className="size-3.5 mr-1" />
          Create Announcement
        </Button>
      </div>

      {/* Creation form */}
      {showForm && (
        <Card className="p-5 border border-orange-200 bg-orange-50/15 shadow-md space-y-4 animate-in slide-in-from-top-3 duration-250">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <h4 className="font-heading text-xs font-bold text-slate-800 border-b border-orange-200/60 pb-2">
              New Platform Broadcast Notice
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Announcement Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="E.g. 2026 Tech Career Fair Date..." className="h-9 text-xs bg-background" />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Target Audience</label>
                <select value={audience} onChange={(e) => setAudience(e.target.value as typeof audience)} className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none">
                  <option value="All Users">All Users</option>
                  <option value="Students">Students</option>
                  <option value="Mentors">Mentors</option>
                  <option value="Employers">Employers</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-600 uppercase text-[10px]">Category Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none">
                <option value="Platform Update">Platform Update</option>
                <option value="Career Event">Career Event</option>
                <option value="Training Opportunity">Training Opportunity</option>
                <option value="Maintenance Notice">Maintenance Notice</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-600 uppercase text-[10px]">Broadcast Message Body</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                placeholder="Enter detailed notice message for target users..."
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-sm focus-visible:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-1">
              <Button type="button" onClick={() => setShowForm(false)} variant="outline" className="h-8 rounded-xl font-bold text-xs cursor-pointer border-slate-200">
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white h-8 rounded-xl font-bold text-xs cursor-pointer border-0">
                Broadcast Announcement
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Announcements Stream */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} className="p-5 border border-border/60 bg-card shadow-sm space-y-3">
            <div className="flex justify-between items-start border-b border-border/30 pb-2 gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getTypeBadge(ann.type)}
                  <span className="text-[10px] font-bold text-accent bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 uppercase flex items-center gap-1">
                    <Users className="size-3" />
                    Audience: {ann.audience}
                  </span>
                </div>
                <h4 className="font-heading text-sm font-extrabold text-slate-850 dark:text-slate-100">
                  {ann.title}
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {ann.message}
            </p>

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1 border-t border-border/20">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                Posted: {ann.date}
              </span>
              <span>Author: {ann.author}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
