export interface StudentInterview {
  id: string
  company: string
  role: string
  interviewType: "Video Call" | "In-Person" | "Phone Screen" | "Technical Test"
  date: string
  time: string
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled"
  interviewerName?: string
  notes?: string
  meetingLink?: string
}
