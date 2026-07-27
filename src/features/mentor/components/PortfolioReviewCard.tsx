"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortfolioReview } from "../types/mentor.types"
import { GitFork, ExternalLink, Calendar, User, Star, CheckCircle, RotateCcw, AlertOctagon } from "lucide-react"

interface PortfolioReviewCardProps {
  review: PortfolioReview
  onApprove: (id: string, comments: string, ratings: Required<PortfolioReview>["ratings"]) => void
  onRequestChanges: (id: string, comments: string) => void
  onReject: (id: string, comments: string) => void
}

export function PortfolioReviewCard({
  review,
  onApprove,
  onRequestChanges,
  onReject,
}: PortfolioReviewCardProps) {
  const [comments, setComments] = React.useState(review.comments || "")
  const [isEditing, setIsEditing] = React.useState(review.status === "Pending")

  // Slider rating states
  const [techRating, setTechRating] = React.useState(review.ratings?.technicalSkills || 7)
  const [archRating, setArchRating] = React.useState(review.ratings?.architecture || 7)
  const [docRating, setDocRating] = React.useState(review.ratings?.documentation || 7)
  const [probRating, setProbRating] = React.useState(review.ratings?.problemSolving || 7)
  const [innovRating, setInnovRating] = React.useState(review.ratings?.innovation || 7)

  // Reset ratings if a review status changes
  React.useEffect(() => {
    setComments(review.comments || "")
    setIsEditing(review.status === "Pending")
    if (review.ratings) {
      setTechRating(review.ratings.technicalSkills)
      setArchRating(review.ratings.architecture)
      setDocRating(review.ratings.documentation)
      setProbRating(review.ratings.problemSolving)
      setInnovRating(review.ratings.innovation)
    }
  }, [review])

  const getStatusBadge = (status: PortfolioReview["status"]) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border">Verified</Badge>
      case "Needs Adjustment":
        return <Badge className="bg-amber-50 text-accent border-orange-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border">Needs Adjustment</Badge>
      case "Rejected":
        return <Badge className="bg-rose-50 text-rose-600 border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border">Rejected</Badge>
      default:
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border animate-pulse">Pending Review</Badge>
    }
  }

  const handleApproveSubmit = () => {
    onApprove(review.id, comments, {
      technicalSkills: techRating,
      architecture: archRating,
      documentation: docRating,
      problemSolving: probRating,
      innovation: innovRating
    })
    setIsEditing(false)
  }

  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-6 select-none animate-in fade-in duration-200">
      
      {/* 1. Header Card meta details */}
      <div className="flex justify-between items-start gap-4 pb-4 border-b border-border/40">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
              {review.title}
            </h3>
            {getStatusBadge(review.status)}
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-0.5">
            <span className="flex items-center gap-1 font-semibold">
              <User className="size-3.5" />
              {review.studentName}
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <Calendar className="size-3.5" />
              Submitted: {review.submissionDate}
            </span>
          </div>
        </div>

        {review.overallScore && (
          <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-0.5">
            <Star className="size-4 fill-emerald-600" />
            {review.overallScore}% Grade
          </span>
        )}
      </div>

      {/* 2. Project details description */}
      <div className="space-y-3">
        <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
          {review.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {review.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-[10px] px-2 py-0 border-slate-200 bg-slate-50/20 font-medium">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Repository links */}
        <div className="flex gap-4 pt-1 text-xs font-bold">
          {review.githubUrl && (
            <a 
              href={review.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-700 hover:text-foreground hover:underline"
            >
              <GitFork className="size-4" />
              <span>Source Code</span>
            </a>
          )}
          {review.liveUrl && (
            <a 
              href={review.liveUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-accent hover:text-orange-600 hover:underline"
            >
              <ExternalLink className="size-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </div>

      {/* 3. Grading Sliders Section (only editable if Pending or in edit mode) */}
      <div className="space-y-4 pt-4 border-t border-border/30">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Evaluation Scores Matrix</span>
          {!isEditing && review.status !== "Pending" && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="h-6 rounded-lg text-[9px] font-bold cursor-pointer"
            >
              Edit Assessment
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Sliders loop */}
          {[
            { label: "Technical Skills", val: techRating, set: setTechRating },
            { label: "Architecture & Schema Layouts", val: archRating, set: setArchRating },
            { label: "Documentation Details", val: docRating, set: setDocRating },
            { label: "Problem Solving Quality", val: probRating, set: setProbRating },
            { label: "Innovation & UX Complexity", val: innovRating, set: setInnovRating },
          ].map((slider) => (
            <div key={slider.label} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">{slider.label}</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{slider.val} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={slider.val}
                disabled={!isEditing}
                onChange={(e) => slider.set(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent disabled:opacity-60"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Comments and Actions Form */}
      <div className="space-y-3 pt-4 border-t border-border/30">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Auditor Feedback & Comments</label>
        {isEditing ? (
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Provide specific feedback or changes requested regarding repository coding guidelines, PostgreSQL queries, or deployment packages..."
            className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-background focus:outline-none focus:ring-1 focus:ring-accent h-20 leading-relaxed"
          />
        ) : (
          <p className="text-xs text-slate-650 dark:text-slate-400 bg-slate-50/20 p-3.5 border border-slate-100 rounded-xl leading-relaxed italic">
            {comments || "No assessment notes recorded yet."}
          </p>
        )}

        {isEditing && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={() => {
                  onReject(review.id, comments)
                  setIsEditing(false)
                }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 border-0 h-9 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer"
              >
                <AlertOctagon className="size-4 mr-1.5" />
                Reject
              </Button>
              <Button
                onClick={() => {
                  onRequestChanges(review.id, comments)
                  setIsEditing(false)
                }}
                className="bg-amber-50 hover:bg-amber-100 text-accent border-0 h-9 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer"
              >
                <RotateCcw className="size-4 mr-1.5" />
                Request Edits
              </Button>
            </div>
            
            <Button
              onClick={handleApproveSubmit}
              disabled={!comments.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 h-9 rounded-xl font-bold text-xs w-full sm:w-auto cursor-pointer disabled:opacity-50"
            >
              <CheckCircle className="size-4 mr-1.5" />
              Verify & Approve Portfolio
            </Button>
          </div>
        )}
      </div>

    </Card>
  )
}
