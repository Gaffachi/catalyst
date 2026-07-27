"use client"

import * as React from "react"
import { EmployerMessageService } from "@/features/employer/services/message.service"
import { Message } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Send, 
  Search, 
  MessageSquare, 
  Loader2, 
  Paperclip, 
  Sparkles, 
  Briefcase, 
  CheckCheck, 
  Users, 
  UserCheck,
  CalendarClock
} from "lucide-react"

interface CandidateContact {
  id: string
  name: string
  position: string
  programme: string
  stage: "Shortlisted" | "Interviewing" | "Applied"
  initials: string
  online: boolean
  lastSeen?: string
}

const CANDIDATE_CONTACTS: CandidateContact[] = [
  {
    id: "cand-alex-mensah",
    name: "Alex Mensah",
    position: "Junior Backend Engineer",
    programme: "MSc Information Technology",
    stage: "Shortlisted",
    initials: "AM",
    online: true,
  },
  {
    id: "cand-abena-owusu",
    name: "Abena Owusu",
    position: "DevOps & Cloud Intern",
    programme: "BSc Computer Engineering",
    stage: "Interviewing",
    initials: "AO",
    online: false,
    lastSeen: "1h ago",
  },
  {
    id: "cand-kofi-boateng",
    name: "Kofi Boateng",
    position: "Frontend React Developer",
    programme: "BSc Computer Science",
    stage: "Applied",
    initials: "KB",
    online: true,
  },
]

export default function EmployerMessagesPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeCandidateId, setActiveCandidateId] = React.useState<string>("cand-alex-mensah")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState<string>("All")
  const [messageText, setMessageText] = React.useState("")

  const loadMessages = React.useCallback(async () => {
    try {
      const data = await EmployerMessageService.getMessages()
      setMessages(data)
    } catch (err) {
      console.error("Failed to load employer messages:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const activeCandidate = CANDIDATE_CONTACTS.find((c) => c.id === activeCandidateId) || CANDIDATE_CONTACTS[0]

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!messageText.trim()) return

    try {
      const updated = await EmployerMessageService.sendMessage(messageText, activeCandidate.id)
      setMessages(updated)
      setMessageText("")
    } catch (err) {
      console.error("Failed to send message:", err)
    }
  }

  const handleQuickPrompt = (promptText: string) => {
    setMessageText(promptText)
  }

  const filteredCandidates = CANDIDATE_CONTACTS.filter((cand) => {
    const matchesSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cand.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.programme.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === "Shortlisted") return matchesSearch && cand.stage === "Shortlisted"
    if (activeFilter === "Interviewing") return matchesSearch && cand.stage === "Interviewing"
    return matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-[450px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading applicant conversations workspace...
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
              Candidate Recruitment Messaging
            </h1>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl">
            Communicate directly with verified graduate candidates regarding interview slots, technical assessments, and job offers.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 text-xs font-bold">
            <Users className="size-3.5" />
            Candidate Pipeline Chat
          </span>
        </div>
      </div>

      {/* Main Spacious Messaging Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-210px)] min-h-[620px] max-h-[780px] items-stretch">
        
        {/* LEFT PANEL: Applicant Thread List (4 Columns) */}
        <Card className="lg:col-span-4 flex flex-col border border-border/70 bg-card shadow-sm h-full overflow-hidden rounded-3xl select-none">
          
          {/* Header & Search */}
          <div className="p-4 border-b border-border/40 space-y-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground font-heading">
                Applicant Threads
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-accent border border-orange-200/50">
                {CANDIDATE_CONTACTS.length} Candidates
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <Input
                placeholder="Search candidate name or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-background border-border/60 rounded-xl focus-visible:ring-accent/40"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {["All", "Shortlisted", "Interviewing"].map((filter) => (
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

          {/* Scrollable Applicant List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/30 p-2 space-y-1">
            {filteredCandidates.map((cand) => {
              const isSelected = cand.id === activeCandidate.id
              return (
                <div
                  key={cand.id}
                  onClick={() => setActiveCandidateId(cand.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-orange-50/70 dark:bg-slate-800/90 border border-orange-200/80 dark:border-accent/40 shadow-xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative shrink-0">
                      <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-xs flex items-center justify-center shadow-xs border border-white/20">
                        {cand.initials}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                        cand.online ? "bg-emerald-500" : "bg-slate-300"
                      }`} />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <span className="font-bold text-xs text-foreground block truncate">{cand.name}</span>
                      <p className="text-[11px] text-accent font-semibold truncate">{cand.position}</p>
                      <span className="text-[10px] text-slate-400 block truncate">{cand.programme}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 block">
                      {cand.stage}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 block">
                      {cand.online ? "Online" : cand.lastSeen || "Offline"}
                    </span>
                  </div>
                </div>
              )
            })}

            {filteredCandidates.length === 0 && (
              <div className="p-8 text-center text-xs text-muted-foreground italic">
                No matching candidates found.
              </div>
            )}
          </div>
        </Card>

        {/* RIGHT PANEL: Chat Workspace (8 Columns) */}
        <Card className="lg:col-span-8 flex flex-col justify-between border border-border/70 bg-card shadow-sm h-full overflow-hidden rounded-3xl">
          
          {/* Recipient Header */}
          <div className="p-4 sm:p-5 border-b border-border/40 flex justify-between items-center bg-slate-50/60 dark:bg-slate-900/50 shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-accent to-orange-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {activeCandidate.initials}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                  activeCandidate.online ? "bg-emerald-500" : "bg-slate-300"
                }`} />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
                    {activeCandidate.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/50">
                    <Briefcase className="size-3" />
                    {activeCandidate.stage} Candidate
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Applied for <span className="font-bold text-accent">{activeCandidate.position}</span> — {activeCandidate.programme}
                </p>
              </div>
            </div>

            <div className="shrink-0 hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                <UserCheck className="size-3" />
                Vetted Talent Profile
              </span>
            </div>
          </div>

          {/* Messages Body Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20 dark:bg-slate-950/20">
            <div className="flex items-center justify-center my-2 select-none">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-border/40">
                Candidate Communication History
              </span>
            </div>

            {messages.map((msg) => {
              const isEmployer = msg.senderId === "comp-hubtel"
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isEmployer ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                >
                  <div className="max-w-[80%] sm:max-w-[70%] space-y-1">
                    {!isEmployer && (
                      <span className="text-[10px] font-bold text-slate-400 block px-1">
                        {msg.senderName}
                      </span>
                    )}
                    <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isEmployer 
                        ? "bg-slate-900 text-white dark:bg-accent dark:text-white rounded-br-xs font-normal" 
                        : "bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-bl-xs border border-border/80 font-normal"
                    }`}>
                      <p>{msg.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-[9px] font-semibold ${isEmployer ? "justify-end text-slate-400" : "justify-start text-slate-400"} px-1`}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isEmployer && <CheckCheck className="size-3 text-accent" />}
                    </div>
                  </div>
                </div>
              )
            })}

            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic space-y-2 py-12 select-none">
                <MessageSquare className="size-10 text-slate-300" />
                <span className="text-xs font-semibold">No active messages in this conversation.</span>
                <p className="text-[11px] max-w-xs text-center font-normal">Send an interview invite or technical screening question to start.</p>
              </div>
            )}
          </div>

          {/* Quick Prompts & Form Footer */}
          <div className="p-4 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/40 space-y-3 shrink-0">
            {/* Quick Action Prompts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
                <Sparkles className="size-3 text-accent" />
                Recruiter Actions:
              </span>
              <button 
                type="button"
                onClick={() => handleQuickPrompt(`Hi ${activeCandidate.name}, we would like to invite you for a 30-minute technical interview for the ${activeCandidate.position} role.`)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                🗓️ Schedule Technical Interview
              </button>
              <button 
                type="button"
                onClick={() => handleQuickPrompt(`Hi ${activeCandidate.name}, could you share a link to your GitHub repository and latest project architecture?`)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                💻 Request Code Repository
              </button>
              <button 
                type="button"
                onClick={() => handleQuickPrompt(`Congratulations ${activeCandidate.name}! We are pleased to advance your application to the final stage.`)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                🎉 Shortlist Candidate
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="flex gap-2.5 items-center">
              <button 
                type="button" 
                className="p-2.5 rounded-xl border border-border/60 text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0 transition-colors"
                title="Attach job specification or document"
              >
                <Paperclip className="size-4" />
              </button>

              <Input
                placeholder={`Type a message to ${activeCandidate.name}...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-grow h-11 px-4 border border-border/80 rounded-xl bg-background text-xs focus-visible:ring-accent/40"
              />

              <Button
                type="submit"
                disabled={!messageText.trim()}
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
