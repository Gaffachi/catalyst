"use client"

import * as React from "react"
import { AdminMessageService } from "@/features/admin/services/admin-message.service"
import { Message } from "@/features/mentor/types/mentor.types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Send, 
  Search, 
  MessageSquare, 
  ShieldCheck, 
  Loader2, 
  Paperclip, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  Handshake, 
  CheckCheck,
  UserCheck
} from "lucide-react"

interface StakeholderContact {
  id: string
  name: string
  role: string
  type: "employer" | "mentor" | "partner"
  initials: string
  online: boolean
  lastSeen?: string
}

const STAKEHOLDER_CONTACTS: StakeholderContact[] = [
  {
    id: "emp-paystack",
    name: "Paystack Africa",
    role: "Verified Corporate Employer",
    type: "employer",
    initials: "PA",
    online: true,
  },
  {
    id: "mentor-dr-sarah",
    name: "Dr. Sarah Johnson",
    role: "Senior Industry Mentor",
    type: "mentor",
    initials: "SJ",
    online: true,
  },
  {
    id: "partner-ashesi",
    name: "Ashesi University",
    role: "Institutional Partner",
    type: "partner",
    initials: "AU",
    online: false,
    lastSeen: "3h ago",
  },
]

export default function AdminMessagesPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedRecipientId, setSelectedRecipientId] = React.useState("emp-paystack")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("All")
  const [messageText, setMessageText] = React.useState("")

  const loadMessages = React.useCallback(async () => {
    try {
      const data = await AdminMessageService.getMessages()
      setMessages(data)
    } catch (err) {
      console.error("Failed to load admin messages:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const currentContact = STAKEHOLDER_CONTACTS.find((c) => c.id === selectedRecipientId) || STAKEHOLDER_CONTACTS[0]

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!messageText.trim()) return

    try {
      const updated = await AdminMessageService.sendMessage(messageText, selectedRecipientId)
      setMessages(updated)
      setMessageText("")
    } catch (err) {
      console.error("Failed to send message:", err)
    }
  }

  const handleQuickPrompt = (promptText: string) => {
    setMessageText(promptText)
  }

  const filteredContacts = STAKEHOLDER_CONTACTS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.role.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === "Employers") return matchesSearch && c.type === "employer"
    if (activeFilter === "Mentors") return matchesSearch && c.type === "mentor"
    if (activeFilter === "Partners") return matchesSearch && c.type === "partner"
    return matchesSearch
  })

  const activeThread = messages.filter(
    (m) => m.senderId === selectedRecipientId || m.recipientId === selectedRecipientId
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  if (isLoading && messages.length === 0) {
    return (
      <div className="min-h-[450px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading platform governance inbox...
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
              <ShieldCheck className="size-4" />
            </span>
            <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Governance Messages & Dispute Channels
            </h1>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl">
            Official communication workspace connecting Platform Administrators with Mentors, Corporate Employers, and Institutional Partners.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-accent border border-orange-200/60 text-xs font-bold">
            <ShieldCheck className="size-3.5" />
            Admin Verified Security
          </span>
        </div>
      </div>

      {/* Main Spacious Messaging Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-210px)] min-h-[620px] max-h-[780px] items-stretch">
        
        {/* LEFT PANEL: Stakeholder Thread List (4 Columns) */}
        <Card className="lg:col-span-4 flex flex-col border border-border/70 bg-card shadow-sm h-full overflow-hidden rounded-3xl select-none">
          
          {/* Header & Search */}
          <div className="p-4 border-b border-border/40 space-y-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground font-heading">
                Stakeholder Threads
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-accent border border-orange-200/50">
                {STAKEHOLDER_CONTACTS.length} Accounts
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <Input
                placeholder="Search stakeholder or partner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-background border-border/60 rounded-xl focus-visible:ring-accent/40"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {["All", "Employers", "Mentors", "Partners"].map((filter) => (
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

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/30 p-2 space-y-1">
            {filteredContacts.map((contact) => {
              const isSelected = contact.id === selectedRecipientId
              return (
                <div
                  key={contact.id}
                  onClick={() => setSelectedRecipientId(contact.id)}
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
                        {contact.type === "employer" && <Building2 className="size-3 text-purple-600 shrink-0" />}
                        {contact.type === "mentor" && <GraduationCap className="size-3 text-emerald-600 shrink-0" />}
                        {contact.type === "partner" && <Handshake className="size-3 text-blue-600 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-accent font-semibold truncate">{contact.role}</p>
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
                No matching accounts found.
              </div>
            )}
          </div>
        </Card>

        {/* RIGHT PANEL: Chat Workspace (8 Columns) */}
        <Card className="lg:col-span-8 flex flex-col justify-between border border-border/70 bg-card shadow-sm h-full overflow-hidden rounded-3xl">
          
          {/* Active Recipient Bar */}
          <div className="p-4 sm:p-5 border-b border-border/40 flex justify-between items-center bg-slate-50/60 dark:bg-slate-900/50 shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-accent to-orange-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {currentContact.initials}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                  currentContact.online ? "bg-emerald-500" : "bg-slate-300"
                }`} />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
                    {currentContact.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {currentContact.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Governance & Operational Channel — <span className="font-bold text-accent">Active Thread</span>
                </p>
              </div>
            </div>

            <div className="shrink-0 hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                <ShieldCheck className="size-3" />
                Admin Protected Channel
              </span>
            </div>
          </div>

          {/* Messages Body Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20 dark:bg-slate-950/20">
            <div className="flex items-center justify-center my-2 select-none">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-border/40">
                Official Administrative Audit Log
              </span>
            </div>

            {activeThread.map((msg) => {
              const isAdmin = msg.senderId === "admin-master" || msg.senderId === "admin-1"
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isAdmin ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                >
                  <div className="max-w-[80%] sm:max-w-[70%] space-y-1">
                    {!isAdmin && (
                      <span className="text-[10px] font-bold text-slate-400 block px-1">
                        {msg.senderName}
                      </span>
                    )}
                    <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isAdmin 
                        ? "bg-slate-900 text-white dark:bg-accent dark:text-white rounded-br-xs font-normal" 
                        : "bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-bl-xs border border-border/80 font-normal"
                    }`}>
                      <p>{msg.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-[9px] font-semibold ${isAdmin ? "justify-end text-slate-400" : "justify-start text-slate-400"} px-1`}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isAdmin && <CheckCheck className="size-3 text-accent" />}
                    </div>
                  </div>
                </div>
              )
            })}

            {activeThread.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic space-y-2 py-12 select-none">
                <MessageSquare className="size-10 text-slate-300" />
                <span className="text-xs font-semibold">No active message history with {currentContact.name}.</span>
                <p className="text-[11px] max-w-xs text-center font-normal">Use the quick admin action prompts below to send verification updates or policy notices.</p>
              </div>
            )}
          </div>

          {/* Quick Action Prompts & Form Footer */}
          <div className="p-4 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/40 space-y-3 shrink-0">
            {/* Admin Action Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
                <Sparkles className="size-3 text-accent" />
                Admin Actions:
              </span>
              <button 
                type="button"
                onClick={() => handleQuickPrompt(`Official Notice: Your Catalyst partner account verification has been approved. You may now publish listings.`)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                🛡️ Send Verification Approval
              </button>
              <button 
                type="button"
                onClick={() => handleQuickPrompt(`Please provide updated compliance and corporate documentation for annual placement audits.`)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 border border-border/60 text-slate-600 dark:text-slate-300 hover:border-accent shrink-0 cursor-pointer"
              >
                📋 Request Accreditation Files
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="flex gap-2.5 items-center">
              <button 
                type="button" 
                className="p-2.5 rounded-xl border border-border/60 text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0 transition-colors"
                title="Attach official administrative file"
              >
                <Paperclip className="size-4" />
              </button>

              <Input
                placeholder={`Type an administrative message to ${currentContact.name}...`}
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
