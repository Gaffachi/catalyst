import { AdminReport } from "@/features/admin/types/admin.types"

const mockEmployerReports: AdminReport[] = [
  {
    id: "rep-emp-1",
    title: "Candidate Screening & Funnel Summary",
    type: "Student Progress",
    generatedDate: "July 24, 2026",
    status: "Ready",
    summary: "Complete breakdown of 247 candidate applications across 7 pipeline stages for Q2 2026 tech graduate hiring.",
    recordCount: 247,
  },
  {
    id: "rep-emp-2",
    title: "Offer Acceptance & Hire Conversion Rate",
    type: "Employment Outcome",
    generatedDate: "July 20, 2026",
    status: "Ready",
    summary: "Analytics report tracking offer issuance to acceptance ratio, drop-off reasons, and time-to-fill metrics.",
    recordCount: 42,
  },
  {
    id: "rep-emp-3",
    title: "Technical Interview & Skills Evaluation Audit",
    type: "Mentorship Activity",
    generatedDate: "July 15, 2026",
    status: "Ready",
    summary: "Aggregated performance scorecards of candidates evaluated during live technical interviews and portfolio reviews.",
    recordCount: 88,
  },
  {
    id: "rep-emp-4",
    title: "Institutional Campus Recruitment Reach",
    type: "Employer Engagement",
    generatedDate: "July 01, 2026",
    status: "Ready",
    summary: "Metrics on applicant university origins, degree programs, and readiness score distributions.",
    recordCount: 150,
  },
]

export class EmployerReportService {
  static async getReports(): Promise<AdminReport[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockEmployerReports]), 150)
    })
  }
}
