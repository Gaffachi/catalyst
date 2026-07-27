import { StudentInterview } from "../types/interview.types"

const mockInterviews: StudentInterview[] = [
  {
    id: "int-101",
    company: "Paystack Africa",
    role: "Frontend Engineer Intern",
    interviewType: "Video Call",
    date: "July 28, 2026",
    time: "10:00 AM GMT",
    status: "Scheduled",
    interviewerName: "Kofi Boateng (Lead Frontend)",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    notes: "Prepare to walk through your React portfolio projects and state management experience.",
  },
  {
    id: "int-102",
    company: "Google Ghana",
    role: "Software Engineering Graduate Trainee",
    interviewType: "Technical Test",
    date: "August 02, 2026",
    time: "02:00 PM GMT",
    status: "Scheduled",
    interviewerName: "Dr. Ama Mensah (Senior Recruiter)",
    notes: "90-minute live coding exercise focusing on data structures and algorithms.",
  },
  {
    id: "int-103",
    company: "Hubtel Ghana",
    role: "Junior Full Stack Developer",
    interviewType: "Phone Screen",
    date: "July 18, 2026",
    time: "11:30 AM GMT",
    status: "Completed",
    interviewerName: "Yaw Addison",
    notes: "Completed preliminary screening. Shortlisted for technical round.",
  },
]

export class StudentInterviewService {
  static async getInterviews(): Promise<StudentInterview[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockInterviews]), 150)
    })
  }
}
