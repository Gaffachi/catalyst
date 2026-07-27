import { mockCompany } from "./mockData"
import { CompanyProfile } from "../types/employer.types"

let companyData: CompanyProfile = { ...mockCompany }

export class CompanyService {
  static async getProfile(): Promise<CompanyProfile> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...companyData }), 150)
    })
  }

  static async updateProfile(updated: Partial<CompanyProfile>): Promise<CompanyProfile> {
    return new Promise((resolve) => {
      companyData = { ...companyData, ...updated }
      setTimeout(() => resolve({ ...companyData }), 150)
    })
  }
}
