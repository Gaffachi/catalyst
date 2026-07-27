import { Skill } from "../types/student.types"
import { mockStudentProfile } from "./mockData"

export class SkillsService {
  static async getSkills(): Promise<Skill[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...mockStudentProfile.skills]
  }

  static async addSkill(skill: Skill): Promise<Skill[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const exists = mockStudentProfile.skills.find(s => s.name.toLowerCase() === skill.name.toLowerCase())
    if (exists) {
      exists.level = skill.level
      exists.category = skill.category
    } else {
      mockStudentProfile.skills.push(skill)
    }
    return [...mockStudentProfile.skills]
  }
}
