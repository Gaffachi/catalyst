"use client"

import * as React from "react"
import { MessageService } from "@/features/mentor/services/message.service"
import { Message } from "@/features/mentor/types/mentor.types"
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
  Calendar, 
  CheckCheck, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Filter,
  UserCheck
} from "lucide-react"

interface ContactThread {
  id: string
  name: string
  role: string
  company: string
  type: "mentor" | "employer" | "admin"
  initials: string
  online: boolean
  lastSeen?: string
}

const DEFAULT_CONTACTS: ContactThread[] = [
  {
    id: "mentor-sarah",
    name: "Sarah Johnson",
    role: "Senior Software Architect",
    company: "Google Ghana",
    type: "mentor",
    initials: "SJ",
    online: true,
  },
  {
    id: "employer-hubtel",
    name: "Kwadwo Mensah",
    role: "Lead Talent Recruiter",
    company: "Hubtel Ghana",
    type: "employer",
    initials: "KM",
    online: false,
    lastSeen: "2h ago",
  },
  {
    id: "admin-kwesi",
    name: "Dr. Kwesi Mensah",
    role: "Head of ICT Placement",
    company: "University Academic Office",
    type: "admin",
    initials: "KM",
    online: true,
  },
]

export default function StudentMessagesPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeContactId, setActiveContactId] = React.useState<string>("mentor-sarah")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState<string>("All")
  const [messageText, setMessageText] = React.useState("")

  const loadMessages = React.useCallback(async () => {
    try {
      const allMsgs = await MessageService.getMessages()
      setMessages(allMsgs)
    } catch (err) {
      console.error("Failed to load messages:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const activeContact = DEFAULT_CONTACTS.find((c) => c.id === activeContactId) || DEFAULT_CONTACTS[0]

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!messageText.trim()) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "student-alex",
      senderName: "Alex Mensah",
      recipientId: activeContact.id,
      content: messageText,
      timestamp: new Date().toISOString(),
      isUnread: false,
    }

    setMessages((prev) => [...prev, newMsg])
    setMessageText("")
  }

  const handleQuickPrompt = (promptText: string) => {
    setMessageText(promptText)
  }

  const filteredContacts = DEFAULT_CONTACTS.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.role.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === "Mentors") return matchesSearch && contact.type === "mentor"
    if (activeFilter === "Employers") return matchesSearch && contact.type === "employer"
    if (activeFilter === "Admin") return matchesSearch && contact.type === "admin"
    return matchesSearch
  })

  // Get conversation thread for currently active contact
  const activeThread = messages
    .filter(
      (m) =>
        (m.senderId === activeContact.id && m.recipientId === "student-alex") ||
        (m.senderId === "student-alex" && m.recipientId === activeContact.id) ||
        (activeContact.id === "mentor-sarah" && (m.senderId === "student-1" || m.recipientId === "student-1" || m.senderId === "mentor-sarah"))
    )
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  if (isLoading) {
    return (
      <div className="min-h-[450px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Initializing student communication workspace...
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
              Direct Communications
            </h1>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl">
            Seamlessly converse with your assigned academic mentors, corporate recruiters, and placement department administrators.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Encrypted Workspace
          </span>
        </div>
      </div>

      {/* Main Spacious Messaging Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-210px)] min-h-[620px] max-h-[780px] items-stretch">
        
        {/* LEFT PANEL: Conversation Thread List (4 Columns) */}
        <Card className="lg:col-span-4 flex flex-col border border-border/70 bg-card shadow-sm h-full overflow-hidden rounded-3xl select-none">
          
          {/* Thread List Header & Search */}
          <div className="p-4 border-b border-border/40 space-y-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground font-heading">
                Conversations
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-accent border border-orange-200/50">
                {DEFAULT_CONTACTS.length} Active
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <Input
                placeholder="Search mentors or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-background border-border/60 rounded-xl focus-visible:ring-accent/40"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {["All", "Mentors", "Employers", "Admin"].map((filter) => (
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

          {/* Scrollable Contacts Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/30 p-2 space-y-1">
            {filteredContacts.map((contact) => {
              const isSelected = contact.id === activeContact.id
              return (
                <div
                  key={contact.id}
                  onClick={() => setActiveContactId(contact.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-orange-50/70 dark:bg-slate-800/90 border border-orange-200/80 dark:border-accent/40 shadow-xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative shrink-0">
                      <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-xs flex items-center justify-center shadow-xs border border-white/20">
                        {contact.initials}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                        contact.online ? "bg-emerald-500" : "bg-slate-300"
                      }`} />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-foreground truncate">{contact.name}</span>
                        {contact.type === "mentor" && <GraduationCap className="size-3 text-emerald-600 shrink-0" />}
                        {contact.type === "employer" && <Building2 className="size-3 text-purple-600 shrink-0" />}
                        {contact.type === "admin" && <ShieldCheck className="size-3 text-accent shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{contact.role}</p>
                      <span className="text-[10px] text-accent font-semibold block truncate">{contact.company}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-semibold text-slate-400 block">
                      {contact.online ? "Online" : contact.lastSeen || "Offline"}
                    </span>
                  </div>
                </div>
              )
            })}

            {filteredContacts.length === 0 && (
              <div className="p-8 text-center text-xs text-muted-foreground italic">
                No matching conversations found.
              </div>
            )}
          </div>
        </Card>

        {/* RIGHT PANEL: Spacious Chat Workspace (8 Columns) */}
        <Card className="lg:col-span-8 flex flex-col justify-between border border-border/70 bg-card shadow-sm h-full overflow-hidden rounded-3xl">
          
          {/* Active Recipient Bar */}
          <div className="p-4 sm:p-5 border-b border-border/40 flex justify-between items-center bg-slate-50/60 dark:bg-slate-900/50 shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-accent to-orange-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {activeContact.initials}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                  activeContact.online ? "bg-emerald-500" : "bg-slate-300"
                }`} />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
                    {activeContact.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {activeContact.type === "mentor" ? "Academic Mentor" : activeContact.type === "employer" ? "Corporate Partner" : "Department Admin"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  {activeContact.role} — <span className="font-semibold text-accent">{activeContact.company}</span>
                </p>
              </div>
            </div>

            <div className="shrink-0 hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                <UserCheck className="size-3" />
                Verified Connection
              </span>
            </div>
          </div>

          {/* Messages Body Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20 dark:bg-slate-950/20">
            {/* Timestamp Separator */}
            <div className="flex items-center justify-center my-2 select-none">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-border/40">
                Recent Activity Thread
              </span>
            </div>

            {activeThread.map((msg) => {
              const isMe = msg.senderId === "student-alex" || msg.senderId === "student-1"
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                >
                  <div className={`max-w-[80%] sm:max-w-[70%] space-y-1`}>
                    {!isMe && (
                      <span className="text-[10px] font-bold text-slate-400 block px-1">
                        {msg.senderName}
                      </span>
                    )}
                    <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMe 
                        ? "bg-slate-900 text-white dark:bg-accent dark:text-white rounded-br-xs font-normal" 
                        : "bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-bl-xs border border-border/80 font-normal"
                    }`}>
                      <p>{msg.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-[9px] font-semibold ${isMe ? "justify-end text-slate-400" : "justify-start text-slate-400"} px-1`}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isMe && <CheckCheck className="size-3 text-accent" />}
                    </div>
                  </div>
                </div>
              )
            })}

            {activeThread.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic space-y-2 py-12 select-none">
                <MessageSquare className="size-10 text-slate-300" />
                <span className="text-xs font-semibold">No previous messages with {activeContact.name}.</span>
                <p className="text-[11px] max-w-xs text-center font-normal">Use the quick prompt chips below to initiate a consultation or ask a career question.</p>
              </div>
            )}
          </div>

          {/* Quick Action Prompt Chips & Input Footer */}
          <div className="p-4 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/40 space-y-3 shrink-0">
            {/* Action Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
                <Sparkles className="size-3 text-accent" />
                Quick Prompts:
              </span>
              <button 
                type="button"
                onClick={() => handleQuickPrompt("Hi! I updated my project portfolio on GitHub and would love your feedback.")}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                💻 Request Code Review
              </button>
              <button 
                type="button"
                onClick={() => handleQuickPrompt("Hello, are you available for a brief 1-on-1 mentorship consultation this week?")}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                🗓️ Schedule Session
              </button>
              <button 
                type="button"
                onClick={() => handleQuickPrompt("Hi, I applied for the internship position and would like to confirm my application status.")}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                💼 Check Application Status
              </button>
            </div>

            {/* Main Form Input */}
            <form onSubmit={handleSend} className="flex gap-2.5 items-center">
              <button 
                type="button" 
                className="p-2.5 rounded-xl border border-border/60 text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0 transition-colors"
                title="Attach project file or document"
              >
                <Paperclip className="size-4" />
              </button>

              <Input
                placeholder={`Type a message to ${activeContact.name}...`}
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
