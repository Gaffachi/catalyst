"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthStore } from "@/store/use-auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { 
  MessageSquare, 
  Heart, 
  Send, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  Users, 
  ShieldCheck,
  Share2, 
  Filter,
  Pin,
  Tag,
  Clock
} from "lucide-react"

export interface FeedComment {
  id: string
  authorName: string
  authorRole: "student" | "mentor" | "employer" | "admin"
  content: string
  timestamp: string
}

export interface FeedPost {
  id: string
  authorName: string
  authorRole: "student" | "mentor" | "employer" | "admin"
  authorTitle?: string
  category: "General" | "Announcement" | "Opportunity" | "Q&A" | "Project"
  title: string
  content: string
  likes: number
  isLiked?: boolean
  isPinned?: boolean
  comments: FeedComment[]
  timestamp: string
}

const INITIAL_POSTS: FeedPost[] = [
  {
    id: "post-1",
    authorName: "Dr. Kwesi Mensah",
    authorRole: "admin",
    authorTitle: "Head of ICT Placement & Career Office",
    category: "Announcement",
    isPinned: true,
    title: "📢 Official Notice: Summer 2026 Internship Verification Window is Open",
    content: "Welcome to all Catalyst users! Students enrolled in Level 300 & 400 are advised to complete their skill matrix updates and submit portfolios for mentor review before August 15th.",
    likes: 42,
    isLiked: true,
    timestamp: "2 hours ago",
    comments: [
      {
        id: "c-1",
        authorName: "Samuel Osei",
        authorRole: "student",
        content: "Thank you Dr. Mensah! Do we need to re-verify past GitHub repositories if they were approved last semester?",
        timestamp: "1 hour ago"
      },
      {
        id: "c-2",
        authorName: "Dr. Kwesi Mensah",
        authorRole: "admin",
        content: "Only repositories with new major releases require re-auditing.",
        timestamp: "45 mins ago"
      }
    ]
  },
  {
    id: "post-2",
    authorName: "Stripe Talent Engineering",
    authorRole: "employer",
    authorTitle: "Corporate Partner recruiter",
    category: "Opportunity",
    title: "🚀 Stripe Ghana is Accepting Frontend & Cloud Engineering Interns",
    content: "We're excited to announce 6 internship slots for React, Next.js, and Node.js developers. Catalyst verified portfolios will receive expedited review in our candidate pipeline!",
    likes: 38,
    timestamp: "4 hours ago",
    comments: [
      {
        id: "c-3",
        authorName: "Ama Serwaa",
        authorRole: "student",
        content: "Just submitted my portfolio directly through the marketplace!",
        timestamp: "2 hours ago"
      }
    ]
  },
  {
    id: "post-3",
    authorName: "Sarah Johnson",
    authorRole: "mentor",
    authorTitle: "Senior Frontend Architect @ Meta",
    category: "Q&A",
    title: "💡 Mentorship Office Hours: System Design & React 19 State Management",
    content: "Holding open 1-on-1 consultation slots this Thursday from 2:00 PM - 5:00 PM. Book a session directly on my calendar if you want your project architecture reviewed!",
    likes: 29,
    timestamp: "6 hours ago",
    comments: []
  },
  {
    id: "post-4",
    authorName: "Emmanuel Baah",
    authorRole: "student",
    authorTitle: "B.Sc Computer Science Student",
    category: "Project",
    title: "✨ Built an Open-Source Microservices Monitoring Dashboard in TypeScript",
    content: "Hey Catalyst community! I just pushed a new open-source monitoring project to GitHub featuring live WebSockets and Tailwind CSS. Looking for feedback from mentors!",
    likes: 19,
    timestamp: "1 day ago",
    comments: [
      {
        id: "c-4",
        authorName: "Sarah Johnson",
        authorRole: "mentor",
        content: "Great work Emmanuel! The WebSocket implementation is clean. I left a few comments on your repository.",
        timestamp: "18 hours ago"
      }
    ]
  }
]

export function CommunityFeed() {
  const { user } = useAuthStore()
  const [posts, setPosts] = React.useState<FeedPost[]>(INITIAL_POSTS)
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  
  // Post Creation Form State
  const [newPostTitle, setNewPostTitle] = React.useState("")
  const [newPostContent, setNewPostContent] = React.useState("")
  const [newPostCategory, setNewPostCategory] = React.useState<FeedPost["category"]>("General")
  const [isPosting, setIsPosting] = React.useState(false)

  // Comment Creation State
  const [activeCommentPostId, setActiveCommentPostId] = React.useState<string | null>(null)
  const [commentText, setCommentText] = React.useState("")

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    setIsPosting(true)

    const userRole = user?.role || "student"
    const authorName = user?.name || (userRole === "student" ? "Current Student" : userRole === "mentor" ? "Academic Mentor" : "Corporate Partner")

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorName,
      authorRole: userRole,
      authorTitle: userRole === "student" ? "Verified Catalyst Student" : userRole === "mentor" ? "Industry Tech Mentor" : userRole === "employer" ? "Corporate Partner" : "Department Administrator",
      category: newPostCategory,
      title: newPostTitle,
      content: newPostContent,
      likes: 1,
      isLiked: true,
      timestamp: "Just now",
      comments: [],
    }

    setPosts([newPost, ...posts])
    setNewPostTitle("")
    setNewPostContent("")
    setIsPosting(false)
  }

  const handleToggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        }
      }
      return post
    }))
  }

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return

    const authorName = user?.name || "Community User"
    const authorRole = user?.role || "student"

    const newComment: FeedComment = {
      id: `comment-${Date.now()}`,
      authorName,
      authorRole,
      content: commentText,
      timestamp: "Just now"
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        }
      }
      return post
    }))

    setCommentText("")
  }

  const filteredPosts = posts.filter(post => {
    if (selectedCategory === "All") return true
    return post.category === selectedCategory
  })

  const getRoleBadge = (role: FeedPost["authorRole"]) => {
    switch (role) {
      case "student":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/50">
            <Users className="size-3" />
            Student
          </span>
        )
      case "mentor":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50">
            <GraduationCap className="size-3" />
            Mentor
          </span>
        )
      case "employer":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/50">
            <Building2 className="size-3" />
            Employer
          </span>
        )
      case "admin":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-orange-50 text-accent dark:bg-orange-950/60 border border-accent/30">
            <ShieldCheck className="size-3" />
            Admin
          </span>
        )
    }
  }

  return (
    <div className="space-y-6 w-full">
      {/* 1. Feed Section Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-border/80 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-white shadow-md">
              <Sparkles className="size-4 animate-pulse" />
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
              Feed
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-xl font-normal">
            Real-time channel connecting Students, Mentors, Employers, and Academic Officers. Share updates, ask questions, or announce opportunities.
          </p>
        </div>

        <div className="shrink-0 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold text-slate-200">
            <Clock className="size-3.5 text-accent" />
            <span>Live Activity Stream</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Create Post Component */}
      <Card className="p-5 border border-border/80 bg-card/95 dark:bg-slate-900/90 shadow-md rounded-2xl">
        <form onSubmit={handleCreatePost} className="space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5 font-heading">
              <MessageSquare className="size-4 text-accent" />
              <span>Share an Update or Question</span>
            </span>

            {/* Role Badge Indicator */}
            {getRoleBadge(user?.role || "student")}
          </div>

          <Input 
            placeholder="Post Title (e.g. Summer Internship Opportunity, Project Review Request...)" 
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="text-xs font-semibold transition-all focus-visible:ring-accent/40"
          />

          <textarea 
            rows={3}
            placeholder="Write your message or discussion topic for the Catalyst community..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="flex w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-border/40">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                <Tag className="size-3" />
                Category:
              </span>
              <select
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value as FeedPost["category"])}
                className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-2.5 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="General">General</option>
                <option value="Announcement">Announcement</option>
                <option value="Opportunity">Opportunity</option>
                <option value="Q&A">Q&A</option>
                <option value="Project">Project</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={isPosting || !newPostTitle.trim() || !newPostContent.trim()}
              className="bg-accent hover:bg-accent/90 text-white font-bold text-xs px-5 py-2 h-auto rounded-xl shadow-md cursor-pointer border-0 transition-all"
            >
              <span>Publish to Feed</span>
              <Send className="size-3.5 ml-1.5" />
            </Button>
          </div>
        </form>
      </Card>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none no-scrollbar">
        <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 shrink-0 pr-1">
          <Filter className="size-3.5" />
          Filter:
        </span>
        {["All", "Announcement", "Opportunity", "Q&A", "Project", "General"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer transition-all duration-150 ${
              selectedCategory === cat
                ? "bg-slate-900 text-white dark:bg-accent dark:text-white shadow-xs font-bold"
                : "bg-card border border-border/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. Live Feed Posts List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`p-6 border bg-card/95 dark:bg-slate-900/90 shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md ${
                post.isPinned ? "border-accent/40 bg-orange-50/10 dark:bg-orange-950/10" : "border-border/80"
              }`}>
                {/* Pinned Tag */}
                {post.isPinned && (
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-accent uppercase tracking-wider mb-3">
                    <Pin className="size-3 rotate-45" />
                    <span>Pinned Announcement</span>
                  </div>
                )}

                {/* Author Info Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-sm shadow-xs border border-white/20">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground">{post.authorName}</h4>
                        {getRoleBadge(post.authorRole)}
                      </div>
                      {post.authorTitle && (
                        <p className="text-[11px] text-muted-foreground">{post.authorTitle}</p>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                    {post.timestamp}
                  </span>
                </div>

                {/* Post Content */}
                <div className="space-y-2 mb-4">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {post.content}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs">
                  <div className="flex items-center gap-4">
                    {/* Like Button */}
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs font-bold ${
                        post.isLiked 
                          ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400" 
                          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Heart className={`size-4 ${post.isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comment Toggle Button */}
                    <button
                      onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-xs font-semibold"
                    >
                      <MessageSquare className="size-4 text-accent" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>

                  <button className="text-slate-400 hover:text-foreground transition-colors p-1.5 rounded-lg cursor-pointer">
                    <Share2 className="size-4" />
                  </button>
                </div>

                {/* Comments Section Drawer */}
                {activeCommentPostId === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 mt-3 border-t border-border/40 space-y-3"
                  >
                    {/* Comments List */}
                    {post.comments.length > 0 && (
                      <div className="space-y-2.5">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-border/50 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-foreground">{comment.authorName}</span>
                                {getRoleBadge(comment.authorRole)}
                              </div>
                              <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 font-normal">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <Input 
                        placeholder="Write a response..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="text-xs h-9 rounded-xl focus-visible:ring-accent/40"
                      />
                      <Button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentText.trim()}
                        className="bg-slate-900 hover:bg-slate-800 text-white h-9 px-4 rounded-xl text-xs font-bold cursor-pointer border-0 shrink-0"
                      >
                        Reply
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
