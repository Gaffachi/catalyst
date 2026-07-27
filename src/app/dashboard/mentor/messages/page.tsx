"use client"

import * as React from "react"
import { MessageService } from "@/features/mentor/services/message.service"
import { StudentReviewService } from "@/features/mentor/services/student-review.service"
import { Message, Student } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Send, 
  Search, 
  MessageSquare, 
  BadgeCheck, 
  Loader2, 
  Paperclip, 
  Sparkles, 
  GraduationCap, 
  CheckCheck, 
  UserCheck
} from "lucide-react"

export default function MentorMessagesPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [students, setStudents] = React.useState<Student[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  
  // Selection & Search States
  const [activeStudentId, setActiveStudentId] = React.useState<string>("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState<string>("All")
  const [messageText, setMessageText] = React.useState("")

  const loadMessagesData = React.useCallback(async () => {
    try {
      const allMsgs = await MessageService.getMessages()
      const allStudents = await StudentReviewService.getStudents()

      setMessages(allMsgs)
      setStudents(allStudents)
      
      // Select first student with messages or first in list
      if (allMsgs.length > 0) {
        setActiveStudentId(allMsgs[0].senderId)
      } else if (allStudents.length > 0) {
        setActiveStudentId(allStudents[0].id)
      }
    } catch (err) {
      console.error("Failed to load mentor messages data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadMessagesData()
  }, [loadMessagesData])

  // Mark active chat messages as read
  React.useEffect(() => {
    if (activeStudentId) {
      MessageService.markAsRead(activeStudentId).then((updated) => {
        setMessages(updated)
      })
    }
  }, [activeStudentId])

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!messageText.trim() || !activeStudentId) return

    try {
      const updated = await MessageService.sendMessage(activeStudentId, messageText)
      setMessages(updated)
      setMessageText("")
    } catch (err) {
      console.error("Failed to send message:", err)
    }
  }

  const handleQuickPrompt = (promptText: string) => {
    setMessageText(promptText)
  }

  const getUnreadCount = (studentId: string) => {
    return messages.filter((msg) => msg.senderId === studentId && msg.isUnread).length
  }

  // Filter student list
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.programme.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.employmentGoal.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === "Unread") return matchesSearch && getUnreadCount(s.id) > 0
    if (activeFilter === "Active") return matchesSearch && s.mentorshipStatus === "Active"
    return matchesSearch
  })

  // Get active student object
  const activeStudent = students.find((s) => s.id === activeStudentId) || students[0]

  // Filter active chat thread
  const activeThread = messages.filter(
    (msg) =>
      (msg.senderId === activeStudentId && msg.recipientId === "mentor-sarah") ||
      (msg.senderId === "mentor-sarah" && msg.recipientId === activeStudentId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  if (isLoading) {
    return (
      <div className="min-h-[450px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading student conversation threads...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-border/80 bg-card shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-accent font-bold">
              <MessageSquare className="size-4" />
            </span>
            <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Mentorship Consultation Console
            </h1>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl">
            Provide direct 1-on-1 technical feedback, review student project codebases, and answer career guidance questions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 text-xs font-bold">
            <GraduationCap className="size-3.5" />
            Academic Mentor Channel
          </span>
        </div>
      </div>

      {/* Main Spacious Messaging Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-210px)] min-h-[620px] max-h-[780px] items-stretch">
        
        {/* LEFT PANEL: Student Mentees List (4 Columns) */}
        <Card className="lg:col-span-4 flex flex-col border border-border/70 bg-card shadow-sm h-full overflow-hidden rounded-3xl select-none">
          
          {/* Header & Search */}
          <div className="p-4 border-b border-border/40 space-y-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground font-heading">
                Cohort Mentees
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-accent border border-orange-200/50">
                {students.length} Students
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <Input
                placeholder="Search student name or goal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-background border-border/60 rounded-xl focus-visible:ring-accent/40"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {["All", "Unread", "Active"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer transition-all ${
                    activeFilter === filter
                      ? "bg-slate-900 text-white dark:bg-accent dark:text-white"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Student List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/30 p-2 space-y-1">
            {filteredStudents.map((student) => {
              const isSelected = student.id === activeStudentId
              const unread = getUnreadCount(student.id)
              const initials = student.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()

              return (
                <div
                  key={student.id}
                  onClick={() => setActiveStudentId(student.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-orange-50/70 dark:bg-slate-800/90 border border-orange-200/80 dark:border-accent/40 shadow-xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative shrink-0">
                      <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-xs flex items-center justify-center shadow-xs border border-white/20">
                        {initials}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <span className="font-bold text-xs text-foreground block truncate">{student.name}</span>
                      <p className="text-[11px] text-accent font-semibold truncate">{student.employmentGoal}</p>
                      <span className="text-[10px] text-slate-400 block truncate">{student.programme}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    {unread > 0 ? (
                      <span className="h-5 w-5 bg-accent text-white flex items-center justify-center text-[10px] font-bold rounded-full ml-auto animate-pulse">
                        {unread}
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50 block">
                        Readiness {student.readinessScore}%
                      </span>
                    )}
                  </div>
                </div>
              )
            })}

            {filteredStudents.length === 0 && (
              <div className="p-8 text-center text-xs text-muted-foreground italic">
                No matching students found.
              </div>
            )}
          </div>
        </Card>

        {/* RIGHT PANEL: Chat Workspace (8 Columns) */}
        <Card className="lg:col-span-8 flex flex-col justify-between border border-border/70 bg-card shadow-sm h-full overflow-hidden rounded-3xl">
          
          {/* Active Recipient Bar */}
          {activeStudent && (
            <div className="p-4 sm:p-5 border-b border-border/40 flex justify-between items-center bg-slate-50/60 dark:bg-slate-900/50 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="relative shrink-0">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-accent to-orange-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                    {activeStudent.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
                      {activeStudent.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50">
                      Readiness: {activeStudent.readinessScore}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    {activeStudent.programme} — Target: <span className="font-bold text-accent">{activeStudent.employmentGoal}</span>
                  </p>
                </div>
              </div>

              <div className="shrink-0 hidden sm:flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                  <BadgeCheck className="size-3" />
                  Assigned Mentee
                </span>
              </div>
            </div>
          )}

          {/* Messages Body Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20 dark:bg-slate-950/20">
            <div className="flex items-center justify-center my-2 select-none">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-border/40">
                1-on-1 Mentorship Thread
              </span>
            </div>

            {activeThread.map((msg) => {
              const isMentor = msg.senderId === "mentor-sarah"
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isMentor ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                >
                  <div className="max-w-[80%] sm:max-w-[70%] space-y-1">
                    {!isMentor && (
                      <span className="text-[10px] font-bold text-slate-400 block px-1">
                        {msg.senderName}
                      </span>
                    )}
                    <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMentor 
                        ? "bg-slate-900 text-white dark:bg-accent dark:text-white rounded-br-xs font-normal" 
                        : "bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-bl-xs border border-border/80 font-normal"
                    }`}>
                      <p>{msg.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-[9px] font-semibold ${isMentor ? "justify-end text-slate-400" : "justify-start text-slate-400"} px-1`}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isMentor && <CheckCheck className="size-3 text-accent" />}
                    </div>
                  </div>
                </div>
              )
            })}

            {activeThread.length === 0 && activeStudent && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic space-y-2 py-12 select-none">
                <MessageSquare className="size-10 text-slate-300" />
                <span className="text-xs font-semibold">No active message history with {activeStudent.name}.</span>
                <p className="text-[11px] max-w-xs text-center font-normal">Use the quick mentor action prompts below to send feedback or schedule a sync.</p>
              </div>
            )}
          </div>

          {/* Quick Prompts & Form Footer */}
          <div className="p-4 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/40 space-y-3 shrink-0">
            {/* Mentor Action Prompts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
                <Sparkles className="size-3 text-accent" />
                Mentor Actions:
              </span>
              <button 
                type="button"
                onClick={() => handleQuickPrompt(`Hi ${activeStudent?.name}, I reviewed your latest portfolio submission. Great progress on the backend architecture!`)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                💻 Send Portfolio Feedback
              </button>
              <button 
                type="button"
                onClick={() => handleQuickPrompt(`Hi ${activeStudent?.name}, let's schedule a 20-minute video sync this Wednesday to prepare for your tech interview.`)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                🗓️ Propose Sync Slot
              </button>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSend} className="flex gap-2.5 items-center">
              <button 
                type="button" 
                className="p-2.5 rounded-xl border border-border/60 text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0 transition-colors"
                title="Attach review notes or document"
              >
                <Paperclip className="size-4" />
              </button>

              <Input
                placeholder={activeStudent ? `Reply to ${activeStudent.name}...` : "Select a student..."}
                disabled={!activeStudentId}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-grow h-11 px-4 border border-border/80 rounded-xl bg-background text-xs focus-visible:ring-accent/40"
              />

              <Button
                type="submit"
                disabled={!messageText.trim() || !activeStudentId}
                className="bg-accent hover:bg-accent/90 text-white font-bold h-11 px-5 rounded-xl cursor-pointer disabled:opacity-50 shrink-0 border-0 transition-all"
              >
                <span className="hidden sm:inline text-xs mr-1.5">Send</span>
                <Send className="size-4" />
              </Button>
            </form>
          </div>

        </Card>

      </div>
    </div>
  )
}
