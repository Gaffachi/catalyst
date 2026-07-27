import { Student, PortfolioReview } from "../types/mentor.types"
import { mockStudents, mockPortfolioReviews } from "./mockData"

export class StudentReviewService {
  static async getStudents(): Promise<Student[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [...mockStudents]
  }

  static async getStudentById(id: string): Promise<Student | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return mockStudents.find((s) => s.id === id)
  }

  static async getPortfolioReviews(): Promise<PortfolioReview[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [...mockPortfolioReviews]
  }

  static async approvePortfolio(
    id: string, 
    comments: string, 
    ratings: Required<PortfolioReview>["ratings"]
  ): Promise<PortfolioReview[]> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    const review = mockPortfolioReviews.find((r) => r.id === id)
    if (review) {
      review.status = "Verified"
      review.comments = comments
      review.ratings = ratings
      review.overallScore = Math.round(
        ((ratings.technicalSkills + 
          ratings.architecture + 
          ratings.documentation + 
          ratings.problemSolving + 
          ratings.innovation) / 50) * 100
      )
      
      // Update student portfolio status
      const student = mockStudents.find((s) => s.id === review.studentId)
      if (student) {
        student.portfolioStatus = "Verified"
      }
    }
    return [...mockPortfolioReviews]
  }

  static async requestChanges(id: string, comments: string): Promise<PortfolioReview[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const review = mockPortfolioReviews.find((r) => r.id === id)
    if (review) {
      review.status = "Needs Adjustment"
      review.comments = comments
      
      const student = mockStudents.find((s) => s.id === review.studentId)
      if (student) {
        student.portfolioStatus = "Needs Adjustment"
      }
    }
    return [...mockPortfolioReviews]
  }

  static async rejectPortfolio(id: string, comments: string): Promise<PortfolioReview[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const review = mockPortfolioReviews.find((r) => r.id === id)
    if (review) {
      review.status = "Rejected"
      review.comments = comments
      
      const student = mockStudents.find((s) => s.id === review.studentId)
      if (student) {
        student.portfolioStatus = "Needs Adjustment" // Map rejected to Needs Adjustment for student re-submission
      }
    }
    return [...mockPortfolioReviews]
  }
}
