import { CareerAssessment } from "../types/mentor.types"
import { mockCareerAssessments, mockStudents } from "./mockData"

export class AssessmentService {
  static async getAssessments(): Promise<CareerAssessment[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [...mockCareerAssessments]
  }

  static async saveAssessment(
    assessment: Omit<CareerAssessment, "id" | "date">
  ): Promise<CareerAssessment> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // Calculate overall score average
    const r = assessment.ratings
    const overallReadiness = Math.round(
      (r.technicalSkills +
        r.communication +
        r.problemSolving +
        r.professionalism +
        r.teamwork +
        r.leadership +
        r.timeManagement +
        r.portfolioQuality) / 8
    )

    const newAssessment: CareerAssessment = {
      ...assessment,
      id: `assessment-${mockCareerAssessments.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      overallReadiness
    }

    mockCareerAssessments.push(newAssessment)

    // Update the corresponding student's global readiness score
    const student = mockStudents.find((s) => s.id === assessment.studentId)
    if (student) {
      student.readinessScore = overallReadiness
    }

    return newAssessment
  }
}
