"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { MentorDashboardHeader } from "@/features/mentor/components/MentorDashboardHeader"
import { PortfolioReviewCard } from "@/features/mentor/components/PortfolioReviewCard"
import { StudentReviewService } from "@/features/mentor/services/student-review.service"
import { PortfolioReview } from "@/features/mentor/types/mentor.types"
import { Loader2, FileCode } from "lucide-react"

export default function MentorPortfolioReviewsPage() {
  const searchParams = useSearchParams()
  const filterStudentId = searchParams.get("studentId")

  const [reviews, setReviews] = React.useState<PortfolioReview[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<"all" | "pending" | "reviewed">("pending")

  const loadReviews = React.useCallback(async () => {
    try {
      const data = await StudentReviewService.getPortfolioReviews()
      setReviews(data)
    } catch (err) {
      console.error("Failed to load portfolio reviews:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadReviews()
  }, [loadReviews])

  // Evaluation Actions
  const handleApprove = async (id: string, comments: string, ratings: Required<PortfolioReview>["ratings"]) => {
    try {
      const updated = await StudentReviewService.approvePortfolio(id, comments, ratings)
      setReviews(updated)
    } catch (err) {
      console.error("Failed to approve portfolio:", err)
    }
  }

  const handleRequestChanges = async (id: string, comments: string) => {
    try {
      const updated = await StudentReviewService.requestChanges(id, comments)
      setReviews(updated)
    } catch (err) {
      console.error("Failed to request changes:", err)
    }
  }

  const handleReject = async (id: string, comments: string) => {
    try {
      const updated = await StudentReviewService.rejectPortfolio(id, comments)
      setReviews(updated)
    } catch (err) {
      console.error("Failed to reject portfolio:", err)
    }
  }

  // Filter logic
  let filteredReviews = reviews
  
  // Apply studentId query param if present
  if (filterStudentId) {
    filteredReviews = filteredReviews.filter((r) => r.studentId === filterStudentId)
  }

  // Apply tab filters
  if (activeTab === "pending") {
    filteredReviews = filteredReviews.filter((r) => r.status === "Pending")
  } else if (activeTab === "reviewed") {
    filteredReviews = filteredReviews.filter((r) => r.status !== "Pending")
  }

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading student portfolio repository reviews...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Info */}
      <MentorDashboardHeader 
        title="Portfolio Reviews Console"
        subtitle="Verify student coding repositories, review architectures, and issue verification grades."
      />

      {/* Tab Filter Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 border border-border/60 rounded-2xl shadow-sm select-none">
        <div className="flex items-center gap-1.5 shrink-0 border border-slate-200 p-1 rounded-xl w-full sm:w-auto justify-center">
          {[
            { id: "pending", name: "Pending Audits" },
            { id: "reviewed", name: "Reviewed Projects" },
            { id: "all", name: "All Submissions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "all" | "pending" | "reviewed")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
                activeTab === tab.id ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {filterStudentId && (
          <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
            Filtered by student ID
          </span>
        )}
      </div>

      {/* List reviews */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <PortfolioReviewCard 
            key={review.id}
            review={review}
            onApprove={handleApprove}
            onRequestChanges={handleRequestChanges}
            onReject={handleReject}
          />
        ))}

        {filteredReviews.length === 0 && (
          <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-slate-50/10 text-muted-foreground select-none">
            <FileCode className="size-8 mx-auto text-slate-350 mb-2 animate-bounce" />
            <p className="text-xs font-bold">No portfolio reviews found.</p>
            <p className="text-[10px] text-slate-400">All submissions in this tab category have been audited successfully.</p>
          </div>
        )}
      </div>

    </div>
  )
}
