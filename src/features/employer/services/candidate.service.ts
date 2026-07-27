import { mockCandidates } from "./mockData"
import { CandidateProfile } from "../types/employer.types"

const candidatesStore: CandidateProfile[] = [...mockCandidates]

export class CandidateService {
  static async getCandidates(): Promise<CandidateProfile[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...candidatesStore]), 150)
    })
  }

  static async getCandidateById(id: string): Promise<CandidateProfile | null> {
    return new Promise((resolve) => {
      const found = candidatesStore.find((c) => c.id === id) || null
      setTimeout(() => resolve(found), 100)
    })
  }
}
